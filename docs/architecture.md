# System Architecture & API Details

SarvUday is architected as a decoupled, microservice-inspired system. It consists of a primary monolithic backend that handles business logic and a dedicated AI microservice for heavy machine learning tasks.

## 1. High-Level Architecture

- **Clients**: 
  - **React.js Web App**: Handles the web portal for Normal Users, Counsellors, and Admins.
  - **React Native Mobile App**: Provides native Android/iOS experiences for end users.
- **Primary API (`/backend`)**: 
  - Built with FastAPI (Python).
  - Handles Authentication, User Management, Appointments, Prescriptions, and Session tracking.
  - Connects to a PostgreSQL database via SQLAlchemy.
- **AI Microservice (`/sentiment_model_api`)**:
  - A specialized, isolated FastAPI service dedicated exclusively to running PyTorch inference on text to determine emotional state.

## 2. Deep Dive: The `sentiment_model_api` Folder

The `sentiment_model_api` folder houses a dedicated AI microservice. Isolating this from the main backend is an enterprise best practice because loading massive machine learning models (like BERT) into memory blocks the event loop and scales differently than standard I/O bound CRUD operations.

### What is it doing?
This service loads a pre-trained/fine-tuned **Hugging Face Transformer model** (specifically BERT) using PyTorch. It exposes a REST API endpoint that accepts raw text (e.g., user journal entries, self-assessment answers, or chat logs) and returns a structured emotional analysis.

### Internal Mechanics:
- **`app/main.py`**: Initializes the FastAPI application and uses a `lifespan` context manager. Upon startup, it loads the heavy PyTorch model weights (`.pt` or `.bin`), the BERT Tokenizer, and the Label Encoder from disk into GPU/CPU memory. This ensures the model is only loaded *once* at startup, rather than on every request.
- **`app/api/routes.py`**: Defines the `/predict` endpoint. It receives text, passes it to the utility function, and formats the response.
- **`app/utils/model_loader.py` & Inference Logic**:
  1. **Tokenization**: The raw text is converted into input IDs and attention masks using the BERT tokenizer.
  2. **Forward Pass**: The tensors are passed through the PyTorch model (`torch.no_grad()`) to get raw logits.
  3. **Classification**: A softmax function is applied to the logits to determine the primary emotion class (e.g., Anxiety, Depression, Neutral, Joy).
  4. **Intensity Scoring**: It calculates an `emotion_intensity_score` (a continuous scalar representing the severity of the sentiment).

### Why is it structured this way?
By keeping the `sentiment_model_api` separate from the main `backend`:
- **Independent Scaling**: If the platform experiences a surge in chat messages requiring sentiment analysis, we can horizontally scale the `sentiment_model_api` containers (potentially on GPU-backed instances) without scaling the primary database-driven backend.
- **Dependency Isolation**: The main backend doesn't need to install heavy ML libraries like `torch`, `transformers`, or `scikit-learn`, keeping the core API lightweight and fast.
