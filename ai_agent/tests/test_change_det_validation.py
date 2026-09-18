"""
Quick test for ChangeDetectionModel missing image validation.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from specialist_models.change_det import ChangeDetectionModel

def run_test():
    model = ChangeDetectionModel()
    
    print("Testing with exactly two valid images...")
    res_valid = model.infer(
        image_path_t1="/data/before.tif",
        image_path_t2="/data/after.tif",
        text_query="Did the lake flood?"
    )
    
    assert res_valid["status"] == "success", "Valid pair should succeed"
    print("  [PASS] 2 images succeeded.")
    
    print("\nTesting with only one image provided...")
    res_invalid = model.infer(
        image_path_t1="/data/before.tif",
        image_path_t2=None,
        text_query="Did the lake flood?"
    )
    
    assert res_invalid["status"] == "error", "Missing image should return error status"
    assert "exactly two images" in res_invalid.get("error", "").lower()
    
    print(f"  [PASS] Validation caught missing image.")
    print(f"  Returned Error message: {res_invalid['error']}")

if __name__ == "__main__":
    run_test()
