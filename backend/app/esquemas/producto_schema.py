from pydantic import BaseModel
from decimal import Decimal

class ProductoCreate(BaseModel):
    codigo: str
    nombre: str
    marca_presentacion: str
    precio_venta: Decimal
    precio_costo: Decimal
    stock_actual: int
    stock_minimo: int
    categoria: str
    codigo_barras: str | None = None
    estado: str

class ProductoResponse(BaseModel):
    id: int
    codigo: str
    nombre: str
    marca_presentacion: str
    precio_venta: Decimal
    precio_costo: Decimal
    stock_actual: int
    stock_minimo: int
    categoria: str
    codigo_barras: str | None = None
    estado: str

    class Config:
        from_attributes = True