import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator

def run_test():
    print("Running interpret_and_validate test...")
    orch = Orchestrator()
    
    # Setup state with only a single image path
    state = {
        "uploaded_images": [
            {"file_path": "/data/image1.tif"}
        ]
    }
    
    # Query clearly targeting change detection
    query = "What changed between these images?"
    
    print(f"Executing query: '{query}' with single image input.")
    res = orch.run(query=query, state=state)
    
    # The mock LLM should classify this as "change_detection"
    # But validation should fail because we only provided one image.
    
    # Check for validation errors
    validation_errors = res.get("validation_errors", [])
    assert res.get("is_valid") is False, "Expected state 'is_valid' to be False"
    assert len(validation_errors) > 0, "Expected at least one validation error"
    
    # Check if the correct error was raised
    found_error = False
    for err in validation_errors:
        if "Change detection requires exactly two images" in err:
            found_error = True
            break
            
    assert found_error, f"Expected bi-temporal validation error, got: {validation_errors}"
    
    # Check that execution was halted and routed to clarification
    routing_history = res.get("routing_history", [])
    assert "human_clarification" in routing_history or "interpret_and_validate" in routing_history[-2:], "Graph should halt or route to clarification before specialist execution"
    assert "change_detection_specialist" not in routing_history, "Change detection tool should NOT have been executed"
    
    print("  [PASS] Compatibility error correctly flagged.")
    print(f"  [PASS] Graph halted before calling change_detection tool.")
    print(f"  Validation Errors: {validation_errors}")

if __name__ == "__main__":
    run_test()
