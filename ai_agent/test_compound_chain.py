import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator

def run_test():
    print("Running multi-step task chaining test for Change Detection + VQA...")
    orch = Orchestrator()
    
    # Composite query targeting both spatial changes and semantic description
    state = {
        "raw_query": "Find where changes occurred between these two dates and describe what was built in that specific area.",
        "uploaded_images": [
            {"file_path": "/data/t1.tif"},
            {"file_path": "/data/t2.tif"}
        ]
    }
    
    print("Executing orchestrator workflow...")
    res = orch.run(query=state["raw_query"], state=state)
    
    # Check aggregation node outputs
    assert "intermediate_outputs" in res, "Missing intermediate_outputs"
    exec_summary = res["intermediate_outputs"].get("execution_summary", {})
    assert exec_summary, "Missing execution_summary in intermediate_outputs"
    
    # Verify classified task
    task = exec_summary.get("classified_task")
    assert task == "compound_pipeline", f"Expected compound_pipeline task, got {task}"
    
    # Verify the specific tool calls sequence
    tool_calls = exec_summary.get("tool_calls", [])
    print(f"DEBUG: tool_calls list -> {tool_calls}")
    print(f"DEBUG: intermediate_outputs keys -> {list(res['intermediate_outputs'].keys())}")
    
    assert len(tool_calls) >= 2, f"Expected at least 2 tool calls in compound pipeline, got {len(tool_calls)}"
    
    tool_names = [tc.get("tool_name") for tc in tool_calls]
    assert "change_detection_tool" in tool_names, f"change_detection_tool not found in execution trace: {tool_names}"
    assert "vqa_tool" in tool_names or "vision_vqa_tool" in tool_names, f"vqa_tool not found in execution trace: {tool_names}"
    
    print("  [PASS] Multi-step execution plan successfully created!")
    print(f"  [PASS] Executed sequence: {tool_names}")
    print(f"  Classified Task: {task}")
    print(f"  Tool Calls Sequence: {tool_names}")

if __name__ == "__main__":
    run_test()
