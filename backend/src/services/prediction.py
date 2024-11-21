import pickle
from src.dto.salary_prediction.prediction_input import PredictionInput
from copy import copy

filename="./resources/model.learn"
file=open(filename, "rb")
model=pickle.load(file)

def predict(input: PredictionInput):
    return round(model.predict([input.to_list()])[0], 2)

def pension_prediction(input: PredictionInput)->list:
    years = 65-input.age
    money_year={}
    for year in range(years):
        temp = copy(input)
        temp.age=input.age+year
        temp.experience=input.experience+year
        money_year.update({year: int(predict(temp))})
    return money_year