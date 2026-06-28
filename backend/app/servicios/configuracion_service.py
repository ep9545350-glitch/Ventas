from sqlalchemy.orm import Session

from app.modelos.configuracion import Configuracion
from app.esquemas.configuracion_schema import ConfiguracionCreate


def obtener_configuracion(db: Session):

    configuracion = db.query(Configuracion).first()

    if not configuracion:

        configuracion = Configuracion(
            nombre_negocio="VentasPro",
            zona_horaria="GMT-5 Lima",
            tema="Claro",
            login_seguro=True,
            alerta_sesion=False,
            notificar_ventas=True,
            notificar_reportes=False,
            alerta_inventario=True
        )

        db.add(configuracion)
        db.commit()
        db.refresh(configuracion)

    return configuracion


def actualizar_configuracion(
    db: Session,
    datos: ConfiguracionCreate
):

    configuracion = db.query(Configuracion).first()

    if not configuracion:

        configuracion = Configuracion()
        db.add(configuracion)

    configuracion.nombre_negocio = datos.nombre_negocio
    configuracion.zona_horaria = datos.zona_horaria
    configuracion.tema = datos.tema

    configuracion.login_seguro = datos.login_seguro
    configuracion.alerta_sesion = datos.alerta_sesion

    configuracion.notificar_ventas = datos.notificar_ventas
    configuracion.notificar_reportes = datos.notificar_reportes
    configuracion.alerta_inventario = datos.alerta_inventario

    db.commit()
    db.refresh(configuracion)

    return configuracion