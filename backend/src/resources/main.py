from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi import status

import json

from src.dto.salary_prediction.validation_service import SalaryValidationService
from src.dto.introvert.validation_service import IntrovertValidationService
from src.dto.salary_prediction.Salary_Input import SalaryInput
from src.dto.salary_prediction.salary_output import SalaryOutput
from src.dto.introvert.Introvert_Input import PersonalityInput
from src.dto.introvert.Introvert_Output import IntrovertOutput
from src.mapper.salary_mapper import map_to_prediction_input, map_to_salary_output, map_to_prognose_output
from src.services.prediction import predict, pension_prediction
from src.dto.introvert.introvert_prediction_dto import IntrovertPredictionInput
from src.mapper.introvert_mapper import map_to_introvert_dto, map_to_introvert_output_dto
from src.services.introvert_prediction import predict as introvert_prediction

app = FastAPI()

# CORS-Konfiguration
origins = [
    "http://localhost:3000",  # Erlaube Anfragen von diesem Ursprung
    # Füge hier andere erlaubte Ursprünge hinzu, falls nötig
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def hello():
    return "hello world12"

@app.post("/predict_introvert", response_model=IntrovertOutput)
async def predictionIntrovert(input: PersonalityInput):
    error_list = IntrovertValidationService().validate(input)
    if len(error_list)>0:
        return JSONResponse(content=jsonable_encoder(error_list),
                            status_code=status.HTTP_200_OK)
    introvert_dto : IntrovertPredictionInput = map_to_introvert_dto(input)
    result = introvert_prediction(introvert_dto)
    output_dto = map_to_introvert_output_dto(result)
    return JSONResponse(content=jsonable_encoder(output_dto), 
                        status_code=status.HTTP_200_OK)

@app.post("/prediction", response_model=SalaryOutput)
async def prediction(input: SalaryInput):
    error_list=SalaryValidationService().validate(input)
    if len(error_list)>0:
        return JSONResponse(content=jsonable_encoder(error_list),
                            status_code=status.HTTP_200_OK)
    prediction_input=map_to_prediction_input(input)
    output=predict(prediction_input)
    result=map_to_salary_output(output)
    return JSONResponse(content=jsonable_encoder(result), status_code=status.HTTP_200_OK)

@app.post("/pension_prediction")
async def pension_prediction_endpoint(input: SalaryInput):
    error_list=SalaryValidationService().validate(input)
    if len(error_list)>0: 
        return JSONResponse(content=jsonable_encoder(error_list),
                            status_code=status.HTTP_200_OK)
    prediction_input=map_to_prediction_input(input)
    output= pension_prediction(prediction_input)
    result=map_to_prognose_output(output)
    return JSONResponse(content=jsonable_encoder(result), status_code=status.HTTP_200_OK)