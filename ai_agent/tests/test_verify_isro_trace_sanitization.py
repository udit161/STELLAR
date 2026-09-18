"""
Unit test: Feeding a completed graph state containing raw thought tokens and verbose
intermediate messages through format_isro_trace to verify strict sanitization.
"""

import sys
import os
import json

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_core.orchestrator import Orchestrator

def main():
    print("[TEST] Verifying format_isro_trace sanitization on state with raw thought tokens...")
    orch = Orchestrator()

    # Construct a completed graph state with verbose LLM scratchpads and internal CoT
    dirty_state = {
        "request_id": "req-9999",
        "raw_query": "Identify built-up regions and calculate change percentage",
        "classified_task": "change_detection",
        "completed_specialists": ["change_detector"],
        "sanitized_tool_params": {
            "change_detector": {
                "threshold": 0.5,
                "patch_size": 256,
                "use_tta": False
            }
        },
        "confidence_score": 0.94,
        "bounding_boxes": [
            {
                "box_id": "b-1",
                "label": "urban_structure",
                "confidence": 0.91,
                "bbox_normalized": [0.05, 0.1, 0.4, 0.5]
            }
        ],
        "change_mask": {
            "mask_uri": "/data/masks/change_mask_001.tif",
            "changed_area_sq_km": 12.4,
            "change_percentage": 5.2
        },
        "spatial_outputs": {
            "geojson_feature_collection": {"type": "FeatureCollection", "features": []}
        },
        "artifacts": [
            {
                "artifact_id": "art-99",
                "artifact_type": "change_mask_geotiff",
                "uri": "/data/masks/change_mask_001.tif"
            }
        ],
        # --- Internal LLM Reasoning & Raw Scratchpad Tokens ---
        "thought_trace": [
            {
                "step_number": 1,
                "agent_name": "ControllerRouter",
                "thought": "RAW THOUGHT TOKEN: Decomposing user prompt 'Identify built-up regions'... Step 1: parse T1/T2 pairs.",
                "action_taken": "target_change_detection"
            },
            {
                "step_number": 2,
                "agent_name": "ChangeDetectionSpecialist",
                "thought": "RAW THOUGHT TOKEN: Running Siamese-STANet backbone... thresholding logits at 0.5.",
                "action_taken": "change_detection_tool"
            }
        ],
        "task_reasoning": "VERBOSE SCRATCHPAD: User provided bi-temporal GeoTIFF inputs. Selected STANet baseline.",
        "param_guardrail_log": [
            {"event": "PARAM_WHITELIST_CHECK", "notes": "Stripped unapproved param 'experimental_flag'"}
        ],
        "reference_resolution_log": [
            {"event": "REFERENCE_RESOLVED", "notes": "No back-reference found in raw_query"}
        ],
        "verbose_llm_scratchpad": "<scratchpad>Chain-of-thought internal monologue: Step A -> Step B -> Step C</scratchpad>"
    }

    # Pass the dirty state through format_isro_trace
    isro_trace = orch.format_isro_trace(dirty_state)

    # 1. Verify exact top-level schema keys
    expected_schema_keys = {
        "task_type",
        "invoked_specialists",
        "permitted_parameters_used",
        "confidence_score",
        "visual_evidence_artifacts"
    }

    actual_keys = set(isro_trace.keys())
    assert actual_keys == expected_schema_keys, (
        f"ISRO Trace schema key mismatch!\n"
        f"Expected: {expected_schema_keys}\n"
        f"Actual:   {actual_keys}"
    )

    # 2. Verify all raw reasoning & scratchpad keys are completely absent
    forbidden_keys = [
        "thought_trace",
        "task_reasoning",
        "param_guardrail_log",
        "reference_resolution_log",
        "verbose_llm_scratchpad",
        "thought",
        "reasoning"
    ]
    for key in forbidden_keys:
        assert key not in isro_trace, f"Forbidden internal reasoning key '{key}' exposed in ISRO trace!"

    # 3. Verify content inside visual_evidence_artifacts
    artifacts_section = isro_trace["visual_evidence_artifacts"]
    assert len(artifacts_section["bounding_boxes"]) == 1
    assert artifacts_section["change_mask"]["changed_area_sq_km"] == 12.4
    assert len(artifacts_section["artifacts"]) == 1

    # 4. Deep check: Ensure string dump of isro_trace has NO raw thought tokens or scratchpads
    trace_json_str = json.dumps(isro_trace)
    assert "RAW THOUGHT TOKEN" not in trace_json_str, "Raw thought tokens found in serialized ISRO trace!"
    assert "VERBOSE SCRATCHPAD" not in trace_json_str, "Verbose scratchpad found in serialized ISRO trace!"
    assert "<scratchpad>" not in trace_json_str, "Raw scratchpad tags found in serialized ISRO trace!"

    print("[PASS] Verified: All raw reasoning text & internal scratchpads successfully removed.")
    print("[PASS] Only strict observable evaluation schema remains:\n")
    print(json.dumps(isro_trace, indent=2))

if __name__ == "__main__":
    main()
