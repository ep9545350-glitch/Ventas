from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.coneccion import SessionLocal
from app.esquemas.venta_schema import VentaCreate
from app.servicios.venta_service import crear_venta
from app.servicios.venta_service import (
    crear_venta,
    obtener_ventas
)
from app.servicios.venta_service import (
    crear_venta,
    obtener_ventas,
    obtener_venta_por_id
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/ventas")
def registrar_venta(
    venta: VentaCreate,
    db: Session = Depends(get_db)
):
    return crear_venta(db, venta)

@router.get("/ventas")
def listar_ventas(
    db: Session = Depends(get_db)
):
    return obtener_ventas(db)

@router.get("/ventas/{id}")
def detalle_venta(
    id: int,
    db: Session = Depends(get_db)
):
    return obtener_venta_por_id(
        db,
        id
    )