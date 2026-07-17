from sqlalchemy.orm import Session

from app.modelos.usuario import Usuario
from app.logueo.seguridad import verificar_password
from app.logueo.jwt_manager import crear_token


def login_usuario(db: Session, email: str, password: str):

    usuario = db.query(Usuario).filter(
        Usuario.email == email
    ).first()

    if not usuario:
        return None

    if not verificar_password(
        password,
        usuario.password
    ):
        return None

    token = crear_token({
        "id": usuario.id,
        "email": usuario.email,
        "rol": usuario.rol
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "rol": usuario.rol
    }