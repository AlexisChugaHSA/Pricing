from fastapi import FastAPI
from app.routes.usuario import router as usuario_router 
from app.routes.membresia import router as membresia_router
from app.routes.productos import router as producto_router

app = FastAPI()

app.include_router(usuario_router)
app.include_router(membresia_router)
app.include_router(producto_router)
