# app/utils/file_utils.py

import uuid
from pathlib import Path
from fastapi import UploadFile, HTTPException, status
import shutil
from typing import Optional

BASE_UPLOAD_DIR = Path("uploads")
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png"}
ALLOWED_PDF_TYPES = {"application/pdf"}
MAX_FILE_SIZE_MB = 2  # Maximum allowed file size (in MB)
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024  # 2MB in bytes

def validate_file_type(file: UploadFile, allowed_types: set, label: str = "file") -> None:
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid {label} type. Allowed types: {', '.join(allowed_types)}"
        )

def validate_file_size(file: UploadFile, max_size: int) -> None:
    """Check if the file size is within the allowed limit."""
    if file.spool_max_size > max_size:  # Check the file size in bytes
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds the limit of {max_size / (1024 * 1024)} MB."
        )

def save_uploaded_file(
    file: UploadFile,
    subdir: str,
    base_upload_dir: Path = BASE_UPLOAD_DIR,
    allowed_types: Optional[set] = None,
    label: str = "file",
    max_size: int = MAX_FILE_SIZE_BYTES  # Set default to 2MB
) -> Optional[str]:
    if file is None:
        return None

    # Validate file type and size
    if allowed_types:
        validate_file_type(file, allowed_types, label)
    
    validate_file_size(file, max_size)

    ext = file.filename.split(".")[-1].lower()
    filename = f"{uuid.uuid4()}.{ext}"
    upload_path = base_upload_dir / subdir
    upload_path.mkdir(parents=True, exist_ok=True)
    full_path = upload_path / filename

    with open(full_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return str(full_path.relative_to(base_upload_dir.parent))




def delete_file(relative_path: str) -> None:
    """Delete a file given a relative path from project root."""
    file_path = Path(relative_path)
    if file_path.exists() and file_path.is_file():
        file_path.unlink()


def replace_uploaded_file(
    file: UploadFile,
    old_relative_path: Optional[str],
    subdir: str,
    base_upload_dir: Path = BASE_UPLOAD_DIR,
    allowed_types: Optional[set] = None,
    label: str = "file",
    max_size: int = MAX_FILE_SIZE_BYTES  # Set default to 2MB
) -> Optional[str]:
    if allowed_types:
        validate_file_type(file, allowed_types, label)
    
    validate_file_size(file, max_size)

    if old_relative_path:
        try:
            delete_file(old_relative_path)
        except Exception:
            pass

    return save_uploaded_file(file, subdir, base_upload_dir, allowed_types, label, max_size)


