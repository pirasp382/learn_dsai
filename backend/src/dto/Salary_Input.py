from pydantic import BaseModel, Field

class Salary_Input(BaseModel):
    age: str = Field(...,description="Person age", examples=["18"])
    gender: str = Field(..., description="Person gender", examples=["Male", "Female"])
    education: str = Field(..., description="Person edcuation", examples=["High School"])
    jobTitle: str = Field(..., description="Job title of person", examples=["Software Engineer"])
    experience:str = Field(... , description="Years of Job experience", examples=["2"])
    