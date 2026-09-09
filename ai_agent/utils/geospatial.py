"""
rasterio and GDAL helpers for GeoTIFF metadata and spatial processing.
"""
import os
from typing import Dict, Any, Tuple, Optional
import numpy as np

try:
    import rasterio
    from rasterio.warp import transform_bounds
    RASTERIO_AVAILABLE = True
except ImportError:
    RASTERIO_AVAILABLE = False

try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

def extract_geotiff_metadata(file_path: str) -> Dict[str, Any]:
    """
    Extract spatial metadata, projection (CRS), bounds, and band info from GeoTIFF files.
    """
    if not RASTERIO_AVAILABLE:
        return {"error": "rasterio is not installed."}

    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}

    try:
        with rasterio.open(file_path) as src:
            bounds = src.bounds
            crs = src.crs.to_string() if src.crs else "UNKNOWN"
            
            # Optionally convert bounds to WGS84 (EPSG:4326) if a valid CRS exists
            wgs84_bounds = None
            if src.crs and src.crs.to_epsg() != 4326:
                try:
                    wgs84_bounds = transform_bounds(src.crs, 'EPSG:4326', *bounds)
                except Exception:
                    pass
            elif src.crs and src.crs.to_epsg() == 4326:
                wgs84_bounds = bounds

            return {
                "width": src.width,
                "height": src.height,
                "band_count": src.count,
                "crs": crs,
                "bounds_native": [bounds.left, bounds.bottom, bounds.right, bounds.top],
                "bounds_wgs84": [wgs84_bounds[0], wgs84_bounds[1], wgs84_bounds[2], wgs84_bounds[3]] if wgs84_bounds else None,
                "dtypes": src.dtypes,
                "transform": src.transform
            }
    except Exception as e:
        return {"error": str(e)}

def identify_sensor_modality(band_count: int) -> str:
    """
    Heuristically verify if an uploaded file is optical or SAR based on band count.
    - 1-2 bands: Typically SAR (e.g. VV, VH) or Grayscale
    - 3 bands: RGB Optical
    - 4 bands: RGB + NIR Optical (e.g. Planet, high-res)
    - 10-13 bands: Multi-spectral Optical (e.g. Sentinel-2, Landsat)
    - >13: Hyper-spectral or Optical/SAR fusion
    """
    if band_count in (1, 2):
        return "sar"
    elif band_count in (3, 4, 10, 11, 12, 13):
        return "optical"
    elif band_count > 13:
        return "multi_modal_fusion"
    else:
        return "unknown"

def geotiff_to_png_tile(input_path: str, output_path: str, bands: Tuple[int, int, int] = (1, 2, 3)) -> bool:
    """
    Normalize a multi-band 16-bit GeoTIFF into an 8-bit visual PNG tile.
    Defaults to extracting the first 3 bands (usually R, G, B).
    """
    if not RASTERIO_AVAILABLE or not PIL_AVAILABLE:
        print("Error: rasterio and Pillow are required for this operation.")
        return False

    if not os.path.exists(input_path):
        print(f"Error: Input file {input_path} not found.")
        return False

    try:
        with rasterio.open(input_path) as src:
            # Ensure we don't ask for bands out of range
            band_count = src.count
            read_bands = []
            for b in bands:
                if b <= band_count:
                    read_bands.append(b)
                else:
                    # fallback to first band if requested band is missing
                    read_bands.append(1)
            
            # Read the selected bands. Shape is (C, H, W)
            image_data = src.read(read_bands)
            
            # Convert to float32 for normalization
            image_data = image_data.astype(np.float32)
            
            # Normalize to 0-255. 
            # We normalize per-channel or globally? Typically 2nd to 98th percentile works best for satellite.
            normalized_channels = []
            for i in range(image_data.shape[0]):
                channel = image_data[i]
                p2, p98 = np.percentile(channel[channel > 0] if channel.any() else channel, (2, 98))
                
                # prevent division by zero
                if p98 == p2:
                    norm = np.zeros_like(channel)
                else:
                    norm = np.clip((channel - p2) / (p98 - p2), 0, 1)
                
                normalized_channels.append((norm * 255).astype(np.uint8))
            
            # Stack back to (H, W, C) for PIL
            rgb_array = np.dstack(normalized_channels)
            
            # If only 1 band was somehow generated, repeat it to make it RGB
            if rgb_array.shape[2] == 1:
                rgb_array = np.repeat(rgb_array, 3, axis=2)
            elif rgb_array.shape[2] == 2:
                # Add a zero channel for B
                zeros = np.zeros((rgb_array.shape[0], rgb_array.shape[1], 1), dtype=np.uint8)
                rgb_array = np.concatenate([rgb_array, zeros], axis=2)
                
            img = Image.fromarray(rgb_array, mode='RGB')
            img.save(output_path, "PNG")
            return True
            
    except Exception as e:
        print(f"Failed to convert GeoTIFF to PNG: {e}")
        return False
