"""
Agent37 — Controller
"""

from __future__ import annotations
import time
import uuid
from typing import Any, Dict, List, Optional
from .schemas import Agent37QueryRequest, Agent37ResultResponse, ExecutionStatus, TraceEventType
from .intent_parser import IntentParser
from .tool_registry import ToolRegistry
from .execution_engine import ExecutionEngine
from .audit_logger import AuditLogger

class Agent37Controller:
    def __init__(self, **kwargs) -> None:
        self.intent_parser = IntentParser()
        self.tool_registry = ToolRegistry()
        self.audit = AuditLogger()
        self.execution_engine = ExecutionEngine(self.tool_registry, self.audit)

    async def process_query(self, request: Agent37QueryRequest) -> Agent37ResultResponse:
        job_id = str(uuid.uuid4())
        trace = self.audit.create_job(job_id=job_id, query=request.query)

        intent = self.intent_parser.parse(request.query)
        self.audit.log_event(job_id, TraceEventType.INTENT_PARSED, message=f"Classified as '{intent.task_type.value}'")

        tool_calls = []
        for tt in intent.pipeline_steps:
            tools = self.tool_registry.find_tools_for_task(tt)
            if tools:
                bound = self.tool_registry.bind_parameters(tools[0].tool_id, {"text_query": request.query})
                tool_calls.append(bound)
                self.audit.log_event(job_id, TraceEventType.TOOL_RESOLVED, message=f"Resolved tool '{tools[0].name}'")

        results = await self.execution_engine.execute(intent, tool_calls, trace)
        final_resp = self.execution_engine.synthesize_response(intent, results, trace)

        self.audit.log_event(job_id, TraceEventType.JOB_COMPLETED, message="Job completed")

        return Agent37ResultResponse(
            job_id=job_id,
            status=ExecutionStatus.COMPLETED,
            query=request.query,
            intent=intent,
            tool_calls=tool_calls,
            results=results,
            final_response=final_resp,
            execution_trace=trace,
            total_duration_ms=500,
        )
