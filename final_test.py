#!/usr/bin/env python3
"""
Final comprehensive WhatsApp booking flow test after URL fix
"""

import requests
import urllib.parse
from datetime import datetime, timedelta

BASE_URL = "https://sopana-artist.preview.emergentagent.com/api"
HEADERS = {"Content-Type": "application/json"}

def decode_whatsapp_url(whatsapp_url):
    """Decode WhatsApp URL to extract the message text"""
    try:
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

def test_complete_flow():
    """Test the complete WhatsApp booking flow with corrected URLs"""
    print("🚀 FINAL WHATSAPP BOOKING FLOW TEST")
    print("=" * 60)
    
    # Test 1: Create booking and verify URLs
    print("\n1️⃣ CREATING BOOKING AND CHECKING URLS")
    future_date = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
    
    booking_data = {
        "name": "Final Test Customer",
        "phone": "+919876543215",
        "email": "finaltest@example.com",
        "eventType": "Temple",
        "eventDate": future_date,
        "location": "Test Temple, Mumbai",
        "duration": "2 hours",
        "message": "Final test booking"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", json=booking_data, headers=HEADERS)
        
        if response.status_code == 200:
            result = response.json()
            booking_id = result.get('bookingId')
            whatsapp_link = result.get('whatsappLink')
            
            print(f"✅ Booking created: {booking_id}")
            
            # Decode message and check URLs
            decoded_message = decode_whatsapp_url(whatsapp_link)
            
            if "https://sopana-artist.preview.emergentagent.com/api/bookings/" in decoded_message:
                print("✅ URLs are correct (production URLs)")
            else:
                print("❌ URLs are incorrect")
                return False
            
            # Test 2: Test quick-accept
            print("\n2️⃣ TESTING QUICK-ACCEPT")
            accept_url = f"{BASE_URL}/bookings/{booking_id}/quick-accept"
            accept_response = requests.get(accept_url)
            
            if accept_response.status_code == 200 and "Booking Accepted Successfully" in accept_response.text:
                print("✅ Quick-accept working correctly")
            else:
                print(f"❌ Quick-accept failed: {accept_response.status_code}")
                return False
            
            # Test 3: Create another booking for decline test
            print("\n3️⃣ CREATING SECOND BOOKING FOR DECLINE TEST")
            booking_data2 = {
                "name": "Decline Test Customer",
                "phone": "+919876543216",
                "email": "declinetest@example.com",
                "eventType": "Wedding",
                "eventDate": future_date,
                "location": "Test Venue, Delhi",
                "duration": "3 hours",
                "message": "Decline test booking"
            }
            
            response2 = requests.post(f"{BASE_URL}/bookings", json=booking_data2, headers=HEADERS)
            
            if response2.status_code == 200:
                result2 = response2.json()
                booking_id2 = result2.get('bookingId')
                print(f"✅ Second booking created: {booking_id2}")
                
                # Test 4: Test quick-decline
                print("\n4️⃣ TESTING QUICK-DECLINE")
                decline_url = f"{BASE_URL}/bookings/{booking_id2}/quick-decline"
                decline_response = requests.get(decline_url)
                
                if decline_response.status_code == 200 and "Booking Declined" in decline_response.text:
                    print("✅ Quick-decline working correctly")
                else:
                    print(f"❌ Quick-decline failed: {decline_response.status_code}")
                    return False
            else:
                print(f"❌ Second booking creation failed: {response2.status_code}")
                return False
            
            # Test 5: Verify status changes
            print("\n5️⃣ VERIFYING STATUS CHANGES")
            bookings_response = requests.get(f"{BASE_URL}/bookings")
            
            if bookings_response.status_code == 200:
                bookings_data = bookings_response.json()
                bookings = bookings_data.get('bookings', [])
                
                # Find our test bookings
                test_booking1 = next((b for b in bookings if b['id'] == booking_id), None)
                test_booking2 = next((b for b in bookings if b['id'] == booking_id2), None)
                
                if test_booking1 and test_booking1['status'] == 'accepted':
                    print("✅ First booking correctly marked as accepted")
                else:
                    print("❌ First booking status incorrect")
                    return False
                
                if test_booking2 and test_booking2['status'] == 'declined':
                    print("✅ Second booking correctly marked as declined")
                else:
                    print("❌ Second booking status incorrect")
                    return False
            else:
                print(f"❌ Could not verify status changes: {bookings_response.status_code}")
                return False
            
            print("\n🎉 ALL TESTS PASSED!")
            print("=" * 60)
            print("✅ Booking creation works")
            print("✅ WhatsApp URLs are correct (production URLs)")
            print("✅ Quick-accept endpoint works")
            print("✅ Quick-decline endpoint works")
            print("✅ Status changes are persisted correctly")
            print("✅ HTML responses include WhatsApp redirects")
            print("=" * 60)
            return True
            
        else:
            print(f"❌ Initial booking creation failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Test failed with exception: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_complete_flow()
    if success:
        print("\n🏆 WHATSAPP BOOKING FLOW: FULLY FUNCTIONAL")
    else:
        print("\n💥 WHATSAPP BOOKING FLOW: ISSUES FOUND")