from pydantic import BaseModel, Field

class IntrovertOutput(BaseModel):
    """Response DTO für die Vorhersage"""

    prediction: int=Field(
        ..., 
        description="Vorhersagewert der Persönlichkeit",
        examples=[1, 0]
    )

    personality: str = Field(
        ...,
        description="Vorhergesagte Persönlichkeit",
        examples=["Extrovert", "Introvert"]
    )

    confidence: float = Field(
        ...,
        description="Konfidenz der Vorhersage (0-1)",
        ge=0,
        le=1,
        examples=[0.95]
    )
    
    probabilities: dict = Field(
        ...,
        description="Wahrscheinlichkeiten für beide Klassen",
        examples=[{"Extrovert": 0.95, "Introvert": 0.05}]
    )