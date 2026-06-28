from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.coneccion import SessionLocal
from app.esquemas.usuario_schema import UsuarioCreate, UsuarioResponse
from app.servicios.usuario_service import (
    crear_usuario,
    obtener_usuarios,
    obtener_usuario,
    actualizar_usuario,
    eliminar_usuario
)


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/usuarios", response_model=UsuarioResponse)
def registrar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db)
):
    return crear_usuario(db, usuario)


@router.get(
    "/usuarios",
    response_model=list[UsuarioResponse]
)
def listar_usuarios(
    db: Session = Depends(get_db)
):
    return obtener_usuarios(db)


@router.get(
    "/usuarios/{usuario_id}",
    response_model=UsuarioResponse
)
def buscar_usuario(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    return obtener_usuario(db, usuario_id)

@router.put(
    "/usuarios/{usuario_id}",
    response_model=UsuarioResponse
)
def editar_usuario(
    usuario_id: int,
    datos: UsuarioCreate,
    db: Session = Depends(get_db)
):
    return actualizar_usuario(
        db,
        usuario_id,
        datos
    )

@router.delete("/usuarios/{usuario_id}")
def borrar_usuario(
    usuario_id: int,
    db: Session = Depends(get_db)
):

    eliminar_usuario(
        db,
        usuario_id
    )

    return {
        "mensaje": "Usuario eliminado correctamente"
    }