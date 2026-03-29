from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, timezone
from typing import Optional
import uuid

# Audio Track Models
class AudioTrackCreate(BaseModel):
    title: str
    raga: Optional[str] = None
    duration: Optional[str] = None
    audioUrl: str
    description: Optional[str] = None
    youtubeUrl: Optional[str] = None
    instagramUrl: Optional[str] = None

class AudioTrack(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    raga: Optional[str] = None
    duration: Optional[str] = None
    audioUrl: str
    description: Optional[str] = None
    youtubeUrl: Optional[str] = None
    instagramUrl: Optional[str] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Video Models
class VideoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    videoUrl: str
    thumbnailUrl: Optional[str] = None
    youtubeId: Optional[str] = None

class Video(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    videoUrl: str
    thumbnailUrl: Optional[str] = None
    youtubeId: Optional[str] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Gallery Image Models
class GalleryImageCreate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    imageUrl: str
    category: Optional[str] = None

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: Optional[str] = None
    description: Optional[str] = None
    imageUrl: str
    category: Optional[str] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Testimonial Models
class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    imageUrl: Optional[str] = None
    rating: Optional[int] = 5

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    content: str
    imageUrl: Optional[str] = None
    rating: int = 5
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
