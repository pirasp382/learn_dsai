import pickle
from src.dto.prediction_Input import Prediction_Input

filename="./resources/model.learn"
file=open(filename, "rb")
model=pickle.load(file)

def predict(input: Prediction_Input):
    return model.predict([input.toList()])