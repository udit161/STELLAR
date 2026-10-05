import json
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "stellar_audit.db"


def get_connection():
    """Create a SQLite connection for audit persistence."""
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_persistence():
    """Create all audit/persistence tables if they do not exist."""

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                file_path TEXT NOT NULL,
                file_format TEXT,
                modality TEXT,
                width INTEGER,
                height INTEGER,
                band_count INTEGER,
                crs TEXT,
                resolution_x REAL,
                resolution_y REAL,
                bounds_json TEXT,
                metadata_json TEXT,
                created_at TEXT NOT NULL
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS queries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                job_id TEXT UNIQUE NOT NULL,
                user_id TEXT,
                session_id TEXT,
                query_text TEXT NOT NULL,
                status TEXT NOT NULL,
                started_at TEXT NOT NULL,
                completed_at TEXT,
                error TEXT,
                result_json TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS execution_traces (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                job_id TEXT NOT NULL,
                event_type TEXT NOT NULL,
                status TEXT,
                message TEXT,
                details_json TEXT,
                created_at TEXT NOT NULL
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS artifacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                job_id TEXT,
                artifact_type TEXT NOT NULL,
                filename TEXT NOT NULL,
                file_path TEXT NOT NULL,
                metadata_json TEXT,
                created_at TEXT NOT NULL
            )
        """)

        connection.commit()

    finally:
        connection.close()


def _now():
    return datetime.utcnow().isoformat() + "Z"


def save_image_metadata(metadata: Dict[str, Any]) -> int:
    """Persist metadata for an uploaded image."""

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO images (
                filename,
                file_path,
                file_format,
                modality,
                width,
                height,
                band_count,
                crs,
                resolution_x,
                resolution_y,
                bounds_json,
                metadata_json,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                metadata.get("filename", ""),
                metadata.get("file_path", ""),
                metadata.get("format"),
                metadata.get("modality"),
                metadata.get("width"),
                metadata.get("height"),
                metadata.get("band_count"),
                metadata.get("crs"),
                metadata.get("resolution_x"),
                metadata.get("resolution_y"),
                json.dumps(metadata.get("bounds")),
                json.dumps(metadata, default=str),
                _now(),
            ),
        )

        connection.commit()
        return cursor.lastrowid

    finally:
        connection.close()


def create_query(
    job_id: str,
    query_text: str,
    user_id: Optional[str] = None,
    session_id: Optional[str] = None,
):
    """Create a persistent query/job record."""

    connection = get_connection()

    try:
        connection.execute(
            """
            INSERT INTO queries (
                job_id,
                user_id,
                session_id,
                query_text,
                status,
                started_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                job_id,
                user_id,
                session_id,
                query_text,
                "queued",
                _now(),
            ),
        )

        connection.commit()

    finally:
        connection.close()


def update_query(
    job_id: str,
    status: str,
    result: Optional[Dict[str, Any]] = None,
    error: Optional[str] = None,
):
    """Update the persistent query/job record."""

    connection = get_connection()

    try:
        completed_at = _now() if status in ("completed", "failed") else None

        connection.execute(
            """
            UPDATE queries
            SET status = ?,
                completed_at = COALESCE(?, completed_at),
                error = ?,
                result_json = ?
            WHERE job_id = ?
            """,
            (
                status,
                completed_at,
                error,
                json.dumps(result, default=str) if result is not None else None,
                job_id,
            ),
        )

        connection.commit()

    finally:
        connection.close()


def add_execution_trace(
    job_id: str,
    event_type: str,
    status: Optional[str] = None,
    message: Optional[str] = None,
    details: Optional[Dict[str, Any]] = None,
):
    """Store an execution/audit event."""

    connection = get_connection()

    try:
        connection.execute(
            """
            INSERT INTO execution_traces (
                job_id,
                event_type,
                status,
                message,
                details_json,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                job_id,
                event_type,
                status,
                message,
                json.dumps(details, default=str) if details is not None else None,
                _now(),
            ),
        )

        connection.commit()

    finally:
        connection.close()


def save_artifact(
    job_id: str,
    artifact_type: str,
    filename: str,
    file_path: str,
    metadata: Optional[Dict[str, Any]] = None,
):
    """Register a generated output artifact."""

    connection = get_connection()

    try:
        connection.execute(
            """
            INSERT INTO artifacts (
                job_id,
                artifact_type,
                filename,
                file_path,
                metadata_json,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                job_id,
                artifact_type,
                filename,
                file_path,
                json.dumps(metadata, default=str) if metadata else None,
                _now(),
            ),
        )

        connection.commit()

    finally:
        connection.close()


def get_query(job_id: str) -> Optional[Dict[str, Any]]:
    """Retrieve a persisted query by job ID."""

    connection = get_connection()

    try:
        row = connection.execute(
            """
            SELECT *
            FROM queries
            WHERE job_id = ?
            """,
            (job_id,),
        ).fetchone()

        if row is None:
            return None

        result = dict(row)

        if result.get("result_json"):
            result["result"] = json.loads(result["result_json"])

        result.pop("result_json", None)

        return result

    finally:
        connection.close()


def get_execution_traces(job_id: str):
    """Retrieve all audit events for a job."""

    connection = get_connection()

    try:
        rows = connection.execute(
            """
            SELECT *
            FROM execution_traces
            WHERE job_id = ?
            ORDER BY id ASC
            """,
            (job_id,),
        ).fetchall()

        return [dict(row) for row in rows]

    finally:
        connection.close()


def get_artifacts(job_id: str):
    """Retrieve all registered artifacts for a job."""

    connection = get_connection()

    try:
        rows = connection.execute(
            """
            SELECT *
            FROM artifacts
            WHERE job_id = ?
            ORDER BY id ASC
            """,
            (job_id,),
        ).fetchall()

        return [dict(row) for row in rows]

    finally:
        connection.close()