"""
Test script for VisionVQAModel initialization and dummy image fallback.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from specialist_models.vision_vqa import VisionVQAModel
try:
    import torch
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False

def run_test():
    print("Initializing VisionVQAModel...")
    model = VisionVQAModel(model_name_or_path="test-vlm-4b", quantization="4bit")
    
    print("\nRunning inference with dummy, non-existent image path...")
    dummy_path = "/path/to/non_existent_image.tif"
    query = "What is in this image?"
    
    result = model.infer(image_path=dummy_path, text_query=query)
    
    print("\nInference Result Keys:")
    for k in result.keys():
        print(f" - {k}")
        
    assert "answer" in result, "Missing 'answer' in result"
    assert "status" in result, "Missing 'status' in result"
    
    print(f"\nResult status: {result.get('status')}")
    print(f"Result format: {result.get('image_format')}")
    print(f"Result answer: {result.get('answer')}")
    
    if result.get("status") == "error":
        print(f"Error caught: {result.get('error')}")
    else:
        print("Model gracefully handled the missing file (likely using synthetic fallback).")
        
    print("\nVerifying tensor device assignment...")
    if TORCH_AVAILABLE:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"PyTorch is available. Default device evaluated as: {device}")
        
        # Test the fallback tensor creation explicitly to check device
        tensor, format_name = model._preprocess_image(dummy_path)
        if tensor is not None:
            print(f"Fallback tensor device: {tensor.device}")
            # If cuda is available, we expect the tensor to be on cuda or successfully moved to it if required.
            if torch.cuda.is_available():
                print("CUDA is available, checking if tensor can be moved to CUDA...")
                tensor_cuda = tensor.to("cuda")
                print(f"Moved tensor device: {tensor_cuda.device}")
    else:
        print("PyTorch is not available. Using dummy tensor fallback.")

if __name__ == "__main__":
    run_test()
