---
title: SatQuery AI Agent
emoji: 🛰️
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# SatQuery AI Agent

FastAPI-based AI microservice for satellite imagery intelligence.

## Endpoints

- `GET /health` — Health check
- `POST /query` — Submit satellite analysis query
- `POST /upload` — Upload satellite image
- `GET /query/{id}` — Get query status & result
- `WS /ws/{session_id}` — Real-time WebSocket updates
