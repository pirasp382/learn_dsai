from pydantic import BaseModel

class Input(BaseModel):
    age: int
    gender: str
    education: str
    job_title: str
    experience:int
    
    def get_age(self):
        return self.age