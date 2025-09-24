from fastapi import APIRouter, HTTPException, Depends
from app.schemas import Membresia
from app.core.auth import get_current_user
from app.db import db
from bson import ObjectId

router = APIRouter(prefix="/membresias", tags=["Membresias"])

# ===== Obtener todas las membresías =====
@router.get("/", response_model=list[Membresia])
async def obtener_membresias():
    membresias_cursor = db.membresia.find({})
    membresias = []
    async for m in membresias_cursor:
        membresias.append(Membresia(
            id_membresia=str(m["_id"]),
            tipo=m["tipo"],
            periodo=m["periodo"],
            descuento=m["descuento"],
            activo=m["activo"]
        ))
    return membresias


# ===== Obtener membresía por id =====
@router.get("/{id_membresia}", response_model=Membresia)
async def obtener_membresia_por_id(id_membresia: str):
    if not ObjectId.is_valid(id_membresia):
        raise HTTPException(status_code=400, detail="ID inválido")
    membresia = await db.membresia.find_one({"_id": ObjectId(id_membresia)})
    if not membresia:
        raise HTTPException(status_code=404, detail="Membresía no encontrada")
    
    return Membresia(
        id_membresia=str(membresia["_id"]),
        tipo=membresia["tipo"],
        periodo=membresia["periodo"],
        descuento=membresia["descuento"],
        activo=membresia["activo"]
    )
