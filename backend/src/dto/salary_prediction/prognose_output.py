from pydantic import BaseModel, Field

class Prognose_Output(BaseModel):
    prognose: dict = Field(..., description="User annual salary prediction in $")