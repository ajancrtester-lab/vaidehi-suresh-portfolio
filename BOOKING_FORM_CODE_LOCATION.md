# 📍 Booking Form Code Location Guide

## Where is the Booking Form in the Code?

### **Frontend Components:**

#### **1. Main Contact Section**
**File:** `/app/frontend/src/components/Contact.jsx`
**Lines:** 1-188
**Purpose:** Contains the contact page layout and contact information

**Key elements:**
- Contact information display (WhatsApp, Email, Location)
- Imports and renders the BookingForm component
- Uses context to get contact info from database

---

#### **2. Booking Form Component**
**File:** `/app/frontend/src/components/BookingForm.jsx`
**Lines:** 1-278
**Purpose:** The actual form where users fill in booking details

**Key sections:**
- **Lines 17-26:** Form fields state (name, phone, email, event type, etc.)
- **Lines 39-100:** `handleSubmit` function - submits to backend API
- **Lines 105-276:** Form UI with all input fields

**Form fields:**
1. Name (Line ~120)
2. Phone (Line ~130)
3. Email (Line ~140)
4. Event Type (Line ~150) - Dropdown
5. Event Date (Line ~180) - Date picker
6. Location (Line ~200)
7. Duration (Line ~220)
8. Additional Message (Line ~235) - **This is what you see in the screenshot**
9. Submit Button (Line ~255) - "Submit Booking Request"

---

### **Backend API:**

#### **3. Booking Route Handler**
**File:** `/app/backend/main.py`
**Lines:** 154-186
**Function:** `create_booking()`

**What happens when form is submitted:**
1. Line 154: Receives booking data from frontend
2. Line 159: Creates Booking object
3. Line 167: Saves to MongoDB database
4. Line 176: Generates WhatsApp message with booking details
5. Line 181: Returns WhatsApp link to frontend
6. Frontend opens WhatsApp automatically

---

#### **4. WhatsApp Number Configuration**
**File:** `/app/backend/.env`
**Line:** 5
**Variable:** `ARTIST_WHATSAPP="919447435548"`

**Used in:**
**File:** `/app/backend/main.py`
**Line:** 34
```python
ARTIST_WHATSAPP = os.environ.get('ARTIST_WHATSAPP', '+919876543210')
```

**Line:** 81
```python
return f"https://wa.me/{ARTIST_WHATSAPP}?text={quote(message)}"
```

---

## 🔄 How the Booking Flow Works:

### **Step 1: User Fills Form**
Component: `BookingForm.jsx`
- User enters name, phone, email, event details, message
- Clicks "Submit Booking Request" button

### **Step 2: Frontend Submits to Backend**
Function: `handleSubmit()` in BookingForm.jsx (Line 39)
```javascript
const response = await fetch(`${BACKEND_URL}/api/bookings`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### **Step 3: Backend Processes Booking**
Function: `create_booking()` in main.py (Line 154)
1. Saves booking to database
2. Generates WhatsApp message with all booking details
3. Includes quick action links (Accept/Decline)

### **Step 4: WhatsApp Opens**
Line 76-77 in BookingForm.jsx:
```javascript
if (data.whatsappLink) {
  window.open(data.whatsappLink, '_blank');
}
```

### **Step 5: WhatsApp Message Sent**
Opens WhatsApp with:
- Recipient: **919447435548** (Artist's WhatsApp)
- Pre-filled message with booking details
- Quick action links for Accept/Decline

---

## 📝 To Modify the Form:

### **Add/Remove Fields:**
Edit: `/app/frontend/src/components/BookingForm.jsx`
- Update state (Lines 17-26)
- Add input field in JSX (Lines 105-276)
- Update backend model if needed

### **Change WhatsApp Number:**
Edit: `/app/backend/.env`
```env
ARTIST_WHATSAPP="919447435548"
```
Then restart backend:
```bash
sudo supervisorctl restart backend
```

### **Modify WhatsApp Message Format:**
Edit: `/app/backend/main.py`
Function: `generate_artist_whatsapp_message` (Lines 58-81)

---

## 🎯 Current Configuration:

✅ **WhatsApp Number:** 919447435548
✅ **Form Location:** Contact section (bottom of homepage)
✅ **Backend API:** `/api/bookings`
✅ **Database Collection:** `bookings`
✅ **Message Format:** Includes all form details + action links

---

## 📱 Example WhatsApp Message:

When someone submits the form, this message is sent to WhatsApp **919447435548**:

```
🎵 New Performance Booking Request!

Name: [User's name]
Phone: [User's phone]
Email: [User's email]
Event Type: [Temple Festival/Wedding/etc]
Date: [Event date]
Location: [Event location]
Duration: [Duration]
Message: [Additional message]

━━━━━━━━━━━━━━━━━━━━
QUICK ACTIONS:
✅ Accept: [Link to accept]
❌ Decline: [Link to decline]

Or visit dashboard to manage.
```

---

**All booking requests now go to WhatsApp number: 919447435548! ✅**
