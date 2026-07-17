from sqlalchemy.orm import Session
from app.modelos.producto import Producto
from app.esquemas.producto_schema import ProductoCreate


def crear_producto(db: Session, producto: ProductoCreate):

    ultimo_producto = (
        db.query(Producto)
        .order_by(Producto.id.desc())
        .first()
    )

    if ultimo_producto:
        nuevo_codigo = f"P{ultimo_producto.id + 1:04d}"
    else:
        nuevo_codigo = "P0001"

    nuevo_producto = Producto(
        codigo=nuevo_codigo,
        nombre=producto.nombre,
        marca_presentacion=producto.marca_presentacion,
        precio_venta=producto.precio_venta,
        precio_costo=producto.precio_costo,
        stock_actual=producto.stock_actual,
        stock_minimo=producto.stock_minimo,
        categoria=producto.categoria,
        codigo_barras=producto.codigo_barras,
        estado=producto.estado
    )

    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)

    return nuevo_producto


def obtener_productos(db: Session):
    return db.query(Producto).all()


def obtener_producto_por_id(db: Session, id: int):
    return db.query(Producto).filter(
        Producto.id == id
    ).first()


def actualizar_producto(db: Session, id: int, datos: ProductoCreate):

    producto = db.query(Producto).filter(
        Producto.id == id
    ).first()

    if not producto:
        return None

    producto.codigo = datos.codigo
    producto.nombre = datos.nombre
    producto.marca_presentacion = datos.marca_presentacion
    producto.precio_venta = datos.precio_venta
    producto.precio_costo = datos.precio_costo
    producto.stock_actual = datos.stock_actual
    producto.stock_minimo = datos.stock_minimo
    producto.categoria = datos.categoria
    producto.codigo_barras = datos.codigo_barras
    producto.estado = datos.estado

    db.commit()
    db.refresh(producto)

    return producto


def eliminar_producto(db: Session, id: int):

    producto = db.query(Producto).filter(
        Producto.id == id
    ).first()

    if not producto:
        return False

    db.delete(producto)
    db.commit()

    return True