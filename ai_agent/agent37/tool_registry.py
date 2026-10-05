"""
Agent37 — Tool Registry
"""

from __future__ import annotations
from typing import Any, Dict, List, Optional, Set, Tuple
from .schemas import BoundToolCall, RegisteredTool, TaskType, ToolParameterSchema

_DEFAULT_TOOLS: List[RegisteredTool] = [
    RegisteredTool(
        tool_id="vision_vqa", name="Vision VQA",
        task_types=[TaskType.VQA],
        parameters=[ToolParameterSchema(name="text_query", param_type="str", required=True)]
    ),
    RegisteredTool(
        tool_id="grounding_rs", name="Remote Sensing Grounding",
        task_types=[TaskType.GROUNDING],
        parameters=[ToolParameterSchema(name="text_query", param_type="str", required=True)]
    ),
    RegisteredTool(
        tool_id="change_detector", name="Change Detector",
        task_types=[TaskType.CHANGE_DETECTION],
        parameters=[]
    ),
]

class ToolRegistry:
    def __init__(self, tools: List[RegisteredTool] | None = None) -> None:
        self._tools = {t.tool_id: t for t in (tools or _DEFAULT_TOOLS)}
        self._task_index = {}
        for t in self._tools.values():
            for tt in t.task_types:
                self._task_index.setdefault(tt, []).append(t.tool_id)

    def get_tool(self, tool_id: str) -> Optional[RegisteredTool]:
        return self._tools.get(tool_id)

    def find_tools_for_task(self, task_type: TaskType) -> List[RegisteredTool]:
        return [self._tools[tid] for tid in self._task_index.get(task_type, []) if tid in self._tools]

    def list_all_tools(self) -> List[RegisteredTool]:
        return list(self._tools.values())

    def bind_parameters(self, tool_id: str, raw_params: Dict[str, Any]) -> BoundToolCall:
        tool = self._tools.get(tool_id)
        if not tool:
            raise ValueError("Tool not found")
            
        return BoundToolCall(
            tool_id=tool_id,
            tool_name=tool.name,
            bound_parameters=raw_params,
            sanitized_parameters=raw_params, 
        )
