from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import json

from src.dto.Input import Input
from src.mapper.InputMapper import mapToPredictionInput
from src.services.prediction import predict

app = FastAPI()

# CORS-Konfiguration
origins = [
    "http://localhost:3000",  # Erlaube Anfragen von diesem Ursprung
    # Füge hier andere erlaubte Ursprünge hinzu, falls nötig
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Erlaubte Ursprünge
    allow_credentials=True,
    allow_methods=["*"],  # Erlaube alle HTTP-Methoden
    allow_headers=["*"],  # Erlaube alle Header
)

@app.get("/hello")
async def hello():
    return "hello world"

@app.post("/prediction")
async def prediction(input: Input):
    prediction_input=mapToPredictionInput(input)
    result=predict(prediction_input)
    return json.dumps({"salary_prediction":str(result[0])})