"""
Agent37 — Natural Language Intent Parser
"""

from __future__ import annotations
import re
from typing import Any, Dict, List, Optional
from .schemas import ParsedEntity, ParsedIntent, TaskType

class IntentParser:
    def __init__(self) -> None:
        self._signal_banks = {
            TaskType.CHANGE_DETECTION: ["change", "difference", "before and after", "t1", "t2"],
            TaskType.GROUNDING: ["locate", "find", "detect", "where is", "ground"],
            TaskType.CROSS_MODAL_FUSION: ["fuse", "fusion", "sar", "radar", "optical and sar"],
            TaskType.LAND_COVER: ["land cover", "land use", "classify terrain", "segmentation"],
            TaskType.VQA: ["describe", "what is", "how many", "explain", "analyze"],
        }

    def parse(self, query: str) -> ParsedIntent:
        q_lower = query.strip().lower()
        
        scores = {}
        for task_type, signals in self._signal_banks.items():
            scores[task_type] = sum(1 for signal in signals if signal in q_lower)
            
        best_task, best_score = max(scores.items(), key=lambda x: x[1])
        
        if best_score == 0:
            best_task = TaskType.VQA
            confidence = 0.3
            reasoning = "Defaulting to general VQA."
        else:
            confidence = min(best_score / 2, 1.0)
            reasoning = f"Classified based on keywords."

        return ParsedIntent(
            task_type=best_task,
            confidence=confidence,
            reasoning=reasoning,
            entities=[],
            requires_images=True,
            requires_temporal_pair=(best_task == TaskType.CHANGE_DETECTION),
            requires_sar=(best_task == TaskType.CROSS_MODAL_FUSION),
            is_compound=False,
            pipeline_steps=[best_task],
            raw_query=query,
            extracted_parameters={},
        )
