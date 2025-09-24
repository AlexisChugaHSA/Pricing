from fastapi import APIRouter, HTTPException, Depends
from app.schemas import ProductoBase,ProductoOut
from app.core.auth import get_current_user
from app.db import db
from bson import ObjectId

router = APIRouter(prefix="/productos", tags=["Productos"])

# ===== Obtener todos los productos =====
@router.get("/", response_model=list[ProductoOut])
async def obtener_productos():
    productos_cursor = db.productos.find({})
    productos = []
    print(productos_cursor)
    async for m in productos_cursor:
        productos.append(ProductoOut(
            id_producto=str(m["_id"]),
            id_categoria=m["id_categoria"],
            nombre=m["nombre"],
            descripcion=m["descripcion"],
            precio=m["precio"],
            descuento=m["descuento"],
            url=m["url"],
            imagen=m["imagen"],
            tags=m["tags"],
            
        ))
    return productos

# ===== Obtener producto por id =====
@router.get("/{id_producto}", response_model=ProductoOut)
async def obtener_membresia_por_id(id_producto: str):
    if not ObjectId.is_valid(id_producto):
        raise HTTPException(status_code=400, detail="ID inválido")
    producto = await db.productos.find_one({"_id": ObjectId(id_producto)})
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    producto["_id"] = str(producto["_id"])
    producto["id_producto"] = producto.pop("_id")
    return ProductoOut(**producto)
