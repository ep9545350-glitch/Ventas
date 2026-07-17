from sqlalchemy import Column, Integer, String, Boolean
from app.database.coneccion import Base


class Configuracion(Base):
    __tablename__ = "configuracion"

    id = Column(Integer, primary_key=True, index=True)

    nombre_negocio = Column(String(100))
    zona_horaria = Column(String(100))
    tema = Column(String(30))

    login_seguro = Column(Boolean, default=True)
    alerta_sesion = Column(Boolean, default=False)

    notificar_ventas = Column(Boolean, default=True)
    notificar_reportes = Column(Boolean, default=False)
    alerta_inventario = Column(Boolean, default=True)