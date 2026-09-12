"""
run_agent.py — Standalone High-Level Interface for SatQuery AI Agent
===================================================================

Provides execute_satquery_agent(...) to execute satellite intelligence query workflows
over input imagery using the compiled LangGraph orchestrator.
Returns a clean dictionary containing the final natural language answer,
spatial visual evidence (bounding box coordinates / mask paths), and the auditable ISRO evaluation trace.
"""

import sys
import os
import uuid
import json
from typing import Dict, List, Any, Optional

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent_core.orchestrator import Orchestrator
from agent_core.state import TaskType, RequestStatus


def execute_satquery_agent(
    query: str,
    image_paths: List[str],
    metadata: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Executes the SatQuery AI agent pipeline on a given text query and list of satellite image paths.

    Parameters:
      query (str): User natural language prompt / question.
      image_paths (list[str]): List of satellite image file paths (GeoTIFF, COG, PNG, JP2).
      metadata (dict, optional): Auxiliary metadata (e.g. coordinates, sensors, dates).

    Returns:
      dict: Clean output dictionary containing:
        - answer: Final natural language intelligence response.
        - executive_summary: Executive summary of analysis.
        - spatial_visual_evidence: Visual evidence deliverables (bounding boxes, change masks, GeoJSON).
        - auditable_trace: Sanitized ISRO evaluation trace (task_type, invoked_specialists, permitted_params, confidence, artifacts).
        - confidence_score: Overall confidence score.
        - status: Pipeline completion status.
        - request_id: Unique request identifier.
    """
    if metadata is None:
        metadata = {}

    req_id = metadata.get("request_id") or str(uuid.uuid4())
    img_paths = image_paths or []

    # Build uploaded_images list with spatial roles
    uploaded_images = []
    for idx, path in enumerate(img_paths):
        path_lower = str(path).lower()
        role = "primary"
        if len(img_paths) >= 2:
            if "t1" in path_lower or "before" in path_lower or idx == 0:
                role = "t1"
            elif "t2" in path_lower or "after" in path_lower or idx == 1:
                role = "t2"
            if "optical" in path_lower:
                role = "optical"
            elif "sar" in path_lower:
                role = "sar"

        uploaded_images.append({
            "image_id": str(uuid.uuid4()),
            "file_path": path,
            "path": path,
            "role": role,
            "modality": "sar" if role == "sar" else "optical"
        })

    # Prepare initial graph state
    initial_state: Dict[str, Any] = {
        "request_id": req_id,
        "raw_query": query,
        "query": query,
        "uploaded_images": uploaded_images,
        "geo_context": metadata.get("geo_context") or {
            "latitude": metadata.get("latitude"),
            "longitude": metadata.get("longitude"),
            "bbox": metadata.get("bbox")
        },
        "conversation_history": metadata.get("conversation_history") or [],
        "spatial_context_cache": metadata.get("spatial_context_cache") or {},
        "specialist_model_configs": metadata.get("specialist_model_configs") or {},
    }

    # Initialize orchestrator and run compiled workflow
    orchestrator = Orchestrator()
    final_state = orchestrator.run(query=query, state=initial_state)

    # Extract final natural language answer
    answer = (
        final_state.get("final_response")
        or final_state.get("executive_summary")
        or "Satellite intelligence analysis completed."
    )

    # Extract spatial visual evidence (coordinates, bounding boxes, mask paths)
    bboxes = final_state.get("bounding_boxes") or []
    c_mask = final_state.get("change_mask") or {}
    spatial_outs = final_state.get("spatial_outputs") or {}
    artifacts = final_state.get("artifacts") or []

    spatial_visual_evidence = {
        "bounding_boxes": bboxes,
        "change_mask": c_mask,
        "spatial_outputs": spatial_outs,
        "artifacts": artifacts,
    }

    # Extract sanitized auditable ISRO trace
    auditable_trace = final_state.get("isro_trace")
    if not auditable_trace:
        auditable_trace = orchestrator.format_isro_trace(final_state)

    overall_confidence = final_state.get("confidence_score", 0.0)
    status_str = final_state.get("status", RequestStatus.COMPLETED.value)

    return {
        "request_id": req_id,
        "query": query,
        "answer": answer,
        "executive_summary": final_state.get("executive_summary", ""),
        "spatial_visual_evidence": spatial_visual_evidence,
        "auditable_trace": auditable_trace,
        "confidence_score": overall_confidence,
        "status": status_str,
    }


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="SatQuery AI Agent Execution Entrypoint")
    parser.add_argument("--query", type=str, required=True, help="User text query")
    parser.add_argument("--images", nargs="*", default=[], help="Image paths")
    args = parser.parse_args()

    res = execute_satquery_agent(query=args.query, image_paths=args.images)
    print(json.dumps(res, indent=2))
