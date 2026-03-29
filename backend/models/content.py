from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, timezone
import uuid

class ContentUpdate(BaseModel):
    section: str  # 'about', 'stats', 'achievements', 'education', 'gurus', 'services'
    language: str  # 'en' or 'ml'
    data: dict  # The actual content data

class PortfolioContent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str
    language: str
    data: dict
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
