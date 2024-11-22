from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi import status

import json

from src.dto.salary_prediction.validation_service import ValidationService
from src.dto.salary_prediction.salary_input import SalaryInput
from src.dto.salary_prediction.salary_output import SalaryOutput
from src.mapper.salary_mapper import map_to_prediction_input, map_to_salary_output, map_to_prognose_output
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

@app.post("/prediction", response_model=SalaryOutput)
async def prediction(input: SalaryInput):
    error_list=ValidationService().validate(input)
    if len(error_list)>0:
        return JSONResponse(content=jsonable_encoder(error_list),
                            status_code=status.HTTP_200_OK)
    prediction_input=map_to_prediction_input(input)
    output=predict(prediction_input)
    result=map_to_salary_output(output)
    return JSONResponse(content=jsonable_encoder(result), status_code=status.HTTP_200_OK)

@app.post("/pension_prediction")
async def pension_prediction_endpoint(input: SalaryInput):
    error_list=ValidationService().validate(input)
    if len(error_list)>0: 
        return JSONResponse(content=jsonable_encoder(error_list),
                            status_code=status.HTTP_200_OK)
    prediction_input=map_to_prediction_input(input)
    output= pension_prediction(prediction_input)
    result=map_to_prognose_output(output)
    return JSONResponse(content=jsonable_encoder(result), status_code=status.HTTP_200_OK)