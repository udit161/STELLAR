import json
from pathlib import Path
from typing import Any, Dict, List, Optional

import numpy as np
import rasterio
from rasterio.transform import Affine
from shapely.geometry import box, mapping, shape
from shapely.ops import transform as shapely_transform
from pyproj import Transformer


EXPORT_DIR = Path(__file__).resolve().parent.parent / "uploads" / "exports"
EXPORT_DIR.mkdir(parents=True, exist_ok=True)


def _safe_name(value: str) -> str:
    """Create a filesystem-safe name."""
    return "".join(
        c if c.isalnum() or c in ("-", "_", ".") else "_"
        for c in str(value)
    )


def mask_to_geojson(
    mask: Any,
    transform: Affine,
    crs: Optional[str],
    output_path: str,
    threshold: float = 0.5,
) -> Dict[str, Any]:
    """
    Convert a binary/probability spatial mask into a GeoJSON FeatureCollection.

    Mask values >= threshold are converted into polygons.
    """

    from rasterio.features import shapes

    array = np.asarray(mask)

    if array.ndim != 2:
        raise ValueError("Spatial mask must be a 2D array.")

    binary_mask = (array >= threshold).astype(np.uint8)

    features: List[Dict[str, Any]] = []

    for geometry, value in shapes(
        binary_mask,
        mask=binary_mask.astype(bool),
        transform=transform,
    ):
        if value != 1:
            continue

        geom = shape(geometry)

        # Convert native CRS to WGS84 for portable GeoJSON.
        if crs and str(crs).upper() not in ("EPSG:4326", "OGC:CRS84"):
            transformer = Transformer.from_crs(
                crs,
                "EPSG:4326",
                always_xy=True,
            )

            geom = shapely_transform(
                transformer.transform,
                geom,
            )

        features.append(
            {
                "type": "Feature",
                "properties": {
                    "class": "detected_change",
                },
                "geometry": mapping(geom),
            }
        )

    geojson = {
        "type": "FeatureCollection",
        "features": features,
    }

    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)

    output.write_text(
        json.dumps(geojson, indent=2),
        encoding="utf-8",
    )

    return {
        "path": str(output),
        "format": "geojson",
        "feature_count": len(features),
        "crs": "EPSG:4326",
    }


def raster_mask_to_geotiff(
    mask: Any,
    reference_raster: str,
    output_path: str,
    dtype: str = "uint8",
) -> Dict[str, Any]:
    """
    Save a spatial mask as a georeferenced GeoTIFF using
    the reference raster's CRS, transform and dimensions.
    """

    array = np.asarray(mask)

    if array.ndim != 2:
        raise ValueError("Raster mask must be a 2D array.")

    with rasterio.open(reference_raster) as src:

        if array.shape != (src.height, src.width):
            raise ValueError(
                f"Mask dimensions {array.shape} do not match "
                f"reference raster {(src.height, src.width)}."
            )

        output = Path(output_path)
        output.parent.mkdir(parents=True, exist_ok=True)

        with rasterio.open(
            output,
            "w",
            driver="GTiff",
            height=src.height,
            width=src.width,
            count=1,
            dtype=dtype,
            crs=src.crs,
            transform=src.transform,
            nodata=0,
            compress="deflate",
        ) as dst:
            dst.write(array.astype(dtype), 1)

    return {
        "path": str(output),
        "format": "geotiff",
        "width": int(array.shape[1]),
        "height": int(array.shape[0]),
        "dtype": dtype,
    }


def raster_bounds_to_geojson(
    bounds: Dict[str, float],
    crs: Optional[str],
    output_path: str,
) -> Dict[str, Any]:
    """
    Convert raster bounds into a GeoJSON polygon.
    """

    min_x = bounds["min_x"]
    min_y = bounds["min_y"]
    max_x = bounds["max_x"]
    max_y = bounds["max_y"]

    geom = box(min_x, min_y, max_x, max_y)

    if crs and str(crs).upper() not in ("EPSG:4326", "OGC:CRS84"):
        transformer = Transformer.from_crs(
            crs,
            "EPSG:4326",
            always_xy=True,
        )

        geom = shapely_transform(
            transformer.transform,
            geom,
        )

    geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "class": "image_extent",
                },
                "geometry": mapping(geom),
            }
        ],
    }

    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)

    output.write_text(
        json.dumps(geojson, indent=2),
        encoding="utf-8",
    )

    return {
        "path": str(output),
        "format": "geojson",
        "feature_count": 1,
        "crs": "EPSG:4326",
    }


def create_export_directory(job_id: str) -> Path:
    """
    Create an isolated artifact directory for a job.
    """

    safe_job_id = _safe_name(job_id)

    directory = EXPORT_DIR / safe_job_id
    directory.mkdir(parents=True, exist_ok=True)

    return directory