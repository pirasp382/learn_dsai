from src.dto.introvert.introvert_prediction_dto import IntrovertPredictionInput
from src.dto.introvert.Introvert_Input import PersonalityInput
from resources.MAPS import YES_NO

def map_to_introvert_dto(input: PersonalityInput):
    return IntrovertPredictionInput(
        time_spent_alone=input.time_spent_alone,
        stage_fear=map_stage_fear(input.stage_fear),
        social_event_attendance=input.social_event_attendance,
        going_outside=input.going_outside,
        drained_after_socializing=map_drained_after_socializing(input.drained_after_socializing),
        friends_circle_size=input.friends_circle_size,
        post_frequency=input.post_frequency
    )
    
def map_stage_fear(input: str):
    return YES_NO[input]

def map_drained_after_socializing(input: str):
    return YES_NO[input]
