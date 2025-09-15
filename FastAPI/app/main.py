# app/main.py
from fastapi import FastAPI

# Crear la aplicación
app = FastAPI()

# Definir una ruta de prueba
@app.get("/")
def read_root():
    return {"message": "Hola Mundo con FastAPI 🚀"}
