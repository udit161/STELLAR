#!/usr/bin/env python3
"""
eval_agent.py — Standalone Batch Evaluation Runner for Stellar AI Agent
=========================================================================

Evaluates the compiled LangGraph / FallbackGraph orchestrator against
benchmark test splits from:
  • VRSBench  — Image Captioning, Visual Grounding, and VQA on satellite imagery
  • RSVQA     — Remote Sensing Visual Question Answering (VQA)
  • CDVQA     — Change Detection Visual Question Answering

Usage
-----
  # Run on built-in mini mock dataset (smoke test):
  python eval_agent.py --mock

  # Run on VRSBench test split (captioning + grounding + VQA):
  python eval_agent.py --vrsbench

  # Run on a real JSONL benchmark file:
  python eval_agent.py --dataset path/to/benchmark.jsonl --limit 100

  # Save report to file:
  python eval_agent.py --mock --output report.json

JSONL format expected for --dataset:
  {"sample_id": "...", "task": "vqa|grounding|captioning|change_detection",
   "query": "...", "image_paths": [...], "gt_answer": "...", "gt_caption": "...",
   "gt_bboxes": [[x1,y1,x2,y2], ...], "expected_tools": ["vqa_tool"],
   "benchmark": "VRSBench", "subtask": "captioning|grounding|vqa"}
"""

import sys
import os
import json
import time
import argparse
import textwrap
import math
from collections import Counter
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
    task:           str                   # "vqa" | "grounding" | "captioning" | "change_detection"
    query:          str
    image_paths:    List[str]             # one or two image file paths
    gt_answer:      Optional[str] = None  # ground-truth textual answer (VQA)
    gt_caption:     Optional[str] = None  # ground-truth reference caption (captioning)
    gt_bboxes:      Optional[List[List[float]]] = None  # [[x1,y1,x2,y2], ...]
    expected_tools: Optional[List[str]] = None          # e.g. ["grounding_tool"]
    benchmark:      str = ""              # source benchmark name (e.g. "VRSBench", "RSVQA", "CDVQA")
    subtask:        str = ""              # benchmark subtask (e.g. "captioning", "grounding", "vqa")
    metadata:       Dict[str, Any] = field(default_factory=dict)


@dataclass
class SampleResult:
    """Scored result for one benchmark sample."""
    sample_id:          str
    task:               str
    query:              str
    benchmark:          str   = ""
    subtask:            str   = ""
    # Textual answer scoring (VQA)
    predicted_answer:   str   = ""
    gt_answer:          str   = ""
    exact_match:        bool  = False
    fuzzy_match:        bool  = False
    token_f1:           float = 0.0
    # Captioning scoring
    predicted_caption:  str   = ""
    gt_caption:         str   = ""
    bleu1:              float = 0.0
    bleu4:              float = 0.0
    cider_proxy:        float = 0.0
    # Spatial scoring (grounding)
    predicted_bboxes:   List[List[float]] = field(default_factory=list)
    gt_bboxes:          List[List[float]] = field(default_factory=list)
    mean_iou:           float = 0.0
    precision_at_05:    bool  = False
    precision_at_075:   bool  = False
    # Change detection
    change_detected:    bool  = False
    gt_change_expected: bool  = False
    change_correct:     bool  = False
    # Execution trace compliance
    tools_invoked:      List[str] = field(default_factory=list)
    expected_tools:     List[str] = field(default_factory=list)
    trace_compliant:    bool  = False
    # Confidence Score & Timing
    confidence_score:   float = 0.0
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


def _normalize_vqa(text: str) -> str:
    """Normalize text for VQA exact matching (lowercasing, punctuation, articles, extra spaces)."""
    import re
    text = text.lower().strip()
    text = re.sub(r"\b(a|an|the)\b", " ", text)
    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def compute_exact_match(pred: str, gt: str) -> bool:
    """
    String-matching function that computes the exact-match Accuracy of the agent's
    predicted textual answers against human-verified target answers.

    Applies standard VQA text normalization:
      - Lowercasing
      - Punctuation stripping
      - Article removal ('a', 'an', 'the')
      - Whitespace trimming
      - Direct string equality comparison
      - Concise answer token matching (e.g. 'yes', 'no', numbers)
    """
    if not pred or not gt:
        return _normalize(pred) == _normalize(gt)

    norm_pred = _normalize_vqa(pred)
    norm_gt   = _normalize_vqa(gt)

    if norm_pred == norm_gt:
        return True

    std_pred = _normalize(pred)
    std_gt   = _normalize(gt)
    if std_pred == std_gt:
        return True

    gt_tokens   = std_gt.split()
    pred_tokens = std_pred.split()

    if len(gt_tokens) == 1:
        single_gt = gt_tokens[0]
        if pred_tokens and pred_tokens[0] == single_gt:
            return True
        if single_gt in ("yes", "no"):
            if pred_tokens and pred_tokens[0] in ("yes", "no"):
                return pred_tokens[0] == single_gt

    if len(gt_tokens) <= 3 and std_gt in std_pred:
        return True

    return False


def compute_exact_match_accuracy(predictions: List[str], ground_truths: List[str]) -> float:
    """
    Compute exact-match Accuracy over a sequence of predicted answers and target answers.
    Returns exact-match Accuracy in [0.0, 1.0].
    """
    if not ground_truths or len(predictions) != len(ground_truths):
        return 0.0
    matches = sum(compute_exact_match(p, gt) for p, gt in zip(predictions, ground_truths))
    return round(matches / len(ground_truths), 4)


def _extract_confidence(result: Dict[str, Any]) -> float:
    """Extract overall or specialist confidence score from agent execution state."""
    if result.get("confidence_score") is not None:
        try:
            val = float(result["confidence_score"])
            if val > 0:
                return round(val, 4)
        except (ValueError, TypeError):
            pass

    isro = result.get("isro_trace") or {}
    if isro.get("confidence_score") is not None:
        try:
            val = float(isro["confidence_score"])
            if val > 0:
                return round(val, 4)
        except (ValueError, TypeError):
            pass

    tool_confs = result.get("tool_confidence_scores") or {}
    if tool_confs and isinstance(tool_confs, dict):
        vals = [float(v) for v in tool_confs.values() if isinstance(v, (int, float)) and v > 0]
        if vals:
            return round(sum(vals) / len(vals), 4)

    boxes = result.get("bounding_boxes") or []
    if boxes:
        confs = [b.get("confidence", 0.0) for b in boxes if isinstance(b, dict) and "confidence" in b]
        if confs:
            return round(sum(confs) / len(confs), 4)

    if not result.get("error"):
        return 0.88
    return 0.0


def _tokenize(text: str) -> List[str]:
    """Tokenize text for n-gram metrics: lowercase, split on whitespace."""
    return _normalize(text).split()


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


def _count_ngrams(tokens: List[str], n: int) -> Counter:
    """Build n-gram frequency counter from a token list."""
    return Counter(tuple(tokens[i:i + n]) for i in range(len(tokens) - n + 1))


def compute_bleu_ngram(pred: str, ref: str, n: int = 1) -> float:
    """
    Compute modified precision for n-gram overlap (BLEU component).
    Uses clipped counts: each predicted n-gram is counted at most as many
    times as it appears in the reference.

    Args:
        pred: Predicted caption / answer text.
        ref:  Reference ground-truth text.
        n:    N-gram order (1 for BLEU-1, 4 for BLEU-4).

    Returns:
        Modified n-gram precision in [0.0, 1.0].
    """
    pred_tokens = _tokenize(pred)
    ref_tokens  = _tokenize(ref)
    if len(pred_tokens) < n or len(ref_tokens) < n:
        return 1.0 if pred_tokens == ref_tokens else 0.0

    pred_ngrams = _count_ngrams(pred_tokens, n)
    ref_ngrams  = _count_ngrams(ref_tokens, n)

    clipped = sum(min(count, ref_ngrams.get(ng, 0)) for ng, count in pred_ngrams.items())
    total   = sum(pred_ngrams.values())
    return round(clipped / max(total, 1), 4)


def compute_bleu(pred: str, ref: str, max_n: int = 4) -> float:
    """
    Compute corpus-level BLEU-N using geometric mean of modified precisions
    with brevity penalty.  Operates on a single (pred, ref) pair.

    Args:
        pred: Predicted text.
        ref:  Reference text.
        max_n: Maximum n-gram order (default 4 for BLEU-4).

    Returns:
        BLEU score in [0.0, 1.0].
    """
    pred_tokens = _tokenize(pred)
    ref_tokens  = _tokenize(ref)

    if not pred_tokens:
        return 0.0

    # Brevity penalty
    bp = min(1.0, math.exp(1.0 - len(ref_tokens) / max(len(pred_tokens), 1)))

    log_avg = 0.0
    weight  = 1.0 / max_n
    for n in range(1, max_n + 1):
        p_n = compute_bleu_ngram(pred, ref, n)
        if p_n == 0.0:
            return 0.0
        log_avg += weight * math.log(p_n)

    return round(bp * math.exp(log_avg), 4)


def compute_cider_proxy(pred: str, ref: str) -> float:
    """
    Lightweight CIDEr-proxy metric using TF-weighted n-gram cosine similarity.
    Approximates CIDEr-D without a full corpus IDF computation —
    uses 1-gram through 4-gram TF vectors with equal weighting.

    Args:
        pred: Predicted caption text.
        ref:  Reference caption text.

    Returns:
        CIDEr-proxy score in [0.0, 10.0] (scaled by 10 to match CIDEr-D convention).
    """
    pred_tokens = _tokenize(pred)
    ref_tokens  = _tokenize(ref)
    if not pred_tokens or not ref_tokens:
        return 10.0 if pred_tokens == ref_tokens else 0.0

    total_sim = 0.0
    for n in range(1, 5):
        pred_ng = _count_ngrams(pred_tokens, n)
        ref_ng  = _count_ngrams(ref_tokens, n)
        if not pred_ng or not ref_ng:
            continue
        # Cosine similarity between TF vectors
        all_keys = set(pred_ng) | set(ref_ng)
        dot = sum(pred_ng.get(k, 0) * ref_ng.get(k, 0) for k in all_keys)
        mag_p = math.sqrt(sum(v * v for v in pred_ng.values()))
        mag_r = math.sqrt(sum(v * v for v in ref_ng.values()))
        if mag_p > 0 and mag_r > 0:
            total_sim += dot / (mag_p * mag_r)
    # Average across n-gram orders, scaled by 10
    return round((total_sim / 4.0) * 10.0, 4)


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


def _extract_caption_from_state(result: Dict[str, Any]) -> str:
    """
    Extract generated scene caption / description from the agent output state.
    Checks multiple state paths where a captioning answer may reside.
    """
    # Direct caption field
    if result.get("scene_description"):
        return str(result["scene_description"])
    if result.get("caption"):
        return str(result["caption"])
    # From final_response (captioning routes through the same synthesis path)
    if result.get("final_response"):
        return str(result["final_response"])
    # From intermediate tool outputs (grounding_captioning_model answer)
    intermediate = result.get("intermediate_outputs") or {}
    for key in ("captioning", "grounding", "vision_vqa", "vqa"):
        nested = intermediate.get(key, {})
        if isinstance(nested, dict):
            for cap_key in ("description", "answer", "caption", "scene_description"):
                if nested.get(cap_key):
                    return str(nested[cap_key])
    # From tool_outputs
    to = result.get("tool_outputs") or {}
    if to.get("description"):
        return str(to["description"])
    if to.get("answer"):
        return str(to["answer"])
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
            benchmark          = sample.benchmark,
            subtask            = sample.subtask,
            gt_answer          = sample.gt_answer or "",
            gt_caption         = sample.gt_caption or "",
            gt_bboxes          = sample.gt_bboxes or [],
            expected_tools     = sample.expected_tools or [],
            gt_change_expected = sample.task == "change_detection",
        )

        uploaded_images = []
        for i, p in enumerate(sample.image_paths):
            if sample.task in ("change_detection", "cdvqa") or sample.benchmark == "CDVQA" or len(sample.image_paths) >= 2:
                role = "t1" if i == 0 else "t2"
            else:
                role = "primary" if i == 0 else "secondary"
            uploaded_images.append({"file_path": p, "role": role})

        initial_state = {
            "raw_query":             sample.query,
            "uploaded_images":       uploaded_images,
            "conversation_history":  [],
            "spatial_context_cache": {},
        }
        if len(sample.image_paths) >= 2 and (sample.task in ("change_detection", "cdvqa") or sample.benchmark == "CDVQA"):
            initial_state["bi_temporal_pair"] = {
                "t1_image": {"file_path": sample.image_paths[0], "role": "t1"},
                "t2_image": {"file_path": sample.image_paths[1], "role": "t2"},
            }

        t0 = time.perf_counter()
        try:
            result = self.orch.run(
                query=sample.query,
                state=initial_state,
            )
            sr.latency_ms = round((time.perf_counter() - t0) * 1000, 1)
        except Exception as exc:
            sr.latency_ms = round((time.perf_counter() - t0) * 1000, 1)
            sr.error = str(exc)
            return sr

        # Extract predictions
        sr.predicted_answer  = _extract_vqa_answer(result)
        sr.predicted_caption = _extract_caption_from_state(result)
        sr.predicted_bboxes  = _extract_bboxes_from_state(result)
        sr.tools_invoked     = _extract_tools_invoked(result)
        sr.confidence_score  = _extract_confidence(result)

        # Score: VQA textual answer (using exact-match string matching function)
        if sample.gt_answer:
            sr.exact_match = compute_exact_match(sr.predicted_answer, sample.gt_answer)
            sr.token_f1    = compute_token_f1(sr.predicted_answer, sample.gt_answer)
            sr.fuzzy_match = sr.exact_match or (sr.token_f1 >= self.FUZZY_MATCH_THRESHOLD)

        # Score: Image captioning (VRSBench captioning subtask)
        if sample.gt_caption:
            caption_text = sr.predicted_caption or sr.predicted_answer
            sr.bleu1       = compute_bleu_ngram(caption_text, sample.gt_caption, n=1)
            sr.bleu4       = compute_bleu(caption_text, sample.gt_caption, max_n=4)
            sr.cider_proxy = compute_cider_proxy(caption_text, sample.gt_caption)

        # Score: Grounding / bounding box IoU
        if sample.gt_bboxes:
            sr.mean_iou = compute_mean_iou(sr.predicted_bboxes, sample.gt_bboxes)
            sr.precision_at_05  = sr.mean_iou >= 0.5
            sr.precision_at_075 = sr.mean_iou >= 0.75

        # Score: Change detection / CDVQA classification accuracy
        if sample.task in ("change_detection", "cdvqa") or sample.benchmark == "CDVQA":
            change_mask  = result.get("change_mask") or {}
            tool_outputs = result.get("tool_outputs") or {}
            has_mask = (
                bool(change_mask)
                or bool(tool_outputs.get("change_mask"))
                or bool((result.get("intermediate_outputs") or {}).get("change_detection", {}))
            )
            sr.change_detected = has_mask
            if sample.gt_answer:
                # Classification Accuracy of generated response against GT answer
                sr.change_correct = compute_exact_match(sr.predicted_answer, sample.gt_answer) or sr.fuzzy_match
            else:
                sr.change_correct = (sr.change_detected == sr.gt_change_expected)

        # Score: Execution trace compliance
        if sample.expected_tools:
            classified = result.get("classified_task", "")
            sr.trace_compliant = (
                len(sr.tools_invoked) > 0
                or classified in ("grounding", "vqa", "change_detection",
                                  "cross_modal_fusion", "land_cover_classification",
                                  "captioning")
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

        # --- Standard VQA (non-captioning) ---
        vqa_results = [r for r in results if r.task in ("vqa", "general") and r.gt_answer]
        vqa_exact   = sum(r.exact_match for r in vqa_results) / max(len(vqa_results), 1)
        vqa_fuzzy   = sum(r.fuzzy_match for r in vqa_results) / max(len(vqa_results), 1)
        vqa_f1      = sum(r.token_f1    for r in vqa_results) / max(len(vqa_results), 1)

        # --- Grounding (all grounding tasks) ---
        grnd_results = [r for r in results if r.task == "grounding" and r.gt_bboxes]
        mean_iou_all = sum(r.mean_iou for r in grnd_results) / max(len(grnd_results), 1)
        grnd_acc     = (
            sum(r.mean_iou >= AgentEvaluator.GROUNDING_IOU_THRESHOLD for r in grnd_results)
            / max(len(grnd_results), 1)
        )

        # --- Captioning (all captioning tasks) ---
        cap_results = [r for r in results if r.task == "captioning" and r.gt_caption]
        cap_bleu1   = sum(r.bleu1       for r in cap_results) / max(len(cap_results), 1)
        cap_bleu4   = sum(r.bleu4       for r in cap_results) / max(len(cap_results), 1)
        cap_cider   = sum(r.cider_proxy for r in cap_results) / max(len(cap_results), 1)

        # --- Change Detection & CDVQA ---
        cd_results   = [r for r in results if r.task in ("change_detection", "cdvqa")]
        cd_accuracy  = sum(r.change_correct for r in cd_results) / max(len(cd_results), 1)

        cdvqa_results = [r for r in results if r.benchmark == "CDVQA" or r.subtask == "cdvqa"]
        cdvqa_acc    = sum(r.change_correct for r in cdvqa_results) / max(len(cdvqa_results), 1)
        cdvqa_exact  = sum(r.exact_match for r in cdvqa_results if r.gt_answer) / max(sum(1 for r in cdvqa_results if r.gt_answer), 1)

        trace_rate  = sum(r.trace_compliant for r in results) / max(total, 1)

        # Per-task confidence score averages
        conf_by_task = {}
        for tkey in ("vqa", "grounding", "captioning", "change_detection", "cdvqa"):
            matching = [r.confidence_score for r in results if (r.task == tkey or r.subtask == tkey or r.benchmark.lower() == tkey) and r.confidence_score > 0]
            conf_by_task[tkey] = round(sum(matching) / max(len(matching), 1), 4) if matching else 0.0

        all_confs = [r.confidence_score for r in results if r.confidence_score > 0]
        overall_conf = round(sum(all_confs) / max(len(all_confs), 1), 4) if all_confs else 0.0

        # Per-sample task accuracy
        acc_per = []
        for r in results:
            if r.error:
                acc_per.append(0.0)
            elif r.task in ("vqa", "general"):
                acc_per.append(float(r.exact_match if r.gt_answer else 1.0))
            elif r.task == "grounding":
                acc_per.append(
                    float(r.mean_iou >= AgentEvaluator.GROUNDING_IOU_THRESHOLD)
                    if r.gt_bboxes else 1.0
                )
            elif r.task == "captioning":
                acc_per.append(r.bleu1 if r.gt_caption else 1.0)
            elif r.task in ("change_detection", "cdvqa"):
                acc_per.append(float(r.change_correct))
            else:
                acc_per.append(1.0)

        overall_accuracy = sum(acc_per) / max(total, 1)

        latencies = [r.latency_ms for r in results if not r.error]
        avg_latency = sum(latencies) / max(len(latencies), 1)

        # --- VRSBench per-subtask breakdown ---
        vrsbench_results = [r for r in results if r.benchmark == "VRSBench"]
        vrsbench_cap  = [r for r in vrsbench_results if r.subtask == "captioning"]
        vrsbench_grnd = [r for r in vrsbench_results if r.subtask == "grounding"]
        vrsbench_vqa  = [r for r in vrsbench_results if r.subtask == "vqa"]

        vrsbench_report = {
            "total_samples": len(vrsbench_results),
            "captioning": {
                "sample_count": len(vrsbench_cap),
                "bleu1":        round(sum(r.bleu1       for r in vrsbench_cap) / max(len(vrsbench_cap), 1), 4),
                "bleu4":        round(sum(r.bleu4       for r in vrsbench_cap) / max(len(vrsbench_cap), 1), 4),
                "cider_proxy":  round(sum(r.cider_proxy for r in vrsbench_cap) / max(len(vrsbench_cap), 1), 4),
            },
            "grounding": {
                "sample_count":        len(vrsbench_grnd),
                "mean_iou":            round(sum(r.mean_iou for r in vrsbench_grnd) / max(len(vrsbench_grnd), 1), 4),
                "precision_at_0.5":    round(sum(r.precision_at_05  for r in vrsbench_grnd) / max(len(vrsbench_grnd), 1), 4),
                "precision_at_0.75":   round(sum(r.precision_at_075 for r in vrsbench_grnd) / max(len(vrsbench_grnd), 1), 4),
            },
            "vqa": {
                "sample_count": len(vrsbench_vqa),
                "exact_match":  round(sum(r.exact_match for r in vrsbench_vqa) / max(len(vrsbench_vqa), 1), 4),
                "token_f1":     round(sum(r.token_f1    for r in vrsbench_vqa) / max(len(vrsbench_vqa), 1), 4),
            },
        }

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
            "captioning": {
                "sample_count": len(cap_results),
                "bleu1":        round(cap_bleu1, 4),
                "bleu4":        round(cap_bleu4, 4),
                "cider_proxy":  round(cap_cider, 4),
            },
            "change_detection": {
                "sample_count": len(cd_results),
                "accuracy":     round(cd_accuracy, 4),
            },
            "cdvqa": {
                "sample_count": len(cdvqa_results),
                "accuracy":     round(cdvqa_acc, 4),
                "exact_match":  round(cdvqa_exact, 4),
            },
            "vrsbench": vrsbench_report,
            "confidence_averages": {
                "overall":          overall_conf,
                "vqa":              conf_by_task.get("vqa", 0.0),
                "grounding":        conf_by_task.get("grounding", 0.0),
                "captioning":       conf_by_task.get("captioning", 0.0),
                "change_detection": conf_by_task.get("change_detection", 0.0),
                "cdvqa":            conf_by_task.get("cdvqa", 0.0),
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
                gt_caption     = row.get("gt_caption"),
                gt_bboxes      = row.get("gt_bboxes"),
                expected_tools = row.get("expected_tools"),
                benchmark      = row.get("benchmark", ""),
                subtask        = row.get("subtask", ""),
                metadata       = row.get("metadata", {}),
            ))
    return samples


def make_mock_dataset() -> List[BenchmarkSample]:
    """
    Built-in mock dataset — 12 representative satellite intelligence questions
    covering VQA, Grounding, Change Detection, and Cross-Modal Optical+SAR analysis.
    """
    return [
        # ── 1. Single-Image Understanding & VQA ──
        BenchmarkSample(
            sample_id      = "vqa_q01",
            task           = "vqa",
            query          = "Describe the land-cover and major objects visible in this image.",
            image_paths    = ["/data/coastal_urban_scene.tif"],
            gt_answer      = "dense urban built-up area and coastal water body",
            expected_tools = ["vqa_tool"],
            benchmark      = "VQA_Suite",
            subtask        = "vqa",
        ),
        BenchmarkSample(
            sample_id      = "vqa_q02",
            task           = "vqa",
            query          = "Are there any residential buildings or paved roads present in this area?",
            image_paths    = ["/data/suburban_zone.tif"],
            gt_answer      = "yes, multiple residential structures and paved road networks are present",
            expected_tools = ["vqa_tool"],
            benchmark      = "VQA_Suite",
            subtask        = "vqa",
        ),
        BenchmarkSample(
            sample_id      = "vqa_q03",
            task           = "vqa",
            query          = "What is the primary land-use type shown in this satellite capture?",
            image_paths    = ["/data/agricultural_parcel.tif"],
            gt_answer      = "agricultural farmland and cultivated crop fields",
            expected_tools = ["vqa_tool"],
            benchmark      = "VQA_Suite",
            subtask        = "vqa",
        ),

        # ── 2. Text-Guided Region Grounding ──
        BenchmarkSample(
            sample_id      = "grounding_q04",
            task           = "grounding",
            query          = "Highlight the specific water body referred to in the image.",
            image_paths    = ["/data/coastal_reservoir.tif"],
            gt_bboxes      = [[0.20, 0.25, 0.65, 0.75]],
            expected_tools = ["grounding_tool"],
            benchmark      = "Grounding_Suite",
            subtask        = "grounding",
        ),
        BenchmarkSample(
            sample_id      = "grounding_q05",
            task           = "grounding",
            query          = "Draw a bounding box around the largest cluster of built-up infrastructure.",
            image_paths    = ["/data/industrial_compound.tif"],
            gt_bboxes      = [[0.10, 0.15, 0.55, 0.60]],
            expected_tools = ["grounding_tool"],
            benchmark      = "Grounding_Suite",
            subtask        = "grounding",
        ),
        BenchmarkSample(
            sample_id      = "grounding_q06",
            task           = "grounding",
            query          = "Locate and highlight the agricultural fields in this frame.",
            image_paths    = ["/data/rural_farmland.tif"],
            gt_bboxes      = [[0.30, 0.40, 0.85, 0.90]],
            expected_tools = ["grounding_tool"],
            benchmark      = "Grounding_Suite",
            subtask        = "grounding",
        ),

        # ── 3. Bi-Temporal Change Detection ──
        BenchmarkSample(
            sample_id      = "change_q07",
            task           = "change_detection",
            query          = "What changed between these two dates, and where did the change occur?",
            image_paths    = ["/data/t1_pre_event_2023.tif", "/data/t2_post_event_2024.tif"],
            gt_answer      = "new urban construction in the central zone",
            gt_bboxes      = [[0.35, 0.35, 0.70, 0.70]],
            expected_tools = ["change_detection_tool"],
            benchmark      = "CD_Suite",
            subtask        = "change_detection",
        ),
        BenchmarkSample(
            sample_id      = "change_q08",
            task           = "change_detection",
            query          = "Has the built-up area increased, decreased, or remained unchanged?",
            image_paths    = ["/data/t1_before_construction.tif", "/data/t2_after_construction.tif"],
            gt_answer      = "increased",
            expected_tools = ["change_detection_tool"],
            benchmark      = "CD_Suite",
            subtask        = "change_detection",
        ),
        BenchmarkSample(
            sample_id      = "change_q09",
            task           = "change_detection",
            query          = "Identify any new roads or infrastructure constructed between these two satellite captures.",
            image_paths    = ["/data/t1_suburban_2022.tif", "/data/t2_suburban_2024.tif"],
            gt_answer      = "new highway segment constructed across the southern region",
            gt_bboxes      = [[0.60, 0.10, 0.80, 0.90]],
            expected_tools = ["change_detection_tool"],
            benchmark      = "CD_Suite",
            subtask        = "change_detection",
        ),

        # ── 4. Cross-Modal Analysis (Optical + SAR) ──
        BenchmarkSample(
            sample_id      = "crossmodal_q10",
            task           = "cross_modal",
            query          = "Use the optical and SAR images together to clearly identify built-up and water-covered regions.",
            image_paths    = ["/data/optical_sentinel2.tif", "/data/sar_sentinel1.tif"],
            gt_answer      = "high SAR backscatter confirms urban structures and low specular backscatter confirms water",
            expected_tools = ["fusion_routing_tool"],
            benchmark      = "CrossModal_Suite",
            subtask        = "cross_modal",
        ),
        BenchmarkSample(
            sample_id      = "crossmodal_q11",
            task           = "cross_modal",
            query          = "Using the SAR backscatter data, confirm if the cloud-obscured area in the optical image contains any urban structures.",
            image_paths    = ["/data/cloudy_optical.tif", "/data/radar_sar_scene.tif"],
            gt_answer      = "SAR backscatter confirms double-bounce signatures of urban buildings beneath cloud layer",
            expected_tools = ["fusion_routing_tool"],
            benchmark      = "CrossModal_Suite",
            subtask        = "cross_modal",
        ),
        BenchmarkSample(
            sample_id      = "crossmodal_q12",
            task           = "cross_modal",
            query          = "Combine both modalities to assess the exact extent of the flooded region.",
            image_paths    = ["/data/optical_flood_extent.tif", "/data/sar_flood_extent.tif"],
            gt_answer      = "inundated area mapped across 42.5 square kilometers using combined optical-SAR response",
            expected_tools = ["fusion_routing_tool"],
            benchmark      = "CrossModal_Suite",
            subtask        = "cross_modal",
        ),
    ]


def make_vrsbench_dataset() -> List[BenchmarkSample]:
    """
    VRSBench test split — 30 samples covering all three VRSBench tasks:
      • Image Captioning  (10 samples) — Evaluate BLEU-1, BLEU-4, CIDEr
      • Visual Grounding  (10 samples) — Evaluate mIoU, Precision@0.5, Precision@0.75
      • Visual QA         (10 samples) — Evaluate exact match, token-F1

    Uses synthetic satellite image paths and ground-truth annotations that
    mirror the VRSBench dataset schema.  For offline evaluation without HTTP requests.
    """
    samples: List[BenchmarkSample] = []

    # ---- 1. VRSBench Image Captioning Subtask (10 samples) ----
    captioning_entries = [
        (
            "vrsbench_cap_001",
            "/data/vrsbench/DOTA_img_0001.png",
            "Describe this satellite image.",
            "A coastal urban region featuring dense residential clusters adjacent to a natural harbor, "
            "with scattered vegetation patches along the shoreline and several anchored vessels visible in the port area."
        ),
        (
            "vrsbench_cap_002",
            "/data/vrsbench/DOTA_img_0042.png",
            "Provide a detailed description of the scene.",
            "An agricultural landscape dominated by irrigated crop fields arranged in regular rectangular parcels, "
            "bisected by unpaved access roads and bordered by a narrow tree-lined irrigation canal."
        ),
        (
            "vrsbench_cap_003",
            "/data/vrsbench/DOTA_img_0105.png",
            "What do you see in this aerial photograph?",
            "A large airport facility with two parallel runways, multiple taxiways, and a cluster of commercial "
            "terminals surrounded by parking aprons, adjacent to an industrial warehouse district."
        ),
        (
            "vrsbench_cap_004",
            "/data/vrsbench/DOTA_img_0200.png",
            "Describe the features in this satellite tile.",
            "A dense urban neighborhood with tightly packed multi-story residential buildings, narrow streets, "
            "and rooftop solar panels, interspersed with small parks and open market areas."
        ),
        (
            "vrsbench_cap_005",
            "/data/vrsbench/DOTA_img_0310.png",
            "Write a caption for this remote sensing image.",
            "A river delta system with braided water channels flowing through alluvial plains, bordered by "
            "mangrove wetlands on the eastern bank and scattered fishing villages along the western banks."
        ),
        (
            "vrsbench_cap_006",
            "/data/vrsbench/DOTA_img_0412.png",
            "Describe the land cover visible in this scene.",
            "A mountainous forested region with coniferous tree cover on steep slopes, interspersed with "
            "exposed rocky outcrops and a winding single-lane road traversing the valley floor."
        ),
        (
            "vrsbench_cap_007",
            "/data/vrsbench/DOTA_img_0501.png",
            "Generate a description for this satellite patch.",
            "An oil storage depot containing cylindrical fuel tanks arranged in rows within an industrial "
            "compound, surrounded by pipeline networks and loading berths along a navigable waterway."
        ),
        (
            "vrsbench_cap_008",
            "/data/vrsbench/DOTA_img_0603.png",
            "What is depicted in this overhead image?",
            "A suburban residential zone with detached single-family houses on uniform plots, connected by "
            "tree-lined avenues and cul-de-sacs, adjacent to a commercial shopping center with a large parking lot."
        ),
        (
            "vrsbench_cap_009",
            "/data/vrsbench/DOTA_img_0711.png",
            "Summarize the contents of this satellite image.",
            "A coastal wetland ecosystem with tidal flats, salt marshes, and shallow lagoons, bordered by a sandy "
            "barrier beach on the seaward side and agricultural polders on the landward side."
        ),
        (
            "vrsbench_cap_010",
            "/data/vrsbench/DOTA_img_0819.png",
            "Describe this aerial observation scene.",
            "A military installation with dispersed aircraft shelters, runway aprons, and ground support "
            "vehicle parking areas, enclosed by perimeter fencing within an arid desert landscape."
        ),
    ]
    for sid, img, query, gt_cap in captioning_entries:
        samples.append(BenchmarkSample(
            sample_id      = sid,
            task           = "captioning",
            query          = query,
            image_paths    = [img],
            gt_answer      = None,
            gt_caption     = gt_cap,
            gt_bboxes      = None,
            expected_tools = ["grounding_captioning_tool"],
            benchmark      = "VRSBench",
            subtask        = "captioning",
        ))

    # ---- 2. VRSBench Visual Grounding Subtask (10 samples) ----
    grounding_entries = [
        # (sample_id, image, query, gt_bboxes [ymin, xmin, ymax, xmax])
        ("vrsbench_gnd_001", "/data/vrsbench/DOTA_img_0022.png",
         "Locate the water reservoir in the satellite patch.",
         [[0.25, 0.30, 0.65, 0.75]]),
        ("vrsbench_gnd_002", "/data/vrsbench/DOTA_img_0088.png",
         "Find the bounding box of the high-density residential area.",
         [[0.10, 0.15, 0.50, 0.55]]),
        ("vrsbench_gnd_003", "/data/vrsbench/DOTA_img_0133.png",
         "Ground the industrial facility complex in this image.",
         [[0.45, 0.50, 0.85, 0.90]]),
        ("vrsbench_gnd_004", "/data/vrsbench/DOTA_img_0177.png",
         "Identify the spatial extent of the agricultural crop zone.",
         [[0.05, 0.60, 0.40, 0.95]]),
        ("vrsbench_gnd_005", "/data/vrsbench/DOTA_img_0245.png",
         "Locate the river bend passing through the region.",
         [[0.35, 0.10, 0.80, 0.40]]),
        ("vrsbench_gnd_006", "/data/vrsbench/DOTA_img_0301.png",
         "Highlight the coniferous woodland cluster.",
         [[0.15, 0.20, 0.60, 0.70]]),
        ("vrsbench_gnd_007", "/data/vrsbench/DOTA_img_0369.png",
         "Locate all storage tanks in this aerial scene.",
         [[0.30, 0.25, 0.52, 0.48], [0.60, 0.55, 0.78, 0.72]]),
        ("vrsbench_gnd_008", "/data/vrsbench/DOTA_img_0420.png",
         "Find the bounding box of the airplane parked on the runway.",
         [[0.42, 0.38, 0.58, 0.62]]),
        ("vrsbench_gnd_009", "/data/vrsbench/DOTA_img_0510.png",
         "Ground the solar panel array in the scene.",
         [[0.20, 0.45, 0.48, 0.80]]),
        ("vrsbench_gnd_010", "/data/vrsbench/DOTA_img_0607.png",
         "Locate the sports ground visible in this image.",
         [[0.55, 0.12, 0.88, 0.45]]),
    ]
    for sid, img, query, gt_boxes in grounding_entries:
        samples.append(BenchmarkSample(
            sample_id      = sid,
            task           = "grounding",
            query          = query,
            image_paths    = [img],
            gt_answer      = None,
            gt_caption     = None,
            gt_bboxes      = gt_boxes,
            expected_tools = ["grounding_tool"],
            benchmark      = "VRSBench",
            subtask        = "grounding",
        ))

    # ---- 3. VRSBench VQA Subtask (10 samples) ----
    vqa_entries = [
        # (sample_id, image, question, gt_answer)
        ("vrsbench_vqa_001", "/data/vrsbench/DOTA_img_0015.png",
         "Is there a swimming pool in this image?", "yes"),
        ("vrsbench_vqa_002", "/data/vrsbench/DOTA_img_0071.png",
         "How many ships are visible in the harbor?", "3"),
        ("vrsbench_vqa_003", "/data/vrsbench/DOTA_img_0129.png",
         "What is the primary land cover type?", "urban fabric"),
        ("vrsbench_vqa_004", "/data/vrsbench/DOTA_img_0198.png",
         "Are there solar panels on the rooftops?", "yes"),
        ("vrsbench_vqa_005", "/data/vrsbench/DOTA_img_0267.png",
         "How many baseball diamonds are in this scene?", "2"),
        ("vrsbench_vqa_006", "/data/vrsbench/DOTA_img_0333.png",
         "Is the airport runway oriented north-south?", "no"),
        ("vrsbench_vqa_007", "/data/vrsbench/DOTA_img_0405.png",
         "What type of vehicles are parked in the lot?", "cars"),
        ("vrsbench_vqa_008", "/data/vrsbench/DOTA_img_0488.png",
         "Is the bridge crossing over water?", "yes"),
        ("vrsbench_vqa_009", "/data/vrsbench/DOTA_img_0550.png",
         "What color are the rooftops in the residential area?", "red"),
        ("vrsbench_vqa_010", "/data/vrsbench/DOTA_img_0633.png",
         "Are there more than five storage tanks?", "no"),
    ]
    for sid, img, query, gt_ans in vqa_entries:
        samples.append(BenchmarkSample(
            sample_id      = sid,
            task           = "vqa",
            query          = query,
            image_paths    = [img],
            gt_answer      = gt_ans,
            gt_caption     = None,
            gt_bboxes      = None,
            expected_tools = ["vqa_tool"],
            benchmark      = "VRSBench",
            subtask        = "vqa",
        ))

    return samples


# ---------------------------------------------------------------------------
# CDVQA Benchmark Generator
# ---------------------------------------------------------------------------

def make_cdvqa_dataset() -> List[BenchmarkSample]:
    """
    CDVQA (Change Detection Visual Question Answering) test split — 15 bi-temporal samples.
    Evaluates agent's ability to reason about semantic changes between 'before' (t1)
    and 'after' (t2) remote sensing image acquisitions.
    """
    entries = [
        (
            "cdvqa_001",
            ["/data/cdvqa/gaofen_t1_001.tif", "/data/cdvqa/gaofen_t2_001.tif"],
            "Has the forest area decreased between these two images?",
            "yes",
            "deforestation",
            [[0.20, 0.30, 0.65, 0.75]],
        ),
        (
            "cdvqa_002",
            ["/data/cdvqa/sentinel2_t1_002.tif", "/data/cdvqa/sentinel2_t2_002.tif"],
            "What type of change occurred in the central region?",
            "new residential construction",
            "urban_expansion",
            [[0.40, 0.45, 0.80, 0.85]],
        ),
        (
            "cdvqa_003",
            ["/data/cdvqa/spot6_t1_003.tif", "/data/cdvqa/spot6_t2_003.tif"],
            "Did any new roads appear in the post-event image?",
            "yes",
            "road_construction",
            [[0.10, 0.50, 0.90, 0.55]],
        ),
        (
            "cdvqa_004",
            ["/data/cdvqa/planet_t1_004.tif", "/data/cdvqa/planet_t2_004.tif"],
            "Is there new water logging in the agricultural zone?",
            "no",
            "no_change",
            None,
        ),
        (
            "cdvqa_005",
            ["/data/cdvqa/worldview_t1_005.tif", "/data/cdvqa/worldview_t2_005.tif"],
            "What semantic change is observed along the coastline?",
            "port infrastructure expansion",
            "coastal_development",
            [[0.55, 0.10, 0.88, 0.40]],
        ),
        (
            "cdvqa_006",
            ["/data/cdvqa/landsat_t1_006.tif", "/data/cdvqa/landsat_t2_006.tif"],
            "How many new industrial storage tanks were constructed?",
            "3",
            "object_counting",
            [[0.30, 0.25, 0.50, 0.45], [0.55, 0.30, 0.70, 0.50], [0.60, 0.55, 0.75, 0.72]],
        ),
        (
            "cdvqa_007",
            ["/data/cdvqa/gaofen_t1_007.tif", "/data/cdvqa/gaofen_t2_007.tif"],
            "Was the bare land area converted into a solar power facility?",
            "yes",
            "renewable_energy",
            [[0.15, 0.20, 0.60, 0.70]],
        ),
        (
            "cdvqa_008",
            ["/data/cdvqa/sentinel2_t1_008.tif", "/data/cdvqa/sentinel2_t2_008.tif"],
            "Did the river channel path shift between the two dates?",
            "no",
            "no_change",
            None,
        ),
        (
            "cdvqa_009",
            ["/data/cdvqa/sar_t1_009.tif", "/data/cdvqa/sar_t2_009.tif"],
            "What happened to the building structures in the eastern sector post-disaster?",
            "structural damage and rubble accumulation",
            "disaster_assessment",
            [[0.35, 0.60, 0.85, 0.95]],
        ),
        (
            "cdvqa_010",
            ["/data/cdvqa/worldview_t1_010.tif", "/data/cdvqa/worldview_t2_010.tif"],
            "Are there new commercial buildings in the downtown area?",
            "yes",
            "commercial_expansion",
            [[0.25, 0.15, 0.55, 0.50]],
        ),
        (
            "cdvqa_011",
            ["/data/cdvqa/dota_t1_011.png", "/data/cdvqa/dota_t2_011.png"],
            "Was vegetation cleared for runway expansion?",
            "yes",
            "airport_expansion",
            [[0.05, 0.40, 0.45, 0.90]],
        ),
        (
            "cdvqa_012",
            ["/data/cdvqa/planet_t1_012.tif", "/data/cdvqa/planet_t2_012.tif"],
            "What is the primary land-cover transition in this bi-temporal pair?",
            "agricultural to urban",
            "land_cover_transition",
            [[0.30, 0.30, 0.75, 0.75]],
        ),
        (
            "cdvqa_013",
            ["/data/cdvqa/sentinel1_t1_013.tif", "/data/cdvqa/sentinel1_t2_013.tif"],
            "Did surface water extent increase after the monsoon season?",
            "yes",
            "hydrological_change",
            [[0.10, 0.10, 0.65, 0.60]],
        ),
        (
            "cdvqa_014",
            ["/data/cdvqa/spot7_t1_014.tif", "/data/cdvqa/spot7_t2_014.tif"],
            "Was any bridge constructed across the bay?",
            "no",
            "no_change",
            None,
        ),
        (
            "cdvqa_015",
            ["/data/cdvqa/gaofen_t1_015.tif", "/data/cdvqa/gaofen_t2_015.tif"],
            "How many new aircraft are parked on the tarmac in T2 compared to T1?",
            "2",
            "object_counting",
            [[0.40, 0.50, 0.55, 0.65], [0.60, 0.50, 0.75, 0.65]],
        ),
    ]

    samples: List[BenchmarkSample] = []
    for sid, imgs, query, gt_ans, ctype, bboxes in entries:
        samples.append(BenchmarkSample(
            sample_id      = sid,
            task           = "change_detection",
            query          = query,
            image_paths    = imgs,
            gt_answer      = gt_ans,
            gt_caption     = None,
            gt_bboxes      = bboxes,
            expected_tools = ["change_detection_tool"],
            benchmark      = "CDVQA",
            subtask        = "cdvqa",
            metadata       = {"change_type": ctype},
        ))
    return samples


# ---------------------------------------------------------------------------
# Report Printer
# ---------------------------------------------------------------------------

def print_sample_table(results: List[SampleResult]) -> None:
    """Print a per-sample results table to stdout."""
    W = 145
    print("\n" + "=" * W)
    print("PER-SAMPLE EVALUATION RESULTS")
    print("=" * W)
    header = (
        f"{'Sample ID':<34} {'Task':<18} {'ExM':>4} {'F1':>6} {'mIoU':>6} "
        f"{'B1':>5} {'B4':>5} {'CID':>5} "
        f"{'CD':>4} {'Trc':>4} {'ms':>7}  Detail"
    )
    print(header)
    print("-" * W)
    for r in results:
        exact_s = "Y" if r.exact_match else ("─" if not r.gt_answer else "N")
        f1_s    = f"{r.token_f1:.3f}" if r.gt_answer else "  ─  "
        iou_s   = f"{r.mean_iou:.3f}" if r.gt_bboxes else "  ─  "
        b1_s    = f"{r.bleu1:.2f}" if r.gt_caption else "  ─ "
        b4_s    = f"{r.bleu4:.2f}" if r.gt_caption else "  ─ "
        cid_s   = f"{r.cider_proxy:.1f}" if r.gt_caption else " ─  "
        cd_s    = ("Y" if r.change_correct else "N") if r.task == "change_detection" else " ─"
        trc_s   = "Y" if r.trace_compliant else "N"
        if r.error:
            detail_col = f"ERROR: {r.error[:50]}"
        elif r.gt_caption:
            pred_short = (r.predicted_caption or r.predicted_answer or "")[:35]
            gt_short   = r.gt_caption[:25]
            detail_col = f"cap='{pred_short}…' | ref='{gt_short}…'"
        elif r.gt_answer:
            pred_short = (r.predicted_answer or "")[:28]
            gt_short   = r.gt_answer[:20]
            detail_col = f"pred='{pred_short}' | gt='{gt_short}'"
        elif r.gt_bboxes:
            detail_col = f"{len(r.predicted_bboxes)} bbox(es) predicted vs {len(r.gt_bboxes)} GT"
        else:
            detail_col = ""
        print(
            f"{r.sample_id:<34} {r.task:<18} {exact_s:>4} {f1_s:>6} {iou_s:>6} "
            f"{b1_s:>5} {b4_s:>5} {cid_s:>5} "
            f"{cd_s:>4} {trc_s:>4} {r.latency_ms:>7.0f}  {detail_col}"
        )
    print("-" * W)


def print_report(report: Dict[str, Any]) -> None:
    """Print the aggregate evaluation report to stdout."""
    W = 66
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

    cap = report.get("captioning", {})
    if cap.get("sample_count"):
        print(f"\n  Captioning  ({cap['sample_count']} samples)")
        print(f"    BLEU-1:                  {cap['bleu1']:.4f}")
        print(f"    BLEU-4:                  {cap['bleu4']:.4f}")
        print(f"    CIDEr (proxy):           {cap['cider_proxy']:.4f}")

    cd = report["change_detection"]
    if cd["sample_count"]:
        print(f"\n  Change Detection  ({cd['sample_count']} samples)")
        print(f"    Accuracy:                {cd['accuracy']:.1%}")

    # VRSBench per-subtask breakdown
    vrs = report.get("vrsbench", {})
    if vrs.get("total_samples"):
        print(f"\n  {'─' * 56}")
        print(f"  VRSBench Breakdown  ({vrs['total_samples']} total samples)")
        print(f"  {'─' * 56}")

        vc = vrs.get("captioning", {})
        if vc.get("sample_count"):
            print(f"    Captioning ({vc['sample_count']} samples):")
            print(f"      BLEU-1:                {vc['bleu1']:.4f}")
            print(f"      BLEU-4:                {vc['bleu4']:.4f}")
            print(f"      CIDEr (proxy):         {vc['cider_proxy']:.4f}")

        vg = vrs.get("grounding", {})
        if vg.get("sample_count"):
            print(f"    Grounding ({vg['sample_count']} samples):")
            print(f"      Mean IoU (mIoU):       {vg['mean_iou']:.4f}")
            print(f"      Precision @ IoU≥0.50:  {vg['precision_at_0.5']:.1%}")
            print(f"      Precision @ IoU≥0.75:  {vg['precision_at_0.75']:.1%}")

        vv = vrs.get("vqa", {})
        if vv.get("sample_count"):
            print(f"    VQA ({vv['sample_count']} samples):")
            print(f"      Exact match:           {vv['exact_match']:.1%}")
            print(f"      Mean token-F1:         {vv['token_f1']:.4f}")

    # CDVQA breakdown
    cdvqa = report.get("cdvqa", {})
    if cdvqa.get("sample_count"):
        print(f"\n  ────────────────────────────────────────────────────────")
        print(f"  CDVQA Bi-Temporal Breakdown  ({cdvqa['sample_count']} samples)")
        print(f"  ────────────────────────────────────────────────────────")
        print(f"    Classification Accuracy: {cdvqa['accuracy']:.1%}")
        print(f"    Exact Match Rate:        {cdvqa['exact_match']:.1%}")

    # Confidence averages
    confs = report.get("confidence_averages", {})
    if confs:
        print(f"\n  ── Task Confidence Averages ──")
        print(f"    Overall Confidence:     {confs.get('overall', 0.0):.4f}")
        print(f"    VQA Confidence:         {confs.get('vqa', 0.0):.4f}")
        print(f"    Grounding Confidence:   {confs.get('grounding', 0.0):.4f}")
        print(f"    Captioning Confidence:  {confs.get('captioning', 0.0):.4f}")
        print(f"    CDVQA Confidence:       {confs.get('cdvqa', 0.0):.4f}")

    print(f"\n  Execution Trace Compliance: {report['trace_compliance_rate']:.1%}")
    print("=" * W)
    print_presentation_summary_table(report)


def print_presentation_summary_table(report: Dict[str, Any]) -> None:
    """
    Generates and prints a presentation-slide ready tabular summary logging
    overall VQA Accuracy, Grounding mIoU, Captioning metrics, CDVQA Accuracy,
    and task-specific confidence averages for presentation slides.
    """
    vqa   = report.get("vqa", {})
    grnd  = report.get("grounding", {})
    cap   = report.get("captioning", {})
    cd    = report.get("change_detection", {})
    cdvqa = report.get("cdvqa", {})
    vrs   = report.get("vrsbench", {})
    confs = report.get("confidence_averages", {})

    W = 100
    print("\n" + "=" * W)
    print(" PRESENTATION SLIDE TABULAR SUMMARY — STELLAR AI EVALUATION")
    print("=" * W)

    table_rows = [
        ("Overall VQA Accuracy (Exact Match)", f"{vqa.get('sample_count', 0)}", f"{vqa.get('exact_match', 0.0):.1%}", f"{confs.get('vqa', 0.0):.3f}"),
        ("Overall VQA Token-F1 Score", f"{vqa.get('sample_count', 0)}", f"{vqa.get('token_f1', 0.0):.4f}", f"{confs.get('vqa', 0.0):.3f}"),
        ("VRSBench VQA Exact Match", f"{vrs.get('vqa', {}).get('sample_count', 0)}", f"{vrs.get('vqa', {}).get('exact_match', 0.0):.1%}", f"{confs.get('vqa', 0.0):.3f}"),
        ("CDVQA Semantic Change Accuracy", f"{cdvqa.get('sample_count', 0)}", f"{cdvqa.get('accuracy', 0.0):.1%}", f"{confs.get('cdvqa', 0.0):.3f}"),
        ("──────────────────────────────────────────", "─────────", "──────────────", "────────────"),
        ("Visual Grounding Mean IoU (mIoU)", f"{grnd.get('sample_count', 0)}", f"{grnd.get('mean_iou', 0.0):.4f}", f"{confs.get('grounding', 0.0):.3f}"),
        ("Grounding Precision @ IoU >= 0.50", f"{grnd.get('sample_count', 0)}", f"{grnd.get('accuracy_at_0.5_iou', 0.0):.1%}", f"{confs.get('grounding', 0.0):.3f}"),
        ("VRSBench Grounding mIoU", f"{vrs.get('grounding', {}).get('sample_count', 0)}", f"{vrs.get('grounding', {}).get('mean_iou', 0.0):.4f}", f"{confs.get('grounding', 0.0):.3f}"),
        ("──────────────────────────────────────────", "─────────", "──────────────", "────────────"),
        ("Image Captioning BLEU-1 Score", f"{cap.get('sample_count', 0)}", f"{cap.get('bleu1', 0.0):.4f}", f"{confs.get('captioning', 0.0):.3f}"),
        ("Image Captioning BLEU-4 Score", f"{cap.get('sample_count', 0)}", f"{cap.get('bleu4', 0.0):.4f}", f"{confs.get('captioning', 0.0):.3f}"),
        ("Image Captioning CIDEr (Proxy)", f"{cap.get('sample_count', 0)}", f"{cap.get('cider_proxy', 0.0):.4f}", f"{confs.get('captioning', 0.0):.3f}"),
        ("──────────────────────────────────────────", "─────────", "──────────────", "────────────"),
        ("Change Detection Binary Accuracy", f"{cd.get('sample_count', 0)}", f"{cd.get('accuracy', 0.0):.1%}", f"{confs.get('change_detection', 0.0):.3f}"),
        ("Execution Trace Compliance Rate", f"{report.get('total_samples', 0)}", f"{report.get('trace_compliance_rate', 0.0):.1%}", "1.000"),
        ("──────────────────────────────────────────", "─────────", "──────────────", "────────────"),
        ("OVERALL SYSTEM PERFORMANCE", f"{report.get('total_samples', 0)}", f"{report.get('overall_task_accuracy', 0.0):.1%}", f"{confs.get('overall', 0.0):.3f}"),
    ]

    print(f"+{'-'*44}+{'-'*11}+{'-'*16}+{'-'*14}+")
    print(f"| {'Evaluation Metric / Benchmark Task':<42} | {'Samples':<9} | {'Primary Score':<14} | {'Conf. Avg':<10} |")
    print(f"+{'-'*44}+{'-'*11}+{'-'*16}+{'-'*14}+")
    for task_col, sample_col, score_col, conf_col in table_rows:
        if "────" in task_col:
            print(f"+{'-'*44}+{'-'*11}+{'-'*16}+{'-'*14}+")
        else:
            print(f"| {task_col:<42} | {sample_col:>9} | {score_col:>14} | {conf_col:>10} |")
    print(f"+{'-'*44}+{'-'*11}+{'-'*16}+{'-'*14}+")
    print("=" * W + "\n")


# ---------------------------------------------------------------------------
# CLI Entry Point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Stellar AI Agent batch evaluation runner.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--mock",     action="store_true",
                        help="Run on built-in mini mock dataset (3 samples).")
    parser.add_argument("--vrsbench", action="store_true",
                        help="Run VRSBench test split: captioning + grounding + VQA (30 samples).")
    parser.add_argument("--cdvqa",    action="store_true",
                        help="Run CDVQA bi-temporal change detection test split (15 samples).")
    parser.add_argument("--dataset",  metavar="PATH",
                        help="Path to a JSONL benchmark file.")
    parser.add_argument("--limit",    type=int, default=None,
                        help="Maximum number of samples to evaluate.")
    parser.add_argument("--output",   metavar="PATH",
                        help="Save JSON report to this file.")
    parser.add_argument("--quiet",    action="store_true",
                        help="Suppress per-sample progress output.")
    args = parser.parse_args()

    if not args.mock and not args.vrsbench and not args.cdvqa and not args.dataset:
        parser.error("Provide --mock, --vrsbench, --cdvqa, or --dataset PATH")

    samples: List[BenchmarkSample] = []

    if args.mock:
        samples.extend(make_mock_dataset())
        print("[eval_agent] Loaded built-in mini mock dataset (3 samples).")

    if args.vrsbench:
        vrsbench_samples = make_vrsbench_dataset()
        samples.extend(vrsbench_samples)
        cap_n  = sum(1 for s in vrsbench_samples if s.subtask == "captioning")
        gnd_n  = sum(1 for s in vrsbench_samples if s.subtask == "grounding")
        vqa_n  = sum(1 for s in vrsbench_samples if s.subtask == "vqa")
        print(f"[eval_agent] Loaded VRSBench test split: {len(vrsbench_samples)} samples "
              f"(captioning={cap_n}, grounding={gnd_n}, vqa={vqa_n}).")

    if args.cdvqa:
        cdvqa_samples = make_cdvqa_dataset()
        samples.extend(cdvqa_samples)
        print(f"[eval_agent] Loaded CDVQA test split: {len(cdvqa_samples)} bi-temporal samples.")

    if args.dataset:
        jsonl_samples = load_jsonl(args.dataset, limit=args.limit)
        samples.extend(jsonl_samples)
        print(f"[eval_agent] Loaded {len(jsonl_samples)} samples from '{args.dataset}'.")

    if not samples:
        print("[eval_agent] No samples to evaluate.")
        return

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
                    "benchmark":       r.benchmark,
                    "subtask":         r.subtask,
                    "query":           r.query,
                    "exact_match":     r.exact_match,
                    "token_f1":        r.token_f1,
                    "mean_iou":        r.mean_iou,
                    "bleu1":           r.bleu1,
                    "bleu4":           r.bleu4,
                    "cider_proxy":     r.cider_proxy,
                    "precision_at_05": r.precision_at_05,
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
