from src.dto.prediction_Input import Prediction_Input
from src.dto.Input import Input
from resources.MAPS import gender_map, education_map, job_map

def genderMapper(input):
    return gender_map.get(input)

def educationMapper(input):
    return education_map.get(input)

def jobMapper(input):
    return job_map.get(input)

def mapToPredictionInput(input:Input)->Prediction_Input:
   return Prediction_Input(
        age=input.age, gender=genderMapper(input.gender),education=educationMapper(input.education),
        job_title=jobMapper(input.job_title), experience=input.experience
    )