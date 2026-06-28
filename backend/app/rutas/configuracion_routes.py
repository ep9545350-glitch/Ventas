from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.coneccion import SessionLocal

from app.esquemas.configuracion_schema import (
    ConfiguracionCreate,
    ConfiguracionResponse
)

from app.servicios.configuracion_service import (
    obtener_configuracion,
    actualizar_configuracion
)

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/configuracion",
    response_model=ConfiguracionResponse
)
def obtener(db: Session = Depends(get_db)):
    return obtener_configuracion(db)


@router.put(
    "/configuracion",
    response_model=ConfiguracionResponse
)
def actualizar(
    datos: ConfiguracionCreate,
    db: Session = Depends(get_db)
):
    return actualizar_configuracion(
        db,
        datos
    )