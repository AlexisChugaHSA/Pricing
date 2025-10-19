from fastapi import APIRouter, HTTPException
from app.db import db
from app.schemas import  FacturacionCreate,FacturacionOut
from bson import ObjectId
from app.core.auth import create_access_token, get_current_user

router = APIRouter(prefix="/facturacion", tags=["Facturas"])



@router.post("/", response_model=FacturacionOut)
async def crear_factura(factura: FacturacionCreate):
    factura_dict = factura.dict(exclude_unset=True)
    # Insertar en MongoDB
    result = await db.facturacion.insert_one(factura_dict)
    # Recuperar el usuario insertado
    factura_creada = await db.facturacion.find_one({"_id": result.inserted_id})
    factura_creada ["_id"] = str(factura_creada ["_id"])
    factura_creada ["id_factura"] = factura_creada .pop("_id")

    return FacturacionOut(**factura_creada)

