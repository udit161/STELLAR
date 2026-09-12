"""
Test simulating specialist tool execution that returns empty bounding box list [] with confidence 0.2.
Verifies verify_visual_evidence node interception, self-correction routing, and evidence_inconclusive flag marking.
"""

import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from agent_core.orchestrator import Orchestrator
from agent_core.state import make_empty_rs_state


def test_simulate_empty_bbox_tool_execution():
    orch = Orchestrator()

    # 1. Initialize state for a grounding task
    state = make_empty_rs_state("Locate hidden water tank in low contrast zone")
    state["classified_task"] = "grounding"
    state["use_grounding_tool"] = True

    # 2. Simulate specialist tool execution returning empty bounding boxes [] and confidence 0.2
    simulated_tool_output = {
        "bounding_boxes": [],
        "confidence": 0.2,
        "status": "success",
        "task_type": "grounding"
    }

    # Populate state with tool outputs
    state["bounding_boxes"] = simulated_tool_output["bounding_boxes"]
    state["tool_outputs"] = {"bounding_boxes": [], "grounding_confidence": 0.2}
    state["confidence_score"] = 0.2

    print("Initial state after simulated specialist tool output:")
    print(f"  • bounding_boxes      : {state['bounding_boxes']}")
    print(f"  • confidence_score    : {state['confidence_score']}")
    print(f"  • evidence_retry_count: {state.get('evidence_retry_count', 0)}")

    # 3. First pass: verify_visual_evidence intercepts the state
    updates_pass1 = orch.verify_visual_evidence_node(state)

    print("\n[Pass 1 Interception Verification]")
    print(f"  • needs_evidence_retry : {updates_pass1.get('needs_evidence_retry')}")
    print(f"  • evidence_retry_count : {updates_pass1.get('evidence_retry_count')}")
    print(f"  • refined query        : '{updates_pass1.get('query')}'")
    print(f"  • lowered box threshold: {updates_pass1.get('specialist_model_configs', {}).get('grounding_rs', {}).get('box_threshold')}")

    # Assert self-correction routing trigger
    assert updates_pass1.get("needs_evidence_retry") is True, "Must trigger self-correction retry"
    assert updates_pass1.get("evidence_retry_count") == 1, "Must increment retry count to 1"
    assert "Refinement" in updates_pass1.get("query", ""), "Query must include corrective prompt refinement"
    assert updates_pass1.get("specialist_model_configs", {}).get("grounding_rs", {}).get("box_threshold") == 0.15, "Box threshold must be lowered"

    # Test self-correction routing function _route_after_verify_evidence
    state.update(updates_pass1)
    next_route = Orchestrator._route_after_verify_evidence(state)
    assert next_route == "grounding_specialist", f"Self-correction route should be 'grounding_specialist', got '{next_route}'"
    print(f"  • Self-correction routing decision: '{next_route}'")

    # 4. Simulate retry specialist execution returning empty [] again with low confidence 0.2
    state["bounding_boxes"] = []

    # 5. Second pass: verify_visual_evidence checks state after retry
    updates_pass2 = orch.verify_visual_evidence_node(state)

    print("\n[Pass 2 Interception Verification (After Retry)]")
    print(f"  • evidence_inconclusive : {updates_pass2.get('evidence_inconclusive')}")
    print(f"  • validation_flags      : {updates_pass2.get('validation_flags')}")
    print(f"  • final confidence      : {updates_pass2.get('confidence_score')}")

    # Assert execution flags marked correctly
    assert updates_pass2.get("evidence_inconclusive") is True, "Must set evidence_inconclusive: True"
    assert updates_pass2.get("validation_flags", {}).get("evidence_inconclusive") is True, "Must set validation_flags.evidence_inconclusive: True"
    assert updates_pass2.get("needs_evidence_retry") is False, "retry should no longer be requested"

    state.update(updates_pass2)
    next_route_pass2 = Orchestrator._route_after_verify_evidence(state)
    assert next_route_pass2 == "synthesizer", f"Post-retry route should be 'synthesizer', got '{next_route_pass2}'"
    print(f"  • Post-retry routing decision: '{next_route_pass2}'")

    # 6. Verify Synthesizer output
    synth_res = orch.synthesizer_node(state)
    assert "inconclusive" in synth_res["final_response"].lower()
    print(f"\n[Synthesizer Response Verification]")
    print(f"  • final_response : '{synth_res['final_response']}'")
    print(f"  • exec_summary   : '{synth_res['executive_summary']}'")

    print("\n[SUCCESS] Simulated empty bbox tool execution test passed all verifications!")


if __name__ == "__main__":
    test_simulate_empty_bbox_tool_execution()
