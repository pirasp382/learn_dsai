class Prediction_Input():
    def __init__(self, age, gender, education, job_title, experience):
        self.age=age
        self.gender=gender
        self.education=education
        self.job_title=job_title
        self.experience=experience
        
    def toList(self):
        return [self.age, self.gender, self.education, self.job_title, self.experience]