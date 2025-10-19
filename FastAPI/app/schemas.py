# app/schemas.py
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import date
from decimal import Decimal
from bson import ObjectId

# ==========================================================
# USUARIO
# ==========================================================
class UsuarioBase(BaseModel):
    usuario: str
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    telefono: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    password: str
    token: Optional[str] = None

class UsuarioUpdate(UsuarioBase):
    password: Optional[str] = None

class UsuarioOut(UsuarioBase):
    id_usuario: str
    usuario: str
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    telefono: Optional[str] = None
    token: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True
        json_encoders = {ObjectId: str}
        json_encoders = {str: str}

class UsuarioCheckPassword(BaseModel):
    id_usuario: Optional[str] = None
    usuario: Optional[str] = None
    password: str
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    telefono: Optional[str] = None
    token: Optional[str] = None
    
class LoginRequest(BaseModel):
    usuario: str
    password: str


class LoginResponse(BaseModel):
    mensaje: str
    id_usuario: str | None = None
    token: str | None = None


# ==========================================================
# CATEGORIA
# ==========================================================
class CategoriaBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    imagen: Optional[str] = None
    tags: Optional[str] = None

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaOut(CategoriaBase):
    id_categoria: str

    class Config:
        orm_mode = True


# ==========================================================
# PRODUCTO
# ==========================================================
class ProductoBase(BaseModel):
    id_categoria: str
    nombre: str
    descripcion: Optional[str] = None
    precio: float
    descuento: Optional[Decimal] = None
    url: str
    imagen: Optional[str] = None
    tags: Optional[str] = None

class ProductoCreate(ProductoBase):
    pass

class ProductoOut(ProductoBase):
    id_producto: str

    class Config:
        orm_mode = True


# ==========================================================
# PRODUCTO USUARIO
# ==========================================================
class ProductoUsuarioBase(BaseModel):
    id_usuario: int
    id_producto: int
    id_pago: int
    activo: int
    precio: float
    periodo: int
    fecha: Optional[date] = None
    fecha_hasta: Optional[date] = None

class ProductoUsuarioCreate(ProductoUsuarioBase):
    pass

class ProductoUsuarioOut(ProductoUsuarioBase):
    id_producto_usuario: int

    class Config:
        orm_mode = True

# ==========================================================
# CUPON
# ==========================================================
class CuponBase(BaseModel):
    fecha: date
    cupon_descuento: Decimal
    codigo: str
    activo: bool

class CuponCreate(CuponBase):
    pass

class CuponOut(CuponBase):
    id_cupon: Optional[str] = None

    class Config:
        orm_mode = True


# ==========================================================
# CUP (CuponUsuarioPago)
# ==========================================================
class CUPBase(BaseModel):
    id_usuario: str
    id_cupon: str
    id_pago: str
    fecha: date

class CUPCreate(CUPBase):
    pass

class CUPOut(CUPBase):
    id_cupon_usuario_pago: Optional[str] = None

    class Config:
        orm_mode = True


# ==========================================================
# DETALLE FACTURA
# ==========================================================
class DetalleFacturaBase(BaseModel):
    id_pago: int
    id_producto: int
    id_factura: int
    precio: float

class DetalleFacturaCreate(DetalleFacturaBase):
    pass

class DetalleFacturaOut(DetalleFacturaBase):
    id_detalle_factura: Optional[int] = None

    class Config:
        orm_mode = True

# ==========================================================
# EMPRESA
# ==========================================================
class EmpresaBase(BaseModel):
    nombre: str
    direccion: int
    telefono: str
    correo: str
    identificacion: str
    id_metodo_pago: Optional[int] = None

class EmpresaCreate(EmpresaBase):
    pass

class EmpresaOut(EmpresaBase):
    id_empresa: int

    class Config:
        orm_mode = True


# ==========================================================
# FACTURACION
# ==========================================================
class FacturacionBase(BaseModel):
    id_empresa: str
    id_metodo_pago: str
    total: float
    subtotal: float
    iva: float
    iva_0: float
    ruc_empresa: Optional[str] = None
    nombre_empresa: Optional[str] = None
    telefono_empresa: Optional[str] = None
    correo_empresa: Optional[str] = None
    id_usuario: Optional[int] = None
    sri: Optional[str] = None
    fecha: Optional[str] = None  

class FacturacionCreate(FacturacionBase):
    pass

class FacturacionOut(FacturacionBase):
    id_factura: str

    class Config:
        orm_mode = True


# ==========================================================
# IVA
# ==========================================================
class IVABase(BaseModel):
    iva_valor: Decimal

class IVACreate(IVABase):
    pass

class IVAOut(IVABase):
    id_iva: str

    class Config:
        orm_mode = True

# ==========================================================
# LOG PRODUCTO - USUARIO
# ==========================================================
class LogProdUserBase(BaseModel):
    id_usuario: int
    id_producto: int
    id_producto_usuario: int
    precio: float
    fecha: date

class LogProdUserCreate(LogProdUserBase):
    pass

class LogProdUserOut(LogProdUserBase):
    id_log_prod_user: int

    class Config:
        orm_mode = True


# ==========================================================
# MEMBRESIAS
# ==========================================================
class Membresia(BaseModel):
    id_membresia: str
    tipo: str
    periodo: int
    descuento: float
    activo: bool


# ==========================================================
# METODO DE PAGO
# ==========================================================
class MetodoPagoBase(BaseModel):
    tarjeta: str
    nombre: str

class MetodoPagoCreate(MetodoPagoBase):
    pass

class MetodoPagoOut(MetodoPagoBase):
    id_metodo_pago: int

    class Config:
        orm_mode = True

# ==========================================================
# PAGOS
# ==========================================================
class PagoBase(BaseModel):
    id_empresa: int
    valor: float
    periodo: int
    procesado: int
    detalle: Optional[str] = None
    descuento: Optional[Decimal] = None
    intentos: Optional[int] = None
    cancelado: Optional[int] = None
    fecha: Optional[str] = None   # si prefieres podemos usar date/datetime
    fecha_hasta: Optional[str] = None

class PagoCreate(PagoBase):
    pass

class PagoOut(PagoBase):
    id_pago: int

    class Config:
        orm_mode = True

# ==========================================================
# PERSONA
# ==========================================================
class PersonaBase(BaseModel):
    nombre: str
    apellido: str
    correo: str
    telefono: str
    id_direccion: Optional[int] = None
    id_empresa: Optional[int] = None
    id_usuario: Optional[int] = None

class PersonaCreate(PersonaBase):
    pass

class PersonaOut(PersonaBase):
    id_persona: int

    class Config:
        orm_mode = True
