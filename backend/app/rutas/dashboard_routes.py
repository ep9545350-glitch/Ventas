from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.coneccion import SessionLocal
from app.servicios.dashboard_service import obtener_resumen_dashboard

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/dashboard/resumen")
def resumen(db: Session = Depends(get_db)):
    return obtener_resumen_dashboard(db)