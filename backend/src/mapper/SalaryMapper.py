from src.dto.salary_prediction.prediction_Input import Prediction_Input
from src.dto.salary_prediction.Salary_Input import Salary_Input
from src.dto.salary_prediction.salary_output import Salary_Output
from resources.MAPS import gender_map, education_map, job_map

def genderMapper(input):
    return gender_map.get(input)

def educationMapper(input):
    return education_map.get(input)

def jobMapper(input):
    return job_map.get(input)

def mapToPredictionInput(input:Salary_Input)->Prediction_Input:
   return Prediction_Input(
        age=int(input.age), gender=genderMapper(input.gender),education=educationMapper(input.education),
        jobTitle=jobMapper(input.jobTitle), experience=int(input.experience)
    )
   
def mapToSalaryOutput(input):
    return Salary_Output(salary=str(input))