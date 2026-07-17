from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.coneccion import SessionLocal
from app.esquemas.producto_schema import ProductoCreate
from app.servicios.producto_service import (
    crear_producto,
    obtener_productos
)
from app.servicios.producto_service import (
    crear_producto,
    obtener_productos,
    obtener_producto_por_id
)

from app.servicios.producto_service import (
    crear_producto,
    obtener_productos,
    obtener_producto_por_id,
    actualizar_producto
)

from app.servicios.producto_service import (
    crear_producto,
    obtener_productos,
    obtener_producto_por_id,
    actualizar_producto,
    eliminar_producto
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/productos")
def registrar_producto(
    producto: ProductoCreate,
    db: Session = Depends(get_db)
):
    return crear_producto(db, producto)

@router.get("/productos")
def listar_productos(
    db: Session = Depends(get_db)
):
    return obtener_productos(db)

@router.get("/productos/{id}")
def obtener_producto(
    id: int,
    db: Session = Depends(get_db)
):
    return obtener_producto_por_id(db, id)

@router.put("/productos/{id}")
def editar_producto(
    id: int,
    producto: ProductoCreate,
    db: Session = Depends(get_db)
):

    resultado = actualizar_producto(
        db,
        id,
        producto
    )

    if not resultado:
        return {"mensaje": "Producto no encontrado"}

    return resultado

@router.delete("/productos/{id}")
def borrar_producto(
    id: int,
    db: Session = Depends(get_db)
):

    eliminado = eliminar_producto(
        db,
        id
    )

    if not eliminado:
        return {"mensaje": "Producto no encontrado"}

    return {"mensaje": "Producto eliminado correctamente"}