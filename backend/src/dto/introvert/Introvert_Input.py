from pydantic import BaseModel, Field, field_validator
from typing import Optional

class PersonalityInput(BaseModel):

    time_spent_alone: float= Field(
        ...,
        description="Zeit, die alleine verbracht wird (in Stunden pro Woche)",
        examples=[15.5],
        ge=0,
        le=168)
    stage_fear: str = Field(
        ...,
        description="Besteht Angst vor öffentlichen Auftritten?",
        examples=["Yes", "No"],
        pattern="^(Yes|No)$")
    social_event_attendance: float = Field(
        ...,
        description="Anzahl der besuchten sozialen Events pro Monat",
        examples=[4.0],
        ge=0
    )
    going_outside: float = Field(
        ...,
        description="Häufigkeit des Rausgehens (pro Woche)",
        examples=[3.5],
        ge=0
    )
    drained_after_socializing: str = Field(
        ...,
        description="Fühlt man sich nach Sozialkontakten ausgelaugt?",
        examples=["Yes", "No"],
        pattern="^(Yes|No)$"
    )
    friends_circle_size: float = Field(
        ...,
        description="Größe des Freundeskreises (Anzahl enger Freunde)",
        examples=[8.0],
        ge=0
    )
    post_frequency: float = Field(
        ...,
        description="Häufigkeit von Social-Media-Posts pro Woche",
        examples=[5.0],
        ge=0
    )
