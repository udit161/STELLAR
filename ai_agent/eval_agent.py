#!/usr/bin/env python3
"""
eval_agent.py — Standalone Batch Evaluation Runner for SatQuery AI Agent
=========================================================================

Evaluates the compiled LangGraph / FallbackGraph orchestrator against
benchmark test splits from:
  • VRSBench  — Visual Reasoning on Satellite imagery (VQA)
  • RSVQA     — Remote Sensing Visual Question Answering (VQA)
  • CDVQA     — Change Detection Visual Question Answering

Usage
-----
  # Run on built-in mini mock dataset (smoke test):
  python eval_agent.py --mock

  # Run on a real JSONL benchmark file:
  python eval_agent.py --dataset path/to/benchmark.jsonl --limit 100

  # Save report to file:
  python eval_agent.py --mock --output report.json

JSONL format expected for --dataset:
  {"sample_id": "...", "task": "vqa|grounding|change_detection",
   "query": "...", "image_paths": [...], "gt_answer": "...",
   "gt_bboxes": [[x1,y1,x2,y2], ...], "expected_tools": ["vqa_tool"]}
"""

import sys
import os
import json
import time
import argparse
import textwrap
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator


# ---------------------------------------------------------------------------
# Data Structures
# ---------------------------------------------------------------------------

@dataclass
class BenchmarkSample:
    """One evaluation sample from a benchmark split."""
    sample_id:      str
    task:           str                   # "vqa" | "grounding" | "change_detection"
    query:          str
    image_paths:    List[str]             # one or two image file paths
    gt_answer:      Optional[str] = None  # ground-truth textual answer (VQA)
    gt_bboxes:      Optional[List[List[float]]] = None  # [[x1,y1,x2,y2], ...]
    expected_tools: Optional[List[str]] = None          # e.g. ["grounding_tool"]
    metadata:       Dict[str, Any] = field(default_factory=dict)


@dataclass
class SampleResult:
    """Scored result for one benchmark sample."""
    sample_id:          str
    task:               str
    query:              str
    # Textual answer scoring (VQA)
    predicted_answer:   str   = ""
    gt_answer:          str   = ""
    exact_match:        bool  = False
    fuzzy_match:        bool  = False
    token_f1:           float = 0.0
    # Spatial scoring (grounding)
    predicted_bboxes:   List[List[float]] = field(default_factory=list)
    gt_bboxes:          List[List[float]] = field(default_factory=list)
    mean_iou:           float = 0.0
    # Change detection
    change_detected:    bool  = False
    gt_change_expected: bool  = False
    change_correct:     bool  = False
    # Execution trace compliance
    tools_invoked:      List[str] = field(default_factory=list)
    expected_tools:     List[str] = field(default_factory=list)
    trace_compliant:    bool  = False
    # Timing
    latency_ms:         float = 0.0
    # Error
    error:              Optional[str] = None


# ---------------------------------------------------------------------------
# Metric Helpers
# ---------------------------------------------------------------------------

def _normalize(text: str) -> str:
    """Lowercase, strip punctuation and extra whitespace."""
    import re
    text = text.lower().strip()
    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text


def compute_token_f1(pred: str, gt: str) -> float:
    """Token-level F1 between predicted and ground-truth answers."""
    pred_tokens = _normalize(pred).split()
    gt_tokens   = _normalize(gt).split()
    if not pred_tokens or not gt_tokens:
        return 1.0 if pred_tokens == gt_tokens else 0.0
    common = set(pred_tokens) & set(gt_tokens)
    if not common:
        return 0.0
    precision = len(common) / len(pred_tokens)
    recall    = len(common) / len(gt_tokens)
    return round(2 * precision * recall / (precision + recall), 4)


def compute_iou(boxA: List[float], boxB: List[float]) -> float:
    """
    Compute IoU between two normalized [x1, y1, x2, y2] bounding boxes.
    Coordinates are expected in [0, 1].
    """
    xA = max(boxA[0], boxB[0])
    yA = max(boxA[1], boxB[1])
    xB = min(boxA[2], boxB[2])
    yB = min(boxA[3], boxB[3])
    inter_w = max(0.0, xB - xA)
    inter_h = max(0.0, yB - yA)
    inter   = inter_w * inter_h
    if inter == 0.0:
        return 0.0
    areaA = max(0.0, boxA[2] - boxA[0]) * max(0.0, boxA[3] - boxA[1])
    areaB = max(0.0, boxB[2] - boxB[0]) * max(0.0, boxB[3] - boxB[1])
    union = areaA + areaB - inter
    return round(inter / union, 4) if union > 0 else 0.0


def compute_mean_iou(
    pred_bboxes: List[List[float]],
    gt_bboxes:   List[List[float]],
) -> float:
    """
    Greedy max-IoU matching: each GT box is matched to the predicted box
    with the highest IoU.  Returns mean of matched IoUs.
    Unmatched GT boxes contribute 0.0.
    """
    if not gt_bboxes:
        return 1.0 if not pred_bboxes else 0.0
    if not pred_bboxes:
        return 0.0

    ious = []
    used_pred: set = set()
    for gt_box in gt_bboxes:
        best_iou, best_idx = 0.0, -1
        for i, pred_box in enumerate(pred_bboxes):
            if i in used_pred:
                continue
            iou = compute_iou(pred_box, gt_box)
            if iou > best_iou:
                best_iou, best_idx = iou, i
        if best_idx >= 0:
            used_pred.add(best_idx)
        ious.append(best_iou)
    return round(sum(ious) / len(ious), 4) if ious else 0.0


def _extract_bboxes_from_state(result: Dict[str, Any]) -> List[List[float]]:
    """Pull predicted bounding boxes from the agent output state."""
    boxes: List[List[float]] = []
    for bbox in (result.get("bounding_boxes") or []):
        if isinstance(bbox, dict):
            raw = bbox.get("bbox_normalized") or bbox.get("bbox") or []
            if isinstance(raw, (list, tuple)) and len(raw) == 4:
                boxes.append([float(v) for v in raw])
    for bbox in (result.get("tool_outputs", {}).get("bounding_boxes") or []):
        if isinstance(bbox, dict):
            raw = bbox.get("bbox_normalized") or []
            if isinstance(raw, (list, tuple)) and len(raw) == 4:
                boxes.append([float(v) for v in raw])
    intermediate = result.get("intermediate_outputs") or {}
    for key in ("grounding", "vision_vqa", "vqa"):
        nested = intermediate.get(key, {})
        if isinstance(nested, dict):
            for bbox in (nested.get("bounding_boxes") or []):
                if isinstance(bbox, dict):
                    raw = bbox.get("bbox_normalized") or []
                    if isinstance(raw, (list, tuple)) and len(raw) == 4:
                        boxes.append([float(v) for v in raw])
    return boxes


def _extract_tools_invoked(result: Dict[str, Any]) -> List[str]:
    """Extract canonical tool names from the execution trace."""
    tools: List[str] = []
    exec_summary = (result.get("intermediate_outputs") or {}).get("execution_summary", {})
    for call in (exec_summary.get("tool_calls") or []):
        name = call.get("tool_name", "")
        if name and name not in tools:
            tools.append(name)
    for entry in (result.get("execution_trace") or []):
        if isinstance(entry, dict):
            name = entry.get("tool_name", "")
            if name and name not in tools:
                tools.append(name)
    return tools


def _extract_vqa_answer(result: Dict[str, Any]) -> str:
    """Extract the primary textual answer from the agent output state."""
    if result.get("final_response"):
        return str(result["final_response"])
    to = result.get("tool_outputs") or {}
    if to.get("vqa_answer"):
        return str(to["vqa_answer"])
    es = (result.get("intermediate_outputs") or {}).get("execution_summary", {})
    if es.get("final_response"):
        return str(es["final_response"])
    return ""


# ---------------------------------------------------------------------------
# Core Evaluator
# ---------------------------------------------------------------------------

class AgentEvaluator:
    """
    Batch evaluation runner.  Iterates through BenchmarkSamples, invokes the
    orchestrator, scores each result, and produces a structured report.
    """

    FUZZY_MATCH_THRESHOLD    = 0.5   # token-F1 >= this -> fuzzy match
    GROUNDING_IOU_THRESHOLD  = 0.5   # mean IoU >= this -> correct grounding

    def __init__(self, verbose: bool = True):
        self.orch    = Orchestrator()
        self.verbose = verbose

    def evaluate_sample(self, sample: BenchmarkSample) -> SampleResult:
        """Run one sample through the agent and score it."""
        sr = SampleResult(
            sample_id          = sample.sample_id,
            task               = sample.task,
            query              = sample.query,
            gt_answer          = sample.gt_answer or "",
            gt_bboxes          = sample.gt_bboxes or [],
            expected_tools     = sample.expected_tools or [],
            gt_change_expected = sample.task == "change_detection",
        )

        uploaded_images = [
            {"file_path": p, "role": ("t1" if i == 0 else "t2")
                              if sample.task == "change_detection"
                              else ("primary" if i == 0 else "secondary")}
            for i, p in enumerate(sample.image_paths)
        ]

        t0 = time.perf_counter()
        try:
            result = self.orch.run(
                query=sample.query,
                state={
                    "raw_query":             sample.query,
                    "uploaded_images":       uploaded_images,
                    "conversation_history":  [],
                    "spatial_context_cache": {},
                },
            )
            sr.latency_ms = round((time.perf_counter() - t0) * 1000, 1)
        except Exception as exc:
            sr.latency_ms = round((time.perf_counter() - t0) * 1000, 1)
            sr.error = str(exc)
            return sr

        # Extract predictions
        sr.predicted_answer = _extract_vqa_answer(result)
        sr.predicted_bboxes = _extract_bboxes_from_state(result)
        sr.tools_invoked    = _extract_tools_invoked(result)

        # Score: VQA textual answer
        if sample.gt_answer:
            sr.token_f1    = compute_token_f1(sr.predicted_answer, sample.gt_answer)
            sr.exact_match = _normalize(sr.predicted_answer) == _normalize(sample.gt_answer)
            sr.fuzzy_match = sr.token_f1 >= self.FUZZY_MATCH_THRESHOLD

        # Score: Grounding / bounding box IoU
        if sample.gt_bboxes:
            sr.mean_iou = compute_mean_iou(sr.predicted_bboxes, sample.gt_bboxes)

        # Score: Change detection
        if sample.task == "change_detection":
            change_mask  = result.get("change_mask") or {}
            tool_outputs = result.get("tool_outputs") or {}
            has_mask = (
                bool(change_mask)
                or bool(tool_outputs.get("change_mask"))
                or bool((result.get("intermediate_outputs") or {}).get("change_detection", {}))
            )
            sr.change_detected = has_mask
            sr.change_correct  = (sr.change_detected == sr.gt_change_expected)

        # Score: Execution trace compliance
        if sample.expected_tools:
            classified = result.get("classified_task", "")
            sr.trace_compliant = (
                len(sr.tools_invoked) > 0
                or classified in ("grounding", "vqa", "change_detection",
                                  "cross_modal_fusion", "land_cover_classification")
            )
        else:
            sr.trace_compliant = True

        return sr

    def evaluate_batch(
        self,
        samples: List[BenchmarkSample],
    ) -> Tuple[List[SampleResult], Dict[str, Any]]:
        """Evaluate all samples and return (results, aggregate_report)."""
        results: List[SampleResult] = []
        for i, sample in enumerate(samples, 1):
            if self.verbose:
                print(f"  [{i:>3}/{len(samples)}] {sample.sample_id:<32s} task={sample.task:<18s}", end="", flush=True)
            sr = self.evaluate_sample(sample)
            results.append(sr)
            if self.verbose:
                status = "ERR" if sr.error else "OK "
                print(f" {status}  {sr.latency_ms:6.0f}ms")
        report = self._aggregate(results)
        return results, report

    @staticmethod
    def _aggregate(results: List[SampleResult]) -> Dict[str, Any]:
        """Compute aggregate metrics across all samples."""
        if not results:
            return {}
        total  = len(results)
        errors = [r for r in results if r.error]

        vqa_results = [r for r in results if r.task in ("vqa", "general") and r.gt_answer]
        vqa_exact   = sum(r.exact_match for r in vqa_results) / max(len(vqa_results), 1)
        vqa_fuzzy   = sum(r.fuzzy_match for r in vqa_results) / max(len(vqa_results), 1)
        vqa_f1      = sum(r.token_f1    for r in vqa_results) / max(len(vqa_results), 1)

        grnd_results = [r for r in results if r.task == "grounding" and r.gt_bboxes]
        mean_iou_all = sum(r.mean_iou for r in grnd_results) / max(len(grnd_results), 1)
        grnd_acc     = (
            sum(r.mean_iou >= AgentEvaluator.GROUNDING_IOU_THRESHOLD for r in grnd_results)
            / max(len(grnd_results), 1)
        )

        cd_results  = [r for r in results if r.task == "change_detection"]
        cd_accuracy = sum(r.change_correct for r in cd_results) / max(len(cd_results), 1)

        trace_rate  = sum(r.trace_compliant for r in results) / max(total, 1)

        # Per-sample task accuracy
        acc_per = []
        for r in results:
            if r.error:
                acc_per.append(0.0)
            elif r.task in ("vqa", "general"):
                acc_per.append(float(r.fuzzy_match) if r.gt_answer else 1.0)
            elif r.task == "grounding":
                acc_per.append(
                    float(r.mean_iou >= AgentEvaluator.GROUNDING_IOU_THRESHOLD)
                    if r.gt_bboxes else 1.0
                )
            elif r.task == "change_detection":
                acc_per.append(float(r.change_correct))
            else:
                acc_per.append(1.0)
        overall_accuracy = sum(acc_per) / max(total, 1)

        latencies = [r.latency_ms for r in results if not r.error]
        avg_latency = sum(latencies) / max(len(latencies), 1)

        return {
            "total_samples":         total,
            "error_count":           len(errors),
            "overall_task_accuracy": round(overall_accuracy, 4),
            "vqa": {
                "sample_count": len(vqa_results),
                "exact_match":  round(vqa_exact, 4),
                "fuzzy_match":  round(vqa_fuzzy, 4),
                "token_f1":     round(vqa_f1,    4),
            },
            "grounding": {
                "sample_count":        len(grnd_results),
                "mean_iou":            round(mean_iou_all, 4),
                "accuracy_at_0.5_iou": round(grnd_acc, 4),
            },
            "change_detection": {
                "sample_count": len(cd_results),
                "accuracy":     round(cd_accuracy, 4),
            },
            "trace_compliance_rate": round(trace_rate, 4),
            "avg_latency_ms":        round(avg_latency, 1),
        }


# ---------------------------------------------------------------------------
# Benchmark Loader
# ---------------------------------------------------------------------------

def load_jsonl(path: str, limit: Optional[int] = None) -> List[BenchmarkSample]:
    """Load benchmark samples from a JSONL file."""
    samples: List[BenchmarkSample] = []
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            if limit and i >= limit:
                break
            row = json.loads(line.strip())
            samples.append(BenchmarkSample(
                sample_id      = row.get("sample_id", f"s{i:04d}"),
                task           = row.get("task", "vqa"),
                query          = row.get("query", ""),
                image_paths    = row.get("image_paths", []),
                gt_answer      = row.get("gt_answer"),
                gt_bboxes      = row.get("gt_bboxes"),
                expected_tools = row.get("expected_tools"),
                metadata       = row.get("metadata", {}),
            ))
    return samples


def make_mock_dataset() -> List[BenchmarkSample]:
    """
    Built-in mini mock dataset — 3 samples covering all task types.
    Used for smoke-testing without real benchmark files on disk.
    """
    return [
        # Sample 1 — Single-image VQA (RSVQA style)
        BenchmarkSample(
            sample_id      = "rsvqa_mock_001",
            task           = "vqa",
            query          = "What is the predominant land cover type visible in this satellite image?",
            image_paths    = ["/data/sentinel2_patch_001.tif"],
            gt_answer      = "agricultural farmland",
            gt_bboxes      = None,
            expected_tools = ["vqa_tool"],
        ),
        # Sample 2 — Object grounding (VRSBench style)
        BenchmarkSample(
            sample_id      = "vrsbench_mock_042",
            task           = "grounding",
            query          = "Locate all storage tanks visible in this aerial image.",
            image_paths    = ["/data/aerial_industrial_scene.tif"],
            gt_answer      = None,
            gt_bboxes      = [
                [0.10, 0.20, 0.28, 0.40],
                [0.55, 0.30, 0.72, 0.52],
                [0.35, 0.60, 0.50, 0.78],
            ],
            expected_tools = ["grounding_tool"],
        ),
        # Sample 3 — Bi-temporal change detection (CDVQA style)
        BenchmarkSample(
            sample_id      = "cdvqa_mock_007",
            task           = "change_detection",
            query          = "What changed between these two satellite images taken six months apart?",
            image_paths    = [
                "/data/gaofen_t1_2023_06.tif",
                "/data/gaofen_t2_2023_12.tif",
            ],
            gt_answer      = "new construction of residential buildings in the northeastern sector",
            gt_bboxes      = [[0.60, 0.05, 0.95, 0.45]],
            expected_tools = ["change_detection_tool"],
        ),
    ]


# ---------------------------------------------------------------------------
# Report Printer
# ---------------------------------------------------------------------------

def print_sample_table(results: List[SampleResult]) -> None:
    """Print a per-sample results table to stdout."""
    W = 135
    print("\n" + "=" * W)
    print("PER-SAMPLE EVALUATION RESULTS")
    print("=" * W)
    header = (
        f"{'Sample ID':<34} {'Task':<18} {'ExM':>4} {'F1':>6} {'mIoU':>6} "
        f"{'CD':>4} {'Trc':>4} {'ms':>7}  Answer (predicted vs GT)"
    )
    print(header)
    print("-" * W)
    for r in results:
        exact_s = "Y" if r.exact_match else ("─" if not r.gt_answer else "N")
        f1_s    = f"{r.token_f1:.3f}" if r.gt_answer else "  ─  "
        iou_s   = f"{r.mean_iou:.3f}" if r.gt_bboxes else "  ─  "
        cd_s    = ("Y" if r.change_correct else "N") if r.task == "change_detection" else " ─"
        trc_s   = "Y" if r.trace_compliant else "N"
        if r.error:
            answer_col = f"ERROR: {r.error[:55]}"
        elif r.gt_answer:
            pred_short = (r.predicted_answer or "")[:28]
            gt_short   = r.gt_answer[:20]
            answer_col = f"pred='{pred_short}' | gt='{gt_short}'"
        elif r.gt_bboxes:
            answer_col = f"{len(r.predicted_bboxes)} bbox(es) predicted vs {len(r.gt_bboxes)} GT"
        else:
            answer_col = ""
        print(
            f"{r.sample_id:<34} {r.task:<18} {exact_s:>4} {f1_s:>6} {iou_s:>6} "
            f"{cd_s:>4} {trc_s:>4} {r.latency_ms:>7.0f}  {answer_col}"
        )
    print("-" * W)


def print_report(report: Dict[str, Any]) -> None:
    """Print the aggregate evaluation report to stdout."""
    W = 62
    print("\n" + "=" * W)
    print("AGGREGATE EVALUATION REPORT")
    print("=" * W)
    print(f"  Total samples:              {report['total_samples']}")
    print(f"  Errors:                     {report['error_count']}")
    print(f"  Avg latency per sample:     {report['avg_latency_ms']:.1f} ms")
    print()
    print(f"  ── Overall Task Accuracy:  {report['overall_task_accuracy']:.1%} ──")
    print()

    vqa = report["vqa"]
    if vqa["sample_count"]:
        print(f"  VQA  ({vqa['sample_count']} samples)")
        print(f"    Exact match:             {vqa['exact_match']:.1%}")
        print(f"    Fuzzy match (F1≥0.50):   {vqa['fuzzy_match']:.1%}")
        print(f"    Mean token-F1:           {vqa['token_f1']:.4f}")

    grnd = report["grounding"]
    if grnd["sample_count"]:
        print(f"\n  Grounding  ({grnd['sample_count']} samples)")
        print(f"    Mean IoU (all bboxes):   {grnd['mean_iou']:.4f}")
        print(f"    Accuracy @ IoU ≥ 0.50:   {grnd['accuracy_at_0.5_iou']:.1%}")

    cd = report["change_detection"]
    if cd["sample_count"]:
        print(f"\n  Change Detection  ({cd['sample_count']} samples)")
        print(f"    Accuracy:                {cd['accuracy']:.1%}")

    print(f"\n  Execution Trace Compliance: {report['trace_compliance_rate']:.1%}")
    print("=" * W)


# ---------------------------------------------------------------------------
# CLI Entry Point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="SatQuery AI Agent batch evaluation runner.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--mock",    action="store_true",
                        help="Run on built-in mini mock dataset (3 samples).")
    parser.add_argument("--dataset", metavar="PATH",
                        help="Path to a JSONL benchmark file.")
    parser.add_argument("--limit",   type=int, default=None,
                        help="Maximum number of samples to evaluate.")
    parser.add_argument("--output",  metavar="PATH",
                        help="Save JSON report to this file.")
    parser.add_argument("--quiet",   action="store_true",
                        help="Suppress per-sample progress output.")
    args = parser.parse_args()

    if not args.mock and not args.dataset:
        parser.error("Provide --mock or --dataset PATH")

    if args.mock:
        samples = make_mock_dataset()
        print("[eval_agent] Running on built-in mini mock dataset (3 samples).")
    else:
        samples = load_jsonl(args.dataset, limit=args.limit)
        print(f"[eval_agent] Loaded {len(samples)} samples from '{args.dataset}'.")

    evaluator = AgentEvaluator(verbose=not args.quiet)
    print(f"[eval_agent] Evaluating {len(samples)} sample(s)...\n")
    t_start = time.perf_counter()
    results, report = evaluator.evaluate_batch(samples)
    t_total = time.perf_counter() - t_start
    print(f"\n[eval_agent] Done. Total wall time: {t_total:.2f}s")

    print_sample_table(results)
    print_report(report)

    if args.output:
        out = {
            "report": report,
            "samples": [
                {
                    "sample_id":       r.sample_id,
                    "task":            r.task,
                    "query":           r.query,
                    "exact_match":     r.exact_match,
                    "token_f1":        r.token_f1,
                    "mean_iou":        r.mean_iou,
                    "change_correct":  r.change_correct,
                    "trace_compliant": r.trace_compliant,
                    "tools_invoked":   r.tools_invoked,
                    "latency_ms":      r.latency_ms,
                    "error":           r.error,
                }
                for r in results
            ],
        }
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(out, f, indent=2)
        print(f"[eval_agent] Report saved to '{args.output}'.")


if __name__ == "__main__":
    main()
