from fastapi import FastAPI
from app.routes.usuario import router as usuario_router 

app = FastAPI()

app.include_router(usuario_router)
