"""
Backend API Tests for Bilingual Portfolio CMS
Tests: Content API, Admin Login, Bookings API
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Basic API health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"API root response: {data}")


class TestAdminLogin:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "admin123"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        assert "token" in data
        print(f"Admin login successful, token received")
    
    def test_admin_login_invalid_password(self):
        """Test admin login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"}
        )
        assert response.status_code == 401
        print("Admin login correctly rejected invalid password")


class TestContentAPI:
    """Content Management API tests"""
    
    def test_get_content(self):
        """Test GET /api/content returns content structure"""
        response = requests.get(f"{BASE_URL}/api/content")
        assert response.status_code == 200
        data = response.json()
        assert "content" in data
        print(f"GET /api/content response: {data}")
    
    def test_update_content_about_english(self):
        """Test updating About section in English"""
        update_data = {
            "section": "about",
            "language": "en",
            "data": {
                "title": "The Journey",
                "subtitle": "A Life Devoted to Sacred Music",
                "quote": "Music is my prayer, the temple is my home, and devotion is my guide."
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/content?admin_password=admin123",
            json=update_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("message") == "Content updated successfully"
        print(f"About section (EN) updated successfully")
    
    def test_update_content_about_malayalam(self):
        """Test updating About section in Malayalam"""
        update_data = {
            "section": "about",
            "language": "ml",
            "data": {
                "title": "യാത്ര",
                "subtitle": "പവിത്ര സംഗീതത്തിനായി സമർപ്പിച്ച ജീവിതം",
                "quote": "സംഗീതം എന്റെ പ്രാർത്ഥനയാണ്, ക്ഷേത്രം എന്റെ വീടാണ്, ഭക്തി എന്റെ വഴികാട്ടിയാണ്."
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/content?admin_password=admin123",
            json=update_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("message") == "Content updated successfully"
        print(f"About section (ML) updated successfully")
    
    def test_update_content_unauthorized(self):
        """Test content update without valid admin password"""
        update_data = {
            "section": "about",
            "language": "en",
            "data": {"title": "Test"}
        }
        
        response = requests.put(
            f"{BASE_URL}/api/content?admin_password=wrongpassword",
            json=update_data
        )
        assert response.status_code == 401
        print("Content update correctly rejected without valid password")
    
    def test_update_content_achievements(self):
        """Test updating Achievements section"""
        update_data = {
            "section": "achievements",
            "language": "en",
            "data": {
                "title": "Achievements & Recognition",
                "subtitle": "Honors in Preserving Traditional Temple Music"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/content?admin_password=admin123",
            json=update_data
        )
        assert response.status_code == 200
        print("Achievements section updated successfully")
    
    def test_update_content_training(self):
        """Test updating Training section"""
        update_data = {
            "section": "training",
            "language": "en",
            "data": {
                "title": "Training & Lineage",
                "subtitle": "A Rich Heritage of Musical Education",
                "gurusTitle": "Gurus & Mentors"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/content?admin_password=admin123",
            json=update_data
        )
        assert response.status_code == 200
        print("Training section updated successfully")
    
    def test_verify_content_persistence(self):
        """Test that updated content persists in database"""
        # First update content
        test_title = "TEST_Journey_Title"
        update_data = {
            "section": "about",
            "language": "en",
            "data": {
                "title": test_title,
                "subtitle": "Test Subtitle",
                "quote": "Test Quote"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/content?admin_password=admin123",
            json=update_data
        )
        assert response.status_code == 200
        
        # Now fetch and verify
        response = requests.get(f"{BASE_URL}/api/content")
        assert response.status_code == 200
        data = response.json()
        
        # Check if content was persisted
        content = data.get("content", {})
        about_en = content.get("about", {}).get("en", {})
        assert about_en.get("title") == test_title
        print(f"Content persistence verified: {about_en}")
        
        # Restore original content
        restore_data = {
            "section": "about",
            "language": "en",
            "data": {
                "title": "The Journey",
                "subtitle": "A Life Devoted to Sacred Music",
                "quote": "Music is my prayer, the temple is my home, and devotion is my guide."
            }
        }
        requests.put(
            f"{BASE_URL}/api/content?admin_password=admin123",
            json=restore_data
        )


class TestBookingsAPI:
    """Booking management API tests"""
    
    def test_get_bookings(self):
        """Test GET /api/bookings returns bookings list"""
        response = requests.get(f"{BASE_URL}/api/bookings")
        assert response.status_code == 200
        data = response.json()
        assert "bookings" in data
        print(f"GET /api/bookings response: {len(data['bookings'])} bookings")
    
    def test_create_booking(self):
        """Test creating a new booking"""
        booking_data = {
            "name": "TEST_User",
            "phone": "+919876543210",
            "email": "test@example.com",
            "eventType": "Temple Ceremony",
            "eventDate": "2026-04-15",
            "location": "Thrissur, Kerala",
            "duration": "2 hours",
            "message": "Test booking for automated testing"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/bookings",
            json=booking_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        assert "bookingId" in data
        assert "whatsappLink" in data
        print(f"Booking created with ID: {data['bookingId']}")
        return data['bookingId']
    
    def test_get_bookings_with_filter(self):
        """Test GET /api/bookings with month/year filter"""
        response = requests.get(f"{BASE_URL}/api/bookings?month=4&year=2026")
        assert response.status_code == 200
        data = response.json()
        assert "bookings" in data
        print(f"Filtered bookings: {len(data['bookings'])} bookings for April 2026")


class TestGalleryAPI:
    """Gallery API tests"""
    
    def test_get_gallery(self):
        """Test GET /api/gallery returns gallery items"""
        response = requests.get(f"{BASE_URL}/api/gallery")
        assert response.status_code == 200
        data = response.json()
        assert "gallery" in data
        print(f"GET /api/gallery response: {len(data['gallery'])} items")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
