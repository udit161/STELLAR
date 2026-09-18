"""
Test GroundingCaptioningModel for water body query grounding.

Verifies:
1. Passing a sample satellite image and query 'Highlight the water body referred to in the query'
2. Returning a list of normalized bounding boxes with coordinates bounded between 0.0 and 1.0
3. Tagging the output task_type as 'grounding'
"""

import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from specialist_models.caption_grounding import GroundingCaptioningModel


def test_water_body_query_grounding():
    model = GroundingCaptioningModel()

    sample_image_path = "/data/sample_satellite_image.tif"
    query = "Highlight the water body referred to in the query"

    # Call ground_text_query method
    result = model.ground_text_query(
        image_path=sample_image_path,
        text_query=query
    )

    # 1. Verify response status
    assert result.get("status") == "success", f"Expected status 'success', got '{result.get('status')}'"

    # 2. Verify task_type is tagged as 'grounding'
    assert result.get("task_type") == "grounding", f"Expected task_type 'grounding', got '{result.get('task_type')}'"

    # 3. Verify return of a list of normalized bounding boxes
    bounding_boxes = result.get("bounding_boxes")
    assert isinstance(bounding_boxes, list), f"Expected bounding_boxes to be a list, got {type(bounding_boxes)}"
    assert len(bounding_boxes) > 0, "Expected non-empty list of bounding boxes for water body query"

    for idx, box in enumerate(bounding_boxes):
        # Verify bounding box dict structure
        assert "bbox_normalized" in box, f"Box {idx} missing 'bbox_normalized' key"
        assert "label" in box, f"Box {idx} missing 'label' key"
        assert "confidence" in box, f"Box {idx} missing 'confidence' key"

        coords = box["bbox_normalized"]
        assert isinstance(coords, list) and len(coords) == 4, f"Box {idx} bbox_normalized must be a list of 4 floats [ymin, xmin, ymax, xmax], got {coords}"

        ymin, xmin, ymax, xmax = coords
        # Verify coordinates are bounded between 0.0 and 1.0
        assert 0.0 <= ymin <= 1.0, f"Box {idx} ymin {ymin} out of range [0.0, 1.0]"
        assert 0.0 <= xmin <= 1.0, f"Box {idx} xmin {xmin} out of range [0.0, 1.0]"
        assert 0.0 <= ymax <= 1.0, f"Box {idx} ymax {ymax} out of range [0.0, 1.0]"
        assert 0.0 <= xmax <= 1.0, f"Box {idx} xmax {xmax} out of range [0.0, 1.0]"
        assert ymin <= ymax, f"Box {idx} ymin ({ymin}) > ymax ({ymax})"
        assert xmin <= xmax, f"Box {idx} xmin ({xmin}) > xmax ({xmax})"

        # Verify detection confidence score bounded in [0.0, 1.0]
        conf = box["confidence"]
        assert isinstance(conf, float) and 0.0 <= conf <= 1.0, f"Box {idx} confidence {conf} out of range [0.0, 1.0]"

        print(f"  Box {idx}: label='{box['label']}', confidence={conf}, bbox_normalized=[ymin={ymin}, xmin={xmin}, ymax={ymax}, xmax={xmax}]")

    print("\n[SUCCESS] Water body grounding test passed all verifications:")
    print(f"  • Image Path : {sample_image_path}")
    print(f"  • Text Query : '{query}'")
    print(f"  • Task Type  : '{result['task_type']}'")
    print(f"  • BBoxes     : {len(bounding_boxes)} normalized boxes verified in [0.0, 1.0]")


if __name__ == "__main__":
    test_water_body_query_grounding()
