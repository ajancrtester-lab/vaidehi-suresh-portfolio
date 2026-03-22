#!/usr/bin/env python3
"""
Quick test to verify URL fix in WhatsApp messages
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

def test_url_fix():
    """Test that URLs in WhatsApp messages are now correct"""
    print("🔧 TESTING URL FIX")
    print("=" * 50)
    
    # Create a test booking
    future_date = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
    
    booking_data = {
        "name": "URL Test User",
        "phone": "+919876543214",
        "email": "urltest@example.com",
        "eventType": "URL Test Event",
        "eventDate": future_date,
        "location": "Test Location",
        "duration": "1 hour",
        "message": "Testing URL fix"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", json=booking_data, headers=HEADERS)
        
        if response.status_code == 200:
            result = response.json()
            whatsapp_link = result.get('whatsappLink')
            decoded_message = decode_whatsapp_url(whatsapp_link)
            
            print("📱 DECODED MESSAGE:")
            print("-" * 30)
            print(decoded_message)
            print("-" * 30)
            
            # Check if URLs are now correct
            if "https://sopana-artist.preview.emergentagent.com/api/bookings/" in decoded_message:
                print("✅ URL FIX SUCCESSFUL - Production URLs now used")
                return True
            elif "localhost" in decoded_message:
                print("❌ URL FIX FAILED - Still using localhost URLs")
                return False
            else:
                print("❓ UNCLEAR - Could not find expected URL pattern")
                return False
                
        else:
            print(f"❌ BOOKING CREATION FAILED - Status: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ TEST FAILED - Exception: {str(e)}")
        return False

if __name__ == "__main__":
    test_url_fix()