"""
Smoke test for the new RSAgentState TypedDicts and factory helpers in state.py.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import time
from agent_core.state import (
    RSAgentState, AgentState,
    ImageModalityEntry, ExecutionTraceEntry,
    BoundingBoxEntry, SpatialMaskEntry, IntermediateToolOutputs,
    DetectedModality,
    make_image_entry, make_trace_entry, make_empty_rs_state,
    merge_intermediate_outputs,
    # Legacy classes must still be importable
    ValidationFlags, ReasoningStep, BoundingBoxOutput, ChangeMaskOutput,
    ToolExecutionLog, ConfidenceScores, AgentStateModel
)

PASS = "[PASS]"
FAIL = "[FAIL]"

errors = []

def check(label, condition, detail=""):
    if condition:
        print(f"  {PASS}  {label}" + (f" — {detail}" if detail else ""))
    else:
        print(f"  {FAIL}  {label}" + (f" — {detail}" if detail else ""))
        errors.append(label)

# ==========================================================
print("\n[TEST 1] make_empty_rs_state")
# ==========================================================
state = make_empty_rs_state("Detect deforestation near Amazon basin")
check("raw_query preserved", state["raw_query"] == "Detect deforestation near Amazon basin")
check("image_inputs empty", state["image_inputs"] == [])
check("execution_trace empty", state["execution_trace"] == [])
check("tool_confidence_scores empty", state["tool_confidence_scores"] == {})
check("tool_outputs initialised", isinstance(state["tool_outputs"], dict))
check("status == pending", state["status"] == "pending")
check("is_valid == True", state["is_valid"] is True)
check("created_at set", bool(state["created_at"]))

# ==========================================================
print("\n[TEST 2] make_image_entry — optical Sentinel-2")
# ==========================================================
img = make_image_entry(
    image_path="/data/S2_20240615_L2A.tif",
    detected_modality="optical",
    spatial_role="primary",
    band_count=12,
    band_names=["B02","B03","B04","B08","B8A","B11","B12"],
    sensor_name="Sentinel-2",
    acquisition_timestamp="2024-06-15T10:32:00Z",
    resolution_meters=10.0,
    crs="EPSG:32643",
    bounds_wgs84=[77.1, 28.5, 77.8, 29.1],
    cloud_cover_pct=4.2,
    is_georeferenced=True
)
check("detected_modality == optical", img["detected_modality"] == "optical")
check("spatial_role == primary", img["spatial_role"] == "primary")
check("band_count == 12", img["band_count"] == 12)
check("crs == EPSG:32643", img["crs"] == "EPSG:32643")
check("file_format auto-detected", img["file_format"] == "tif")
check("bounds_wgs84 length", len(img["bounds_wgs84"]) == 4)
check("is_georeferenced == True", img["is_georeferenced"] is True)
check("image_id is UUID", len(img["image_id"]) == 36)
state["image_inputs"].append(img)

# ==========================================================
print("\n[TEST 3] make_image_entry — SAR Sentinel-1")
# ==========================================================
sar = make_image_entry(
    image_path="/data/S1_20240620_GRD.tif",
    detected_modality="sar",
    spatial_role="sar",
    band_count=2,
    band_names=["VV","VH"],
    sensor_name="Sentinel-1",
    acquisition_timestamp="2024-06-20T05:12:00Z",
    resolution_meters=10.0,
    crs="EPSG:32643",
    is_georeferenced=True
)
state["image_inputs"].append(sar)
check("SAR detected_modality", sar["detected_modality"] == "sar")
check("SAR spatial_role == sar", sar["spatial_role"] == "sar")
check("SAR band_count == 2", sar["band_count"] == 2)
check("image_inputs has 2 entries", len(state["image_inputs"]) == 2)

# Modality routing heuristic check
roles = {e["spatial_role"] for e in state["image_inputs"]}
check("Routing: {optical,sar} -> cross_modal_fusion",
      roles == {"primary", "sar"},
      detail=f"roles={roles}")

# ==========================================================
print("\n[TEST 4] make_trace_entry — success")
# ==========================================================
t0 = time.perf_counter()
trace = make_trace_entry(
    tool_name="vqa_tool",
    node_name="vqa_specialist_node",
    parameters={"image_path": "/data/S2_20240615_L2A.tif", "question": "Is there deforestation?"},
    status="success",
    result_summary="VQA identified deforestation indicators (NDVI < 0.15 in SWIR)",
    confidence=0.94,
    duration_ms=round((time.perf_counter() - t0) * 1000, 2),
    output_keys=["answer", "bounding_boxes", "confidence", "task_type"]
)
check("tool_name == vqa_tool", trace["tool_name"] == "vqa_tool")
check("status == success", trace["status"] == "success")
check("confidence == 0.94", trace["confidence"] == 0.94)
check("trace_id is UUID", len(trace["trace_id"]) == 36)
check("output_keys list", isinstance(trace["output_keys"], list))
check("parameters dict", "question" in trace["parameters"])
state["execution_trace"].append(trace)

# ==========================================================
print("\n[TEST 5] make_trace_entry — error")
# ==========================================================
err_trace = make_trace_entry(
    tool_name="grounding_tool",
    node_name="grounding_specialist_node",
    parameters={"image_path": "/data/S2_20240615_L2A.tif", "target": "cleared forest patch"},
    status="error",
    result_summary="Grounding tool timed out after 30s",
    confidence=0.0,
    error="TimeoutError: model did not return within 30000ms",
    output_keys=[]
)
state["execution_trace"].append(err_trace)
check("error status captured", state["execution_trace"][1]["status"] == "error")
check("error message non-empty", bool(state["execution_trace"][1]["error"]))
check("execution_trace length == 2", len(state["execution_trace"]) == 2)

# ==========================================================
print("\n[TEST 6] tool_confidence_scores registry")
# ==========================================================
state["tool_confidence_scores"]["vqa_tool"] = 0.94
state["tool_confidence_scores"]["change_detection_tool"] = 0.88
scores = state["tool_confidence_scores"]
overall = sum(scores.values()) / len(scores)
check("two scores registered", len(scores) == 2)
check("weighted mean ~0.91", abs(overall - 0.91) < 0.01, detail=f"mean={round(overall,4)}")

# ==========================================================
print("\n[TEST 7] merge_intermediate_outputs")
# ==========================================================
out_a = {
    "vqa_answer": "Significant deforestation detected.",
    "vqa_confidence": 0.94,
    "bounding_boxes": [{"box_id": "a", "label": "cleared_forest", "confidence": 0.91}],
    "spatial_masks": [],
    "land_cover_labels": {"Forest": 62.3, "Cleared": 37.7},
    "raw_tool_outputs": {"vqa_tool": {"status": "success"}}
}
out_b = {
    "bounding_boxes": [{"box_id": "b", "label": "deforested_patch", "confidence": 0.87}],
    "spatial_masks": [{"mask_id": "m1", "mask_type": "deforestation", "confidence": 0.89}],
    "land_cover_labels": {"Shrubland": 15.1},
    "raw_tool_outputs": {"grounding_tool": {"status": "success"}}
}
merged = merge_intermediate_outputs(out_a, out_b)
check("bboxes concatenated", len(merged["bounding_boxes"]) == 2,
      detail=f"got {len(merged['bounding_boxes'])}")
check("spatial_masks concatenated", len(merged["spatial_masks"]) == 1)
check("land_cover_labels merged", "Forest" in merged["land_cover_labels"] and "Shrubland" in merged["land_cover_labels"])
check("raw_tool_outputs merged", "vqa_tool" in merged["raw_tool_outputs"] and "grounding_tool" in merged["raw_tool_outputs"])
check("scalar vqa_answer preserved", merged["vqa_answer"] == "Significant deforestation detected.")
check("scalar vqa_confidence preserved", merged["vqa_confidence"] == 0.94)

# ==========================================================
print("\n[TEST 8] Legacy compatibility — AgentStateModel still importable & functional")
# ==========================================================
legacy_model = AgentStateModel(raw_query="Test legacy model compatibility")
graph_state = legacy_model.to_graph_state()
check("AgentStateModel.to_graph_state() returns dict", isinstance(graph_state, dict))
check("raw_query in graph_state", graph_state["raw_query"] == "Test legacy model compatibility")
check("bounding_boxes in graph_state", "bounding_boxes" in graph_state)

# ==========================================================
print("\n[TEST 9] BoundingBoxEntry schema check")
# ==========================================================
bb: BoundingBoxEntry = BoundingBoxEntry(
    box_id="test-uuid",
    label="reservoir",
    confidence=0.92,
    bbox_normalized=[0.25, 0.30, 0.60, 0.70],
    bbox_pixels=[30, 36, 72, 84],
    bbox_geo=[],
    polygon_coordinates=[],
    attributes={"area_normalized": 0.175},
    source_tool="grounding_tool",
    image_id=img["image_id"]
)
check("BoundingBoxEntry label", bb["label"] == "reservoir")
check("BoundingBoxEntry bbox_normalized length 4", len(bb["bbox_normalized"]) == 4)
check("BoundingBoxEntry source_tool", bb["source_tool"] == "grounding_tool")

# ==========================================================
print("\n[TEST 10] SpatialMaskEntry schema check")
# ==========================================================
mask: SpatialMaskEntry = SpatialMaskEntry(
    mask_id="mask-uuid",
    mask_type="bi_temporal_change",
    mask_uri="/outputs/change_mask_20240615.tif",
    changed_area_sq_km=12.4,
    changed_area_pixels=124000,
    change_percentage=18.3,
    class_distribution={"deforestation": 0.78, "regrowth": 0.22},
    color_map={"1": "#FF3333", "2": "#33FF33"},
    georeferencing={"crs": "EPSG:32643", "transform": [10.0, 0.0, 500000.0]},
    confidence=0.88,
    source_tool="change_detection_tool"
)
check("SpatialMaskEntry mask_type", mask["mask_type"] == "bi_temporal_change")
check("SpatialMaskEntry changed_area_sq_km", mask["changed_area_sq_km"] == 12.4)
check("SpatialMaskEntry confidence", mask["confidence"] == 0.88)

# ==========================================================
print()
if errors:
    print(f"RESULT: {len(errors)} test(s) FAILED: {errors}")
    sys.exit(1)
else:
    print(f"RESULT: All 10 test groups passed.")
    print()
    print("RSAgentState summary:")
    print(f"  image_inputs   : {len(state['image_inputs'])} entries")
    print(f"  execution_trace: {len(state['execution_trace'])} entries")
    print(f"    [0] tool={state['execution_trace'][0]['tool_name']} status={state['execution_trace'][0]['status']} conf={state['execution_trace'][0]['confidence']}")
    print(f"    [1] tool={state['execution_trace'][1]['tool_name']} status={state['execution_trace'][1]['status']}")
    print(f"  tool_confidence_scores: {state['tool_confidence_scores']}")
