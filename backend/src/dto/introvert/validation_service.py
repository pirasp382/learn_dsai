from src.dto.introvert.Introvert_Input import PersonalityInput
from src.errorhandling.messages import Messages
from resources.MAPS import YES_NO

class IntrovertValidationService:
    
    def validate(self, input: PersonalityInput):
        message_list=list()
        if not self.validate_time_spent_alone(input.time_spent_alone):
            message_list.append(Messages.FALSCHER_WOCHENWERT)
        if not self.contains_yes_no(input.stage_fear):
            message_list.append(Messages.KEIN_JA_NEIN)
        if not self.contains_yes_no(input.drained_after_socializing):
            message_list.append(Messages.KEIN_JA_NEIN)
        if not self.greater_equal_zero(input.social_event_attendance):
            message_list.append(Messages.KLEINER_ALS_0)
        if not self.greater_equal_zero(input.going_outside):
            message_list.append(Messages.KLEINER_ALS_0)
        if not self.greater_equal_zero(input.friends_circle_size):
            message_list.append(Messages.KLEINER_ALS_0)
        if not self.greater_equal_zero(input.post_frequency):
            message_list.append(Messages.KLEINER_ALS_0)
        return message_list
    
    def validate_time_spent_alone(self, input):
        return 0<=input<=168
    
    def contains_yes_no(self, input):
        return YES_NO.__contains__(input)
    
    def greater_equal_zero(self, input):
        return input>=0
    