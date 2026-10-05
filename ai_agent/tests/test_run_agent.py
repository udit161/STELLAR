"""
Unit test for execute_stellar_agent interface in run_agent.py
"""

import sys
import os
import json

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from run_agent import execute_stellar_agent


def test_execute_stellar_agent_vqa():
    print("[TEST 1] Testing execute_stellar_agent for VQA query...")
    query = "Describe the vegetation density in this region."
    images = ["/data/sample_optical.tif"]

    result = execute_stellar_agent(query=query, image_paths=images)

    assert "answer" in result, "Missing 'answer' in result dict"
    assert "spatial_visual_evidence" in result, "Missing 'spatial_visual_evidence' in result dict"
    assert "auditable_trace" in result, "Missing 'auditable_trace' in result dict"
    assert "confidence_score" in result, "Missing 'confidence_score' in result dict"

    trace = result["auditable_trace"]
    assert "task_type" in trace
    assert "invoked_specialists" in trace
    assert "permitted_parameters_used" in trace
    assert "confidence_score" in trace
    assert "visual_evidence_artifacts" in trace

    # Ensure internal reasoning text is not present in trace
    assert "thought_trace" not in trace
    assert "task_reasoning" not in trace

    print("  [PASS] VQA query executed successfully.")
    print("  Output keys verified:", list(result.keys()))


def test_execute_stellar_agent_change_detection():
    print("[TEST 2] Testing execute_stellar_agent for change detection query...")
    query = "Show terrain alterations between T1 and T2"
    images = ["/data/pre_event.tif", "/data/post_event.tif"]

    result = execute_stellar_agent(query=query, image_paths=images)

    assert result["auditable_trace"]["task_type"] == "change_detection"
    assert "change_mask" in result["spatial_visual_evidence"]
    print("  [PASS] Change detection query executed successfully.")


if __name__ == "__main__":
    test_execute_stellar_agent_vqa()
    test_execute_stellar_agent_change_detection()
    print("\nALL RUN_AGENT INTERFACE TESTS PASSED SUCCESSFULLY!")
