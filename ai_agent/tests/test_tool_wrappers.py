"""
Test script for the new tool wrappers in tools.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_core.tools import change_detection_tool, cross_modal_fusion_tool

def run_tests():
    print("--- Testing change_detection_tool ---")
    res_cd = change_detection_tool(
        image_path_t1="/data/before.tif",
        image_path_t2="/data/after.tif",
        text_query="Did the lake flood?"
    )
    assert res_cd["status"] == "success"
    assert "rs_state_updates" in res_cd
    updates_cd = res_cd["rs_state_updates"]
    assert "change_mask" in updates_cd["tool_outputs"]
    assert len(updates_cd["image_inputs"]) == 2
    print("  [PASS] change_detection_tool returned properly formatted outputs.")

    print("\n--- Testing cross_modal_fusion_tool ---")
    res_fusion = cross_modal_fusion_tool(
        image_path_optical="/data/opt.tif",
        image_path_sar="/data/sar.tif",
        text_query="Are there ships obscured by clouds?"
    )
    # Note: validation inside cross_modal.py uses utils.geospatial. 
    # Since these are fake files, they might fail modality check if geospatial tries to read them.
    # Let's see if they fail or succeed. Either way, it shouldn't crash the tool.
    if res_fusion["status"] == "error":
        print(f"  [INFO] Fusion returned error (likely modality validation): {res_fusion['error']}")
        assert "rs_state_updates" not in res_fusion, "Error shouldn't have full state updates"
    else:
        assert res_fusion["status"] == "success"
        assert "rs_state_updates" in res_fusion
        updates_fusion = res_fusion["rs_state_updates"]
        assert "fusion_result" in updates_fusion["tool_outputs"]
        assert len(updates_fusion["image_inputs"]) == 2
        print("  [PASS] cross_modal_fusion_tool returned properly formatted outputs.")

if __name__ == "__main__":
    run_tests()
