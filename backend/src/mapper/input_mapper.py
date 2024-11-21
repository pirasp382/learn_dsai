from src.dto.salary_prediction.prediction_input import PredictionInput
from src.dto.salary_prediction.salary_input import SalaryInput
from resources.maps import GENDER_MAP, EDUCATION_MAP, JOB_MAP

def gender_mapper(input):
    return GENDER_MAP.get(input)

def education_mapper(input):
    return EDUCATION_MAP.get(input)

def job_mapper(input):
    return JOB_MAP.get(input)

def mapToPredictionInput(input:SalaryInput)->PredictionInput:
   return PredictionInput(
        age=int(input.age), gender=gender_mapper(input.gender),education=education_mapper(input.education),
        job_title=job_mapper(input.job_title), experience=int(input.experience)
    )