"""
End-to-end dry run script testing execute_satquery_agent across 3 scenarios:
1. Single-image VQA / Grounding query
2. Bi-temporal change detection pair query
3. Cross-modal Optical-SAR fusion query
"""

import sys
import os
import json

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from run_agent import execute_satquery_agent

REQUIRED_TOP_LEVEL_KEYS = {
    "request_id",
    "query",
    "answer",
    "executive_summary",
    "spatial_visual_evidence",
    "auditable_trace",
    "confidence_score",
    "status",
}

REQUIRED_TRACE_KEYS = {
    "task_type",
    "invoked_specialists",
    "permitted_parameters_used",
    "confidence_score",
    "visual_evidence_artifacts",
}

REQUIRED_SPATIAL_KEYS = {
    "bounding_boxes",
    "change_mask",
    "spatial_outputs",
    "artifacts",
}


def verify_result_schema(scenario_name: str, res: dict):
    print(f"\n--- Verifying {scenario_name} ---")

    # 1. Top level keys
    actual_top_keys = set(res.keys())
    missing_top = REQUIRED_TOP_LEVEL_KEYS - actual_top_keys
    assert not missing_top, f"[{scenario_name}] Missing top-level keys: {missing_top}"
    print(f"  [PASS] All top-level keys present: {list(res.keys())}")

    # 2. Auditable trace schema
    trace = res.get("auditable_trace") or {}
    actual_trace_keys = set(trace.keys())
    missing_trace = REQUIRED_TRACE_KEYS - actual_trace_keys
    assert not missing_trace, f"[{scenario_name}] Missing trace keys: {missing_trace}"
    print(f"  [PASS] Auditable trace schema valid. task_type='{trace.get('task_type')}', specialists={trace.get('invoked_specialists')}")

    # 3. Spatial evidence schema
    spatial = res.get("spatial_visual_evidence") or {}
    actual_spatial_keys = set(spatial.keys())
    missing_spatial = REQUIRED_SPATIAL_KEYS - actual_spatial_keys
    assert not missing_spatial, f"[{scenario_name}] Missing spatial evidence keys: {missing_spatial}"
    print(f"  [PASS] Spatial evidence schema valid.")

    # 4. Completion status
    assert res.get("status") in ("completed", "requires_user_input"), f"Unexpected status: {res.get('status')}"
    print(f"  [PASS] Scenario status: '{res.get('status')}', confidence={res.get('confidence_score')}")


def main():
    print("[DRY RUN] Starting end-to-end execution of execute_satquery_agent...")

    # Scenario 1: Single-image VQA / Grounding
    res1 = execute_satquery_agent(
        query="Locate aircraft and describe the hangar area.",
        image_paths=["/data/airport_scene_01.tif"],
        metadata={"latitude": 13.0827, "longitude": 80.2707}
    )
    verify_result_schema("Scenario 1: Single-Image Query", res1)

    # Scenario 2: Bi-temporal Change Detection
    res2 = execute_satquery_agent(
        query="What changed between pre-event T1 and post-event T2 rasters?",
        image_paths=["/data/baseline_t1_2023.tif", "/data/comparison_t2_2024.tif"],
        metadata={"task_hint": "change_detection"}
    )
    verify_result_schema("Scenario 2: Bi-Temporal Pair Query", res2)

    # Scenario 3: Cross-Modal Optical-SAR Fusion
    res3 = execute_satquery_agent(
        query="Fuse optical and SAR radar imagery for cloud penetration and target detection.",
        image_paths=["/data/optical_cloudy.tif", "/data/sar_radar.tif"],
        metadata={"sensor_types": ["optical", "sar"]}
    )
    verify_result_schema("Scenario 3: Cross-Modal Optical-SAR Query", res3)

    print("\n" + "="*70)
    print("ALL 3 END-TO-END DRY RUN SCENARIOS COMPLETED SUCCESSFULLY!")
    print("="*70)


if __name__ == "__main__":
    main()
