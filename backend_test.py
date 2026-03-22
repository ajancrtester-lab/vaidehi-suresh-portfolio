#!/usr/bin/env python3
"""
Backend API Testing Script for Booking System
Tests all booking system endpoints with proper error handling
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {BASE_URL}")

class BookingSystemTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.booking_id = None
        self.admin_token = None
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details
        })
        
    def test_create_booking(self):
        """Test POST /api/bookings - Create a new booking"""
        print("\n=== Testing Create Booking ===")
        
        booking_data = {
            "name": "Rajesh Kumar",
            "phone": "+919876543210",
            "email": "rajesh.kumar@example.com",
            "eventType": "Temple",
            "eventDate": "2025-06-15",
            "location": "Guruvayur Temple, Kerala",
            "duration": "2 hours",
            "message": "Traditional Carnatic performance for temple festival"
        }
        
        try:
            response = requests.post(f"{self.base_url}/bookings", json=booking_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'bookingId' in data and 'whatsappLink' in data and data.get('success'):
                    self.booking_id = data['bookingId']
                    self.log_test("Create Booking", True, f"Booking ID: {self.booking_id}")
                    print(f"   WhatsApp Link: {data['whatsappLink'][:100]}...")
                    return True
                else:
                    self.log_test("Create Booking", False, f"Missing required fields in response: {data}")
                    return False
            else:
                self.log_test("Create Booking", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Create Booking", False, f"Exception: {str(e)}")
            return False
    
    def test_get_bookings(self):
        """Test GET /api/bookings - Get all bookings"""
        print("\n=== Testing Get All Bookings ===")
        
        try:
            response = requests.get(f"{self.base_url}/bookings", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'bookings' in data and isinstance(data['bookings'], list):
                    bookings_count = len(data['bookings'])
                    self.log_test("Get All Bookings", True, f"Retrieved {bookings_count} bookings")
                    
                    # Check if our created booking is in the list
                    if self.booking_id:
                        found_booking = any(booking.get('id') == self.booking_id for booking in data['bookings'])
                        if found_booking:
                            print("   ✅ Created booking found in list")
                        else:
                            print("   ⚠️  Created booking not found in list")
                    
                    return True
                else:
                    self.log_test("Get All Bookings", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Get All Bookings", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Get All Bookings", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_login(self):
        """Test POST /api/admin/login - Admin login"""
        print("\n=== Testing Admin Login ===")
        
        # Test valid login
        login_data = {"password": "admin123"}
        
        try:
            response = requests.post(f"{self.base_url}/admin/login", json=login_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'token' in data:
                    self.admin_token = data['token']
                    self.log_test("Admin Login (Valid)", True, f"Token received: {data['token'][:20]}...")
                    return True
                else:
                    self.log_test("Admin Login (Valid)", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Admin Login (Valid)", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Admin Login (Valid)", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_login_invalid(self):
        """Test admin login with invalid password"""
        print("\n=== Testing Admin Login (Invalid Password) ===")
        
        login_data = {"password": "wrongpassword"}
        
        try:
            response = requests.post(f"{self.base_url}/admin/login", json=login_data, timeout=10)
            
            if response.status_code == 401:
                self.log_test("Admin Login (Invalid Password)", True, "Correctly rejected invalid password")
                return True
            else:
                self.log_test("Admin Login (Invalid Password)", False, f"Expected 401, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Admin Login (Invalid Password)", False, f"Exception: {str(e)}")
            return False
    
    def test_update_booking_status(self):
        """Test PUT /api/bookings/{id}/status - Update booking status"""
        print("\n=== Testing Update Booking Status ===")
        
        if not self.booking_id:
            self.log_test("Update Booking Status", False, "No booking ID available for testing")
            return False
        
        # Test accepting a booking
        status_data = {
            "status": "accepted",
            "adminPassword": "admin123"
        }
        
        try:
            response = requests.put(f"{self.base_url}/bookings/{self.booking_id}/status", 
                                  json=status_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'whatsappLink' in data:
                    self.log_test("Update Booking Status (Accept)", True, "Booking accepted successfully")
                    print(f"   WhatsApp Link: {data['whatsappLink'][:100]}...")
                    return True
                else:
                    self.log_test("Update Booking Status (Accept)", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Update Booking Status (Accept)", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Update Booking Status (Accept)", False, f"Exception: {str(e)}")
            return False
    
    def test_update_booking_status_invalid_password(self):
        """Test updating booking status with invalid admin password"""
        print("\n=== Testing Update Booking Status (Invalid Password) ===")
        
        if not self.booking_id:
            self.log_test("Update Booking Status (Invalid Password)", False, "No booking ID available")
            return False
        
        status_data = {
            "status": "declined",
            "adminPassword": "wrongpassword"
        }
        
        try:
            response = requests.put(f"{self.base_url}/bookings/{self.booking_id}/status", 
                                  json=status_data, timeout=10)
            
            if response.status_code == 401:
                self.log_test("Update Booking Status (Invalid Password)", True, "Correctly rejected invalid password")
                return True
            else:
                self.log_test("Update Booking Status (Invalid Password)", False, f"Expected 401, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Update Booking Status (Invalid Password)", False, f"Exception: {str(e)}")
            return False
    
    def test_update_booking_status_invalid_id(self):
        """Test updating booking status with invalid booking ID"""
        print("\n=== Testing Update Booking Status (Invalid ID) ===")
        
        status_data = {
            "status": "accepted",
            "adminPassword": "admin123"
        }
        
        try:
            response = requests.put(f"{self.base_url}/bookings/invalid-id-12345/status", 
                                  json=status_data, timeout=10)
            
            if response.status_code == 404:
                self.log_test("Update Booking Status (Invalid ID)", True, "Correctly returned 404 for invalid ID")
                return True
            else:
                self.log_test("Update Booking Status (Invalid ID)", False, f"Expected 404, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Update Booking Status (Invalid ID)", False, f"Exception: {str(e)}")
            return False
    
    def test_create_booking_missing_fields(self):
        """Test creating booking with missing required fields"""
        print("\n=== Testing Create Booking (Missing Fields) ===")
        
        # Missing required fields
        incomplete_data = {
            "name": "Test User",
            "phone": "+919876543210"
            # Missing email, eventType, eventDate, location
        }
        
        try:
            response = requests.post(f"{self.base_url}/bookings", json=incomplete_data, timeout=10)
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test("Create Booking (Missing Fields)", True, "Correctly rejected incomplete data")
                return True
            else:
                self.log_test("Create Booking (Missing Fields)", False, f"Expected 422, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Create Booking (Missing Fields)", False, f"Exception: {str(e)}")
            return False
    
    def test_api_root(self):
        """Test basic API connectivity"""
        print("\n=== Testing API Root Endpoint ===")
        
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == "Hello World":
                    self.log_test("API Root", True, "API is responding correctly")
                    return True
                else:
                    self.log_test("API Root", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("API Root", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("API Root", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print(f"🚀 Starting Backend API Tests")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test basic connectivity first
        self.test_api_root()
        
        # Test booking creation
        self.test_create_booking()
        
        # Test getting bookings
        self.test_get_bookings()
        
        # Test admin login
        self.test_admin_login()
        self.test_admin_login_invalid()
        
        # Test booking status updates
        self.test_update_booking_status()
        self.test_update_booking_status_invalid_password()
        self.test_update_booking_status_invalid_id()
        
        # Test error cases
        self.test_create_booking_missing_fields()
        
        # Print summary and return success status
        return self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  • {result['test']}: {result['details']}")
        
        print("\n✅ PASSED TESTS:")
        for result in self.test_results:
            if result['success']:
                print(f"  • {result['test']}")
        
        return passed == total

if __name__ == "__main__":
    tester = BookingSystemTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some tests failed!")
        sys.exit(1)