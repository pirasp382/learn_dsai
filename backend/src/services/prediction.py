import pickle
from src.dto.prediction_Input import Prediction_Input
from copy import copy

filename="./resources/model.learn"
file=open(filename, "rb")
model=pickle.load(file)

def predict(input: Prediction_Input):
    return model.predict([input.toList()])

def pension_prediction(input: Prediction_Input)->list:
    years = 65-input.age
    money_year={}
    for year in range(years):
        temp = copy(input)
        temp.age=input.age+year
        temp.experience=input.experience+year
        money_year.update({year: int(predict(temp)[0])})
    return money_year