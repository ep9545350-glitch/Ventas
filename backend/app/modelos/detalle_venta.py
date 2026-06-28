from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Numeric
)
from sqlalchemy.orm import relationship

from app.database.coneccion import Base


class DetalleVenta(Base):

    __tablename__ = "detalle_ventas"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    venta_id = Column(
        Integer,
        ForeignKey("ventas.id")
    )

    producto_id = Column(
        Integer,
        ForeignKey("productos.id")
    )

    cantidad = Column(Integer)

    precio_unitario = Column(
        Numeric(10,2)
    )

    subtotal = Column(
        Numeric(10,2)
    )

    venta = relationship(
        "Venta",
        back_populates="detalles"
    )

    producto = relationship(
        "Producto"
    )