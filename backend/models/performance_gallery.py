"""
Performance Gallery Models
"""

from pydantic import BaseModel, Field
from typing import Optional

class PerformanceGalleryImage(BaseModel):
    """Performance Gallery Image Model"""
    id: str
    url: str  # base64 data URL or external URL
    title: str
    caption: Optional[str] = ""
    order: int = 0
    isActive: bool = True
    createdAt: Optional[str] = None

class PerformanceGalleryCreate(BaseModel):
    """Create Performance Gallery Image"""
    title: str
    caption: Optional[str] = ""
    order: Optional[int] = 0
    isActive: Optional[bool] = True

class PerformanceGalleryUpdate(BaseModel):
    """Update Performance Gallery Image"""
    title: Optional[str] = None
    caption: Optional[str] = None
    order: Optional[int] = None
    isActive: Optional[bool] = None
