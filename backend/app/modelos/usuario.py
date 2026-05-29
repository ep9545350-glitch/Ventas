from sqlalchemy import Column, Integer, String
from app.database.coneccion import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    rol = Column(String)