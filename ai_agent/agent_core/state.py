"""
SatQuery AI - Agent State Schema
Tracks the entire lifecycle of a satellite intelligence user request across the LangGraph state graph.
Includes rich schemas for:
- Inputs: Raw query, uploaded image paths (single, bi-temporal, optical-SAR), formats (GeoTIFF, COG, PNG).
- Thought Process: Classified task ("VQA", "change_detection", "grounding", "cross_modal_fusion"), selected specialist models, and reasoning traces.
- Multi-Step Execution: Chained compound query pipelines and execution queues.
- Validation Flags: Format support, modality compatibility, geospatial boundary checks, and error logs.
- Outputs: Final textual answer, spatial outputs (bounding boxes, change masks, GeoJSON), and confidence scores.
"""

from enum import Enum
from typing import TypedDict, List, Dict, Optional, Any, Union, Annotated
import operator
import uuid
from datetime import datetime

# Optional Pydantic support with zero-dependency fallback
try:
    from pydantic import BaseModel, Field
    PYDANTIC_AVAILABLE = True
except ImportError:
    PYDANTIC_AVAILABLE = False
    
    class _FieldInfo:
        def __init__(self, default=None, default_factory=None, description=""):
            self.default = default
            self.default_factory = default_factory
            self.description = description

        def get_value(self):
            if self.default_factory is not None:
                return self.default_factory()
            return self.default if self.default is not ... else None

    def Field(default=None, default_factory=None, description=""):
        return _FieldInfo(default=default, default_factory=default_factory, description=description)

    class BaseModel:
        def __init__(self, **kwargs):
            # 1. Initialize from class hierarchy defaults
            for cls in reversed(self.__class__.__mro__):
                for k, v in getattr(cls, "__dict__", {}).items():
                    if k.startswith("_"):
                        continue
                    if isinstance(v, _FieldInfo):
                        setattr(self, k, v.get_value())
                    elif not callable(v):
                        setattr(self, k, v)
            # 2. Apply kwargs
            for k, v in kwargs.items():
                setattr(self, k, v)

        def model_dump(self):
            out = {}
            for k, v in self.__dict__.items():
                if k.startswith("_"):
                    continue
                if hasattr(v, "model_dump") and callable(v.model_dump):
                    out[k] = v.model_dump()
                elif isinstance(v, Enum):
                    out[k] = v.value
                elif isinstance(v, list):
                    out[k] = [
                        item.model_dump() if (hasattr(item, "model_dump") and callable(item.model_dump)) else (item.value if isinstance(item, Enum) else item)
                        for item in v
                    ]
                elif isinstance(v, dict):
                    out[k] = {
                        dk: (dv.model_dump() if (hasattr(dv, "model_dump") and callable(dv.model_dump)) else (dv.value if isinstance(dv, Enum) else dv))
                        for dk, dv in v.items()
                    }
                else:
                    out[k] = v
            return out


class ImageFormat(str, Enum):
    """Supported satellite and aerial imagery file formats."""
    GEOTIFF = "geotiff"           # .tif / .tiff (GeoTIFF)
    COG = "cog"                   # Cloud Optimized GeoTIFF
    PNG = "png"                   # Standard RGB / Mask
    JPEG = "jpeg"                 # Standard lossy image
    JP2 = "jp2"                   # JPEG 2000 (Sentinel-2 L1C/L2A)
    HDF5 = "hdf5"                 # Hierarchical Data Format (.h5 / .hdf5)
    NETCDF = "netcdf"             # Network Common Data Form (.nc)
    SAFE = "safe"                 # ESA Sentinel Standard Archive Format
    OTHER = "other"


class SensorModality(str, Enum):
    """Satellite sensor modality types."""
    OPTICAL = "optical"
    SAR = "sar"                   # Synthetic Aperture Radar
    MULTISPECTRAL = "multispectral"
    HYPERSPECTRAL = "hyperspectral"
    THERMAL = "thermal"
    DEM = "dem"                   # Digital Elevation Model
    UNKNOWN = "unknown"


class RequestStatus(str, Enum):
    """Lifecycle status of a user query in the agentic workflow."""
    PENDING = "pending"
    ROUTING = "routing"
    PLANNING = "planning"
    VALIDATING = "validating"
    FETCHING_DATA = "fetching_data"
    SPECIALIST_INFERENCE = "specialist_inference"
    FUSION = "fusion"
    SYNTHESIZING = "synthesizing"
    COMPLETED = "completed"
    FAILED = "failed"
    REQUIRES_USER_INPUT = "requires_user_input"


class TaskType(str, Enum):
    """Identified task category for satellite intelligence query."""
    VQA = "VQA"                                       # Visual Question Answering on Earth Observation data
    CHANGE_DETECTION = "change_detection"             # Bi-temporal environmental or structural changes
    GROUNDING = "grounding"                           # Spatial object localization and bounding box detection
    CROSS_MODAL_FUSION = "cross_modal_fusion"         # Optical + SAR all-weather multi-sensor fusion
    LAND_COVER_CLASSIFICATION = "land_cover"          # Pixel/segment land use classification
    DAMAGE_ASSESSMENT = "damage_assessment"           # Post-disaster structural/flood damage evaluation
    COMPOUND_PIPELINE = "compound_pipeline"           # Chained multi-specialist workflow (e.g. Fusion -> Change -> Grounding)
    GENERAL_EXPLORATION = "general_exploration"       # Geospatial search and general Q&A


class SpecialistModelType(str, Enum):
    """Catalog of available specialist models and backbones."""
    VISION_VQA_MODEL = "vision_vqa_model"             # BigEarthNet / GeoCLIP / ViT VQA Model
    CHANGE_DETECTOR_MODEL = "change_detector"         # Siamese Bi-temporal CNN/Transformer
    GROUNDING_RS_MODEL = "grounding_rs"               # Remote sensing open-vocabulary object detector
    CROSS_MODAL_FUSION_NET = "cross_modal_fusion"     # Optical-SAR cross-attention alignment module
    LAND_COVER_CLASSIFIER = "land_cover_classifier"   # Multi-spectral ResNet / ConvNeXt classifier
    SAR_FLOOD_MAPPER = "sar_flood_mapper"             # Sentinel-1 SAR water thresholding / UNet
    GEO_METADATA_EXTRACTOR = "geo_metadata_extractor" # GDAL / Rasterio metadata parser


# ---------------------------------------------------------------------------
# Validation & Thought Process Models
# ---------------------------------------------------------------------------

class ValidationFlags(BaseModel):
    """
    Granular gatekeeping flags verifying inputs, formats, coordinates, and task compatibility.
    """
    is_valid: bool = Field(True, description="Master validation status: False if any hard check fails")
    has_required_images: bool = Field(False, description="True if required images for the classified task are present")
    is_format_supported: bool = Field(True, description="True if image formats (GeoTIFF, COG, PNG, JP2) are supported")
    is_geospatial_valid: bool = Field(True, description="True if coordinates/BBox are within valid latitude/longitude bounds")
    is_modality_compatible: bool = Field(True, description="True if modalities match task requirements (e.g. T1+T2 for change detection)")
    is_temporal_ordered: bool = Field(True, description="True if T1 acquisition precedes or equals T2")
    is_resolution_sufficient: bool = Field(True, description="True if GSD is sufficient for target feature detection")
    requires_human_clarification: bool = Field(False, description="True if user prompt is ambiguous or parameters are missing")
    validation_errors: List[str] = Field(default_factory=list, description="List of blocking validation error messages")
    validation_warnings: List[str] = Field(default_factory=list, description="Non-blocking warning messages (e.g. high cloud cover)")


class ReasoningStep(BaseModel):
    """
    Individual thought step captured during agent reasoning and multi-agent routing.
    """
    step_number: int = Field(1, description="Sequential thought step index")
    agent_name: str = Field("orchestrator", description="Agent or module producing the reasoning step")
    thought: str = Field(..., description="Internal chain-of-thought analysis")
    classified_task: Optional[str] = Field(None, description="Task intent deduced during this reasoning step")
    selected_specialist_models: List[str] = Field(default_factory=list, description="Specialist models selected in this step")
    action_taken: Optional[str] = Field(None, description="Action or tool called following this thought")
    critique_or_reflection: Optional[str] = Field(None, description="Self-reflection or validation check on previous output")
    confidence: Optional[float] = Field(None, description="Confidence score associated with this step (0.0 to 1.0)")
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# ---------------------------------------------------------------------------
# Image Input & Geospatial Models
# ---------------------------------------------------------------------------

class ImageInput(BaseModel):
    """
    Detailed metadata and path for an uploaded satellite image.
    Supports GeoTIFF, COG, JP2, and standard raster formats.
    """
    image_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    file_path: str = Field(..., description="Local filesystem path or storage URI to the image file")
    file_format: ImageFormat = Field(ImageFormat.GEOTIFF, description="Image file format (e.g. GeoTIFF, PNG, COG)")
    modality: SensorModality = Field(SensorModality.OPTICAL, description="Sensor modality: optical, sar, multispectral")
    sensor_name: Optional[str] = Field(None, description="Satellite/Sensor source (e.g., Sentinel-2, Sentinel-1, Landsat-9, PlanetScope)")
    acquisition_timestamp: Optional[str] = Field(None, description="Image capture timestamp (ISO-8601)")
    bands: Optional[List[str]] = Field(default_factory=list, description="Band designations (e.g. ['B02', 'B03', 'B04', 'B08'])")
    resolution_meters: Optional[float] = Field(None, description="Spatial resolution / GSD in meters per pixel")
    crs: Optional[str] = Field(None, description="Coordinate Reference System (e.g. 'EPSG:4326', 'EPSG:32643')")
    bounds: Optional[List[float]] = Field(None, description="[min_lon, min_lat, max_lon, max_lat] spatial bounding box")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional custom header / driver metadata")


class BiTemporalImagePair(BaseModel):
    """
    Pre-event (T1) and post-event (T2) image pair for change detection and temporal analysis.
    """
    t1_image: ImageInput = Field(..., description="Time 1 (pre-event / baseline) satellite image")
    t2_image: ImageInput = Field(..., description="Time 2 (post-event / comparison) satellite image")
    temporal_gap_days: Optional[float] = Field(None, description="Calculated duration in days between T1 and T2 acquisitions")
    alignment_verified: bool = Field(False, description="Whether coregistration/orthorectification has been confirmed")


class OpticalSARImagePair(BaseModel):
    """
    Co-registered Optical and SAR imagery pair for cross-modal fusion and all-weather analysis.
    """
    optical_image: ImageInput = Field(..., description="Optical / multi-spectral satellite imagery")
    sar_image: ImageInput = Field(..., description="Synthetic Aperture Radar (SAR) imagery (e.g. Sentinel-1 GRD/SLC)")
    polarization: Optional[str] = Field(None, description="SAR polarization modes (e.g. 'VV+VH', 'HH+HV')")
    fusion_strategy: Optional[str] = Field("cross_attention", description="Fusion method: pixel_level, feature_fusion, cross_attention")


class GeoSpatialContext(BaseModel):
    """Geographic bounding box, coordinates, and temporal query criteria."""
    latitude: Optional[float] = Field(None, description="Center latitude coordinate")
    longitude: Optional[float] = Field(None, description="Center longitude coordinate")
    bbox: Optional[List[float]] = Field(None, description="[min_lon, min_lat, max_lon, max_lat] bounding box")
    zoom_level: Optional[int] = Field(None, description="Map zoom level (1-20)")
    crs: str = Field("EPSG:4326", description="Coordinate Reference System")
    date_start: Optional[str] = Field(None, description="Start date for temporal filtering (ISO-8601)")
    date_end: Optional[str] = Field(None, description="End date for temporal filtering (ISO-8601)")


class ModalityInputs(BaseModel):
    """
    Aggregated container for all uploaded image inputs.
    Accommodates single images, bi-temporal pairs, and optical-SAR pairs.
    """
    single_image: Optional[ImageInput] = Field(None, description="Primary single image for VQA or object grounding")
    bi_temporal_pair: Optional[BiTemporalImagePair] = Field(None, description="T1/T2 pair for bi-temporal change detection")
    optical_sar_pair: Optional[OpticalSARImagePair] = Field(None, description="Optical-SAR pair for cross-modal fusion")
    uploaded_images: List[ImageInput] = Field(default_factory=list, description="All uploaded image files associated with request")
    
    # Direct URI/path conveniences
    optical_image_url: Optional[str] = Field(None, description="Direct URL/path to optical image if available")
    sar_image_url: Optional[str] = Field(None, description="Direct URL/path to SAR image if available")
    t1_image_url: Optional[str] = Field(None, description="Direct URL/path to T1 image if available")
    t2_image_url: Optional[str] = Field(None, description="Direct URL/path to T2 image if available")
    multi_spectral_bands: Dict[str, str] = Field(default_factory=dict, description="Band file paths mapping")


# ---------------------------------------------------------------------------
# Structured Output Models (Spatial Outputs, Masks, Bounding Boxes, Confidence)
# ---------------------------------------------------------------------------

class BoundingBoxOutput(BaseModel):
    """
    Detected object / target grounding bounding box with spatial and geographic coordinates.
    """
    box_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    label: str = Field(..., description="Target entity class (e.g. 'airplane', 'storage_tank', 'ship', 'building')")
    confidence: float = Field(..., description="Grounding confidence score (0.0 to 1.0)")
    bbox_normalized: List[float] = Field(..., description="[xmin, ymin, xmax, ymax] normalized coordinates (0.0 to 1.0)")
    bbox_pixels: Optional[List[int]] = Field(None, description="[xmin, ymin, xmax, ymax] pixel coordinates in source image")
    bbox_geo: Optional[List[float]] = Field(None, description="[min_lon, min_lat, max_lon, max_lat] WGS84 geographic coordinates")
    polygon_coordinates: Optional[List[List[float]]] = Field(None, description="Polygon boundary vertices if available")
    attributes: Dict[str, Any] = Field(default_factory=dict, description="Estimated dimensions, orientation, area in m²")


class ChangeMaskOutput(BaseModel):
    """
    Spatial mask for bi-temporal change detection, flood mapping, or deforestation analysis.
    """
    mask_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mask_type: str = Field("change_mask", description="Mask category: 'bi_temporal_change', 'deforestation', 'urban_expansion', 'flood'")
    mask_uri: str = Field(..., description="URI or local filesystem path to the generated mask GeoTIFF/PNG")
    changed_area_sq_km: Optional[float] = Field(None, description="Calculated total surface area of detected changes in km²")
    changed_area_pixels: Optional[int] = Field(None, description="Total count of positive change pixels")
    change_percentage: Optional[float] = Field(None, description="Percentage of analyzed AOI showing change")
    class_distribution: Dict[str, float] = Field(default_factory=dict, description="Breakdown of change categories and pixel ratios")
    color_map: Dict[str, str] = Field(default_factory=dict, description="Mapping of pixel values to hex colors for UI rendering")
    georeferencing: Dict[str, Any] = Field(default_factory=dict, description="CRS and affine transform parameters")


class SpatialOutputs(BaseModel):
    """
    Comprehensive container for all spatial analysis outputs.
    """
    bounding_boxes: List[BoundingBoxOutput] = Field(default_factory=list, description="Detected objects and bounding boxes")
    change_mask: Optional[ChangeMaskOutput] = Field(None, description="Bi-temporal change detection mask")
    segmentation_masks: List[ChangeMaskOutput] = Field(default_factory=list, description="Additional thematic segmentation masks")
    geojson_feature_collection: Optional[Dict[str, Any]] = Field(None, description="Ready-to-render GeoJSON for Mapbox/Leaflet UI")


class ConfidenceScores(BaseModel):
    """
    Detailed confidence and certainty breakdown across all executing models.
    """
    overall: float = Field(0.0, description="Master weighted confidence score (0.0 to 1.0)")
    vqa_confidence: Optional[float] = Field(None, description="Visual Question Answering confidence")
    grounding_confidence: Optional[float] = Field(None, description="Object detection / grounding confidence")
    change_confidence: Optional[float] = Field(None, description="Change detection classification confidence")
    fusion_confidence: Optional[float] = Field(None, description="Cross-modal alignment confidence")
    data_quality_score: Optional[float] = Field(None, description="Image quality, cloud clearance, and resolution adequacy score")
    breakdown: Dict[str, float] = Field(default_factory=dict, description="Model-specific confidence mappings")
    uncertainty_notes: Optional[str] = Field(None, description="Explanatory notes on sources of uncertainty")


class Artifact(BaseModel):
    """Generated visual or data artifacts resulting from agent execution."""
    artifact_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    artifact_type: str = Field("visualization", description="Type of artifact: heatmap, mask, geojson, fused_image, chart, report")
    uri: str = Field("", description="URI or local path to the artifact file")
    title: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class ToolExecutionLog(BaseModel):
    """Log entry for an executed specialist tool or subagent."""
    tool_name: str = Field("", description="Name of the executed tool")
    input_payload: Dict[str, Any] = Field(default_factory=dict)
    output_payload: Any = None
    execution_time_ms: Optional[float] = None
    status: str = "success"
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# ---------------------------------------------------------------------------
# Reducer Helper Functions for LangGraph
# ---------------------------------------------------------------------------

def merge_dicts(a: Optional[Dict[str, Any]], b: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    """Reducer function to shallow-merge dictionary updates across multiple specialist nodes."""
    merged = dict(a or {})
    if b and isinstance(b, dict):
        merged.update(b)
    return merged


# ---------------------------------------------------------------------------
# LangGraph TypedDict State Definition
# ---------------------------------------------------------------------------

class AgentState(TypedDict):
    """
    Main state schema for LangGraph agent workflow.
    Tracks state transitions, multi-agent reasoning trajectory, thought process,
    selected specialist models, validation flags, intermediate model outputs, spatial outputs,
    confidence scores, multi-step pipeline execution, and final textual answers.
    """
    # 1. Identity & Session
    request_id: str
    user_id: Optional[str]
    session_id: Optional[str]
    
    # 2. Input Data & Raw User Prompts
    raw_query: str                                         # Exact raw prompt entered by the user
    query: str                                             # Processed / normalized query
    geo_context: Optional[Dict[str, Any]]
    
    # Image Inputs Tracking (Paths, Formats, and Pairs)
    single_image: Optional[Dict[str, Any]]                 # Single image path & format (e.g. GeoTIFF)
    bi_temporal_pair: Optional[Dict[str, Any]]             # T1 & T2 image paths, timestamps & formats
    optical_sar_pair: Optional[Dict[str, Any]]             # Optical & SAR paths, polarizations & formats
    uploaded_images: List[Dict[str, Any]]                  # Complete list of uploaded image inputs
    modalities: Optional[Dict[str, Any]]                   # Aggregated modality map
    
    # 3. Thought Process & Task Classification
    classified_task: Optional[str]                         # "VQA", "change_detection", "grounding", "cross_modal_fusion", "compound_pipeline"
    task_classification_confidence: Optional[float]        # Confidence score of task router (0.0 to 1.0)
    task_reasoning: Optional[str]                          # Rationale for selecting this task
    thought_trace: Annotated[List[Dict[str, Any]], operator.add]  # Cumulative reasoning/thought steps
    plan_steps: Optional[List[str]]
    current_step: int
    
    # 4. Multi-Step Execution Queue & Specialist Selection
    selected_specialist_models: List[str]                  # Sequence of models chosen: ["cross_modal_fusion", "change_detector", "grounding_rs"]
    execution_queue: List[str]                             # Pending specialists in compound pipeline
    completed_specialists: Annotated[List[str], operator.add] # Completed specialists
    is_compound_task: bool                                 # True if multiple specialists execute in sequence
    specialist_model_configs: Annotated[Dict[str, Any], merge_dicts] # Hyperparameters, thresholds, and runtime flags
    
    # 5. Validation Flags & Gatekeeping
    validation_flags: Annotated[Dict[str, Any], merge_dicts] # Granular checks (has_images, is_geospatial_valid, etc.)
    is_valid: bool                                         # Master gate: False stops pipeline and alerts user
    validation_errors: List[str]                           # List of blocking validation errors
    validation_warnings: List[str]                         # Non-blocking warnings
    requires_clarification: bool                           # True if human-in-the-loop clarification is needed
    
    # 6. Trajectory & LangGraph Message Reducers
    messages: Annotated[List[Dict[str, Any]], operator.add]
    active_agent: str
    routing_history: Annotated[List[str], operator.add]
    
    # 7. Tool & Model Intermediate Outputs
    tool_logs: Annotated[List[Dict[str, Any]], operator.add]
    intermediate_outputs: Annotated[Dict[str, Any], merge_dicts] # Merged dictionary of all specialist inferences
    
    # 8. Output Tracking: Textual Answers, Spatial Outputs & Confidence Scores
    final_response: Optional[str]                          # Final synthesized natural language answer
    executive_summary: Optional[str]                       # Brief summary for dashboards & notifications
    detailed_analysis: Optional[str]                       # Deep breakdown citing sensor evidence
    
    # Spatial Outputs
    spatial_outputs: Annotated[Dict[str, Any], merge_dicts] # Unified spatial results container
    bounding_boxes: Annotated[List[Dict[str, Any]], operator.add] # Bounding box coordinates & labels
    change_mask: Optional[Dict[str, Any]]                  # Change detection mask & area metrics
    
    # Confidence Metrics
    confidence_score: Optional[float]                      # Overall confidence score (0.0 to 1.0)
    confidence_breakdown: Optional[Dict[str, Any]]         # Per-specialist confidence scores & uncertainty
    
    # Artifacts (Downloadables, Overlays, Reports)
    artifacts: Annotated[List[Dict[str, Any]], operator.add]
    
    # 9. Lifecycle Status & Errors
    status: str
    error: Optional[str]


# ---------------------------------------------------------------------------
# Pydantic State Model (for FastAPI Request/Response & Database Serialization)
# ---------------------------------------------------------------------------

class AgentStateModel(BaseModel):
    """
    Comprehensive Pydantic model representation of the agent state.
    Used for request validation, REST API payloads, and PostgreSQL persistence.
    """
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    
    # Inputs
    raw_query: str = Field(..., description="Exact raw user query as received")
    query: Optional[str] = Field(None, description="Processed or expanded user query")
    geo_context: GeoSpatialContext = Field(default_factory=GeoSpatialContext)
    modalities: ModalityInputs = Field(default_factory=ModalityInputs)
    
    # Thought Process & Classification
    classified_task: Optional[Union[TaskType, str]] = Field(None, description="Classified task: 'VQA', 'change_detection', 'grounding', etc.")
    task_classification_confidence: Optional[float] = Field(None, description="Confidence score of task classifier (0.0 to 1.0)")
    task_reasoning: Optional[str] = Field(None, description="Chain-of-thought rationale for task classification")
    thought_trace: List[ReasoningStep] = Field(default_factory=list, description="Reasoning and thought trajectory log")
    plan_steps: List[str] = Field(default_factory=list)
    current_step: int = 0
    
    # Multi-Step Execution Queue
    selected_specialist_models: List[Union[SpecialistModelType, str]] = Field(
        default_factory=list, 
        description="Specialist models selected for execution: e.g. ['cross_modal_fusion', 'change_detector']"
    )
    execution_queue: List[str] = Field(default_factory=list)
    completed_specialists: List[str] = Field(default_factory=list)
    is_compound_task: bool = False
    specialist_model_configs: Dict[str, Any] = Field(default_factory=dict, description="Inference parameters per model")
    
    # Validation Flags
    validation_flags: ValidationFlags = Field(default_factory=ValidationFlags)
    is_valid: bool = True
    validation_errors: List[str] = Field(default_factory=list)
    validation_warnings: List[str] = Field(default_factory=list)
    requires_clarification: bool = False
    
    # Trajectory & Messages
    messages: List[Dict[str, Any]] = Field(default_factory=list)
    active_agent: str = "orchestrator"
    routing_history: List[str] = Field(default_factory=list)
    
    # Tool & Model Outputs
    tool_logs: List[ToolExecutionLog] = Field(default_factory=list)
    intermediate_outputs: Dict[str, Any] = Field(default_factory=dict)
    
    # Output Tracking: Textual Answers, Spatial Outputs & Confidence Scores
    final_response: Optional[str] = Field(None, description="Synthesized textual answer for the user")
    executive_summary: Optional[str] = Field(None, description="Executive summary for dashboard preview")
    detailed_analysis: Optional[str] = Field(None, description="In-depth analytical breakdown")
    
    spatial_outputs: SpatialOutputs = Field(default_factory=SpatialOutputs, description="Container for all spatial outputs")
    bounding_boxes: List[BoundingBoxOutput] = Field(default_factory=list, description="Grounding bounding boxes")
    change_mask: Optional[ChangeMaskOutput] = Field(None, description="Bi-temporal change detection mask")
    
    confidence_score: Optional[float] = Field(None, description="Master confidence score (0.0 to 1.0)")
    confidence_breakdown: ConfidenceScores = Field(default_factory=ConfidenceScores, description="Confidence breakdown per module")
    
    artifacts: List[Artifact] = Field(default_factory=list, description="Output artifacts (masks, overlays, GeoJSON)")
    
    # Lifecycle Status
    status: RequestStatus = RequestStatus.PENDING
    error: Optional[str] = None
    
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    @staticmethod
    def _to_dict_deep(obj: Any) -> Any:
        """Deep dictionary converter supporting Pydantic models, dicts, enums, and lists."""
        if obj is None:
            return None
        if isinstance(obj, Enum):
            return obj.value
        if isinstance(obj, (int, float, str, bool)):
            return obj
        if isinstance(obj, list):
            return [AgentStateModel._to_dict_deep(item) for item in obj]
        if isinstance(obj, dict):
            return {k: AgentStateModel._to_dict_deep(v) for k, v in obj.items()}
        if hasattr(obj, 'model_dump') and callable(obj.model_dump):
            raw = obj.model_dump()
            return AgentStateModel._to_dict_deep(raw)
        if hasattr(obj, '__dict__'):
            return {k: AgentStateModel._to_dict_deep(v) for k, v in obj.__dict__.items()}
        return obj

    def to_graph_state(self) -> AgentState:
        """Convert Pydantic model into a LangGraph-compatible TypedDict state."""
        geo_dict = self._to_dict_deep(self.geo_context)
        mod_dict = self._to_dict_deep(self.modalities)
        
        single_img = self._to_dict_deep(self.modalities.single_image) if self.modalities else None
        bi_temporal = self._to_dict_deep(self.modalities.bi_temporal_pair) if self.modalities else None
        opt_sar = self._to_dict_deep(self.modalities.optical_sar_pair) if self.modalities else None
        uploaded = self._to_dict_deep(self.modalities.uploaded_images) if self.modalities else []
        
        val_flags_dict = self._to_dict_deep(self.validation_flags)
        
        task_val = self.classified_task.value if hasattr(self.classified_task, 'value') else self.classified_task
        models_val = [m.value if hasattr(m, 'value') else str(m) for m in self.selected_specialist_models]
        
        # Spatial outputs handling
        sp_outputs_dict = self._to_dict_deep(self.spatial_outputs)
        bboxes_list = [self._to_dict_deep(b) for b in (self.bounding_boxes or (self.spatial_outputs.bounding_boxes if self.spatial_outputs else []))]
        c_mask_dict = self._to_dict_deep(self.change_mask or (self.spatial_outputs.change_mask if self.spatial_outputs else None))
        
        # Confidence score handling
        conf_score = self.confidence_score if self.confidence_score is not None else (self.confidence_breakdown.overall if self.confidence_breakdown else None)
        conf_breakdown_dict = self._to_dict_deep(self.confidence_breakdown)
        
        return {
            "request_id": self.request_id,
            "user_id": self.user_id,
            "session_id": self.session_id,
            "raw_query": self.raw_query,
            "query": self.query or self.raw_query,
            "geo_context": geo_dict,
            "single_image": single_img,
            "bi_temporal_pair": bi_temporal,
            "optical_sar_pair": opt_sar,
            "uploaded_images": uploaded,
            "modalities": mod_dict,
            "classified_task": task_val,
            "task_classification_confidence": self.task_classification_confidence,
            "task_reasoning": self.task_reasoning,
            "thought_trace": [self._to_dict_deep(t) for t in self.thought_trace],
            "plan_steps": self.plan_steps,
            "current_step": self.current_step,
            "selected_specialist_models": models_val,
            "execution_queue": self.execution_queue or list(models_val),
            "completed_specialists": self.completed_specialists,
            "is_compound_task": self.is_compound_task or (len(models_val) > 1),
            "specialist_model_configs": self.specialist_model_configs,
            "validation_flags": val_flags_dict,
            "is_valid": self.is_valid and (self.validation_flags.is_valid if hasattr(self.validation_flags, 'is_valid') else True),
            "validation_errors": self.validation_errors + (self.validation_flags.validation_errors if hasattr(self.validation_flags, 'validation_errors') else []),
            "validation_warnings": self.validation_warnings + (self.validation_flags.validation_warnings if hasattr(self.validation_flags, 'validation_warnings') else []),
            "requires_clarification": self.requires_clarification or (self.validation_flags.requires_human_clarification if hasattr(self.validation_flags, 'requires_human_clarification') else False),
            "messages": self.messages,
            "active_agent": self.active_agent,
            "routing_history": self.routing_history,
            "tool_logs": [self._to_dict_deep(log) for log in self.tool_logs],
            "intermediate_outputs": self.intermediate_outputs,
            
            # Outputs
            "final_response": self.final_response,
            "executive_summary": self.executive_summary,
            "detailed_analysis": self.detailed_analysis,
            "spatial_outputs": sp_outputs_dict,
            "bounding_boxes": bboxes_list,
            "change_mask": c_mask_dict,
            "confidence_score": conf_score,
            "confidence_breakdown": conf_breakdown_dict,
            "artifacts": [self._to_dict_deep(art) for art in self.artifacts],
            
            # Lifecycle Status
            "status": self.status.value if hasattr(self.status, 'value') else self.status,
            "error": self.error
        }
