"""
SatQuery AI - FastAPI Agentic Microservice Entrypoint
Exposes REST endpoints for satellite intelligence state graph orchestration,
image uploads, cross-modal analysis, bi-temporal change detection,
and user authentication (Signup, Login, JWT verification).
"""

import os
import uuid
import json
import shutil
from pathlib import Path
from typing import Dict, Any, List, Optional, Union
from pydantic import BaseModel

try:
    from fastapi import (
        FastAPI,
        HTTPException,
        Body,
        File,
        UploadFile,
        Form,
        Depends,
        Header,
        BackgroundTasks,
    )
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.staticfiles import StaticFiles

    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False
    class FastAPI:
        def __init__(self, **kwargs):
            pass
        def get(self, path, **kwargs):
            return lambda fn: fn
        def post(self, path, **kwargs):
            return lambda fn: fn
        def add_middleware(self, middleware_class, **kwargs):
            pass
        def mount(self, path, app, name=None):
            pass
    class HTTPException(Exception):
        def __init__(self, status_code: int, detail: str):
            super().__init__(detail)
            self.status_code = status_code
            self.detail = detail
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
    def Field(default=None, **kwargs):
        return default
    class CORSMiddleware:
        pass
    class StaticFiles:
        def __init__(self, **kwargs):
            pass
    def File(default=None, **kwargs):
        return default
    def UploadFile(*args, **kwargs):
        return None
    def Form(default=None, **kwargs):
        return default
    def Depends(fn=None):
        return None
    def Header(default=None, **kwargs):
        return default

from agent_core.orchestrator import Orchestrator
from utils.geospatial import (
    inspect_raster,
    validate_image_pair_alignment,
    verify_band_configuration,
)
from agent_core.state import (
    AgentStateModel,
    RequestStatus,
    ImageInput,
    ImageFormat,
    SensorModality,
    BiTemporalImagePair,
    OpticalSARImagePair,
    ModalityInputs,
    GeoSpatialContext,
)
from auth import (
    get_db,
    User,
    UserCreate,
    UserLogin,
    UserResponse,
    TokenResponse,
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
)

# Define file upload directory
UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="SatQuery AI Agent Microservice",
    description="Agentic AI Microservice for Earth Observation & Satellite Intelligence (Python 3 + FastAPI + LangGraph)",
    version="1.0.0"
)

# Configure CORS Middleware for Frontend Access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory for static file serving (previews & result masks)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Initialize single orchestrator instance
orchestrator = Orchestrator()

# In-memory execution trace store.
# This will later be replaced/extended with persistent database storage.
JOB_TRACES: Dict[str, Dict[str, Any]] = {}
def run_query_job(
    job_id: str,
    q: str,
    geo: Dict[str, Any],
    mod: Dict[str, Any],
    uid: Optional[str],
    sid: Optional[str],
):
    """Run an orchestration job in the FastAPI background worker."""

    try:
        JOB_TRACES[job_id]["status"] = "processing"

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

        JOB_TRACES[job_id]["status"] = "completed"
        JOB_TRACES[job_id]["completed_at"] = (
            __import__("datetime").datetime.utcnow().isoformat() + "Z"
        )
        JOB_TRACES[job_id]["result"] = result_state

    except Exception as e:
        JOB_TRACES[job_id]["status"] = "failed"
        JOB_TRACES[job_id]["error"] = str(e)
        JOB_TRACES[job_id]["completed_at"] = (
            __import__("datetime").datetime.utcnow().isoformat() + "Z"
        )


# ---------------------------------------------------------------------------
# Helper Utility Functions
# ---------------------------------------------------------------------------

def detect_image_format(filename: str) -> str:
    """Infer image format enum string based on filename extension."""
    ext = os.path.splitext(filename)[1].lower()
    if ext in [".tif", ".tiff"]:
        return ImageFormat.GEOTIFF.value if hasattr(ImageFormat, "GEOTIFF") else "geotiff"
    elif ext in [".png"]:
        return ImageFormat.PNG.value if hasattr(ImageFormat, "PNG") else "png"
    elif ext in [".jpg", ".jpeg"]:
        return ImageFormat.JPEG.value if hasattr(ImageFormat, "JPEG") else "jpeg"
    elif ext in [".jp2"]:
        return ImageFormat.JP2.value if hasattr(ImageFormat, "JP2") else "jp2"
    elif ext in [".h5", ".hdf5"]:
        return ImageFormat.HDF5.value if hasattr(ImageFormat, "HDF5") else "hdf5"
    elif ext in [".nc"]:
        return ImageFormat.NETCDF.value if hasattr(ImageFormat, "NETCDF") else "netcdf"
    return ImageFormat.OTHER.value if hasattr(ImageFormat, "OTHER") else "other"


async def save_uploaded_file(upload_file) -> Dict[str, Any]:
    file_id = str(uuid.uuid4())[:8]

    original_filename = upload_file.filename or "uploaded_file"
    safe_filename = f"{file_id}_{original_filename.replace(' ', '_')}"

    file_path = UPLOAD_DIR / safe_filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    file_size = os.path.getsize(file_path)
    fmt = detect_image_format(original_filename)
    relative_url = f"/uploads/{safe_filename}"

    # Validate and inspect geospatial/image metadata
    try:
        geospatial_metadata = inspect_raster(str(file_path))
    except Exception as exc:
        # Remove invalid uploaded file
        if file_path.exists():
            file_path.unlink()

        raise HTTPException(
            status_code=400,
            detail=f"Invalid or unsupported image file: {exc}",
        )

    return {
        "image_id": str(uuid.uuid4()),
        "file_name": original_filename,
        "saved_filename": safe_filename,
        "file_path": str(file_path.resolve()),
        "relative_url": relative_url,
        "file_format": fmt,
        "size_bytes": file_size,
        "size_mb": round(file_size / (1024 * 1024), 2),
        "geospatial_metadata": geospatial_metadata,
    }

def create_image_input_model(file_info: Dict[str, Any], sensor_name: str = "Sentinel-2", modality: str = "optical") -> Dict[str, Any]:
    """Helper to structure an ImageInput object/dict for AgentStateModel."""
    return {
        "image_id": file_info.get("image_id", str(uuid.uuid4())),
        "file_path": file_info.get("file_path", ""),
        "file_format": file_info.get("file_format", "geotiff"),
        "modality": modality,
        "sensor_name": sensor_name,
        "metadata": {
            "file_name": file_info.get("file_name", ""),
            "size_mb": file_info.get("size_mb", 0.0),
            "relative_url": file_info.get("relative_url", ""),
        }
    }


# ---------------------------------------------------------------------------
# Request & Response Pydantic Models
# ---------------------------------------------------------------------------

class QueryRequest(BaseModel):
    query: str
    geo_context: Optional[Dict[str, Any]] = None
    modalities: Optional[Dict[str, Any]] = None
    user_id: Optional[str] = None
    session_id: Optional[str] = None


# ---------------------------------------------------------------------------
# Authentication Endpoints
# ---------------------------------------------------------------------------

@app.post("/signup", response_model=TokenResponse, tags=["Authentication"])
@app.post("/api/v1/auth/signup", response_model=TokenResponse, tags=["Authentication"])
def register_user(payload: UserCreate, db=Depends(get_db)):
    """
    Register a new user account in PostgreSQL.
    Hashes password with passlib/bcrypt and returns user details + JWT token.
    """
    # Check existing user
    existing_user = db.query(User).filter(
        (User.email == payload.email) | (User.username == payload.username)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email address is already registered.")

    hashed_pwd = hash_password(payload.password)
    new_user = User(
        email=payload.email,
        username=payload.username,
        hashed_password=hashed_pwd,
        full_name=payload.full_name,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({
        "sub": new_user.username,
        "user_id": new_user.id,
        "email": new_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user.to_dict()
    }


@app.post("/login", response_model=TokenResponse, tags=["Authentication"])
@app.post("/api/v1/auth/login", response_model=TokenResponse, tags=["Authentication"])
def login_user(payload: UserLogin, db=Depends(get_db)):
    """
    Authenticate user credentials (username or email + password).
    Returns JWT bearer token upon successful authentication.
    """
    user = db.query(User).filter(
        (User.email == payload.username_or_email) | (User.username == payload.username_or_email)
    ).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username/email or password.")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is deactivated.")

    token = create_access_token({
        "sub": user.username,
        "user_id": user.id,
        "email": user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user.to_dict()
    }


@app.get("/api/v1/auth/me", response_model=UserResponse, tags=["Authentication"])
def get_current_user_profile(authorization: Optional[str] = Header(None), db=Depends(get_db)):
    """
    Retrieve authenticated user profile using Bearer JWT token.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header (Bearer token required).")

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid or expired access token.")

    user = db.query(User).filter(User.username == payload["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    return user.to_dict()


# ---------------------------------------------------------------------------
# REST Endpoints
# ---------------------------------------------------------------------------

@app.get("/")
def read_root():
    """Service status and system info endpoint."""
    return {
        "status": "online",
        "service": "SatQuery AI Microservice",
        "engine": "LangGraph Multi-Agent State Graph",
        "version": "1.0.0",
        "capabilities": [
            "Natural Language Satellite VQA",
            "Single & Bi-temporal Image Processing",
            "Optical-SAR Cross-Modal Fusion",
            "Automated GeoJSON Grounding & Change Detection",
            "PostgreSQL & JWT Authentication Backend"
        ]
    }


@app.get("/health")
def health_check():
    """Health check endpoint for container orchestrators and load balancers."""
    return {
        "status": "healthy",
        "service": "satquery-agent",
        "uploads_writable": os.access(UPLOAD_DIR, os.W_OK)
    }

@app.get("/api/v1/system-status")
def system_status():
    """Return backend service and model status."""
    return {
        "status": "operational",
        "service": "satquery-agent",
        "version": "1.0.0",
        "components": {
            "api": "operational",
            "orchestrator": "operational" if orchestrator else "unavailable",
            "vlm": "loaded",
            "geospatial": "operational",
            "upload_directory": {
                "path": str(UPLOAD_DIR.resolve()),
                "writable": os.access(UPLOAD_DIR, os.W_OK),
            },
        },
    }

@app.get("/api/v1/trace/{job_id}")
def get_execution_trace(job_id: str):
    """Return execution trace information for a job."""
    trace = JOB_TRACES.get(job_id)

    if trace is None:
        raise HTTPException(
            status_code=404,
            detail=f"Job '{job_id}' not found",
        )

    return trace

@app.post("/api/v1/orchestrate")
@app.post("/api/v1/query")
def orchestrate_query(
    payload: QueryRequest,
    background_tasks: BackgroundTasks,
):
    """
    Create an asynchronous orchestration job.

    The API returns immediately with a job_id while the
    VLM/orchestrator runs in the background.
    """

    q = getattr(payload, "query", "")

    if not q.strip():
        raise HTTPException(
            status_code=400,
            detail="Query string cannot be empty",
        )

    geo = getattr(payload, "geo_context", {}) or {}
    mod = getattr(payload, "modalities", {}) or {}
    uid = getattr(payload, "user_id", None)
    sid = getattr(payload, "session_id", None)

    job_id = str(uuid.uuid4())

    JOB_TRACES[job_id] = {
        "job_id": job_id,
        "status": "queued",
        "query": q,
        "started_at": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "completed_at": None,
        "error": None,
        "result": None,
    }

    background_tasks.add_task(
        run_query_job,
        job_id,
        q,
        geo,
        mod,
        uid,
        sid,
    )

    return {
        "job_id": job_id,
        "status": "queued",
        "message": "Query accepted and processing started.",
        "trace_url": f"/api/v1/trace/{job_id}",
    }
@app.post("/api/v1/upload")
async def upload_standalone_file(file: UploadFile = File(...)):
    """
    Standalone endpoint for uploading satellite imagery files (GeoTIFF, COG, PNG, JP2, etc.).
    Returns saved file location, metadata, and preview URL.
    """
    if not file:
        raise HTTPException(status_code=400, detail="No file provided in request")
    try:
        file_info = await save_uploaded_file(file)
        return {
            "status": "success",
            "message": "File uploaded successfully",
            "file": file_info
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload error: {str(e)}")


@app.post("/api/v1/query-with-image")
async def query_with_image(
    query: str = Form(...),
    file: Optional[UploadFile] = File(None),
    files: Optional[List[UploadFile]] = File(None),
    sensor: Optional[str] = Form("Sentinel-2"),
    aoi: Optional[str] = Form(None),
    date_range: Optional[str] = Form(None),
    cloud_cover: Optional[str] = Form(None),
    task_type: Optional[str] = Form(None),
    user_id: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
):
    """
    Combined endpoint to upload satellite image(s) and submit a text query in a single multipart request.
    Executes the multi-agent graph pipeline with uploaded image context.
    """
    if not query or not query.strip():
        raise HTTPException(status_code=400, detail="Query field is required")

    uploaded_files_info = []

    # Process single file parameter
    if file and file.filename:
        info = await save_uploaded_file(file)
        uploaded_files_info.append(info)

    # Process multiple files parameter
    if files:
        for f in files:
            if f and f.filename and f.filename not in [i["file_name"] for i in uploaded_files_info]:
                info = await save_uploaded_file(f)
                uploaded_files_info.append(info)

    # Construct image input structures
    image_inputs = [create_image_input_model(info, sensor_name=sensor or "Sentinel-2") for info in uploaded_files_info]
    primary_image = image_inputs[0] if image_inputs else None

    # Construct geo context
    geo_context = {
        "aoi_name": aoi or "Default Global",
        "date_range": date_range or "2023-2024",
        "cloud_cover": cloud_cover or "<15%",
    }

    # Construct modality inputs structure
    modalities = {
        "single_image": primary_image,
        "uploaded_images": image_inputs,
        "optical_image_url": primary_image["metadata"]["relative_url"] if primary_image else None,
    }

    try:
        model = AgentStateModel(
            raw_query=query,
            query=query,
            geo_context=geo_context,
            modalities=modalities,
            user_id=user_id,
            session_id=session_id,
        )
        if task_type:
            model.classified_task = task_type

        initial_state = model.to_graph_state()
        result_state = orchestrator.run(query, initial_state)
        return result_state
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image query execution failure: {str(e)}")


@app.post("/api/v1/analyze-bitemporal")
async def analyze_bitemporal(
    query: str = Form(...),
    t1_file: UploadFile = File(...),
    t2_file: UploadFile = File(...),
    sensor: Optional[str] = Form("Sentinel-2"),
    user_id: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
):
    """
    Dedicated endpoint for bi-temporal change detection with T1 (pre-event) and T2 (post-event) satellite images.
    """
    if not t1_file or not t2_file:
        raise HTTPException(status_code=400, detail="Both t1_file and t2_file are required for bi-temporal analysis")

    t1_info = await save_uploaded_file(t1_file)
    t2_info = await save_uploaded_file(t2_file)
    alignment_result = validate_image_pair_alignment(
    t1_info["file_path"],
    t2_info["file_path"],
)
    if not alignment_result["aligned"]:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Bitemporal images are not spatially aligned.",
                "alignment_checks": alignment_result,
        },
    )
    t1_image_input = create_image_input_model(t1_info, sensor_name=sensor or "Sentinel-2")
    t2_image_input = create_image_input_model(t2_info, sensor_name=sensor or "Sentinel-2")

    bi_temporal_pair = {
        "t1_image": t1_image_input,
        "t2_image": t2_image_input,
        "alignment_verified": alignment_result["aligned"],
        "alignment_checks": alignment_result,
    }

    modalities = {
        "bi_temporal_pair": bi_temporal_pair,
        "uploaded_images": [t1_image_input, t2_image_input],
        "t1_image_url": t1_info["relative_url"],
        "t2_image_url": t2_info["relative_url"]
    }

    try:
        model = AgentStateModel(
            raw_query=query,
            query=query,
            classified_task="change_detection",
            modalities=modalities,
            user_id=user_id,
            session_id=session_id
        )
        initial_state = model.to_graph_state()
        result_state = orchestrator.run(query, initial_state)
        return result_state
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Bi-temporal analysis failure: {str(e)}")


@app.post("/api/v1/analyze-crossmodal")
async def analyze_crossmodal(
    query: str = Form(...),
    optical_file: UploadFile = File(...),
    sar_file: UploadFile = File(...),
    user_id: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
):
    """
    Dedicated endpoint for optical-SAR cross-modal fusion analysis.
    """
    if not optical_file or not sar_file:
        raise HTTPException(status_code=400, detail="Both optical_file and sar_file are required for cross-modal analysis")

    opt_info = await save_uploaded_file(optical_file)
    sar_info = await save_uploaded_file(sar_file)

    optical_metadata = verify_band_configuration(
        opt_info["file_path"],
        expected_modality="optical",
    )

    sar_metadata = verify_band_configuration(
        sar_info["file_path"],
        expected_modality="sar",
    )

    if not optical_metadata["valid"]:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Optical image failed band/modality validation.",
                "validation": optical_metadata,
            },
        )

    if not sar_metadata["valid"]:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "SAR image failed band/modality validation.",
                "validation": sar_metadata,
        },
    )

    opt_input = create_image_input_model(opt_info, sensor_name="Sentinel-2", modality="optical")
    sar_input = create_image_input_model(sar_info, sensor_name="Sentinel-1", modality="sar")

    optical_sar_pair = {
        "optical_image": opt_input,
        "sar_image": sar_input,
        "polarization": "+".join(sar_metadata.get("polarizations", [])),
        "fusion_strategy": "cross_attention"
    }

    modalities = {
        "optical_sar_pair": optical_sar_pair,
        "uploaded_images": [opt_input, sar_input],
        "optical_image_url": opt_info["relative_url"],
        "sar_image_url": sar_info["relative_url"]
    }

    try:
        model = AgentStateModel(
            raw_query=query,
            query=query,
            classified_task="cross_modal_fusion",
            modalities=modalities,
            user_id=user_id,
            session_id=session_id
        )
        initial_state = model.to_graph_state()
        result_state = orchestrator.run(query, initial_state)
        return result_state
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cross-modal analysis failure: {str(e)}")
