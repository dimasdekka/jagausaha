"""
JagaUsaha Environment Configuration
Loads settings from .env file into os.environ with fallback defaults.
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def load_dotenv(env_path: Path = None):
    if env_path is None:
        env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = val

load_dotenv()

APP_ENV = os.getenv("APP_ENV", "production")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
SECRET_KEY = os.getenv("SECRET_KEY", "jagausaha_secret_production_key_2026_98df8e")
DATABASE_PATH = os.getenv("DATABASE_PATH", str(BASE_DIR / "data" / "users.db"))
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",")]
HERMES_API_BASE = os.getenv("HERMES_API_BASE", "https://hermes-agent.nousresearch.com/v1")
HERMES_API_KEY = os.getenv("HERMES_API_KEY", "")
HERMES_MODEL = os.getenv("HERMES_MODEL", "hermes-3-llama-3.1-8b")
