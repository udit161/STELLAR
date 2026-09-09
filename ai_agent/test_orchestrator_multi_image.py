"""
Test script to verify multi-image intent routing in orchestrator.py
And print the execution trace.
"""
import sys, os
import json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator
from agent_core.state import AgentStateModel

def run_tests():
    orch = Orchestrator()
    print("Graph initialized.")
    
    # Test 1: Bi-temporal change detection
    print("\n--- Test 1: Bi-temporal Change Detection ---")
    state_cd = AgentStateModel(
        raw_query="What changed between these images?",
        query="What changed between these images?"
    ).to_graph_state()
    state_cd["image_inputs"] = [
        {"image_path": "/data/t1.tif", "detected_modality": "optical", "spatial_role": "t1"},
        {"image_path": "/data/t2.tif", "detected_modality": "optical", "spatial_role": "t2"}
    ]
    
    res_cd = orch.run(query="What changed?", state=state_cd)
    routing_path = res_cd.get("routing_history", [])
    print(f"Routing path: {routing_path}")
    
    trace_cd = res_cd.get("intermediate_outputs", {}).get("execution_summary", {}).get("tool_calls", [])
    print("Execution Trace:")
    for t in trace_cd:
        print(f"  - Tool: {t.get('tool_name')} | Node: {t.get('node_name')} | Status: {t.get('status')}")
        print(f"    Summary: {t.get('result_summary')}")

    # Test 2: Optical-SAR cross-modal
    print("\n--- Test 2: Optical-SAR Fusion ---")
    state_sar = AgentStateModel(
        raw_query="Fuse the optical and radar data.",
        query="Fuse the optical and radar data."
    ).to_graph_state()
    state_sar["image_inputs"] = [
        {"image_path": "/data/optical.tif", "detected_modality": "optical", "spatial_role": "base"},
        {"image_path": "/data/sar.tif", "detected_modality": "sar", "spatial_role": "overlay"}
    ]
    
    res_sar = orch.run(query="Fuse the optical and radar data.", state=state_sar)
    routing_path_sar = res_sar.get("routing_history", [])
    print(f"Routing path: {routing_path_sar}")

    trace_sar = res_sar.get("intermediate_outputs", {}).get("execution_summary", {}).get("tool_calls", [])
    print("Execution Trace:")
    for t in trace_sar:
        print(f"  - Tool: {t.get('tool_name')} | Node: {t.get('node_name')} | Status: {t.get('status')}")
        print(f"    Summary: {t.get('result_summary')}")

if __name__ == "__main__":
    run_tests()
