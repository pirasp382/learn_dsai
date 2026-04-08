import pickle
import pandas as pd
import numpy as np
from src.dto.introvert.introvert_prediction_dto import IntrovertPredictionInput
from resources.MAPS import PERSONALITY_MAP

filename = "./resources/introvert.learn"
with open(filename, "rb") as file:
    model = pickle.load(file)

def predict_with_dataframe(input: IntrovertPredictionInput):
    
    features_dict = input.to_dict()
    
    df = pd.DataFrame([features_dict])
    
    result = model.predict(df)
    probabilities = model.predict_proba(df)
    
    return {
        'prediction': int(result[0]),
        'personality': PERSONALITY_MAP[int(result)],
        'confidence': float(max(probabilities[0])),
        'probabilities': {
            'extrovert': float(probabilities[0][0]),
            'introvert': float(probabilities[0][1])
        }
    }

def predict(input: IntrovertPredictionInput):
    return predict_with_dataframe(input)