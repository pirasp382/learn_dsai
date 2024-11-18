class Prediction_Input():
    def __init__(self, age, gender, education, jobTitle, experience):
        self.age=age
        self.gender=gender
        self.education=education
        self.jobTitle=jobTitle
        self.experience=experience
        
    def toList(self):
        return [self.age, self.gender, self.education, self.jobTitle, self.experience]