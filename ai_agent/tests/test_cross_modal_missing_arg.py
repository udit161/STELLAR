"""
Test script for cross_modal_fusion_tool input validation.
Feeds a mock dictionary with a missing argument to verify Pydantic correctly blocks execution.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_core.tools import cross_modal_fusion_tool

def run_test():
    print("Testing cross_modal_fusion_tool with missing SAR image path...")
    
    mock_dict = {
        "image_path_optical": "/data/optical.tif",
        "text_query": "Identify flooding."
    }
    
    # Using **kwargs mimics LangChain's StructuredTool invocation or direct router invocation
    res = cross_modal_fusion_tool(**mock_dict)

    assert res["status"] == "error", "Expected status to be 'error'."
    print("  [PASS] Tool execution successfully blocked by validation.")
    
    print(f"  Returned error message: {res['error']}")
    print(f"  Error type: {res.get('raw_output', {}).get('error', 'unknown')}")

if __name__ == "__main__":
    run_test()
