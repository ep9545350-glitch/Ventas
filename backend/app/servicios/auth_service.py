from sqlalchemy.orm import Session

from app.modelos.usuario import Usuario
from app.logueo.seguridad import verificar_password
from app.logueo.jwt_manager import crear_token


def login_usuario(db: Session, email: str, password: str):

    print("Email recibido:", email)

    usuario = db.query(Usuario).filter(
        Usuario.email == email
    ).first()

    print("Usuario encontrado:", usuario)

    if not usuario:
        print("No existe el usuario")
        return None

    print("Password ingresado:", password)
    print("Hash BD:", usuario.password)

    resultado = verificar_password(password, usuario.password)
    print("¿Password correcto?:", resultado)

    if not resultado:
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