from sqlalchemy import Column, Integer, String, Numeric, DateTime
from datetime import datetime

from app.database.coneccion import Base

class Producto(Base):

    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)

    codigo = Column(String(20), unique=True)

    nombre = Column(String(100))

    marca_presentacion = Column(String(100))

    precio_venta = Column(Numeric(10,2))

    precio_costo = Column(Numeric(10,2))

    stock_actual = Column(Integer)

    stock_minimo = Column(Integer)

    categoria = Column(String(50))

    codigo_barras = Column(String(50))

    estado = Column(String(20))

    fecha_creacion = Column(
        DateTime,
        default=datetime.utcnow
        
    )

print("Modelo Producto cargado")
    