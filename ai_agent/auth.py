"""
SatQuery AI - Authentication Module
Provides PostgreSQL User model (with SQLite fallback), password hashing via passlib/bcrypt,
and JWT access token generation and validation.
"""

import os
import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel, EmailStr, Field

# ---------------------------------------------------------------------------
# Password Hashing Setup
# ---------------------------------------------------------------------------

try:
    import bcrypt
    if not hasattr(bcrypt, "__about__") and hasattr(bcrypt, "__version__"):
        bcrypt.__about__ = type("about", (), {"__version__": bcrypt.__version__})
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    PASSLIB_AVAILABLE = True
except Exception:
    PASSLIB_AVAILABLE = False

import hashlib
import hmac


def hash_password(password: str) -> str:
    """Hash password using passlib/bcrypt with SHA256 HMAC fallback."""
    if PASSLIB_AVAILABLE:
        try:
            return pwd_context.hash(password)
        except Exception:
            pass
    # Fallback secure hash
    salt = "satquery_salt_2026"
    return hmac.new(salt.encode(), password.encode(), hashlib.sha256).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain text password against stored hash."""
    if PASSLIB_AVAILABLE and (hashed_password.startswith("$2b$") or hashed_password.startswith("$2a$")):
        try:
            return pwd_context.verify(plain_password, hashed_password)
        except Exception:
            pass
    # Fallback verification
    expected = hash_password(plain_password)
    return hmac.compare_digest(expected, hashed_password)


# ---------------------------------------------------------------------------
# JWT Configuration & Utilities
# ---------------------------------------------------------------------------

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "satquery_ai_super_secret_jwt_key_2026")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 Hours


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Generate a signed JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT access token."""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None


# ---------------------------------------------------------------------------
# Database & User Model Setup
# ---------------------------------------------------------------------------

Base = declarative_base()


class User(Base):
    """PostgreSQL User table model."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "full_name": self.full_name,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


# Database Connection Initialization (PostgreSQL with SQLite Fallback)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/satquery_db")

def init_db():
    """Attempt connecting to PostgreSQL, falling back to SQLite if offline."""
    global engine, SessionLocal
    try:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        Base.metadata.create_all(bind=engine)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        # Test connection
        with engine.connect() as conn:
            pass
        print(f"[AUTH DB] Successfully connected to PostgreSQL at {DATABASE_URL}")
    except Exception as e:
        print(f"[AUTH DB] PostgreSQL unavailable ({e}). Falling back to local SQLite database.")
        sqlite_url = "sqlite:///./satquery_auth.db"
        engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})
        Base.metadata.create_all(bind=engine)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


init_db()


def get_db():
    """FastAPI Dependency for database sessions."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------------------------
# Pydantic Authentication Schemas
# ---------------------------------------------------------------------------

class UserCreate(BaseModel):
    email: str = Field(..., description="User email address")
    username: str = Field(..., description="Unique username")
    password: str = Field(..., min_length=6, description="User password (min 6 chars)")
    full_name: Optional[str] = Field(None, description="User full name")


class UserLogin(BaseModel):
    username_or_email: str = Field(..., description="Username or Email address")
    password: str = Field(..., description="Password")


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
