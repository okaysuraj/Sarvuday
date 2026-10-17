"""Bounded uploads and file operations confined to the configured upload root."""

import uuid
from pathlib import Path
from typing import Optional

from fastapi import HTTPException, UploadFile

BASE_UPLOAD_DIR = Path("uploads")
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png"}
MAX_FILE_SIZE_MB = 2
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
MIME_EXTENSIONS = {"image/jpeg": ".jpg", "image/png": ".png", "application/pdf": ".pdf"}


def validate_file_type(
    file: UploadFile, allowed_types: set, label: str = "file"
) -> None:
    if (
        file.content_type not in allowed_types
        or file.content_type not in MIME_EXTENSIONS
    ):
        raise HTTPException(status_code=400, detail=f"Invalid {label} type")
    position = file.file.tell()
    file.file.seek(0)
    header = file.file.read(8)
    file.file.seek(position)
    valid = {
        "image/jpeg": header.startswith(b"\xff\xd8\xff"),
        "image/png": header.startswith(b"\x89PNG\r\n\x1a\n"),
        "application/pdf": header.startswith(b"%PDF-"),
    }
    if not valid.get(file.content_type):
        raise HTTPException(
            status_code=400, detail="The file content does not match its declared type"
        )


def validate_file_size(file: UploadFile, max_size: int) -> None:
    position = file.file.tell()
    file.file.seek(0, 2)
    length = file.file.tell()
    file.file.seek(position)
    if length > max_size:
        raise HTTPException(status_code=413, detail="The uploaded file is too large")
    if length == 0:
        raise HTTPException(status_code=400, detail="The uploaded file is empty")


def save_uploaded_file(
    file: UploadFile,
    subdir: str,
    base_upload_dir: Path = BASE_UPLOAD_DIR,
    allowed_types: Optional[set] = None,
    label: str = "file",
    max_size: int = MAX_FILE_SIZE_BYTES,
) -> Optional[str]:
    if file is None:
        return None
    validate_file_type(file, allowed_types or set(MIME_EXTENSIONS), label)
    validate_file_size(file, max_size)
    root = base_upload_dir.resolve()
    directory = (root / subdir).resolve()
    if not directory.is_relative_to(root):
        raise HTTPException(status_code=400, detail="Invalid upload destination")
    directory.mkdir(parents=True, exist_ok=True)
    destination = directory / f"{uuid.uuid4().hex}{MIME_EXTENSIONS[file.content_type]}"
    file.file.seek(0)
    copied = 0
    try:
        with destination.open("xb") as output:
            while chunk := file.file.read(65536):
                copied += len(chunk)
                if copied > max_size:
                    raise HTTPException(
                        status_code=413, detail="The uploaded file is too large"
                    )
                output.write(chunk)
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    return str(destination.relative_to(root.parent))


def replace_uploaded_file(
    file: UploadFile,
    old_relative_path: Optional[str],
    subdir: str,
    base_upload_dir: Path = BASE_UPLOAD_DIR,
    allowed_types: Optional[set] = None,
    label: str = "file",
    max_size: int = MAX_FILE_SIZE_BYTES,
) -> Optional[str]:
    saved = save_uploaded_file(
        file, subdir, base_upload_dir, allowed_types, label, max_size
    )
    if saved and old_relative_path:
        old = Path(old_relative_path).resolve()
        root = base_upload_dir.resolve()
        if old.is_relative_to(root) and old.is_file():
            old.unlink()
    return saved
