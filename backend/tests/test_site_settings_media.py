"""
Backend API Tests for Site Settings and Media Management
Tests: Site Settings CRUD, Audio Tracks CRUD, Video Performances CRUD, Gallery CRUD
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndBasics:
    """Basic health and connectivity tests"""
    
    def test_health_endpoint(self):
        """Test API health check"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["database"] == "connected"
        print("✅ Health endpoint working, database connected")

    def test_admin_login(self):
        """Test admin login with correct password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "admin123"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "token" in data
        print("✅ Admin login successful")

    def test_admin_login_invalid(self):
        """Test admin login with wrong password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✅ Invalid login correctly rejected")


class TestSiteSettings:
    """Site Settings API tests - verifies input fields are editable"""
    
    def test_get_site_settings(self):
        """Test GET site settings returns all expected fields"""
        response = requests.get(f"{BASE_URL}/api/site-settings")
        assert response.status_code == 200
        data = response.json()
        assert "settings" in data
        settings = data["settings"]
        
        # Verify all expected fields exist
        assert "hero" in settings
        assert "stats" in settings
        assert "backgroundMusic" in settings
        assert "socialMedia" in settings
        
        # Verify hero section fields
        assert "mainTitle" in settings["hero"]
        assert "subtitle" in settings["hero"]
        assert "tagline" in settings["hero"]
        
        # Verify stats fields
        assert "yearsOfExperience" in settings["stats"]
        assert "templesPerformed" in settings["stats"]
        
        print("✅ Site settings GET returns all expected fields")

    def test_update_site_settings_hero(self):
        """Test updating hero section - verifies inputs are editable"""
        # First get current settings
        get_response = requests.get(f"{BASE_URL}/api/site-settings")
        current_settings = get_response.json()["settings"]
        
        # Modify hero section
        test_title = f"TEST_Title_{uuid.uuid4().hex[:8]}"
        updated_settings = {
            **current_settings,
            "hero": {
                **current_settings.get("hero", {}),
                "mainTitle": test_title
            }
        }
        
        # Update settings
        response = requests.put(f"{BASE_URL}/api/admin/site-settings", json=updated_settings)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        
        # Verify update persisted
        verify_response = requests.get(f"{BASE_URL}/api/site-settings")
        verify_data = verify_response.json()["settings"]
        assert verify_data["hero"]["mainTitle"] == test_title
        
        # Restore original
        requests.put(f"{BASE_URL}/api/admin/site-settings", json=current_settings)
        print("✅ Hero section update works - inputs are editable")

    def test_update_site_settings_stats(self):
        """Test updating stats section"""
        get_response = requests.get(f"{BASE_URL}/api/site-settings")
        current_settings = get_response.json()["settings"]
        
        # Modify stats
        test_years = 99
        updated_settings = {
            **current_settings,
            "stats": {
                **current_settings.get("stats", {}),
                "yearsOfExperience": test_years
            }
        }
        
        response = requests.put(f"{BASE_URL}/api/admin/site-settings", json=updated_settings)
        assert response.status_code == 200
        
        # Verify
        verify_response = requests.get(f"{BASE_URL}/api/site-settings")
        verify_data = verify_response.json()["settings"]
        assert verify_data["stats"]["yearsOfExperience"] == test_years
        
        # Restore
        requests.put(f"{BASE_URL}/api/admin/site-settings", json=current_settings)
        print("✅ Stats section update works")

    def test_update_site_settings_snapwidget(self):
        """Test updating SnapWidget ID field"""
        get_response = requests.get(f"{BASE_URL}/api/site-settings")
        current_settings = get_response.json()["settings"]
        
        # Add snapWidgetId
        test_widget_id = "test-snapwidget-123"
        updated_settings = {
            **current_settings,
            "snapWidgetId": test_widget_id
        }
        
        response = requests.put(f"{BASE_URL}/api/admin/site-settings", json=updated_settings)
        assert response.status_code == 200
        
        # Verify
        verify_response = requests.get(f"{BASE_URL}/api/site-settings")
        verify_data = verify_response.json()["settings"]
        assert verify_data.get("snapWidgetId") == test_widget_id
        
        # Restore
        requests.put(f"{BASE_URL}/api/admin/site-settings", json=current_settings)
        print("✅ SnapWidget ID field update works")


class TestAudioTracks:
    """Audio Tracks CRUD tests"""
    
    def test_get_audio_tracks(self):
        """Test GET audio tracks returns 'tracks' key"""
        response = requests.get(f"{BASE_URL}/api/admin/audio-tracks")
        assert response.status_code == 200
        data = response.json()
        assert "tracks" in data, "Response should contain 'tracks' key"
        assert isinstance(data["tracks"], list)
        print(f"✅ Audio tracks GET returns 'tracks' key with {len(data['tracks'])} items")

    def test_create_audio_track(self):
        """Test creating a new audio track"""
        test_track = {
            "title": f"TEST_Track_{uuid.uuid4().hex[:8]}",
            "raga": "Test Raga",
            "duration": "3:45",
            "temple": "Test Temple",
            "audioUrl": "/test-audio.mp3",
            "order": 999,
            "isActive": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/audio-tracks", json=test_track)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "id" in data
        
        track_id = data["id"]
        
        # Verify track was created
        verify_response = requests.get(f"{BASE_URL}/api/admin/audio-tracks")
        tracks = verify_response.json()["tracks"]
        created_track = next((t for t in tracks if t["id"] == track_id), None)
        assert created_track is not None
        assert created_track["title"] == test_track["title"]
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/audio-tracks/{track_id}")
        print("✅ Audio track creation works")

    def test_update_audio_track(self):
        """Test updating an audio track"""
        # Create a track first
        test_track = {
            "title": f"TEST_Update_{uuid.uuid4().hex[:8]}",
            "raga": "Original Raga",
            "duration": "3:00",
            "temple": "Original Temple",
            "audioUrl": "/original.mp3",
            "order": 998,
            "isActive": True
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/audio-tracks", json=test_track)
        track_id = create_response.json()["id"]
        
        # Update the track
        updated_data = {"raga": "Updated Raga", "duration": "4:00"}
        update_response = requests.put(f"{BASE_URL}/api/admin/audio-tracks/{track_id}", json=updated_data)
        assert update_response.status_code == 200
        
        # Verify update
        verify_response = requests.get(f"{BASE_URL}/api/admin/audio-tracks")
        tracks = verify_response.json()["tracks"]
        updated_track = next((t for t in tracks if t["id"] == track_id), None)
        assert updated_track["raga"] == "Updated Raga"
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/audio-tracks/{track_id}")
        print("✅ Audio track update works")

    def test_delete_audio_track(self):
        """Test deleting an audio track"""
        # Create a track first
        test_track = {
            "title": f"TEST_Delete_{uuid.uuid4().hex[:8]}",
            "raga": "Delete Raga",
            "duration": "2:00",
            "temple": "Delete Temple",
            "audioUrl": "/delete.mp3",
            "order": 997,
            "isActive": True
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/audio-tracks", json=test_track)
        track_id = create_response.json()["id"]
        
        # Delete the track
        delete_response = requests.delete(f"{BASE_URL}/api/admin/audio-tracks/{track_id}")
        assert delete_response.status_code == 200
        
        # Verify deletion
        verify_response = requests.get(f"{BASE_URL}/api/admin/audio-tracks")
        tracks = verify_response.json()["tracks"]
        deleted_track = next((t for t in tracks if t["id"] == track_id), None)
        assert deleted_track is None
        print("✅ Audio track deletion works")


class TestVideoPerformances:
    """Video Performances CRUD tests"""
    
    def test_get_video_performances(self):
        """Test GET video performances returns 'videos' key"""
        response = requests.get(f"{BASE_URL}/api/admin/video-performances")
        assert response.status_code == 200
        data = response.json()
        assert "videos" in data, "Response should contain 'videos' key"
        assert isinstance(data["videos"], list)
        print(f"✅ Video performances GET returns 'videos' key with {len(data['videos'])} items")

    def test_create_video_performance(self):
        """Test creating a new video performance"""
        test_video = {
            "title": f"TEST_Video_{uuid.uuid4().hex[:8]}",
            "venue": "Test Venue",
            "date": "January 2026",
            "thumbnail": "https://example.com/thumb.jpg",
            "videoUrl": "https://www.youtube.com/embed/test123",
            "order": 999,
            "isActive": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/video-performances", json=test_video)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "id" in data
        
        video_id = data["id"]
        
        # Verify video was created
        verify_response = requests.get(f"{BASE_URL}/api/admin/video-performances")
        videos = verify_response.json()["videos"]
        created_video = next((v for v in videos if v["id"] == video_id), None)
        assert created_video is not None
        assert created_video["title"] == test_video["title"]
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/video-performances/{video_id}")
        print("✅ Video performance creation works")

    def test_delete_video_performance(self):
        """Test deleting a video performance"""
        test_video = {
            "title": f"TEST_DeleteVideo_{uuid.uuid4().hex[:8]}",
            "venue": "Delete Venue",
            "date": "January 2026",
            "thumbnail": "https://example.com/delete.jpg",
            "videoUrl": "https://www.youtube.com/embed/delete",
            "order": 998,
            "isActive": True
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/video-performances", json=test_video)
        video_id = create_response.json()["id"]
        
        # Delete
        delete_response = requests.delete(f"{BASE_URL}/api/admin/video-performances/{video_id}")
        assert delete_response.status_code == 200
        
        # Verify deletion
        verify_response = requests.get(f"{BASE_URL}/api/admin/video-performances")
        videos = verify_response.json()["videos"]
        deleted_video = next((v for v in videos if v["id"] == video_id), None)
        assert deleted_video is None
        print("✅ Video performance deletion works")


class TestGallery:
    """Gallery CRUD tests"""
    
    def test_get_gallery(self):
        """Test GET gallery returns 'gallery' key"""
        response = requests.get(f"{BASE_URL}/api/admin/gallery")
        assert response.status_code == 200
        data = response.json()
        assert "gallery" in data, "Response should contain 'gallery' key"
        assert isinstance(data["gallery"], list)
        print(f"✅ Gallery GET returns 'gallery' key with {len(data['gallery'])} items")

    def test_create_gallery_item(self):
        """Test creating a new gallery item"""
        test_item = {
            "title": f"TEST_Gallery_{uuid.uuid4().hex[:8]}",
            "caption": "Test Caption",
            "thumbnail": "https://example.com/gallery.jpg",
            "linkType": "youtube",
            "externalLink": "https://youtube.com/test"
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/gallery", json=test_item)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "id" in data
        
        item_id = data["id"]
        
        # Verify item was created
        verify_response = requests.get(f"{BASE_URL}/api/admin/gallery")
        gallery = verify_response.json()["gallery"]
        created_item = next((g for g in gallery if g["id"] == item_id), None)
        assert created_item is not None
        assert created_item["title"] == test_item["title"]
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/gallery/{item_id}")
        print("✅ Gallery item creation works")

    def test_delete_gallery_item(self):
        """Test deleting a gallery item"""
        test_item = {
            "title": f"TEST_DeleteGallery_{uuid.uuid4().hex[:8]}",
            "caption": "Delete Caption",
            "thumbnail": "https://example.com/delete.jpg",
            "linkType": "youtube",
            "externalLink": "https://youtube.com/delete"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/gallery", json=test_item)
        item_id = create_response.json()["id"]
        
        # Delete
        delete_response = requests.delete(f"{BASE_URL}/api/admin/gallery/{item_id}")
        assert delete_response.status_code == 200
        
        # Verify deletion
        verify_response = requests.get(f"{BASE_URL}/api/admin/gallery")
        gallery = verify_response.json()["gallery"]
        deleted_item = next((g for g in gallery if g["id"] == item_id), None)
        assert deleted_item is None
        print("✅ Gallery item deletion works")


class TestPublicEndpoints:
    """Test public-facing endpoints"""
    
    def test_public_audio_tracks(self):
        """Test public audio tracks endpoint"""
        response = requests.get(f"{BASE_URL}/api/audio-tracks")
        assert response.status_code == 200
        data = response.json()
        assert "tracks" in data
        print("✅ Public audio tracks endpoint works")

    def test_public_video_performances(self):
        """Test public video performances endpoint"""
        response = requests.get(f"{BASE_URL}/api/video-performances")
        assert response.status_code == 200
        data = response.json()
        assert "videos" in data
        print("✅ Public video performances endpoint works")

    def test_public_gallery(self):
        """Test public gallery endpoint"""
        response = requests.get(f"{BASE_URL}/api/gallery")
        assert response.status_code == 200
        data = response.json()
        assert "gallery" in data
        print("✅ Public gallery endpoint works")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
