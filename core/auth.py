"""
JagaUsaha Authentication & User Management Engine
Persistent SQLite storage with cryptographically secure PBKDF2-SHA256 password hashing (NIST/OWASP standard).
"""

import os
import sqlite3
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "users.db")


def get_db_connection() -> sqlite3.Connection:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_auth_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            phone TEXT,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            created_at TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)
    conn.commit()

    # Seed default demo owner if not exists
    cursor.execute("SELECT id FROM users WHERE email = ?", ("owner@kopiteras.id",))
    if not cursor.fetchone():
        demo_id = "usr_demo_kopiteras"
        demo_hash = hash_password("jagausaha2026")
        now = datetime.utcnow().isoformat()
        cursor.execute(
            """
            INSERT INTO users (id, email, full_name, phone, password_hash, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (demo_id, "owner@kopiteras.id", "Dimas Dekananta (Owner Kopi Teras)", "081234567890", demo_hash, now, now)
        )
        conn.commit()

    conn.close()


def hash_password(password: str) -> str:
    """Hash a password using PBKDF2-HMAC-SHA256 with 100,000 iterations and a 16-byte random salt."""
    salt = secrets.token_bytes(16)
    pw_hash = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
    return f"{salt.hex()}${pw_hash.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    """Verify a plain password against the stored salt$hash string."""
    try:
        parts = stored_hash.split("$")
        if len(parts) != 2:
            return False
        salt = bytes.fromhex(parts[0])
        original_hash = bytes.fromhex(parts[1])
        candidate_hash = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
        return hmac.compare_digest(original_hash, candidate_hash)
    except Exception:
        return False


def create_session(user_id: str, days: int = 30) -> str:
    """Create a cryptographically secure session token."""
    token = secrets.token_hex(32)
    now = datetime.utcnow()
    expires_at = (now + timedelta(days=days)).isoformat()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
        (token, user_id, now.isoformat(), expires_at)
    )
    conn.commit()
    conn.close()
    return token


def register_user(email: str, password: str, full_name: str, phone: str = "") -> Dict[str, Any]:
    """Register a new user, store securely in SQLite, and return session data."""
    init_auth_db()
    email_clean = email.strip().lower()
    full_name_clean = full_name.strip()
    phone_clean = phone.strip()

    if not email_clean or "@" not in email_clean:
        raise ValueError("Format email tidak valid.")
    if len(password) < 6:
        raise ValueError("Password minimal 6 karakter.")
    if not full_name_clean:
        raise ValueError("Nama lengkap wajib diisi.")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM users WHERE email = ?", (email_clean,))
    if cursor.fetchone():
        conn.close()
        raise ValueError("Email sudah terdaftar. Silakan langsung masuk.")

    user_id = f"usr_{secrets.token_hex(8)}"
    pw_hash = hash_password(password)
    now = datetime.utcnow().isoformat()

    cursor.execute(
        """
        INSERT INTO users (id, email, full_name, phone, password_hash, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (user_id, email_clean, full_name_clean, phone_clean, pw_hash, now, now)
    )
    conn.commit()
    conn.close()

    token = create_session(user_id)
    return {
        "status": "success",
        "message": "Akun berhasil didaftarkan dan disimpan.",
        "token": token,
        "user": {
            "id": user_id,
            "email": email_clean,
            "full_name": full_name_clean,
            "phone": phone_clean,
            "created_at": now
        }
    }


def login_user(email: str, password: str) -> Dict[str, Any]:
    """Authenticate a user against stored password hash and return session token."""
    init_auth_db()
    email_clean = email.strip().lower()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, email, full_name, phone, password_hash, created_at FROM users WHERE email = ?", (email_clean,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise ValueError("Email belum terdaftar.")

    if not verify_password(password, row["password_hash"]):
        raise ValueError("Password salah. Silakan coba lagi.")

    token = create_session(row["id"])
    return {
        "status": "success",
        "message": "Login berhasil.",
        "token": token,
        "user": {
            "id": row["id"],
            "email": row["email"],
            "full_name": row["full_name"],
            "phone": row["phone"],
            "created_at": row["created_at"]
        }
    }


def get_user_by_token(token: str) -> Optional[Dict[str, Any]]:
    """Validate a session token and return user details."""
    if not token:
        return None
    init_auth_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    cursor.execute("""
        SELECT u.id, u.email, u.full_name, u.phone, u.created_at
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > ?
    """, (token, now))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return {
        "id": row["id"],
        "email": row["email"],
        "full_name": row["full_name"],
        "phone": row["phone"],
        "created_at": row["created_at"]
    }
