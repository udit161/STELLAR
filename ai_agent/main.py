"""
SatQuery AI - FastAPI Agentic Microservice Entrypoint
Exposes REST endpoints for satellite intelligence state graph orchestration.
"""

from typing import Dict, Any, Optional

try:
    from fastapi import FastAPI, HTTPException, Body
    from pydantic import BaseModel
    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False
    class FastAPI:
        def __init__(self, **kwargs):
            pass
        def get(self, path):
            return lambda fn: fn
        def post(self, path):
            return lambda fn: fn
    class HTTPException(Exception):
        def __init__(self, status_code: int, detail: str):
            super().__init__(detail)
            self.status_code = status_code
            self.detail = detail
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)

from agent_core.orchestrator import Orchestrator
from agent_core.state import AgentStateModel, RequestStatus

app = FastAPI(
    title="SatQuery AI Agent Microservice",
    description="Agentic AI Microservice (Python 3 + FastAPI + LangGraph)",
    version="1.0.0"
)

# Initialize single orchestrator instance
orchestrator = Orchestrator()


class QueryRequest(BaseModel):
    query: str
    geo_context: Optional[Dict[str, Any]] = None
    modalities: Optional[Dict[str, Any]] = None
    user_id: Optional[str] = None
    session_id: Optional[str] = None


@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "SatQuery AI Microservice",
        "engine": "LangGraph Multi-Agent State Graph",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "satquery-agent"}


@app.post("/api/v1/orchestrate")
def orchestrate_query(payload: QueryRequest):
    """
    Execute the multi-agent state graph pipeline for an incoming user query.
    """
    try:
        q = getattr(payload, "query", "")
        geo = getattr(payload, "geo_context", {}) or {}
        mod = getattr(payload, "modalities", {}) or {}
        uid = getattr(payload, "user_id", None)
        sid = getattr(payload, "session_id", None)

        model = AgentStateModel(
            raw_query=q,
            query=q,
            geo_context=geo,
            modalities=mod,
            user_id=uid,
            session_id=sid,
        )
        initial_state = model.to_graph_state()
        result_state = orchestrator.run(q, initial_state)
        return result_state
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Orchestration failure: {str(e)}")
