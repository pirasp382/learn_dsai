from pydantic import BaseModel, Field

class PrognoseOutput(BaseModel):
    prognose: dict = Field(..., description="User annual salary prediction in $")