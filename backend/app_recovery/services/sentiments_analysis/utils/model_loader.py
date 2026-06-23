# app/utils/model_loader.py

from transformers import AutoTokenizer, AutoModel
import torch
from app.utils.model_architecture import EmotionClassifier
from app.config import settings

def load_model_and_tokenizer(model_path: str, tokenizer_path: str, num_classes: int, device: str):

    # Load tokenizer from local directory
    tokenizer = AutoTokenizer.from_pretrained(tokenizer_path, local_files_only=True)

    base_model = AutoModel.from_pretrained(settings.bert_base_model)

    # Load classification model
    model = EmotionClassifier(base_model, num_classes)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()

    return model, tokenizer



