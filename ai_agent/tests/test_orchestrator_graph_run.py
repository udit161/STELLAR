"""
Test execution script for orchestrator.py.
Passes a mock single-image VQA state directly into the LangGraph router
and prints the execution trace to verify correct routing.
"""
import sys, os, uuid
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_core.orchestrator import Orchestrator
from agent_core.state import make_empty_rs_state

def run_test():
    print("Initializing Orchestrator...")
    orch = Orchestrator()
    
    # 1. Create a mock single-image VQA state
    query = "Describe the agricultural fields in this image."
    state = make_empty_rs_state(query)
    
    state["image_inputs"] = [
        {
            "image_id": str(uuid.uuid4()),
            "image_path": "/data/test_agri.tif",
            "detected_modality": "optical",
            "spatial_role": "primary",
            "metadata": {}
        }
    ]
    state["single_image"] = {"file_path": "/data/test_agri.tif"}
    
    print(f"\n--- Starting Orchestrator Stream ---")
    print(f"Query: '{query}'")
    print(f"Image: /data/test_agri.tif")
    print("------------------------------------")
    
    final_state = None
    step_count = 0
    
    # 2. Iterate through stream to capture trace
    for event in orch.stream(query, state):
        step_name = event["step"]
        latest_thought = event.get("latest_thought", {})
        final_state = event["state"]
        
        step_count += 1
        print(f"\n[Step {step_count}] Node Executed: {step_name}")
        
        if latest_thought:
            print(f"  Thought   : {latest_thought.get('thought')}")
            print(f"  Confidence: {latest_thought.get('confidence')}")
            
    # 3. Verification checks
    print("\n--- Execution Finished ---")
    
    if not final_state:
        print("ERROR: Graph stalled or returned no state.")
        sys.exit(1)
        
    routing_path = final_state.get("routing_history", [])
    print(f"\nFinal Routing Path: {' -> '.join(routing_path)}")
    
    expected_path = ["input_validator", "controller_router", "intent_classifier", "vision_vqa_specialist", "synthesizer", "aggregation"]
    
    missing_nodes = [node for node in expected_path if node not in routing_path]
    
    if missing_nodes:
        print(f"\n[FAIL] Workflow did not route through expected nodes. Missing: {missing_nodes}")
        sys.exit(1)
    else:
        print("\n[PASS] Workflow correctly routed through validation, intent classification, VQA specialist, and aggregation.")
        
    summary = final_state.get("intermediate_outputs", {}).get("execution_summary", {})
    if summary:
        print(f"[PASS] Execution Summary generated with {summary.get('tool_count')} tool calls.")
        print(f"[PASS] Overall Pipeline Status: {'OK' if summary.get('pipeline_ok') else 'FAILED'}")
    else:
        print("\n[FAIL] Execution Summary is missing.")
        sys.exit(1)

if __name__ == "__main__":
    run_test()
