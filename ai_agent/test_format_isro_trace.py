"""
Unit test for format_isro_trace node and trace sanitization in orchestrator.py
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator

def test_format_isro_trace_direct():
    print("[TEST 1] Testing format_isro_trace_node direct call...")
    orch = Orchestrator()

    mock_state = {
        "raw_query": "Detect airplanes and highlight changes",
        "classified_task": "grounding",
        "completed_specialists": ["grounding_rs"],
        "sanitized_tool_params": {
            "grounding_rs": {"box_threshold": 0.35, "n_bboxes": 5}
        },
        "confidence_score": 0.92,
        "bounding_boxes": [
            {
                "box_id": "box-101",
                "label": "airplane",
                "confidence": 0.94,
                "bbox_normalized": [0.1, 0.2, 0.3, 0.4]
            }
        ],
        "change_mask": {"changed_area_sq_km": 0.0},
        "spatial_outputs": {},
        "artifacts": [{"artifact_id": "art-1", "uri": "/tmp/art1.png"}],
        # Internal scratchpads and CoT text
        "thought_trace": [{"thought": "Internal LLM CoT step 1..."}],
        "task_reasoning": "Internal scratchpad reasoning prompt.",
        "param_guardrail_log": [{"event": "Internal guardrail log"}],
    }

    # Execute format_isro_trace node
    updates = orch.format_isro_trace_node(mock_state)
    assert "isro_trace" in updates, "isro_trace key missing from updates"

    isro_trace = updates["isro_trace"]

    # Verify 5 strict observable schema keys
    expected_keys = {
        "task_type",
        "invoked_specialists",
        "permitted_parameters_used",
        "confidence_score",
        "visual_evidence_artifacts",
    }
    assert set(isro_trace.keys()) == expected_keys, f"Trace keys mismatch. Got: {set(isro_trace.keys())}"

    # Verify values
    assert isro_trace["task_type"] == "grounding"
    assert isro_trace["invoked_specialists"] == ["grounding_rs"]
    assert isro_trace["permitted_parameters_used"] == {"grounding_rs": {"box_threshold": 0.35, "n_bboxes": 5}}
    assert isro_trace["confidence_score"] == 0.92

    visual_evidence = isro_trace["visual_evidence_artifacts"]
    assert len(visual_evidence["bounding_boxes"]) == 1
    assert visual_evidence["bounding_boxes"][0]["label"] == "airplane"
    assert len(visual_evidence["artifacts"]) == 1

    # Verify helper method
    helper_trace = orch.format_isro_trace(mock_state)
    assert helper_trace == isro_trace, "format_isro_trace helper output mismatch"

    # Verify internal scratchpads/CoT are NOT in isro_trace keys
    assert "thought_trace" not in isro_trace
    assert "task_reasoning" not in isro_trace
    assert "param_guardrail_log" not in isro_trace

    print("  [PASS] format_isro_trace node and schema verification passed.")

def test_format_isro_trace_pipeline():
    print("[TEST 2] Testing format_isro_trace end-to-end via orchestrator.run()...")
    orch = Orchestrator()

    final_state = orch.run(query="What is the land cover classification?")

    assert "isro_trace" in final_state, "isro_trace missing from final state after run()"
    trace = final_state["isro_trace"]

    required_keys = [
        "task_type",
        "invoked_specialists",
        "permitted_parameters_used",
        "confidence_score",
        "visual_evidence_artifacts",
    ]
    for k in required_keys:
        assert k in trace, f"Required key '{k}' missing from isro_trace in final state"

    print("  [PASS] End-to-end pipeline trace formatting passed.")
    print("  isro_trace sample output:")
    import json
    print(json.dumps(trace, indent=2))

if __name__ == "__main__":
    test_format_isro_trace_direct()
    test_format_isro_trace_pipeline()
    print("\nALL ISRO TRACE FORMATTER TESTS PASSED SUCCESSFULLY!")
