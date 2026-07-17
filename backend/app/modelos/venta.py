from sqlalchemy import Column, Integer, String, Numeric, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.coneccion import Base


class Venta(Base):

    __tablename__ = "ventas"

    id = Column(Integer, primary_key=True, index=True)

    cliente = Column(String(100))

    total = Column(Numeric(10, 2))

    metodo_pago = Column(String(30))

    estado = Column(String(20))

    fecha = Column(
        DateTime,
        default=datetime.utcnow
    )

    detalles = relationship(
        "DetalleVenta",
        back_populates="venta"
    )