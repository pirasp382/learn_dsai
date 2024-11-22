from src.dto.salary_prediction.salary_input import SalaryInput
from src.errorhandling.messages import Messages
from resources.maps import GENDER_MAP, EDUCATION_MAP, JOB_MAP

class ValidationService:
    
    def validate(self, input:SalaryInput):
        message_list=list()
        if self.validate_age(input.age):
            message_list.append(Messages.UNTER_18)
        if self.validate_job_experience(input.experience):
            message_list.append(Messages.KEINE_POSITIVE_BERUFSERFAHRUNG)
        if self.validate_gender(input.gender):
            message_list.append(Messages.FALSCHES_GENDER)
        if self.validate_education(input.education):
            message_list.append(Messages.FALSCHER_AUSBILDUNGSTITLE)
        if self.validate_job_title(input.job_title):
            message_list.append(Messages.FALSCHER_JOBTITLE)
        return message_list
    
    def validate_age(self, age: str)->bool:
        return int(age)<18
    
    def validate_job_experience(self, job_experience:str)->bool:
        return int(job_experience)<0
    
    def validate_gender(self, gender)->bool:
        return not GENDER_MAP.__contains__(gender)
    
    def validate_education(self, education)->bool:
        return not EDUCATION_MAP.__contains__(education)
    
    def validate_job_title(self, job_title)->bool:
        return not JOB_MAP.__contains__(job_title)