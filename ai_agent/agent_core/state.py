"""
TypedDict definitions for graph state persistence
"""
from typing import TypedDict, List, Optional, Any

class AgentState(TypedDict):
    query: str
    image_path: Optional[str]
    messages: List[dict]
    tool_outputs: dict
    final_response: Optional[str]
