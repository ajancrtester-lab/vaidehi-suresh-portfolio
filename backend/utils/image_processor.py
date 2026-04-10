"""
Performance Gallery Image Processing Module
Handles image upload, resizing, and cropping
"""

from PIL import Image
import io
import base64
from typing import Tuple

# Target dimensions for gallery images
TARGET_WIDTH = 1280
TARGET_HEIGHT = 720
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def resize_and_crop_image(image_bytes: bytes, target_size: Tuple[int, int] = (TARGET_WIDTH, TARGET_HEIGHT)) -> bytes:
    """
    Resize and center-crop image to target size
    
    Args:
        image_bytes: Raw image bytes
        target_size: Tuple of (width, height)
    
    Returns:
        Processed image bytes in JPEG format
    """
    try:
        # Open image
        img = Image.open(io.BytesIO(image_bytes))
        
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Calculate aspect ratios
        img_aspect = img.width / img.height
        target_aspect = target_size[0] / target_size[1]
        
        # Determine crop dimensions
        if img_aspect > target_aspect:
            # Image is wider - crop width
            new_width = int(img.height * target_aspect)
            left = (img.width - new_width) // 2
            img = img.crop((left, 0, left + new_width, img.height))
        else:
            # Image is taller - crop height
            new_height = int(img.width / target_aspect)
            top = (img.height - new_height) // 2
            img = img.crop((0, top, img.width, top + new_height))
        
        # Resize to target dimensions
        img = img.resize(target_size, Image.Resampling.LANCZOS)
        
        # Convert to bytes
        output = io.BytesIO()
        img.save(output, format='JPEG', quality=90, optimize=True)
        output.seek(0)
        
        return output.read()
    
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")


def image_to_base64(image_bytes: bytes) -> str:
    """Convert image bytes to base64 data URL"""
    b64_string = base64.b64encode(image_bytes).decode('utf-8')
    return f"data:image/jpeg;base64,{b64_string}"


def validate_image(file_bytes: bytes, max_size: int = MAX_FILE_SIZE) -> None:
    """
    Validate image file
    
    Args:
        file_bytes: Image file bytes
        max_size: Maximum file size in bytes
    
    Raises:
        ValueError: If validation fails
    """
    # Check file size
    if len(file_bytes) > max_size:
        raise ValueError(f"File size exceeds maximum of {max_size / (1024 * 1024):.1f}MB")
    
    # Try to open as image
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()
    except Exception as e:
        raise ValueError(f"Invalid image file: {str(e)}")
