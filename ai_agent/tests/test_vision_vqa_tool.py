"""
Integration test for vision_vqa_tool in agent_core/tools.py.
Covers: Pydantic validation, 3-layer error handling, RS-state output mapping,
StandardToolOutput schema, and TOOL_MAP/TOOL_REGISTRY registration.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_core.tools import (
    vision_vqa_tool,
    StrictVQAInput,
    TOOL_REGISTRY,
    TOOL_MAP,
    IncompatibleFormatError,
    MissingRequiredParameterError,
    ToolInputValidationError,
)
from agent_core.state import make_empty_rs_state, merge_intermediate_outputs

PASS = "[PASS]"
FAIL = "[FAIL]"
errors = []

def check(label, cond, detail=""):
    if cond:
        print(f"  {PASS}  {label}" + (f" — {detail}" if detail else ""))
    else:
        print(f"  {FAIL}  {label}" + (f" — {detail}" if detail else ""))
        errors.append(label)

# ===========================================================================
print("\n[TEST 1] Tool registration in TOOL_REGISTRY and TOOL_MAP")
# ===========================================================================
tool_names_registry = [getattr(t, "name", getattr(t, "__name__", str(t))) for t in TOOL_REGISTRY]
check("vision_vqa_tool in TOOL_MAP", "vision_vqa_tool" in TOOL_MAP)
check("vision_vqa_tool in TOOL_REGISTRY", any("vision_vqa" in str(n) for n in tool_names_registry),
      detail=str(tool_names_registry))
check("all 6 tools present", len(TOOL_REGISTRY) >= 6, detail=f"count={len(TOOL_REGISTRY)}")

# ===========================================================================
print("\n[TEST 2] StrictVQAInput — valid inputs pass validation")
# ===========================================================================
inp = StrictVQAInput(
    image_path="  /data/S2_20240615_L2A.tif  ",
    text_query="  What land-cover type dominates this scene?  ",
    confidence_threshold=0.6,
    force_vqa=True,
)
inp.validate_inputs()
check("image_path stripped", inp.image_path == "/data/S2_20240615_L2A.tif")
check("text_query stripped", inp.text_query == "What land-cover type dominates this scene?")
check("confidence_threshold preserved", inp.confidence_threshold == 0.6)
check("force_vqa preserved", inp.force_vqa is True)

# ===========================================================================
print("\n[TEST 3] StrictVQAInput — empty image_path raises MissingRequiredParameterError")
# ===========================================================================
try:
    bad = StrictVQAInput(image_path="   ", text_query="Any question")
    bad.validate_inputs()
    check("empty image_path raises", False, "no exception raised")
except MissingRequiredParameterError as e:
    check("empty image_path raises MissingRequiredParameterError", True, str(e)[:80])
except Exception as e:
    check("empty image_path raises MissingRequiredParameterError", False, f"wrong exc: {type(e).__name__}: {e}")

# ===========================================================================
print("\n[TEST 4] StrictVQAInput — empty text_query raises MissingRequiredParameterError")
# ===========================================================================
try:
    bad2 = StrictVQAInput(image_path="/data/img.tif", text_query="")
    bad2.validate_inputs()
    check("empty text_query raises", False, "no exception raised")
except MissingRequiredParameterError as e:
    check("empty text_query raises MissingRequiredParameterError", True, str(e)[:80])
except Exception as e:
    check("empty text_query raises MissingRequiredParameterError", False, f"wrong exc: {type(e).__name__}: {e}")

# ===========================================================================
print("\n[TEST 5] StrictVQAInput — unsupported extension raises IncompatibleFormatError")
# ===========================================================================
try:
    bad3 = StrictVQAInput(image_path="/data/scene.xyz", text_query="Describe the land cover")
    bad3.validate_inputs()
    check(".xyz raises IncompatibleFormatError", False, "no exception raised")
except IncompatibleFormatError as e:
    check(".xyz raises IncompatibleFormatError", True, str(e)[:80])
except Exception as e:
    check(".xyz raises IncompatibleFormatError", False, f"wrong exc: {type(e).__name__}: {e}")

# ===========================================================================
print("\n[TEST 6] StrictVQAInput — force_grounding + force_vqa raises ToolInputValidationError")
# ===========================================================================
try:
    bad4 = StrictVQAInput(image_path="/data/scene.tif", text_query="Where is the reservoir?",
                           force_grounding=True, force_vqa=True)
    bad4.validate_inputs()
    check("mutual exclusion raises", False, "no exception raised")
except ToolInputValidationError as e:
    check("mutual exclusion raises ToolInputValidationError", True, str(e)[:80])
except Exception as e:
    check("mutual exclusion raises ToolInputValidationError", False, f"wrong exc: {type(e).__name__}: {e}")

# ===========================================================================
print("\n[TEST 7] vision_vqa_tool — VQA call with GeoTIFF (synthetic fallback)")
# ===========================================================================
result = vision_vqa_tool(
    image_path="/data/S2_20240615_L2A.tif",
    text_query="What is the primary land-cover type visible in this Sentinel-2 scene?",
    confidence_threshold=0.3,
    force_vqa=True,
)
check("status == success", result.get("status") == "success", detail=result.get("status"))
check("tool_name == vision_vqa_tool", result.get("tool_name") == "vision_vqa_tool")
check("summary non-empty", bool(result.get("summary")))
check("confidence >= 0", isinstance(result.get("confidence"), (int, float)) and result.get("confidence", -1) >= 0)
check("bounding_boxes is list", isinstance(result.get("bounding_boxes"), list))
check("rs_state_updates present", "rs_state_updates" in result)
check("error is None", result.get("error") is None, detail=str(result.get("error")))

rs = result["rs_state_updates"]
check("rs: tool_outputs present", "tool_outputs" in rs)
check("rs: tool_confidence_scores present", "tool_confidence_scores" in rs)
check("rs: execution_trace is list", isinstance(rs.get("execution_trace"), list))
check("rs: execution_trace has 1 entry", len(rs["execution_trace"]) == 1)
check("rs: bounding_boxes is list", isinstance(rs.get("bounding_boxes"), list))
check("rs: image_inputs is list", isinstance(rs.get("image_inputs"), list))
check("rs: image_inputs has 1 entry", len(rs["image_inputs"]) == 1)

to = rs["tool_outputs"]
check("tool_outputs: vqa_answer non-empty", bool(to.get("vqa_answer")))
check("tool_outputs: vqa_confidence > 0", float(to.get("vqa_confidence", 0)) > 0)
check("tool_outputs: raw_tool_outputs has key", "vision_vqa_tool" in (to.get("raw_tool_outputs") or {}))

trace = rs["execution_trace"][0]
check("trace: tool_name == vision_vqa_tool", trace.get("tool_name") == "vision_vqa_tool")
check("trace: status == success", trace.get("status") == "success")
check("trace: trace_id is UUID", len(trace.get("trace_id", "")) == 36)
check("trace: parameters has image_path", "image_path" in (trace.get("parameters") or {}))
check("trace: output_keys is list", isinstance(trace.get("output_keys"), list))

img_entry = rs["image_inputs"][0]
check("img_entry: image_path matches", img_entry.get("image_path") == "/data/S2_20240615_L2A.tif")
check("img_entry: image_id is UUID", len(img_entry.get("image_id", "")) == 36)
check("img_entry: spatial_role == primary", img_entry.get("spatial_role") == "primary")

# ===========================================================================
print("\n[TEST 8] vision_vqa_tool — Grounding call with PNG (synthetic fallback)")
# ===========================================================================
result_g = vision_vqa_tool(
    image_path="/data/aerial_rgb.png",
    text_query="Locate the water reservoir in the image.",
    confidence_threshold=0.3,
    force_grounding=True,
    n_bboxes=2,
)
check("grounding: status == success", result_g.get("status") == "success")
check("grounding: tool_name == vision_vqa_tool", result_g.get("tool_name") == "vision_vqa_tool")
check("grounding: bounding_boxes list", isinstance(result_g.get("bounding_boxes"), list))

rs_g = result_g["rs_state_updates"]
check("grounding rs: bounding_boxes propagated", isinstance(rs_g.get("bounding_boxes"), list))
to_g = rs_g["tool_outputs"]
check("grounding tool_outputs: bounding_boxes list", isinstance(to_g.get("bounding_boxes"), list))
check("grounding tool_outputs: spatial_masks list", isinstance(to_g.get("spatial_masks"), list))
trace_g = rs_g["execution_trace"][0]
check("grounding trace: status == success", trace_g.get("status") == "success")
check("grounding trace: confidence > 0", float(trace_g.get("confidence", 0)) > 0)

# ===========================================================================
print("\n[TEST 9] vision_vqa_tool — Layer 1 error path (empty image_path)")
# ===========================================================================
err_result = vision_vqa_tool(image_path="", text_query="Any question about the image?")
check("layer1 err: status == error", err_result.get("status") == "error",
      detail=err_result.get("status"))
check("layer1 err: error field non-empty", bool(err_result.get("error")))
check("layer1 err: confidence == 0.0", err_result.get("confidence") == 0.0)
check("layer1 err: rs_state_updates present", "rs_state_updates" in err_result)
check("layer1 err: execution_trace has entry", len(err_result["rs_state_updates"].get("execution_trace", [])) == 1)
err_trace = err_result["rs_state_updates"]["execution_trace"][0]
check("layer1 err trace: status == error", err_trace.get("status") == "error")

# ===========================================================================
print("\n[TEST 10] vision_vqa_tool — Layer 1 error path (unsupported format)")
# ===========================================================================
err_fmt = vision_vqa_tool(image_path="/data/scene.xyz", text_query="What is the land cover here?")
check("layer1 fmt err: status == error", err_fmt.get("status") == "error")
check("layer1 fmt err: error mentions format", "xyz" in (err_fmt.get("error") or "").lower()
      or "format" in (err_fmt.get("error") or "").lower(),
      detail=(err_fmt.get("error") or "")[:100])

# ===========================================================================
print("\n[TEST 11] merge_intermediate_outputs integration with tool_outputs")
# ===========================================================================
state = make_empty_rs_state("Test merge")
# Simulate two tool calls updating tool_outputs via the reducer
call1 = {
    "vqa_answer": "Predominantly mixed forest with urban fringes.",
    "vqa_confidence": 0.94,
    "bounding_boxes": [],
    "spatial_masks": [],
    "raw_tool_outputs": {"vision_vqa_tool": {"task": "vqa"}},
}
call2 = {
    "bounding_boxes": [{"box_id": "b1", "label": "reservoir", "confidence": 0.91}],
    "spatial_masks": [{"mask_id": "m1", "mask_type": "grounding_extent"}],
    "raw_tool_outputs": {"vision_vqa_tool_2nd": {"task": "grounding"}},
}
merged = merge_intermediate_outputs(call1, call2)
check("merge: vqa_answer from call1", merged["vqa_answer"] == "Predominantly mixed forest with urban fringes.")
check("merge: bboxes concatenated", len(merged["bounding_boxes"]) == 1)
check("merge: spatial_masks appended", len(merged["spatial_masks"]) == 1)
check("merge: raw_tool_outputs has both", len(merged["raw_tool_outputs"]) == 2)

# ===========================================================================
print()
if errors:
    print(f"RESULT: {len(errors)} test(s) FAILED: {errors}")
    sys.exit(1)
else:
    print(f"RESULT: All 11 test groups passed.")
    print()
    print("vision_vqa_tool telemetry (VQA call):")
    print(f"  status            : {result['status']}")
    print(f"  confidence        : {result['confidence']}")
    print(f"  execution_time_ms : {result['execution_time_ms']:.2f}")
    print(f"  task_type         : {result['metrics'].get('task_type')}")
    print(f"  image_format      : {result['metrics'].get('image_format')}")
    print(f"  quantization      : {result['metrics'].get('quantization')}")
    print(f"  tool_confidence   : {result['rs_state_updates']['tool_confidence_scores']}")
