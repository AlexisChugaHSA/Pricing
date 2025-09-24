from fastapi import APIRouter, HTTPException
from app.db import db
from app.schemas import  UsuarioOut,UsuarioBase, UsuarioCreate, UsuarioUpdate, UsuarioCheckPassword
from bson import ObjectId
import hashlib 
from passlib.hash import pbkdf2_sha256

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.post("/", response_model=UsuarioOut)
async def crear_usuario(usuario: UsuarioCreate):
    # Verificar si ya existe
    existente = await db.usuario.find_one({"usuario": usuario.usuario})
    if existente:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    # Hashear contraseña
    hashed_password = pbkdf2_sha256.hash(usuario.password)
    usuario_dict = usuario.dict(exclude_unset=True)
    usuario_dict["password"] = hashed_password

    # Insertar en MongoDB
    result = await db.usuario.insert_one(usuario_dict)

    # Recuperar el usuario insertado
    usuario_creado = await db.usuario.find_one({"_id": result.inserted_id})

    # Preparar dict para Pydantic, convertir ObjectId a str y excluir password
    usuario_salida = {
        "id_usuario": str(usuario_creado["_id"]),
        "usuario": usuario_creado.get("usuario"),
        "nombre": usuario_creado.get("nombre"),
        "apellido": usuario_creado.get("apellido"),
        "telefono": usuario_creado.get("telefono"),
        "token": usuario_creado.get("token", None)
    }

    return UsuarioOut(**usuario_salida)



# Obtener usuario por ID
@router.get("/{id_usuario}", response_model=UsuarioOut)
async def obtener_usuario(id_usuario: str):
    if not ObjectId.is_valid(id_usuario):
        raise HTTPException(status_code=400, detail="ID inválido")
    usuario = await db.usuario.find_one({"_id": ObjectId(id_usuario)})
    if usuario:
        usuario["_id"] = str(usuario["_id"])
        usuario["id_usuario"] = usuario.pop("_id")
        return UsuarioOut(**usuario)
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

# Actualizar usuario por ID
@router.put("/{id_usuario}", response_model=UsuarioOut)
async def actualizar_usuario(id_usuario: str, datos: UsuarioUpdate):
    if not ObjectId.is_valid(id_usuario):
        raise HTTPException(status_code=400, detail="ID inválido")
    
    update_data = {k: v for k, v in datos.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    resultado = await db.usuarios.update_one(
        {"_id": ObjectId(id_usuario)},
        {"$set": update_data}
    )
    if resultado.matched_count == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    usuario_actualizado = await db.usuarios.find_one({"_id": ObjectId(id_usuario)})
    usuario_actualizado["_id"] = str(usuario_actualizado["_id"])
    return UsuarioOut(**usuario_actualizado)

@router.get("/comprobar-usuario/{usuario}")
async def comprobar_usuario(usuario: str):
    usuario_encontrado = await db.usuario.find_one({"usuario": usuario})
    if usuario_encontrado:
        return {
            "id_usuario": str(usuario_encontrado["_id"]),
            "Mensaje": "SI"
        }
    return {"Mensaje": "NOEN"}

@router.post("/comprobar-password")
async def comprobar_password(user: UsuarioCheckPassword):
    query = {}
    # Prioridad: si envían id_usuario, buscar por id
    if user.id_usuario and ObjectId.is_valid(user.id_usuario):
        query["_id"] = ObjectId(user.id_usuario)
    elif user.usuario:
        query["usuario"] = user.usuario
    else:
        raise HTTPException(status_code=400, detail="Debe enviar id_usuario o usuario")

    usuario_db = await db.usuarios.find_one(query)
    if usuario_db:
        # Verificar contraseña
        if pbkdf2_sha256.verify(user.password, usuario_db["password"]):
            return {"mensaje": "OK"}
        else:
            return {"mensaje": "NO"}
    
    return {"mensaje": "NO"}