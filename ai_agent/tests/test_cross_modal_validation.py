"""
Test script to verify CrossModalFusion modality validation.
Mimics passing two optical images and verifies it throws an error.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from specialist_models.cross_modal import CrossModalFusion
import utils.geospatial as geospatial

def mock_extract(file_path):
    # If the file path contains 'optical', mock it as 12 bands
    # If it contains 'sar', mock it as 2 bands
    if "optical" in file_path:
        return {"band_count": 12}
    elif "sar" in file_path:
        return {"band_count": 2}
    return {"band_count": 3} # default optical

# Monkeypatch the extraction function to avoid needing real GeoTIFF files on disk
original_extract = geospatial.extract_geotiff_metadata
geospatial.extract_geotiff_metadata = mock_extract

def run_test():
    model = CrossModalFusion()
    
    print("Testing with two OPTICAL images...")
    res_mismatch = model.infer(
        image_path_optical="/data/optical_1.tif",
        image_path_sar="/data/optical_2.tif", # Passing an optical image to the SAR parameter
        text_query="Are there ships?"
    )
    
    assert res_mismatch["status"] == "error", "Modality mismatch should result in an error."
    assert "optical" in res_mismatch["answer"].lower() or "sar" in res_mismatch["answer"].lower()
    
    print(f"  [PASS] Validation caught the modality mismatch.")
    print(f"  Returned Error message: {res_mismatch['error']}")
    print(f"  Returned Answer     : {res_mismatch['answer']}")

if __name__ == "__main__":
    run_test()
