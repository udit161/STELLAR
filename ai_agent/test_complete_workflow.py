import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator

def run_test():
    print("Running complete mock multi-agent workflow test...")
    orch = Orchestrator()
    
    # State with two images (optical and SAR) and cross-modal query
    state = {
        "raw_query": "Fuse these optical and SAR images to see through the clouds.",
        "uploaded_images": [
            {"file_path": "/data/optical.tif"},
            {"file_path": "/data/sar.tif"}
        ],
        "optical_sar_pair": {
            "optical_image": {"file_path": "/data/optical.tif"},
            "sar_image": {"file_path": "/data/sar.tif"}
        }
    }
    
    # Execute full LangGraph orchestrator run
    print("Executing complete orchestrator workflow...")
    res = orch.run(query=state["raw_query"], state=state)
    
    # Check aggregation node outputs
    assert "intermediate_outputs" in res, "Missing intermediate_outputs"
    exec_summary = res["intermediate_outputs"].get("execution_summary", {})
    assert exec_summary, "Missing execution_summary in intermediate_outputs"
    
    # Verify classified task
    task = exec_summary.get("classified_task")
    assert task == "cross_modal", f"Expected cross_modal task, got {task}"
    
    # Verify tool calls and parameters
    tool_calls = exec_summary.get("tool_calls", [])
    assert len(tool_calls) > 0, "Expected tool calls in execution summary"
    
    tool_names = [tc.get("tool_name") for tc in tool_calls]
    assert "cross_modal_fusion_tool" in tool_names, f"cross_modal_fusion_tool not found in execution trace: {tool_names}"
    
    found_params = False
    for tc in tool_calls:
        if tc.get("tool_name") == "cross_modal_fusion_tool":
            params = tc.get("parameters", {})
            if "image_path_optical" in params and "image_path_sar" in params:
                found_params = True
                break
                
    assert found_params, "Parameters for cross_modal_fusion_tool not captured in execution summary."
    
    # Verify confidence
    overall_confidence = exec_summary.get("overall_confidence")
    assert overall_confidence is not None, "Missing overall confidence"
    
    print("  [PASS] Aggregation node generated a complete, auditable execution summary!")
    print(f"  Classified Task: {task}")
    print(f"  Tool Calls: {tool_names}")
    print(f"  Overall Confidence: {overall_confidence}")

if __name__ == "__main__":
    run_test()
