# app/schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import date
from decimal import Decimal

# ==========================================================
# USUARIO
# ==========================================================
class UsuarioBase(BaseModel):
    usuario: str

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioOut(UsuarioBase):
    id_usuario: int
    token: Optional[str] = None

    class Config:
        orm_mode = True


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
    id_empresa: int
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
    fecha: Optional[str] = None  # si quieres más estricto → datetime.date

class FacturacionCreate(FacturacionBase):
    pass

class FacturacionOut(FacturacionBase):
    id_factura: int

    class Config:
        orm_mode = True


# ==========================================================
# IVA
# ==========================================================
class IVABase(BaseModel):
    IVA_valor: Decimal

class IVACreate(IVABase):
    pass

class IVAOut(IVABase):
    id_IVA: int

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
class MembresiaBase(BaseModel):
    tipo: str
    descuento: Optional[float] = None
    activo: bool

class MembresiaCreate(MembresiaBase):
    pass

class MembresiaOut(MembresiaBase):
    id_membresia: int

    class Config:
        orm_mode = True


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
