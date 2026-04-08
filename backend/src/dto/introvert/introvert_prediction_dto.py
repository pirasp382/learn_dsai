# src/dto/introvert/introvert_prediction_dto.py
import pandas as pd
import numpy as np

class IntrovertPredictionInput:
    
    def __init__(self, 
                 time_spent_alone: float,
                 stage_fear: int,
                 social_event_attendance: float,
                 going_outside: float,
                 drained_after_socializing: int,
                 friends_circle_size: float,
                 post_frequency: float):
        
        self.time_spent_alone = time_spent_alone
        self.stage_fear = stage_fear
        self.social_event_attendance = social_event_attendance
        self.going_outside = going_outside
        self.drained_after_socializing = drained_after_socializing
        self.friends_circle_size = friends_circle_size
        self.post_frequency = post_frequency
        
        self.social_score = social_event_attendance + going_outside + friends_circle_size + post_frequency
        self.introvert_score = time_spent_alone + drained_after_socializing  # KEIN Komma!
        self.alone_vs_social = time_spent_alone / (social_event_attendance + 1e-5)
        self.friends_per_outing = friends_circle_size / (going_outside + 1e-5)
        self.fear_x_social = stage_fear * social_event_attendance
        self.drained_x_outside = drained_after_socializing * going_outside
        
        alone_bin = pd.cut([time_spent_alone], bins=3, labels=[0, 1, 2])[0]
        self.alone_bin_1 = (alone_bin == 1)  # Boolean False/True
        self.alone_bin_2 = (alone_bin == 2)  # Boolean False/True
        
    def to_list(self) -> list:
        """Gibt Liste in der EXAKTEN Reihenfolge wie im Training zurück"""
        return [
            self.time_spent_alone,           # Time_spent_Alone
            self.stage_fear,                 # Stage_fear
            self.social_event_attendance,    # Social_event_attendance
            self.going_outside,              # Going_outside
            self.drained_after_socializing,  # Drained_after_socializing
            self.friends_circle_size,        # Friends_circle_size
            self.post_frequency,             # Post_frequency
            self.social_score,               # social_score
            self.introvert_score,            # introvert_score
            self.alone_vs_social,            # alone_vs_social
            self.friends_per_outing,         # friends_per_outing
            self.fear_x_social,              # fear_x_social
            self.drained_x_outside,          # drained_x_outside
            self.alone_bin_1,                # alone_bin_1 (Boolean)
            self.alone_bin_2                 # alone_bin_2 (Boolean)
        ]
    
    def to_dict(self) -> dict:
        """Konvertiert zu Dictionary"""
        return {
            'Time_spent_Alone': self.time_spent_alone,
            'Stage_fear': self.stage_fear,
            'Social_event_attendance': self.social_event_attendance,
            'Going_outside': self.going_outside,
            'Drained_after_socializing': self.drained_after_socializing,
            'Friends_circle_size': self.friends_circle_size,
            'Post_frequency': self.post_frequency,
            'social_score': self.social_score,
            'introvert_score': self.introvert_score,
            'alone_vs_social': self.alone_vs_social,
            'friends_per_outing': self.friends_per_outing,
            'fear_x_social': self.fear_x_social,
            'drained_x_outside': self.drained_x_outside,
            'alone_bin_1': self.alone_bin_1,
            'alone_bin_2': self.alone_bin_2
        }
    
    def to_dataframe_row(self):
        """Konvertiert zu DataFrame-freundlichem Format"""
        return self.to_dict()