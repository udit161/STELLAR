"""
Agent37 — Pydantic Schemas & Data Contracts
"""

from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, field_validator

class TaskType(str, Enum):
    VQA = "vqa"
    CHANGE_DETECTION = "change_detection"
    GROUNDING = "grounding"
    CROSS_MODAL_FUSION = "cross_modal_fusion"
    LAND_COVER = "land_cover"
    COMPOUND_PIPELINE = "compound_pipeline"
    UNKNOWN = "unknown"

class ExecutionStatus(str, Enum):
    QUEUED = "queued"
    PARSING = "parsing"
    ROUTING = "routing"
    BINDING = "binding"
    EXECUTING = "executing"
    SYNTHESIZING = "synthesizing"
    COMPLETED = "completed"
    FAILED = "failed"

class TraceEventType(str, Enum):
    INTENT_PARSED = "intent_parsed"
    TOOL_RESOLVED = "tool_resolved"
    PARAMS_BOUND = "params_bound"
    PARAMS_SANITIZED = "params_sanitized"
    TOOL_DISPATCHED = "tool_dispatched"
    TOOL_COMPLETED = "tool_completed"
    TOOL_FAILED = "tool_failed"
    PIPELINE_STEP = "pipeline_step"
    OUTPUT_SYNTHESIZED = "output_synthesized"
    JOB_QUEUED = "job_queued"
    JOB_STARTED = "job_started"
    JOB_COMPLETED = "job_completed"
    JOB_FAILED = "job_failed"
    GUARDRAIL_TRIGGERED = "guardrail_triggered"

class ParsedEntity(BaseModel):
    entity_type: str
    value: str
    confidence: float = 1.0
    span: Optional[str] = None

class ParsedIntent(BaseModel):
    task_type: TaskType
    confidence: float = 1.0
    reasoning: str = ""
    entities: List[ParsedEntity] = []
    requires_images: bool = False
    requires_temporal_pair: bool = False
    requires_sar: bool = False
    is_compound: bool = False
    pipeline_steps: List[TaskType] = []
    raw_query: str = ""
    extracted_parameters: Dict[str, Any] = {}

class ToolParameterSchema(BaseModel):
    name: str
    param_type: str
    default: Any = None
    required: bool = False
    min_value: Optional[float] = None
    max_value: Optional[float] = None
    allowed_values: Optional[List[str]] = None
    description: str = ""

class RegisteredTool(BaseModel):
    tool_id: str
    name: str
    description: str = ""
    task_types: List[TaskType] = []
    parameters: List[ToolParameterSchema] = []
    requires_gpu: bool = False
    endpoint_url: Optional[str] = None
    timeout_seconds: int = 120
    is_available: bool = True

class BoundToolCall(BaseModel):
    tool_id: str
    tool_name: str
    bound_parameters: Dict[str, Any] = {}
    sanitized_parameters: Dict[str, Any] = {}
    stripped_parameters: List[str] = []
    coerced_parameters: Dict[str, str] = {}

class TraceEvent(BaseModel):
    event_id: str = Field(default_factory=lambda: str(uuid.uuid4())[:12])
    event_type: TraceEventType
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")
    message: str = ""
    details: Dict[str, Any] = {}
    duration_ms: Optional[float] = None
    step_index: Optional[int] = None

class ExecutionTrace(BaseModel):
    job_id: str
    events: List[TraceEvent] = []
    total_duration_ms: Optional[float] = None
    step_count: int = 0

    def add_event(self, event_type: TraceEventType, message: str = "", details: Dict[str, Any] | None = None, duration_ms: float | None = None) -> TraceEvent:
        event = TraceEvent(
            event_type=event_type,
            message=message,
            details=details or {},
            duration_ms=duration_ms,
            step_index=len(self.events),
        )
        self.events.append(event)
        self.step_count = len(self.events)
        return event

class ToolExecutionResult(BaseModel):
    tool_id: str
    tool_name: str
    success: bool = True
    result_data: Dict[str, Any] = {}
    error: Optional[str] = None
    duration_ms: float = 0.0
    confidence: Optional[float] = None

class Agent37QueryRequest(BaseModel):
    query: str
    images: List[Dict[str, Any]] = []
    geo_context: Optional[Dict[str, Any]] = None
    session_id: Optional[str] = None
    user_id: Optional[str] = None
    options: Dict[str, Any] = {}

    @field_validator("query")
    @classmethod
    def query_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Query cannot be empty")
        return v.strip()

class Agent37JobResponse(BaseModel):
    job_id: str
    status: ExecutionStatus
    message: str = ""
    trace_url: str = ""

class Agent37ResultResponse(BaseModel):
    job_id: str
    status: ExecutionStatus
    query: str = ""
    intent: Optional[ParsedIntent] = None
    tool_calls: List[BoundToolCall] = []
    results: List[ToolExecutionResult] = []
    final_response: Optional[str] = None
    execution_trace: Optional[ExecutionTrace] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    total_duration_ms: Optional[float] = None
    error: Optional[str] = None

class WorkerEndpoint(BaseModel):
    worker_id: str
    name: str
    base_url: str
    health_endpoint: str = "/health"
    is_healthy: bool = True
    capabilities: List[str] = []
    provider: str = "local"
    gpu_type: Optional[str] = None
    last_health_check: Optional[str] = None
