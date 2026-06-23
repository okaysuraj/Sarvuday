# app/services/analyzer.py

from typing import Union, List
import torch
import torch.nn.functional as F
from app.schemas import SentimentPrediction
from app.utils.preprocessing import preprocess_input

class SentimentAnalyzer:
    def __init__(self, model, tokenizer, label_encoder, device="cpu"):
        self.model = model
        self.tokenizer = tokenizer
        self.label_encoder = label_encoder
        self.device = device

    def _predict_batch_sync(self, texts: List[str]) -> List[SentimentPrediction]:
        """Synchronous method to run the PyTorch inference on a batch of texts."""
        input_ids, attention_mask = preprocess_input(texts, self.tokenizer, device=self.device)

        with torch.no_grad():
            logits = self.model(input_ids, attention_mask)
            probs = F.softmax(logits, dim=1)
            confidence, pred_indices = torch.max(probs, dim=1)

        labels = self.label_encoder.inverse_transform(pred_indices.cpu().numpy())
        confidence = confidence.cpu().numpy()

        return [
            SentimentPrediction(
                sentiment=label,
                emotion_intensity_score=float(score * 100)
            )
            for label, score in zip(labels, confidence)
        ]

    async def predict(self, texts: Union[str, List[str]], batch_size: int = 16) -> Union[SentimentPrediction, List[SentimentPrediction]]:
        import asyncio
        
        is_single_input = isinstance(texts, str)
        texts = [texts] if is_single_input else texts

        all_results = []
        
        # Process in chunks to prevent OOM errors
        for i in range(0, len(texts), batch_size):
            batch_texts = texts[i:i + batch_size]
            
            # Offload heavy PyTorch computation to a background thread to prevent blocking the FastAPI event loop
            batch_results = await asyncio.to_thread(self._predict_batch_sync, batch_texts)
            all_results.extend(batch_results)

        return all_results[0] if is_single_input else all_results



