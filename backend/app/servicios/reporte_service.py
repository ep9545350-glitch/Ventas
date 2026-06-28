from sqlalchemy.orm import Session
from sqlalchemy import func

from app.modelos.venta import Venta


def obtener_resumen_reportes(db: Session):

    ventas_totales = (
        db.query(
            func.coalesce(func.sum(Venta.total), 0)
        ).scalar()
    )

    transacciones = db.query(Venta).count()

    mejor = (
    db.query(
        func.extract("dow", Venta.fecha).label("dia"),
        func.sum(Venta.total).label("total")
    )
    .group_by(
        func.extract("dow", Venta.fecha)
    )
    .order_by(
        func.sum(Venta.total).desc()
    )
    .first()
)

    dias = {
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado"
}

    mejor_dia = "-"

    if mejor:
        mejor_dia = dias.get(int(mejor.dia), "-")

    return {
        "ventas_totales": float(ventas_totales),
        "transacciones": transacciones,
        "mejor_dia": mejor_dia,
        "mejor_cajero": "No disponible"
    }