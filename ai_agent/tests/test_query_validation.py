import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_core.query_validator import is_meaningful_query
from agent_core.orchestrator import Orchestrator

def run_tests():
    print("--- Query Validation Unit Tests ---")
    
    invalid_queries = [
        "gyfuyyu",
        "asdfghjkl",
        "qwertyuiop",
        "12345",
        "???",
        "gfgff",
        "hjkhjk"
    ]
    
    valid_queries = [
        "What is the NDVI?",
        "Locate water bodies in the image",
        "What changed between these images?",
        "Describe the land cover types",
        "#Sentinel-2"
    ]
    
    for q in invalid_queries:
        is_ok, reason = is_meaningful_query(q)
        assert not is_ok, f"Expected '{q}' to be flagged as invalid, but got valid."
        print(f"  [PASS] Invalid query '{q}' correctly flagged: {reason[:60]}...")
        
    for q in valid_queries:
        is_ok, reason = is_meaningful_query(q)
        assert is_ok, f"Expected '{q}' to be valid, but got invalid: {reason}"
        print(f"  [PASS] Valid query '{q}' accepted.")
        
    print("\n--- Orchestrator Integration Test with Gibberish Query ---")
    orch = Orchestrator()
    res = orch.run(query="gyfuyyu")
    
    assert res.get("is_valid") is False, "Expected state is_valid to be False"
    assert res.get("requires_clarification") is True, "Expected state requires_clarification to be True"
    assert res.get("confidence_score") <= 0.20, f"Expected low confidence score, got {res.get('confidence_score')}"
    assert "Unrecognized or ambiguous query" in res.get("final_response", ""), f"Unexpected response: {res.get('final_response')}"
    
    print("  [PASS] Orchestrator correctly returned low confidence and clarification guidance for 'gyfuyyu'.")
    print(f"  Response: {res.get('final_response')}")
    print(f"  Confidence: {res.get('confidence_score')}")

if __name__ == "__main__":
    run_tests()
