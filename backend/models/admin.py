from pydantic import BaseModel
from typing import Optional, Dict, Any

class AdminLogin(BaseModel):
    password: str

class SiteSettings(BaseModel):
    heroText: Optional[str] = None
    whatsappNumber: Optional[str] = None
    backgroundMusic: Optional[Dict[str, Any]] = None

class SiteSettingsUpdate(BaseModel):
    heroText: Optional[str] = None
    whatsappNumber: Optional[str] = None
    backgroundMusic: Optional[Dict[str, Any]] = None
