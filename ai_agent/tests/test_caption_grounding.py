"""
Unit test for GroundingCaptioningModel specialist class.
Verifies generate_scene_description and ground_text_query methods.
"""

import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from specialist_models.caption_grounding import GroundingCaptioningModel

def test_grounding_captioning_model():
    model = GroundingCaptioningModel()

    # Test 1: generate_scene_description
    print("Testing generate_scene_description...")
    scene_res = model.generate_scene_description(
        image_path="/data/sample_satellite_image.tif",
        prompt="Analyze land cover and infrastructure"
    )

    assert scene_res["status"] == "success", f"Expected status success, got {scene_res.get('status')}"
    assert "description" in scene_res, "Missing 'description' key in scene description output"
    assert "land_cover_labels" in scene_res, "Missing 'land_cover_labels' in scene description output"
    assert isinstance(scene_res["land_cover_labels"], dict), "land_cover_labels should be a dict"
    assert "bounding_boxes" in scene_res, "Missing 'bounding_boxes' in scene description output"
    assert len(scene_res["bounding_boxes"]) > 0, "Expected non-empty bounding_boxes in scene description"

    # Check bounding box format matching state schema and [ymin, xmin, ymax, xmax]
    bbox_scene = scene_res["bounding_boxes"][0]
    assert "box_id" in bbox_scene, "Missing 'box_id'"
    assert "label" in bbox_scene, "Missing 'label'"
    assert "confidence" in bbox_scene, "Missing 'confidence'"
    assert "bbox_normalized" in bbox_scene, "Missing 'bbox_normalized'"

    norm_coords = bbox_scene["bbox_normalized"]
    assert len(norm_coords) == 4, f"Expected 4 bounding box coordinates [ymin, xmin, ymax, xmax], got {len(norm_coords)}"
    ymin, xmin, ymax, xmax = norm_coords
    assert 0.0 <= ymin <= ymax <= 1.0, f"Invalid y coordinates: {ymin}, {ymax}"
    assert 0.0 <= xmin <= xmax <= 1.0, f"Invalid x coordinates: {xmin}, {xmax}"
    print(f"  [PASS] Scene Description generated. Found {len(scene_res['bounding_boxes'])} bounding boxes.")
    print(f"  Sample bbox: label='{bbox_scene['label']}', conf={bbox_scene['confidence']}, coords=[ymin={ymin}, xmin={xmin}, ymax={ymax}, xmax={xmax}]")

    # Test 2: ground_text_query
    print("\nTesting ground_text_query for water body query...")
    water_query = "Highlight the water body referred to in the query"
    ground_res = model.ground_text_query(
        image_path="/data/sample_satellite_image.tif",
        text_query=water_query
    )

    assert ground_res["status"] == "success", f"Expected status success, got {ground_res.get('status')}"
    assert ground_res["task_type"] == "grounding", f"Expected task_type 'grounding', got {ground_res.get('task_type')}"
    assert "bounding_boxes" in ground_res, "Missing 'bounding_boxes' in grounding output"
    assert len(ground_res["bounding_boxes"]) > 0, "Expected non-empty bounding_boxes in grounding output"

    for box in ground_res["bounding_boxes"]:
        assert box["label"] == "water_body", f"Expected label 'water_body', got '{box['label']}'"
        assert isinstance(box["confidence"], float) and 0.0 <= box["confidence"] <= 1.0, "Invalid confidence score"
        coords = box["bbox_normalized"]
        assert len(coords) == 4, f"Expected 4 bounding box coordinates [ymin, xmin, ymax, xmax], got {len(coords)}"
        ymin, xmin, ymax, xmax = coords
        assert 0.0 <= ymin <= ymax <= 1.0, f"Invalid y coordinates in grounding: {ymin}, {ymax}"
        assert 0.0 <= xmin <= xmax <= 1.0, f"Invalid x coordinates in grounding: {xmin}, {xmax}"

    print(f"  [PASS] Text Query Grounding succeeded. Found {len(ground_res['bounding_boxes'])} target water body features.")
    print(f"  Sample grounded feature: label='{ground_res['bounding_boxes'][0]['label']}', task_type='{ground_res['task_type']}', coords={ground_res['bounding_boxes'][0]['bbox_normalized']}")

    # Test 3: error handling
    print("\nTesting error handling...")
    err_res1 = model.generate_scene_description(image_path="")
    assert err_res1["status"] == "error", "Should return error status for empty image_path"

    err_res2 = model.ground_text_query(image_path="/data/sample.tif", text_query="")
    assert err_res2["status"] == "error", "Should return error status for empty text_query"
    print("  [PASS] Error handling verified.")

    # Test 4: infer interface
    print("\nTesting unified infer interface...")
    infer_res = model.infer(image_path="/data/sample_satellite_image.tif", text_query="solar panel array")
    assert infer_res["status"] == "success"
    assert len(infer_res["bounding_boxes"]) > 0
    print("  [PASS] Unified infer interface verified.")

    print("\nAll GroundingCaptioningModel tests passed successfully!")

if __name__ == "__main__":
    test_grounding_captioning_model()
