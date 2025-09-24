from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, Request, Depends

# ======================
# CONFIGURACIÓN JWT
# ======================
SECRET_KEY = "nsuEiHavMJQmJXMF"   # mismo secreto que en Flask
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 36000  # 10 horas


# ======================
# CREAR ACCESS TOKEN
# ======================
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """
    Genera un JWT con expiración.
    data: dict con la info que quieras guardar en el token (ej: {"sub": "usuario1"})
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# ======================
# DECODIFICAR TOKEN
# ======================
def decode_access_token(token: str):
    """
    Valida y decodifica un token JWT. Devuelve payload si es válido, None si no lo es.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


# ======================
# DEPENDS PARA PROTEGER RUTAS
# ======================
def get_current_user(request: Request):
    """
    Extrae y valida el token desde la cabecera Authorization: Bearer <token>.
    Lanza HTTPException si es inválido.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token faltante")

    token = auth_header.split(" ")[1]
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    return payload
