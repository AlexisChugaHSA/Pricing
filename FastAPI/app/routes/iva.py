from fastapi import APIRouter, HTTPException, Depends
from app.schemas import IVAOut
from app.core.auth import get_current_user
from app.db import db
from bson import ObjectId

router = APIRouter(prefix="/iva", tags=["Iva"])

@router.get("/", response_model=IVAOut)
async def obtener_iva():
    iva = await db.iva.find().sort("_id", -1).limit(1).to_list(length=1)
    
    if not iva:
        raise HTTPException(status_code=404, detail="No se encontró registro de IVA")
    
    iva_data = iva[0]  # Tomar el primer (y único) resultado
    
    return {
        "id_iva": str(iva_data["_id"]),
        "iva_valor": iva_data.get("IVA_VALOR")
    }