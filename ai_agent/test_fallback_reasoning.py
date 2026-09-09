import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator

def run_test():
    print("Running fallback_reasoning test...")
    orch = Orchestrator()
    
    # Mocking a state with low confidence from a specialist tool
    mock_state = {
        "classified_task": "vqa",
        "raw_query": "What is the tiny grey speck in the corner?",
        "intermediate_outputs": {
            "vqa": {
                "status": "success",
                "summary": "I am unable to clearly identify the speck due to low resolution.",
                "confidence": 0.3,
            }
        },
        "bounding_boxes": [],
    }
    
    # 1. Synthesize output
    synth_state = orch.synthesizer_node(mock_state)
    
    # 2. Check routing logic
    route = orch._route_after_synthesizer(synth_state)
    assert route == "fallback_reasoning", f"Expected 'fallback_reasoning', but got '{route}'"
    
    # 3. Execute fallback node
    final_state = orch.fallback_reasoning_node(synth_state)
    
    # 4. Verify outcomes
    assert "low confidence score" in final_state["final_response"], f"Missing fallback text: {final_state['final_response']}"
    assert "adjusting your prompt" in final_state["final_response"], "Missing adjustment suggestion."
    assert final_state["status"] == "requires_user_input", f"Status not updated: {final_state['status']}"
    
    print("  [PASS] Low confidence correctly triggered routing to the fallback reasoning node.")
    print(f"  Fallback Response: {final_state['final_response']}")

if __name__ == "__main__":
    run_test()
