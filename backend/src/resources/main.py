from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi import status

import json

from src.dto.salary_prediction.Salary_Input import Salary_Input
from src.dto.salary_prediction.salary_output import Salary_Output
from src.mapper.SalaryMapper import mapToPredictionInput, mapToSalaryOutput, mapToPrognoseOutput
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

@app.post("/prediction", response_model=Salary_Output)
async def prediction(input: Salary_Input):
    prediction_input=mapToPredictionInput(input)
    output=predict(prediction_input)
    result=mapToSalaryOutput(output)
    return JSONResponse(content=jsonable_encoder(result), status_code=status.HTTP_200_OK)

@app.post("/pension_prediction")
async def pension_prediction_endpoint(input: Salary_Input):
    prediction_input=mapToPredictionInput(input)
    output= pension_prediction(prediction_input)
    result=mapToPrognoseOutput(output)
    return JSONResponse(content=jsonable_encoder(result), status_code=status.HTTP_200_OK)