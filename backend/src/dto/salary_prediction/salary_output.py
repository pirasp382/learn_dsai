from pydantic import BaseModel, Field

class Salary_Output(BaseModel):
    salary: str = Field(..., description="User annual salary prediction in $", examples=["50000$"])