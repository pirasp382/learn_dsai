from src.dto.salary_prediction.prediction_Input import PredictionInput
from src.dto.salary_prediction.Salary_Input import SalaryInput
from src.dto.salary_prediction.salary_output import SalaryOutput
from src.dto.salary_prediction.prognose_output import PrognoseOutput
from resources.MAPS import GENDER_MAP, EDUCATION_MAP, JOB_MAP

def gender_mapper(input):
    return GENDER_MAP.get(input)

def education_mapper(input):
    return EDUCATION_MAP.get(input)

def job_mapper(input):
    return JOB_MAP.get(input)

def map_to_prediction_input(input:SalaryInput)->PredictionInput:
   return PredictionInput(
        age=int(input.age), gender=gender_mapper(input.gender),education=education_mapper(input.education),
        job_title=job_mapper(input.job_title), experience=float(input.experience)
    )
   
def map_to_salary_output(input):
    return SalaryOutput(salary=str(input))

def map_to_prognose_output(input)->PrognoseOutput:
    return PrognoseOutput(
        prognose=input
    )