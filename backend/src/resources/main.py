from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

import json

from src.dto.Salary_Input import Salary_Input
from src.mapper.InputMapper import mapToPredictionInput
from src.services.prediction import predict, pension_prediction

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
    return "hello world12"

@app.post("/prediction")
async def prediction(input: Salary_Input):
    prediction_input=mapToPredictionInput(input)
    result=predict(prediction_input)
    return Response(status_code=200, content=json.dumps({"salary_prediction": str(result[0])}))

@app.post("/pension_prediction")
async def pension_prediction_endpoint(input: Salary_Input):
    prediction_input=mapToPredictionInput(input)
    result= pension_prediction(prediction_input)
    return Response(content=json.dumps({"prognose": result}), status_code=200)