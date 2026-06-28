from sqlalchemy.orm import Session

from app.modelos.venta import Venta
from app.modelos.detalle_venta import DetalleVenta
from app.modelos.producto import Producto


def crear_venta(db: Session, datos):

    total = 0

    venta = Venta(
        cliente=datos.cliente,
        metodo_pago=datos.metodo_pago,
        estado=datos.estado,
        total=0
    )

    db.add(venta)
    db.commit()
    db.refresh(venta)

    for item in datos.productos:

        producto = db.query(Producto).filter(
            Producto.id == item.producto_id
        ).first()

        if not producto:
            return {"error": f"Producto {item.producto_id} no existe"}

        if producto.stock_actual < item.cantidad:
            return {
                "error": f"Stock insuficiente para {producto.nombre}"
            }

        subtotal = producto.precio_venta * item.cantidad

        detalle = DetalleVenta(
            venta_id=venta.id,
            producto_id=producto.id,
            cantidad=item.cantidad,
            precio_unitario=producto.precio_venta,
            subtotal=subtotal
        )

        db.add(detalle)

        producto.stock_actual -= item.cantidad

        total += subtotal

    venta.total = total

    db.commit()
    db.refresh(venta)

    return venta

def obtener_ventas(db: Session):
    return db.query(Venta).all()

def obtener_venta_por_id(
    db: Session,
    id: int
):
    return db.query(Venta).filter(
        Venta.id == id
    ).first()