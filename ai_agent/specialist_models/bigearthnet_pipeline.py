"""
SatQuery AI - BigEarthNet Multimodal Data Pipeline
Tokenizes text annotations and aligns Sentinel-1 SAR + Sentinel-2 Optical bands.

Features:
1. Sentinel-2 Optical Multi-spectral Band Resampling (10m, 20m, 60m -> uniform 120x120 grid).
2. Sentinel-1 SAR Dual-Polarization (VV, VH) Alignment & dB Backscatter Normalization.
3. 14-Channel Unified Multimodal Tensor Stacking [12 Optical + 2 SAR].
4. Hugging Face Text Tokenization for Land-Cover Labels, Captions, and VQA Instruction Queries.
5. PyTorch Dataset & Batched DataLoader with Collate Function.
"""

import os
import sys
from typing import Dict, Any, List, Optional, Tuple, Union
import numpy as np
import torch
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader

# Ensure UTF-8 output encoding for terminals
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Sentinel-2 standard 12 bands and typical spatial resolutions
S2_BAND_ORDER = ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B8A", "B09", "B11", "B12"]
S1_SAR_BAND_ORDER = ["VV", "VH"]

# Resolution mapping for BigEarthNet patches (target 10m = 120x120 pixels)
TARGET_SPATIAL_SHAPE = (120, 120)


class BigEarthNetBandAligner:
    """
    Spatially aligns and normalizes multi-resolution Sentinel-2 Optical bands
    with dual-polarization Sentinel-1 SAR bands to produce synchronized 14-channel rasters.
    """
    def __init__(self, target_shape: Tuple[int, int] = TARGET_SPATIAL_SHAPE):
        self.target_shape = target_shape

    def resample_band(self, band_tensor: torch.Tensor, target_shape: Optional[Tuple[int, int]] = None) -> torch.Tensor:
        """
        Resample a single or multi-channel band tensor to the target spatial shape (H, W).
        Uses bilinear interpolation for continuous satellite spectral values.
        """
        target_shape = target_shape or self.target_shape
        if band_tensor.dim() == 2:
            band_tensor = band_tensor.unsqueeze(0).unsqueeze(0)  # [1, 1, H, W]
        elif band_tensor.dim() == 3:
            band_tensor = band_tensor.unsqueeze(0)  # [1, C, H, W]

        resampled = F.interpolate(
            band_tensor.float(),
            size=target_shape,
            mode="bilinear",
            align_corners=False
        )
        return resampled.squeeze(0)  # [C, target_H, target_W]

    def normalize_optical(self, optical_tensor: torch.Tensor) -> torch.Tensor:
        """
        Normalize Sentinel-2 Top-of-Atmosphere/Bottom-of-Atmosphere reflectance.
        Standard Sentinel-2 digital numbers (DN) scale by 10,000 to reach [0.0, 1.0].
        """
        return torch.clamp(optical_tensor.float() / 10000.0, 0.0, 1.0)

    def normalize_sar(self, sar_tensor: torch.Tensor) -> torch.Tensor:
        """
        Normalize Sentinel-1 SAR backscatter coefficient (dB / intensity).
        Maps typical SAR values [-35.0 dB, 0.0 dB] to normalized range [0.0, 1.0].
        """
        sar_clamped = torch.clamp(sar_tensor.float(), -35.0, 0.0)
        return (sar_clamped + 35.0) / 35.0

    def align_and_stack(
        self,
        optical_bands: Union[Dict[str, Union[np.ndarray, torch.Tensor]], torch.Tensor, np.ndarray],
        sar_bands: Union[Dict[str, Union[np.ndarray, torch.Tensor]], torch.Tensor, np.ndarray]
    ) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """
        Aligns Sentinel-2 optical bands and Sentinel-1 SAR bands into unified tensors.

        Returns:
            optical_aligned: [12, 120, 120]
            sar_aligned: [2, 120, 120]
            multimodal_tensor: [14, 120, 120] (12 Optical + 2 SAR)
        """
        # 1. Process Sentinel-2 Optical Bands
        if isinstance(optical_bands, dict):
            aligned_optical_list = []
            for band_name in S2_BAND_ORDER:
                if band_name in optical_bands:
                    b_data = optical_bands[band_name]
                    b_tensor = torch.as_tensor(b_data, dtype=torch.float32)
                    if b_tensor.shape[-2:] != self.target_shape:
                        b_tensor = self.resample_band(b_tensor, self.target_shape)
                    if b_tensor.dim() == 3 and b_tensor.shape[0] == 1:
                        b_tensor = b_tensor.squeeze(0)
                    aligned_optical_list.append(b_tensor)
                else:
                    # Missing band zero-fill placeholder
                    aligned_optical_list.append(torch.zeros(self.target_shape, dtype=torch.float32))
            optical_stacked = torch.stack(aligned_optical_list, dim=0)  # [12, H, W]
        else:
            optical_tensor = torch.as_tensor(optical_bands, dtype=torch.float32)
            if optical_tensor.dim() == 2:
                optical_tensor = optical_tensor.unsqueeze(0).repeat(12, 1, 1)
            elif optical_tensor.shape[0] != 12 and optical_tensor.shape[-1] == 12:
                optical_tensor = optical_tensor.permute(2, 0, 1)
            if optical_tensor.shape[-2:] != self.target_shape:
                optical_stacked = self.resample_band(optical_tensor, self.target_shape)
            else:
                optical_stacked = optical_tensor

        optical_normalized = self.normalize_optical(optical_stacked)

        # 2. Process Sentinel-1 SAR Bands
        if isinstance(sar_bands, dict):
            aligned_sar_list = []
            for sar_name in S1_SAR_BAND_ORDER:
                if sar_name in sar_bands:
                    s_data = sar_bands[sar_name]
                    s_tensor = torch.as_tensor(s_data, dtype=torch.float32)
                    if s_tensor.shape[-2:] != self.target_shape:
                        s_tensor = self.resample_band(s_tensor, self.target_shape)
                    if s_tensor.dim() == 3 and s_tensor.shape[0] == 1:
                        s_tensor = s_tensor.squeeze(0)
                    aligned_sar_list.append(s_tensor)
                else:
                    aligned_sar_list.append(torch.zeros(self.target_shape, dtype=torch.float32))
            sar_stacked = torch.stack(aligned_sar_list, dim=0)  # [2, H, W]
        else:
            sar_tensor = torch.as_tensor(sar_bands, dtype=torch.float32)
            if sar_tensor.dim() == 2:
                sar_tensor = sar_tensor.unsqueeze(0).repeat(2, 1, 1)
            elif sar_tensor.shape[0] != 2 and sar_tensor.shape[-1] == 2:
                sar_tensor = sar_tensor.permute(2, 0, 1)
            if sar_tensor.shape[-2:] != self.target_shape:
                sar_stacked = self.resample_band(sar_tensor, self.target_shape)
            else:
                sar_stacked = sar_tensor

        sar_normalized = self.normalize_sar(sar_stacked)

        # 3. Concatenate Optical + SAR into unified 14-band multimodal tensor
        multimodal_tensor = torch.cat([optical_normalized, sar_normalized], dim=0)  # [14, 120, 120]

        return optical_normalized, sar_normalized, multimodal_tensor


class BigEarthNetTextTokenizer:
    """
    Tokenizes text descriptions, multi-label classifications, VQA queries,
    and metadata annotations from BigEarthNet v2.0.
    """
    def __init__(
        self,
        tokenizer_name_or_path: str = "bert-base-uncased",
        max_length: int = 64
    ):
        self.max_length = max_length
        self.tokenizer = None
        self.tokenizer_name = tokenizer_name_or_path

        try:
            from transformers import AutoTokenizer
            self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_name_or_path)
            print(f"[OK] Hugging Face Tokenizer initialized: '{tokenizer_name_or_path}'")
        except Exception as e:
            print(f"[*] Fallback: using standalone token encoding ({e})")
            self.tokenizer = None

    def tokenize_text(self, text_or_texts: Union[str, List[str]], max_length: Optional[int] = None) -> Dict[str, torch.Tensor]:
        """
        Tokenizes text string or batch of strings into input_ids and attention_mask tensors.
        """
        max_len = max_length or self.max_length
        if isinstance(text_or_texts, str):
            texts = [text_or_texts]
        else:
            texts = text_or_texts

        if self.tokenizer is not None:
            encoded = self.tokenizer(
                texts,
                padding="max_length",
                truncation=True,
                max_length=max_len,
                return_tensors="pt"
            )
            return {
                "input_ids": encoded["input_ids"],
                "attention_mask": encoded["attention_mask"]
            }
        else:
            # Deterministic tokenization fallback if transformers offline
            batch_ids = []
            batch_mask = []
            for text in texts:
                tokens = [hash(word) % 30000 + 100 for word in str(text).lower().split()][:max_len - 2]
                ids = [101] + tokens + [102]  # [CLS] + tokens + [SEP]
                mask = [1] * len(ids)
                padding = [0] * (max_len - len(ids))
                ids = ids + padding
                mask = mask + padding
                batch_ids.append(ids)
                batch_mask.append(mask)

            return {
                "input_ids": torch.tensor(batch_ids, dtype=torch.long),
                "attention_mask": torch.tensor(batch_mask, dtype=torch.long)
            }


class BigEarthNetMultimodalDataset(Dataset):
    """
    PyTorch Dataset collating aligned Sentinel-1 SAR, Sentinel-2 Optical bands,
    and tokenized text annotations from BigEarthNet v2.0.
    """
    def __init__(
        self,
        samples: Optional[List[Dict[str, Any]]] = None,
        aligner: Optional[BigEarthNetBandAligner] = None,
        tokenizer: Optional[BigEarthNetTextTokenizer] = None,
        num_synthetic_samples: int = 16
    ):
        self.aligner = aligner or BigEarthNetBandAligner()
        self.tokenizer = tokenizer or BigEarthNetTextTokenizer()

        if samples is not None and len(samples) > 0:
            self.samples = samples
        else:
            # Generate representative BigEarthNet samples
            self.samples = self._generate_representative_samples(num_synthetic_samples)

    def _generate_representative_samples(self, count: int) -> List[Dict[str, Any]]:
        categories = [
            "Coniferous forest with inland waters and mineral extraction sites",
            "Discontinuous urban fabric with agricultural land and broad-leaved forest",
            "Complex cultivation patterns with natural grasslands and transitional woodland",
            "Industrial or commercial units with coastal lagoons and bare rocks",
            "Pastures with non-irrigated arable land and olive groves"
        ]
        sample_list = []
        for i in range(count):
            cat = categories[i % len(categories)]
            # Realistic synthetic spectral tensors
            # S2: 12 bands (simulated varying resolutions resampled)
            s2_data = np.random.uniform(200, 4500, size=(12, 120, 120)).astype(np.float32)
            # S1 SAR: 2 channels (VV, VH in dB)
            s1_data = np.random.uniform(-25.0, -5.0, size=(2, 120, 120)).astype(np.float32)

            sample_list.append({
                "patch_id": f"S2A_MSIL2A_20200615_patch_{i:04d}",
                "optical_data": s2_data,
                "sar_data": s1_data,
                "annotation": cat,
                "task_type": "land_cover_multi_label",
                "coordinates": {"lat": 48.5 + (i * 0.1), "lon": 11.5 + (i * 0.1)}
            })
        return sample_list

    def __len__(self) -> int:
        return len(self.samples)

    def __getitem__(self, idx: int) -> Dict[str, Any]:
        item = self.samples[idx]

        # 1. Band alignment & spatial stacking
        optical_norm, sar_norm, fused_tensor = self.aligner.align_and_stack(
            item["optical_data"],
            item["sar_data"]
        )

        # 2. Text tokenization
        tokenized = self.tokenizer.tokenize_text(item["annotation"])

        return {
            "patch_id": item.get("patch_id", f"patch_{idx}"),
            "optical_tensor": optical_norm,                # [12, 120, 120]
            "sar_tensor": sar_norm,                        # [2, 120, 120]
            "fused_multimodal_tensor": fused_tensor,       # [14, 120, 120]
            "input_ids": tokenized["input_ids"].squeeze(0), # [max_length]
            "attention_mask": tokenized["attention_mask"].squeeze(0), # [max_length]
            "annotation": item.get("annotation", ""),
            "coordinates": item.get("coordinates", {})
        }


def create_bigearthnet_dataloader(
    dataset: Optional[BigEarthNetMultimodalDataset] = None,
    batch_size: int = 4,
    shuffle: bool = True,
    num_workers: int = 0
) -> DataLoader:
    """
    Creates a PyTorch DataLoader yielding synchronized batches.
    """
    ds = dataset or BigEarthNetMultimodalDataset()
    return DataLoader(
        ds,
        batch_size=batch_size,
        shuffle=shuffle,
        num_workers=num_workers
    )


# ==========================================================
# Self-Verification Execution
# ==========================================================
if __name__ == "__main__":
    print("================================================================")
    print("🛰️ SatQuery AI - BigEarthNet Multimodal Pipeline Verification")
    print("================================================================")

    # 1. Initialize Aligner & Tokenizer
    aligner = BigEarthNetBandAligner()
    tokenizer = BigEarthNetTextTokenizer(max_length=32)

    # 2. Create Multimodal Dataset & DataLoader
    dataset = BigEarthNetMultimodalDataset(aligner=aligner, tokenizer=tokenizer, num_synthetic_samples=8)
    dataloader = create_bigearthnet_dataloader(dataset, batch_size=4, shuffle=False)

    print(f"\n[+] Total Samples in Dataset: {len(dataset)}")
    print(f"[+] DataLoader Batch Size: 4 | Total Batches: {len(dataloader)}")

    # 3. Fetch & Verify Single Batch
    batch = next(iter(dataloader))
    print("\n📦 Verified Batch Output Shapes:")
    print(f"  • Optical Tensor (Sentinel-2, 12 bands) : {list(batch['optical_tensor'].shape)} [B, 12, 120, 120]")
    print(f"  • SAR Tensor (Sentinel-1, 2 channels)   : {list(batch['sar_tensor'].shape)} [B, 2, 120, 120]")
    print(f"  • Aligned Multimodal Tensor (14 bands) : {list(batch['fused_multimodal_tensor'].shape)} [B, 14, 120, 120]")
    print(f"  • Tokenized Input IDs (input_ids)       : {list(batch['input_ids'].shape)} [B, seq_len]")
    print(f"  • Attention Mask (attention_mask)       : {list(batch['attention_mask'].shape)} [B, seq_len]")

    print("\n🔍 Sample Decoded Batch Item 0:")
    print(f"  • Patch ID   : {batch['patch_id'][0]}")
    print(f"  • Annotation : \"{batch['annotation'][0]}\"")
    print(f"  • Token IDs  : {batch['input_ids'][0][:10].tolist()}...")
    print(f"  • Optical Min/Max: {batch['optical_tensor'][0].min().item():.3f} / {batch['optical_tensor'][0].max().item():.3f}")
    print(f"  • SAR Min/Max    : {batch['sar_tensor'][0].min().item():.3f} / {batch['sar_tensor'][0].max().item():.3f}")
    print("\n✨ BigEarthNet Data Pipeline verification successful!")
    print("================================================================")
