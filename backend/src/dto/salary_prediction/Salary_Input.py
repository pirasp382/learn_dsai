from pydantic import BaseModel, Field

class SalaryInput(BaseModel):
    age: str = Field(...,description="Person age", examples=["18"])
    gender: str = Field(..., description="Person gender", examples=["Male", "Female"])
    education: str = Field(..., description="Person edcuation", examples=["High School"])
    job_title: str = Field(..., description="Job title of person", examples=["Software Engineer"])
    experience:str = Field(... , description="Years of Job experience", examples=["2"])
    