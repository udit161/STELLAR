import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_core.orchestrator import Orchestrator

def run_test():
    print("Running synthesizer_node test...")
    orch = Orchestrator()
    
    # Mocking state after grounding tool execution
    mock_state = {
        "classified_task": "grounding",
        "raw_query": "Find the airplanes.",
        "bounding_boxes": [
            {"box_2d": [10, 20, 100, 200], "label": "airplane", "score": 0.95},
            {"box_2d": [30, 40, 150, 250], "label": "airplane", "score": 0.92}
        ],
        "intermediate_outputs": {
            "grounding": {
                "status": "success",
                "summary": "Found 2 airplanes in the specified region.",
                "confidence": 0.935,
                "artifacts": [
                    {"artifact_id": "bbox_123", "type": "geojson"}
                ]
            }
        }
    }
    
    # Run the synthesizer node
    res = orch.synthesizer_node(mock_state)
    
    # Verify final payload contains text
    final_response = res.get("final_response", "")
    assert "Found 2 airplanes" in final_response, f"Missing text answer in final_response: {final_response}"
    
    # Verify spatial data artifacts were not dropped
    artifacts = res.get("artifacts", [])
    # Should include the summary artifact + the mock bounding box artifact
    assert len(artifacts) >= 2, f"Missing spatial data artifacts: {artifacts}"
    
    found_spatial = any(a.get("artifact_id") == "bbox_123" for a in artifacts)
    assert found_spatial, "Grounding bounding box artifact was dropped from the final payload!"
    
    # Verify confidence was calculated correctly
    confidence = res.get("confidence_score")
    assert confidence == 0.935, f"Unexpected confidence score: {confidence}"
    
    print("  [PASS] Text answer and visual evidence pointers included correctly.")
    print(f"  Final Response: {final_response}")
    print(f"  Confidence: {confidence}")
    print(f"  Artifacts count: {len(artifacts)}")

if __name__ == "__main__":
    run_test()
