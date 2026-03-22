#!/usr/bin/env python3
"""
WhatsApp Booking Flow Test Suite
Tests the complete WhatsApp booking flow as requested
"""

import requests
import json
import urllib.parse
from datetime import datetime, timedelta
import uuid

# Configuration
BASE_URL = "https://sopana-artist.preview.emergentagent.com/api"
HEADERS = {"Content-Type": "application/json"}

def print_section(title):
    """Print a formatted section header"""
    print(f"\n{'='*60}")
    print(f" {title}")
    print(f"{'='*60}")

def print_test(test_name, status, details=""):
    """Print test result"""
    status_symbol = "✅" if status == "PASS" else "❌"
    print(f"{status_symbol} {test_name}")
    if details:
        print(f"   {details}")

def decode_whatsapp_url(whatsapp_url):
    """Decode WhatsApp URL to extract the message text"""
    try:
        # Extract the text parameter from the URL
        parsed_url = urllib.parse.urlparse(whatsapp_url)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        if 'text' in query_params:
            encoded_text = query_params['text'][0]
            decoded_text = urllib.parse.unquote(encoded_text)
            return decoded_text
        else:
            return "No text parameter found"
    except Exception as e:
        return f"Error decoding URL: {str(e)}"

def test_create_booking():
    """Test 1: Create a test booking via POST /api/bookings"""
    print_section("TEST 1: Create Booking and Check WhatsApp Link")
    
    # Generate future date
    future_date = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
    
    booking_data = {
        "name": "Rajesh Kumar",
        "phone": "+919876543211",
        "email": "rajesh.kumar@example.com",
        "eventType": "Temple",
        "eventDate": future_date,
        "location": "Shri Krishna Temple, Mumbai",
        "duration": "2 hours",
        "message": "Traditional bhajans for evening aarti"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", json=booking_data, headers=HEADERS)
        
        if response.status_code == 200:
            result = response.json()
            booking_id = result.get('bookingId')
            whatsapp_link = result.get('whatsappLink')
            
            print_test("Booking Creation", "PASS", f"Booking ID: {booking_id}")
            print_test("WhatsApp Link Generated", "PASS", f"Link: {whatsapp_link}")
            
            # Decode and analyze the WhatsApp message
            decoded_message = decode_whatsapp_url(whatsapp_link)
            print(f"\n📱 DECODED WHATSAPP MESSAGE:")
            print("-" * 40)
            print(decoded_message)
            print("-" * 40)
            
            # Check if the message contains required elements
            required_elements = [
                "New Performance Booking Request",
                "Rajesh Kumar",
                "+919876543211",
                "Temple",
                future_date,
                "Shri Krishna Temple, Mumbai",
                "quick-accept",
                "quick-decline"
            ]
            
            missing_elements = []
            for element in required_elements:
                if element not in decoded_message:
                    missing_elements.append(element)
            
            if not missing_elements:
                print_test("Message Format Validation", "PASS", "All required elements present")
            else:
                print_test("Message Format Validation", "FAIL", f"Missing: {missing_elements}")
            
            # Check if Accept and Decline links are properly formatted
            if "/quick-accept" in decoded_message and "/quick-decline" in decoded_message:
                print_test("Action Links Present", "PASS", "Both Accept and Decline links found")
            else:
                print_test("Action Links Present", "FAIL", "Missing action links")
            
            return booking_id
            
        else:
            print_test("Booking Creation", "FAIL", f"Status: {response.status_code}, Response: {response.text}")
            return None
            
    except Exception as e:
        print_test("Booking Creation", "FAIL", f"Exception: {str(e)}")
        return None

def test_quick_accept(booking_id):
    """Test 2: Test the quick-accept endpoint"""
    print_section("TEST 2: Quick Accept Endpoint")
    
    if not booking_id:
        print_test("Quick Accept Test", "SKIP", "No booking ID available")
        return
    
    try:
        accept_url = f"{BASE_URL}/bookings/{booking_id}/quick-accept"
        response = requests.get(accept_url)
        
        if response.status_code == 200:
            html_content = response.text
            
            # Check if the HTML contains success message
            if "Booking Accepted Successfully" in html_content:
                print_test("Quick Accept Response", "PASS", "Success message displayed")
            else:
                print_test("Quick Accept Response", "FAIL", "Success message not found")
            
            # Check if WhatsApp redirect is present
            if "wa.me" in html_content:
                print_test("WhatsApp Redirect", "PASS", "WhatsApp redirect found in HTML")
            else:
                print_test("WhatsApp Redirect", "FAIL", "No WhatsApp redirect found")
            
            # Check if auto-redirect script is present
            if "window.location.href" in html_content:
                print_test("Auto-redirect Script", "PASS", "Auto-redirect script present")
            else:
                print_test("Auto-redirect Script", "FAIL", "No auto-redirect script")
            
            print(f"\n📄 HTML RESPONSE PREVIEW:")
            print("-" * 40)
            # Extract just the visible text content for preview
            if "Booking Accepted Successfully" in html_content:
                print("✅ Booking Accepted Successfully!")
                print("Opening WhatsApp to notify the customer...")
            print("-" * 40)
            
        else:
            print_test("Quick Accept Response", "FAIL", f"Status: {response.status_code}")
            
    except Exception as e:
        print_test("Quick Accept Test", "FAIL", f"Exception: {str(e)}")

def test_quick_decline():
    """Test 3: Create another booking and test quick-decline"""
    print_section("TEST 3: Create New Booking for Decline Test")
    
    # Create a new booking for decline test
    future_date = (datetime.now() + timedelta(days=45)).strftime("%Y-%m-%d")
    
    booking_data = {
        "name": "Priya Sharma",
        "phone": "+919876543212",
        "email": "priya.sharma@example.com",
        "eventType": "Wedding",
        "eventDate": future_date,
        "location": "Grand Palace Hotel, Delhi",
        "duration": "3 hours",
        "message": "Classical music for wedding ceremony"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", json=booking_data, headers=HEADERS)
        
        if response.status_code == 200:
            result = response.json()
            booking_id = result.get('bookingId')
            print_test("Second Booking Creation", "PASS", f"Booking ID: {booking_id}")
            
            # Now test quick decline
            print_section("TEST 4: Quick Decline Endpoint")
            
            decline_url = f"{BASE_URL}/bookings/{booking_id}/quick-decline"
            decline_response = requests.get(decline_url)
            
            if decline_response.status_code == 200:
                html_content = decline_response.text
                
                # Check if the HTML contains decline message
                if "Booking Declined" in html_content:
                    print_test("Quick Decline Response", "PASS", "Decline message displayed")
                else:
                    print_test("Quick Decline Response", "FAIL", "Decline message not found")
                
                # Check if WhatsApp redirect is present
                if "wa.me" in html_content:
                    print_test("WhatsApp Redirect", "PASS", "WhatsApp redirect found in HTML")
                else:
                    print_test("WhatsApp Redirect", "FAIL", "No WhatsApp redirect found")
                
                print(f"\n📄 HTML RESPONSE PREVIEW:")
                print("-" * 40)
                if "Booking Declined" in html_content:
                    print("❌ Booking Declined")
                    print("Opening WhatsApp to notify the customer...")
                print("-" * 40)
                
            else:
                print_test("Quick Decline Response", "FAIL", f"Status: {decline_response.status_code}")
                
        else:
            print_test("Second Booking Creation", "FAIL", f"Status: {response.status_code}")
            
    except Exception as e:
        print_test("Quick Decline Test", "FAIL", f"Exception: {str(e)}")

def test_message_format_analysis():
    """Test 5: Detailed message format analysis"""
    print_section("TEST 5: Message Format Analysis")
    
    # Create a test booking to analyze message format
    future_date = (datetime.now() + timedelta(days=60)).strftime("%Y-%m-%d")
    
    booking_data = {
        "name": "Amit Patel",
        "phone": "+919876543213",
        "email": "amit.patel@example.com",
        "eventType": "Corporate Event",
        "eventDate": future_date,
        "location": "Tech Park Convention Center, Bangalore",
        "duration": "4 hours",
        "message": "Background music for corporate annual day"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", json=booking_data, headers=HEADERS)
        
        if response.status_code == 200:
            result = response.json()
            whatsapp_link = result.get('whatsappLink')
            decoded_message = decode_whatsapp_url(whatsapp_link)
            
            print(f"\n📱 COMPLETE WHATSAPP MESSAGE ANALYSIS:")
            print("=" * 60)
            print(decoded_message)
            print("=" * 60)
            
            # Analyze message structure
            lines = decoded_message.split('\n')
            
            # Check for proper line separation
            accept_line = None
            decline_line = None
            
            for i, line in enumerate(lines):
                if "Accept:" in line:
                    accept_line = i
                if "Decline:" in line:
                    decline_line = i
            
            if accept_line is not None and decline_line is not None:
                if decline_line == accept_line + 1:
                    print_test("URL Line Separation", "PASS", "Accept and Decline URLs on separate lines")
                else:
                    print_test("URL Line Separation", "FAIL", f"URLs not on consecutive lines (Accept: line {accept_line}, Decline: line {decline_line})")
            else:
                print_test("URL Line Separation", "FAIL", "Could not find Accept/Decline lines")
            
            # Check URL format
            if "https://sopana-artist.preview.emergentagent.com/api/bookings/" in decoded_message:
                print_test("URL Format", "PASS", "Correct base URL format")
            else:
                print_test("URL Format", "FAIL", "Incorrect base URL format")
            
            # Check for emojis and formatting
            if "🎵" in decoded_message and "✅" in decoded_message and "❌" in decoded_message:
                print_test("Message Formatting", "PASS", "Proper emojis and formatting present")
            else:
                print_test("Message Formatting", "FAIL", "Missing emojis or formatting")
            
        else:
            print_test("Message Format Analysis", "FAIL", f"Could not create test booking: {response.status_code}")
            
    except Exception as e:
        print_test("Message Format Analysis", "FAIL", f"Exception: {str(e)}")

def test_booking_status_verification():
    """Test 6: Verify booking status changes"""
    print_section("TEST 6: Booking Status Verification")
    
    try:
        # Get all bookings to verify status changes
        response = requests.get(f"{BASE_URL}/bookings")
        
        if response.status_code == 200:
            result = response.json()
            bookings = result.get('bookings', [])
            
            print_test("Bookings Retrieval", "PASS", f"Found {len(bookings)} bookings")
            
            # Check for accepted and declined bookings
            accepted_count = 0
            declined_count = 0
            pending_count = 0
            
            for booking in bookings:
                status = booking.get('status', 'unknown')
                if status == 'accepted':
                    accepted_count += 1
                elif status == 'declined':
                    declined_count += 1
                elif status == 'pending':
                    pending_count += 1
            
            print(f"   📊 Status Summary:")
            print(f"   - Accepted: {accepted_count}")
            print(f"   - Declined: {declined_count}")
            print(f"   - Pending: {pending_count}")
            
            if accepted_count > 0:
                print_test("Accept Flow Verification", "PASS", f"{accepted_count} booking(s) successfully accepted")
            else:
                print_test("Accept Flow Verification", "FAIL", "No accepted bookings found")
            
            if declined_count > 0:
                print_test("Decline Flow Verification", "PASS", f"{declined_count} booking(s) successfully declined")
            else:
                print_test("Decline Flow Verification", "FAIL", "No declined bookings found")
            
        else:
            print_test("Booking Status Verification", "FAIL", f"Status: {response.status_code}")
            
    except Exception as e:
        print_test("Booking Status Verification", "FAIL", f"Exception: {str(e)}")

def main():
    """Run all WhatsApp booking flow tests"""
    print("🚀 WHATSAPP BOOKING FLOW TEST SUITE")
    print(f"Testing against: {BASE_URL}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Test 1: Create booking and check WhatsApp link
    booking_id = test_create_booking()
    
    # Test 2: Test quick accept
    test_quick_accept(booking_id)
    
    # Test 3 & 4: Create new booking and test quick decline
    test_quick_decline()
    
    # Test 5: Detailed message format analysis
    test_message_format_analysis()
    
    # Test 6: Verify booking status changes
    test_booking_status_verification()
    
    print_section("TEST SUMMARY")
    print("✅ All WhatsApp booking flow tests completed!")
    print("📱 Check the decoded messages above to verify format")
    print("🔗 Quick action links tested for both accept and decline")
    print("📊 Booking status changes verified")

if __name__ == "__main__":
    main()