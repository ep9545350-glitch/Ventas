from fastapi import FastAPI
from app.rutas.usuario_routes import router as usuario_router
from app.database.coneccion import engine, Base
from app.modelos.usuario import Usuario
from app.rutas.auth_routes import router as auth_router
from app.modelos.producto import Producto
from app.rutas.producto_routes import router as producto_router
from app.modelos.venta import Venta
from app.modelos.detalle_venta import DetalleVenta
from app.rutas.venta_routes import router as venta_router
from fastapi.middleware.cors import CORSMiddleware
from app.rutas.dashboard_routes import router as dashboard_router
from app.rutas.reporte_routes import router as reporte_router
from app.rutas.configuracion_routes import router as configuracion_router

print(Base.metadata.tables.keys())
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(usuario_router)
app.include_router(auth_router)
app.include_router(producto_router)
app.include_router(venta_router)
app.include_router(dashboard_router)
app.include_router(reporte_router)
app.include_router(configuracion_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def inicio():
    return {"mensaje": "Sistema funcionando"}