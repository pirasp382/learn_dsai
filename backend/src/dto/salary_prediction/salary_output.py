from pydantic import BaseModel, Field

class SalaryOutput(BaseModel):
    salary: str = Field(..., description="User annual salary prediction in $", examples=["50000$"])