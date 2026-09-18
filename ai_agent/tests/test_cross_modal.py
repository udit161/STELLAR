"""
Quick test for CrossModalFusion model.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from specialist_models.cross_modal import CrossModalFusion

def run_test():
    model = CrossModalFusion()
    
    print("Testing with valid Optical and SAR GeoTIFFs...")
    res = model.infer(
        image_path_optical="/data/optical_s2.tif",
        image_path_sar="/data/sar_s1.tif",
        text_query="Are there any ships obscured by the clouds?"
    )
    
    assert res["status"] == "success", "Valid pair should succeed"
    assert "answer" in res
    assert "fusion_result" in res
    assert "fused_image_uri" in res["fusion_result"]
    assert "alignment_score" in res["fusion_result"]
    
    print("  [PASS] Fusion succeeded.")
    print(f"  Answer: {res['answer']}")
    print(f"  Confidence: {res['confidence']}")
    print(f"  Alignment Score: {res['fusion_result']['alignment_score']}")
    
    print("\nTesting validation with a lossy format...")
    res_invalid = model.infer(
        image_path_optical="/data/optical_s2.jpg",
        image_path_sar="/data/sar_s1.tif",
        text_query="Are there any ships obscured by the clouds?"
    )
    
    assert res_invalid["status"] == "error", "Lossy format should fail"
    print(f"  [PASS] Validation caught lossy format.")
    print(f"  Returned Error message: {res_invalid['error']}")

if __name__ == "__main__":
    run_test()
