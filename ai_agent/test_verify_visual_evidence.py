"""
Unit test for verify_visual_evidence node and evidence_inconclusive state flag.

Tests:
1. Grounding task with empty bounding boxes triggers prompt refinement retry,
   and sets evidence_inconclusive: True if boxes remain empty after retry.
2. Bi-temporal change query with all-zero change mask triggers prompt refinement retry,
   and sets evidence_inconclusive: True if change mask remains all-zero.
3. Successful grounding / change detection with evidence passes verification.
"""

import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from agent_core.orchestrator import Orchestrator
from agent_core.state import make_empty_rs_state


def test_verify_visual_evidence():
    orch = Orchestrator()

    # -------------------------------------------------------------------
    # Test 1: Grounding task returning empty bounding boxes
    # -------------------------------------------------------------------
    print("\n[TEST 1] Grounding Task with Empty Bounding Boxes...")
    state1 = make_empty_rs_state("Locate hidden solar arrays in desert region")
    state1["classified_task"] = "grounding"
    state1["bounding_boxes"] = []  # Empty bounding boxes
    state1["evidence_retry_count"] = 0

    # First verification pass (retry 0)
    res1_1 = orch.verify_visual_evidence_node(state1)
    assert res1_1.get("needs_evidence_retry") is True, "First empty check should request retry"
    assert res1_1.get("evidence_retry_count") == 1, "Should increment evidence_retry_count to 1"
    assert "Refinement" in res1_1.get("query", ""), "Should refine query"
    print("  [PASS] Empty grounding check triggered prompt refinement retry.")

    # Apply retry updates and run second verification pass (retry 1)
    state1.update(res1_1)
    state1["bounding_boxes"] = []  # Still empty after retry
    res1_2 = orch.verify_visual_evidence_node(state1)

    assert res1_2.get("evidence_inconclusive") is True, "Expected evidence_inconclusive: True after failed retry"
    assert res1_2.get("validation_flags", {}).get("evidence_inconclusive") is True
    assert res1_2.get("confidence_score") == 0.20
    print("  [PASS] Failed grounding retry set evidence_inconclusive: True in state.")

    # -------------------------------------------------------------------
    # Test 2: Bi-temporal change detection producing all-zero change mask
    # -------------------------------------------------------------------
    print("\n[TEST 2] Change Detection with All-Zero Change Mask...")
    state2 = make_empty_rs_state("What changed between T1 and T2?")
    state2["classified_task"] = "change_detection"
    state2["change_mask"] = {
        "mask_id": "mask-123",
        "changed_area_pixels": 0,
        "changed_area_sq_km": 0.0,
        "change_percentage": 0.0
    }
    state2["evidence_retry_count"] = 0

    # First verification pass
    res2_1 = orch.verify_visual_evidence_node(state2)
    assert res2_1.get("needs_evidence_retry") is True, "First all-zero check should request retry"
    assert res2_1.get("evidence_retry_count") == 1
    print("  [PASS] All-zero change mask triggered prompt refinement retry.")

    # Second verification pass
    state2.update(res2_1)
    # Mask remains all-zero after retry
    res2_2 = orch.verify_visual_evidence_node(state2)
    assert res2_2.get("evidence_inconclusive") is True, "Expected evidence_inconclusive: True after failed retry"
    print("  [PASS] All-zero change mask retry set evidence_inconclusive: True.")

    # -------------------------------------------------------------------
    # Test 3: Grounding task returning valid bounding boxes
    # -------------------------------------------------------------------
    print("\n[TEST 3] Grounding Task with Valid Detections...")
    state3 = make_empty_rs_state("Locate water body")
    state3["classified_task"] = "grounding"
    state3["bounding_boxes"] = [
        {"box_id": "b1", "label": "water_body", "confidence": 0.94, "bbox_normalized": [0.1, 0.2, 0.5, 0.6]}
    ]
    res3 = orch.verify_visual_evidence_node(state3)
    assert res3.get("evidence_inconclusive") is False
    assert res3.get("needs_evidence_retry") is False
    print("  [PASS] Valid visual evidence passed verification cleanly.")

    # -------------------------------------------------------------------
    # Test 4: Synthesizer response with evidence_inconclusive
    # -------------------------------------------------------------------
    print("\n[TEST 4] Synthesizer Output for Inconclusive Evidence...")
    state4 = make_empty_rs_state("Find unknown target")
    state4["classified_task"] = "grounding"
    state4["evidence_inconclusive"] = True
    synth_res = orch.synthesizer_node(state4)
    assert "inconclusive" in synth_res.get("final_response", "").lower()
    assert synth_res.get("confidence_score") == 0.20
    print("  [PASS] Synthesizer outputted evidence_inconclusive transparent answer.")

    print("\nAll verify_visual_evidence tests passed successfully!")


if __name__ == "__main__":
    test_verify_visual_evidence()
