"""
Tool registry (VQA, Grounding, Fusion routing)
"""

def vqa_tool(image_path: str, prompt: str) -> str:
    """Perform Visual Question Answering on satellite imagery."""
    pass

def grounding_tool(image_path: str, target: str) -> dict:
    """Perform object grounding and spatial detection on satellite imagery."""
    pass

def fusion_routing_tool(optical_path: str, sar_path: str) -> dict:
    """Route data to optical-SAR fusion module."""
    pass
