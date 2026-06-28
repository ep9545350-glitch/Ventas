from sqlalchemy.orm import Session
from app.modelos.usuario import Usuario
from app.esquemas.usuario_schema import UsuarioCreate
from app.logueo.seguridad import encriptar_password


def crear_usuario(db: Session, usuario: UsuarioCreate):

    nuevo_usuario = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        password=encriptar_password(usuario.password),
        rol=usuario.rol
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return nuevo_usuario


# ==========================
# LISTAR
# ==========================

def obtener_usuarios(db: Session):
    return db.query(Usuario).all()


# ==========================
# BUSCAR POR ID
# ==========================

def obtener_usuario(db: Session, usuario_id: int):
    return db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()


# ==========================
# EDITAR
# ==========================

def actualizar_usuario(
    db: Session,
    usuario_id: int,
    datos: UsuarioCreate
):

    usuario = obtener_usuario(db, usuario_id)

    if not usuario:
        return None

    usuario.nombre = datos.nombre
    usuario.email = datos.email
    usuario.password = encriptar_password(datos.password)
    usuario.rol = datos.rol

    db.commit()
    db.refresh(usuario)

    return usuario


# ==========================
# ELIMINAR
# ==========================

def eliminar_usuario(
    db: Session,
    usuario_id: int
):

    usuario = obtener_usuario(db, usuario_id)

    if not usuario:
        return None

    db.delete(usuario)
    db.commit()

    return usuario