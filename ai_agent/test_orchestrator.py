"""
Integration test for the new orchestrator nodes in agent_core/orchestrator.py:
- intent_classifier_node
- vision_vqa_specialist_node
- aggregation_node

Validates the full pipeline flow for a single image + VQA query.
"""
import sys, os, uuid
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator
from agent_core.state import make_empty_rs_state

PASS = "[PASS]"
FAIL = "[FAIL]"
errors = []

def check(label, cond, detail=""):
    if cond:
        print(f"  {PASS}  {label}" + (f" — {detail}" if detail else ""))
    else:
        print(f"  {FAIL}  {label}" + (f" — {detail}" if detail else ""))
        errors.append(label)

print("\n[TEST 1] Orchestrator Graph Construction")
orch = Orchestrator()
check("Orchestrator instantiated", orch is not None)

print("\n[TEST 2] Intent Classifier — Single Image QA")
state = make_empty_rs_state("What is the primary land cover here?")
# Mock the validation and controller steps manually to set up for intent_classifier
state["is_valid"] = True
state["image_inputs"] = [{"image_path": "/data/test.tif", "detected_modality": "optical", "spatial_role": "primary"}]
state["single_image"] = {"file_path": "/data/test.tif"}

intent_res = orch.intent_classifier_node(state)
state.update(intent_res)

check("classified_task == VQA", state.get("classified_task") == "VQA")
check("use_strict_vqa_tool == True", state.get("use_strict_vqa_tool") is True)
intent = state.get("intent_classification", {})
check("intent contains keyword scores", "keyword_scores" in intent)
check("intent winning category is vqa", intent.get("winning_category") == "vqa")
check("intent routing decision is vision_vqa_specialist", intent.get("routing_decision") == "vision_vqa_specialist")


print("\n[TEST 3] Vision VQA Specialist Node")
vqa_res = orch.vision_vqa_specialist_node(state)
# Note: Since we are running the node directly, we need to apply the dict merge correctly as the reducer would.
for k, v in vqa_res.items():
    if k in ["thought_trace", "routing_history", "tool_logs", "artifacts", "bounding_boxes", "execution_trace", "image_inputs"]:
        state[k] = (state.get(k) or []) + (v if isinstance(v, list) else [v])
    elif k in ["intermediate_outputs", "spatial_outputs", "tool_outputs", "tool_confidence_scores"]:
        state[k] = {**(state.get(k) or {}), **(v or {})}
    else:
        state[k] = v

check("status == specialist_inference", state.get("status") == "specialist_inference")
check("execution_trace has entry", len(state.get("execution_trace", [])) > 0)
check("tool_outputs has vqa_answer", "vqa_answer" in state.get("tool_outputs", {}))
check("tool_confidence_scores has vision_vqa_tool", "vision_vqa_tool" in state.get("tool_confidence_scores", {}))

print("\n[TEST 4] Aggregation Node")
agg_res = orch.aggregation_node(state)
state.update(agg_res)

summary = state.get("intermediate_outputs", {}).get("execution_summary", {})
check("execution_summary present", bool(summary))
check("execution_summary has tool_calls", len(summary.get("tool_calls", [])) > 0)
check("execution_summary overall_confidence > 0", summary.get("overall_confidence", 0) > 0)
check("execution_summary pipeline_ok", summary.get("pipeline_ok") is True)


print("\n[TEST 5] Full Pipeline run (FallbackGraph via stream)")
stream_state = make_empty_rs_state("Identify the aircraft in this image.")
stream_state["image_inputs"] = [{"image_path": "/data/aircraft.tif", "detected_modality": "optical", "spatial_role": "primary"}]
stream_state["single_image"] = {"file_path": "/data/aircraft.tif"}

steps = []
for event in orch.stream("Identify the aircraft in this image.", stream_state):
    steps.append(event["step"])
    final_state = event["state"]

check("stream steps contain intent_classifier", "intent_classifier" in steps)
check("stream steps contain vision_vqa_specialist", "vision_vqa_specialist" in steps)
check("stream steps contain aggregation", "aggregation" in steps)
check("final_state has execution_summary", "execution_summary" in final_state.get("intermediate_outputs", {}))

if errors:
    print(f"\nRESULT: {len(errors)} test(s) FAILED: {errors}")
    sys.exit(1)
else:
    print(f"\nRESULT: All tests passed.")
