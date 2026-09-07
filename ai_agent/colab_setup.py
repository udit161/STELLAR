"""
SatQuery AI - Google Colab Environment Setup & Hugging Face Authentication
"""

import os
import sys

def setup_huggingface_environment(
    read_token: str = "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",
    write_token: str = "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"
):
    """
    Configures Hugging Face authentication and environment variables for Google Colab / Antigravity.
    """
    print("🚀 Initializing SatQuery AI Google Colab Environment...")
    
    # 1. Set environment variables
    os.environ["HF_TOKEN"] = write_token
    os.environ["HUGGINGFACE_HUB_TOKEN"] = write_token
    os.environ["HF_READ_TOKEN"] = read_token
    os.environ["HF_WRITE_TOKEN"] = write_token

    # 2. Login via huggingface_hub
    try:
        from huggingface_hub import login, HfApi
        login(token=write_token, add_to_git_credential=True)
        api = HfApi(token=write_token)
        user_info = api.whoami()
        print(f"✅ Successfully authenticated to Hugging Face as: {user_info.get('name', 'Unknown')} ({user_info.get('type', 'user')})")
        print(f"🔑 Write access enabled. Ready for downloading/uploading models, datasets, and running inferences.")
    except ImportError:
        print("⚠️ huggingface_hub not installed. Installing now...")
        os.system(f"{sys.executable} -m pip install -q huggingface_hub transformers accelerate")
        from huggingface_hub import login, HfApi
        login(token=write_token, add_to_git_credential=True)
        print("✅ Hugging Face authentication completed.")
    except Exception as e:
        print(f"⚠️ Note during login: {e}")

if __name__ == "__main__":
    setup_huggingface_environment()
