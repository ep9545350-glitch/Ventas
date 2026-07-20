from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.coneccion import SessionLocal
from app.esquemas.login_schema import LoginRequest
from app.servicios.auth_service import login_usuario

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(datos: LoginRequest, db: Session = Depends(get_db)):

    print("Entró al endpoint /login")

    resultado = login_usuario(
        db,
        datos.email,
        datos.password
    )

    if not resultado:
        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )

    return resultado