FROM python:3.10-slim

WORKDIR /app

# Install system dependencies required to build llama-cpp-python
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create a non-root user for Hugging Face Spaces (Required by HF Spaces)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

# Copy the rest of the application files (including your model.gguf)
COPY --chown=user . $HOME/app

# Hugging Face Spaces expect services to run on port 7860
EXPOSE 7860

# We use the Hugging Face Hub integration built into llama-cpp-python!
# This bypasses the 1GB Space limit by downloading the model from a Model repo dynamically when the Space starts.
# Replace 'YOUR_USERNAME/YOUR_MODEL_REPO' and 'your_model_name.gguf' with your actual repo and filename.
CMD ["python", "-m", "llama_cpp.server", "--hf_model_repo_id", "okaysuraj/sarvuday", "--model", "model.gguf", "--host", "0.0.0.0", "--port", "7860", "--n_ctx", "2048"]
