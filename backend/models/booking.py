from pydantic import BaseModel, Field, EmailStr, ConfigDict
from datetime import datetime, timezone
from typing import Optional
import uuid

class BookingCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    eventType: str
    eventDate: str
    location: str
    duration: Optional[str] = None
    message: Optional[str] = None

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    eventType: str
    eventDate: str
    location: str
    duration: Optional[str] = None
    message: Optional[str] = None
    status: str = "pending"
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingStatusUpdate(BaseModel):
    status: str
    adminPassword: str
