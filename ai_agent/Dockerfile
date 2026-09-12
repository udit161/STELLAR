# SatQuery AI - Python AI Backend
FROM python:3.10-slim

# System dependencies required by GDAL/Rasterio/PROJ
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gdal-bin \
    libgdal-dev \
    libproj-dev \
    proj-data \
    proj-bin \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python dependency file
COPY ai_agent/requirements.txt ./requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the AI backend as a Python package
COPY ai_agent ./ai_agent

# Ensure the project root is on Python's module path
ENV PYTHONPATH=/app

EXPOSE 8000

# Start FastAPI using the package-qualified module
CMD ["uvicorn", "ai_agent.main:app", "--host", "0.0.0.0", "--port", "8000"]