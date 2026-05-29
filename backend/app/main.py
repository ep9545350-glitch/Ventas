from fastapi import FastAPI

from app.database.coneccion import engine, Base
from app.modelos.usuario import Usuario

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def inicio():
    return {"mensaje": "Sistema funcionando"}