from pydantic import BaseModel


class ConfiguracionBase(BaseModel):
    nombre_negocio: str
    zona_horaria: str
    tema: str

    login_seguro: bool
    alerta_sesion: bool

    notificar_ventas: bool
    notificar_reportes: bool
    alerta_inventario: bool


class ConfiguracionCreate(ConfiguracionBase):
    pass


class ConfiguracionResponse(ConfiguracionBase):
    id: int

    class Config:
        from_attributes = True