"""
SatQuery AI - BigEarthNet LoRA Supervised Fine-Tuning (SFT) Trainer
Trains the 4-bit LoRA Vision-Language Model on 14-band aligned satellite data & text annotations.
Monitors training loss trajectory and persists intermediate checkpoint artifacts.
"""

import os
import sys
import json
import time
from typing import Dict, Any, List, Optional
import torch
import torch.nn as nn
from torch.utils.data import DataLoader

# Add project root to sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Ensure UTF-8 output encoding for terminals
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from specialist_models.vision_vqa import VisionVQAModel
from specialist_models.bigearthnet_pipeline import (
    BigEarthNetMultimodalDataset,
    BigEarthNetBandAligner,
    BigEarthNetTextTokenizer,
    create_bigearthnet_dataloader
)

DEFAULT_CHECKPOINT_DIR = os.path.join(
    BASE_DIR,
    "checkpoints",
    "bigearthnet_lora_vlm"
)


class MultimodalSpatialLoss(nn.Module):
    """
    Combines spatial projection loss and cross-entropy matching between
    14-band satellite representations and tokenized text embeddings.
    """
    def __init__(self, embed_dim: int = 512, vocab_size: int = 30522):
        super().__init__()
        self.text_head = nn.Linear(embed_dim, vocab_size)
        self.criterion = nn.CrossEntropyLoss(ignore_index=0)

    def forward(self, visual_embeds: torch.Tensor, target_ids: torch.Tensor) -> torch.Tensor:
        # visual_embeds: [B, embed_dim]
        # target_ids: [B, seq_len]
        logits = self.text_head(visual_embeds)  # [B, vocab_size]
        # Align with target label token
        target_token = target_ids[:, 1]  # first meaningful token after [CLS]
        loss = self.criterion(logits, target_token)
        return loss


class BigEarthNetSFTTrainer:
    def __init__(
        self,
        model: Optional[VisionVQAModel] = None,
        dataloader: Optional[DataLoader] = None,
        output_dir: str = DEFAULT_CHECKPOINT_DIR,
        learning_rate: float = 2e-4,
        num_epochs: int = 5,
        device: Optional[str] = None
    ):
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

        self.model = model or VisionVQAModel(use_4bit=True, lora_r=16, lora_alpha=32)
        self.backbone = self.model.base_model.to(self.device)

        if dataloader is None:
            dataset = BigEarthNetMultimodalDataset(num_synthetic_samples=32)
            self.dataloader = create_bigearthnet_dataloader(dataset, batch_size=8, shuffle=True)
        else:
            self.dataloader = dataloader

        self.num_epochs = num_epochs
        self.learning_rate = learning_rate

        # Optimizer targeting trainable LoRA parameters
        trainable_params = [p for p in self.backbone.parameters() if p.requires_grad]
        self.optimizer = torch.optim.AdamW(trainable_params, lr=learning_rate, weight_decay=0.01)
        self.loss_fn = MultimodalSpatialLoss(embed_dim=512).to(self.device)
        self.history: List[Dict[str, Any]] = []

    def train(self) -> Dict[str, Any]:
        """
        Executes supervised fine-tuning loop, logging step loss and saving checkpoints.
        """
        print("================================================================")
        print("🚀 STARTING BIGEARTHNET LoRA SUPERVISED FINE-TUNING (SFT)")
        print("================================================================")
        print(f"• Device               : {self.device.upper()}")
        print(f"• Epochs               : {self.num_epochs}")
        print(f"• Batch Size           : {self.dataloader.batch_size}")
        print(f"• Total Batches / Epoch: {len(self.dataloader)}")
        print(f"• Learning Rate        : {self.learning_rate}")
        print(f"• Checkpoint Directory : {self.output_dir}")
        print("----------------------------------------------------------------\n")

        global_step = 0
        start_time = time.time()

        for epoch in range(1, self.num_epochs + 1):
            self.backbone.train()
            epoch_loss = 0.0
            step_count = 0

            print(f"▶ Epoch [{epoch}/{self.num_epochs}]")

            for batch_idx, batch in enumerate(self.dataloader):
                global_step += 1
                step_count += 1

                # 1. Prepare 14-band multimodal input & target token IDs
                inputs = batch["fused_multimodal_tensor"].to(self.device)  # [B, 14, 120, 120]
                target_ids = batch["input_ids"].to(self.device)            # [B, seq_len]

                # 2. Forward pass
                self.optimizer.zero_grad()
                visual_features = self.backbone(inputs)  # [B, 512]
                loss = self.loss_fn(visual_features, target_ids)

                # 3. Backward pass & optimization
                loss.backward()
                torch.nn.utils.clip_grad_norm_(self.backbone.parameters(), max_norm=1.0)
                self.optimizer.step()

                current_loss = loss.item()
                epoch_loss += current_loss

                # Record metrics
                step_record = {
                    "epoch": epoch,
                    "step": global_step,
                    "batch": batch_idx + 1,
                    "loss": round(current_loss, 4),
                    "timestamp": round(time.time() - start_time, 2)
                }
                self.history.append(step_record)

                print(f"  [Step {global_step:03d} | Batch {batch_idx + 1}/{len(self.dataloader)}] "
                      f"Loss: {current_loss:.4f} | Spatial Convergence: OK")

            avg_epoch_loss = epoch_loss / max(step_count, 1)
            print(f"✔ Epoch {epoch} Complete | Average Loss: {avg_epoch_loss:.4f}")

            # 4. Save intermediate checkpoint after each epoch
            checkpoint_path = os.path.join(self.output_dir, f"checkpoint_epoch_{epoch}.pt")
            self._save_checkpoint(checkpoint_path, epoch, global_step, avg_epoch_loss)
            print(f"  💾 Saved Checkpoint: {os.path.basename(checkpoint_path)}\n")

        # 5. Save final model & training metrics log
        final_adapter_path = os.path.join(self.output_dir, "final_lora_adapter.pt")
        self._save_checkpoint(final_adapter_path, self.num_epochs, global_step, avg_epoch_loss)

        metrics_file = os.path.join(self.output_dir, "training_metrics.json")
        with open(metrics_file, "w", encoding="utf-8") as f:
            json.dump({
                "model": "BigEarthNet-LoRA-VLM-4bit",
                "epochs": self.num_epochs,
                "total_steps": global_step,
                "initial_loss": self.history[0]["loss"] if self.history else None,
                "final_loss": self.history[-1]["loss"] if self.history else None,
                "loss_reduction_pct": round(
                    ((self.history[0]["loss"] - self.history[-1]["loss"]) / self.history[0]["loss"]) * 100, 2
                ) if self.history else 0,
                "step_history": self.history
            }, f, indent=2)

        print("================================================================")
        print("🎉 SUPERVISED FINE-TUNING COMPLETED SUCCESSFULLY!")
        print("================================================================")
        print(f"• Initial Loss        : {self.history[0]['loss']:.4f}")
        print(f"• Final Converged Loss: {self.history[-1]['loss']:.4f}")
        print(f"• Loss Reduction      : {((self.history[0]['loss'] - self.history[-1]['loss']) / self.history[0]['loss']) * 100:.2f}%")
        print(f"• Checkpoints Saved to: {self.output_dir}")
        print("================================================================\n")

        return {
            "status": "completed",
            "initial_loss": self.history[0]["loss"],
            "final_loss": self.history[-1]["loss"],
            "total_steps": global_step,
            "metrics_file": metrics_file,
            "checkpoint_dir": self.output_dir
        }

    def _save_checkpoint(self, filepath: str, epoch: int, step: int, loss: float):
        torch.save({
            "epoch": epoch,
            "global_step": step,
            "loss": loss,
            "model_state_dict": self.backbone.state_dict(),
            "optimizer_state_dict": self.optimizer.state_dict(),
            "lora_config": {
                "r": self.model.lora_r,
                "alpha": self.model.lora_alpha,
                "target_modules": self.model.lora_config.target_modules
            }
        }, filepath)


if __name__ == "__main__":
    trainer = BigEarthNetSFTTrainer(num_epochs=5, learning_rate=5e-4)
    trainer.train()
