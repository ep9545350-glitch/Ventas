from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.coneccion import SessionLocal

from app.servicios.reporte_service import obtener_resumen_reportes

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/reportes/resumen")
def resumen_reportes(

    db: Session = Depends(get_db)

):

    return obtener_resumen_reportes(db)