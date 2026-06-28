from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from app.modelos.venta import Venta
from app.modelos.producto import Producto


def obtener_resumen_dashboard(db: Session):

    hoy = datetime.now()

    ventas_hoy = (
        db.query(func.coalesce(func.sum(Venta.total), 0))
        .filter(func.date(Venta.fecha) == hoy.date())
        .scalar()
    )

    ventas_mes = (
        db.query(func.coalesce(func.sum(Venta.total), 0))
        .filter(func.extract('month', Venta.fecha) == hoy.month)
        .filter(func.extract('year', Venta.fecha) == hoy.year)
        .scalar()
    )

    total_productos = db.query(Producto).count()

    stock_bajo = (
        db.query(Producto)
        .filter(
            Producto.stock_actual <= Producto.stock_minimo
        )
        .count()
    )

    ultimas_ventas = (
        db.query(Venta)
        .order_by(Venta.fecha.desc())
        .limit(5)
        .all()
    )

    return {
        "ventas_hoy": float(ventas_hoy),
        "ventas_mes": float(ventas_mes),
        "total_productos": total_productos,
        "stock_bajo": stock_bajo,
        "ultimas_ventas": [
            {
                "id": v.id,
                "cliente": v.cliente,
                "total": float(v.total),
                "estado": v.estado
            }
            for v in ultimas_ventas
        ]
    }