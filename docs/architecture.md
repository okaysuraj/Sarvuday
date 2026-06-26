# System Architecture & API Details

SarvUday is architected as a decoupled, microservice-inspired web system. It consists of a primary monolithic backend that handles business logic and a dedicated AI microservice hosted on Hugging Face Spaces for running the language model.

## 1. High-Level Architecture

- **Client**: 
  - **React.js Web App**: Handles the web portal for Normal Users, Counsellors, and Admins. Deployed on Netlify.
- **Primary API (`/backend`)**: 
  - Built with FastAPI (Python) and deployed on Render.
  - Handles Authentication, User Management, Appointments, Prescriptions, and Session tracking.
  - Connects to a PostgreSQL database (Neon Cloud) via SQLAlchemy and MongoDB (Atlas Cloud) for AI chatbot history.
- **AI Microservice (`/ai_assistant_space`)**:
  - A specialized, isolated Docker container hosted as a Hugging Face Space, dedicated to running a Large Language Model for the CBT chat companion feature.

## 2. Deep Dive: The `ai_assistant_space` Folder

The `ai_assistant_space` folder contains the Docker configuration required to run a `.gguf` (quantized language model) as an API on Hugging Face Spaces. The backend (`chatbot_inference.py`) uses an `AsyncOpenAI` client, which connects with this space's endpoint.

### What is it doing?
This service leverages `llama-cpp-python`'s built-in server. When run, it creates an API that exactly mimics the OpenAI REST API format. It allows the main `Sarvuday_Web` backend to communicate with the self-hosted `.gguf` model using standard OpenAI SDK methods, bypassing rate limits.

### Internal Mechanics:
- **`Dockerfile`**: Sets up a Python environment, installs dependencies, and creates a non-root user (which is a strict requirement for Hugging Face Spaces). It uses the `CMD` instruction to launch the `llama-cpp-python` server targeting `model.gguf`. The model is dynamically downloaded from the Hugging Face Model repository (`okaysuraj/sarvuday`) when the space starts, avoiding size limit constraints.
- **`requirements.txt`**: Specifies `llama-cpp-python[server]` and `huggingface-hub`.
- **`model.gguf` (Hosted on HF Model Repository)**: The actual quantized LLM weights. Loaded into RAM when the Space starts up.

### Why is it structured this way?
By keeping the `ai_assistant_space` separate from the main `backend`:
- **Independent Scaling**: LLM inference is extremely hardware-intensive. By running the `.gguf` model in its own Hugging Face Space container, it prevents the main FastAPI backend on Render from freezing or crashing due to memory exhaustion or high compute load.
- **Zero Backend Code Changes**: Because `llama-cpp-python` exposes an OpenAI-compatible API, the primary backend simply points its base URL in the `.env` configuration to this Space, requiring zero changes to the underlying `chatbot_inference.py` logic.
