from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "sistema_ventas_secret_key"
ALGORITHM = "HS256"

def crear_token(data: dict):

    datos = data.copy()

    expiracion = datetime.utcnow() + timedelta(hours=8)

    datos.update({"exp": expiracion})

    token = jwt.encode(
        datos,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token