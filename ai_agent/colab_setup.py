"""
SatQuery AI - Google Colab Environment Setup & Hugging Face Authentication
"""

import os
import sys

# Ensure UTF-8 output encoding for terminals
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def setup_huggingface_environment(
    read_token: str = "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",
    write_token: str = "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"
):
    """
    Configures Hugging Face authentication, installs ecosystem libraries (transformers, datasets, peft, bitsandbytes),
    and configures environment variables for Google Colab.
    """
    print("[+] Initializing SatQuery AI Google Colab Environment...")

    # 1. Install required Hugging Face ecosystem libraries
    print("[*] Ensuring transformers, datasets, peft, bitsandbytes, accelerate, and huggingface_hub are installed...")
    os.system(f'"{sys.executable}" -m pip install -q --upgrade transformers datasets peft bitsandbytes accelerate huggingface_hub scipy sentencepiece trl')

    # 2. Set environment variables
    os.environ["HF_TOKEN"] = write_token
    os.environ["HUGGINGFACE_HUB_TOKEN"] = write_token
    os.environ["HF_READ_TOKEN"] = read_token
    os.environ["HF_WRITE_TOKEN"] = write_token

    # 3. Login via huggingface_hub
    try:
        from huggingface_hub import login, HfApi
        login(token=write_token, add_to_git_credential=True)
        api = HfApi(token=write_token)
        user_info = api.whoami()
        username = user_info.get("name", user_info.get("fullname", "User"))
        print(f"[OK] Successfully authenticated to Hugging Face as: {username}")
        print("[OK] Write access enabled. LoRA (PEFT) and BitsAndBytes quantization ready.")
    except Exception as e:
        print(f"[!] Note during login: {e}")

if __name__ == "__main__":
    setup_huggingface_environment()
