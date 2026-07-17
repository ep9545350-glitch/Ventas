from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

def encriptar_password(password: str):
    """Hash password using a safe PBKDF2-SHA256 scheme.
    Truncate inputs to keep behavior predictable in development.
    """
    if password is None:
        password = ""
    safe = password[:72]
    try:
        return pwd_context.hash(safe)
    except Exception:
        # As a last-resort fallback keep behavior predictable
        return pwd_context.hash(safe[:72])


def verificar_password(password_plano: str, password_hash: str):
    """Verify password against hash using the same truncation rule."""
    if password_plano is None:
        password_plano = ""
    safe = password_plano[:72]
    try:
        return pwd_context.verify(safe, password_hash)
    except Exception:
        return False