from pydantic import BaseModel


class DetalleVentaCreate(BaseModel):

    producto_id: int
    cantidad: int


class VentaCreate(BaseModel):

    cliente: str
    metodo_pago: str
    estado: str

    productos: list[DetalleVentaCreate]