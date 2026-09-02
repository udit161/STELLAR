"""
FastAPI server entry point
"""
from fastapi import FastAPI

app = FastAPI(
    title="SatQuery AI Agent Microservice",
    description="Agentic AI Microservice (Python 3 + FastAPI)",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"status": "online", "service": "SatQuery AI Microservice"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
