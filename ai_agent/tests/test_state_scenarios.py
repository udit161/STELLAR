"""
Unit test for testing the RSAgentState schema across three different task scenarios:
1. Single-image VQA
2. Bi-temporal Change Detection
3. Cross-modal Fusion
"""

import sys, os, uuid
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from typing import cast
from agent_core.state import (
    make_empty_rs_state,
    RSAgentState,
    TaskType,
    ImageModalityEntry,
    BoundingBoxEntry,
    ExecutionTraceEntry,
)

PASS = "[PASS]"
FAIL = "[FAIL]"
errors = []

def check(label, cond, detail=""):
    if cond:
        print(f"  {PASS}  {label}" + (f" — {detail}" if detail else ""))
    else:
        print(f"  {FAIL}  {label}" + (f" — {detail}" if detail else ""))
        errors.append(label)

def run_tests():
    print("--- Scenario 1: Single-Image VQA ---")
    try:
        # Create base state
        state_vqa: RSAgentState = make_empty_rs_state("What is the main land cover?")
        
        # Add a single optical image
        img_entry: ImageModalityEntry = {
            "image_id": str(uuid.uuid4()),
            "image_path": "/data/scene_01.tif",
            "detected_modality": "optical",
            "spatial_role": "primary",
            "metadata": {"cloud_cover": 12.5}
        }
        state_vqa["image_inputs"].append(img_entry)
        
        # Update classified task
        state_vqa["classified_task"] = TaskType.VQA.value
        
        # Simulate VQA specialist adding text output
        state_vqa["tool_outputs"]["vqa_answer"] = "The main land cover is dense forest."
        state_vqa["tool_outputs"]["vqa_confidence"] = 0.92
        
        # Assertions
        check("VQA: query present", state_vqa["raw_query"] == "What is the main land cover?")
        check("VQA: 1 image input", len(state_vqa["image_inputs"]) == 1)
        check("VQA: valid vqa_answer", state_vqa["tool_outputs"]["vqa_answer"] == "The main land cover is dense forest.")
    except Exception as e:
        check("VQA: no exceptions", False, f"{type(e).__name__}: {e}")

    print("\n--- Scenario 2: Bi-temporal Change Detection ---")
    try:
        state_cd: RSAgentState = make_empty_rs_state("What changed between these dates?")
        
        # Add T1 and T2 images
        t1_entry: ImageModalityEntry = {
            "image_id": str(uuid.uuid4()),
            "image_path": "/data/t1.tif",
            "detected_modality": "optical",
            "spatial_role": "t1",
            "metadata": {"date": "2024-01-01"}
        }
        t2_entry: ImageModalityEntry = {
            "image_id": str(uuid.uuid4()),
            "image_path": "/data/t2.tif",
            "detected_modality": "optical",
            "spatial_role": "t2",
            "metadata": {"date": "2024-06-01"}
        }
        state_cd["image_inputs"].extend([t1_entry, t2_entry])
        state_cd["classified_task"] = TaskType.CHANGE_DETECTION.value
        
        # Simulate Change Detection specialist outputs
        state_cd["tool_outputs"]["spatial_masks"] = [{
            "mask_id": "mask-123",
            "mask_type": "change_detection",
            "mask_data_uri": "/masks/change_123.tif",
            "associated_image_id": None
        }]
        state_cd["change_mask"] = {
            "mask_uri": "/masks/change_123.tif",
            "changed_area_sq_km": 4.5,
            "change_percentage": 1.2
        }
        
        check("CD: 2 image inputs", len(state_cd["image_inputs"]) == 2)
        check("CD: spatial mask present", len(state_cd["tool_outputs"]["spatial_masks"]) == 1)
        check("CD: change_mask stats valid", state_cd["change_mask"]["changed_area_sq_km"] == 4.5)
    except Exception as e:
        check("CD: no exceptions", False, f"{type(e).__name__}: {e}")

    print("\n--- Scenario 3: Cross-Modal Fusion ---")
    try:
        state_fusion: RSAgentState = make_empty_rs_state("Fuse optical and SAR imagery.")
        
        # Add Optical and SAR images
        opt_entry: ImageModalityEntry = {
            "image_id": str(uuid.uuid4()),
            "image_path": "/data/opt.tif",
            "detected_modality": "optical",
            "spatial_role": "optical",
            "metadata": {}
        }
        sar_entry: ImageModalityEntry = {
            "image_id": str(uuid.uuid4()),
            "image_path": "/data/sar.tif",
            "detected_modality": "sar",
            "spatial_role": "sar",
            "metadata": {}
        }
        state_fusion["image_inputs"].extend([opt_entry, sar_entry])
        state_fusion["classified_task"] = TaskType.CROSS_MODAL_FUSION.value
        
        # Simulate fusion outputs
        state_fusion["tool_outputs"]["fusion_result"] = {
            "fused_image_uri": "/outputs/fused.tif",
            "fusion_type": "optical-sar"
        }
        
        check("Fusion: 2 image inputs", len(state_fusion["image_inputs"]) == 2)
        check("Fusion: modality distinction valid", 
              state_fusion["image_inputs"][0]["detected_modality"] != state_fusion["image_inputs"][1]["detected_modality"])
        check("Fusion: fusion_result populated", state_fusion["tool_outputs"]["fusion_result"]["fused_image_uri"] == "/outputs/fused.tif")
    except Exception as e:
        check("Fusion: no exceptions", False, f"{type(e).__name__}: {e}")

    if errors:
        print(f"\nRESULT: {len(errors)} test(s) FAILED: {errors}")
        sys.exit(1)
    else:
        print(f"\nRESULT: All RSAgentState scenario tests passed without type conflicts.")

if __name__ == "__main__":
    run_tests()
