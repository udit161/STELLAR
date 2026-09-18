"""
Quick test for ChangeDetectionModel.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from specialist_models.change_det import ChangeDetectionModel

def run_test():
    model = ChangeDetectionModel()
    res = model.infer(
        image_path_t1="/data/before.tif",
        image_path_t2="/data/after.tif",
        text_query="Did the lake flood?"
    )
    
    assert res["status"] == "success"
    assert "answer" in res
    assert "change_mask" in res
    assert "spatial_masks" in res
    assert len(res["spatial_masks"]) == 1
    
    print("ChangeDetectionModel successfully instantiated and returned standard dict.")
    print(f"Answer: {res['answer']}")
    print(f"Change Mask Area (sq km): {res['change_mask']['changed_area_sq_km']}")

if __name__ == "__main__":
    run_test()
