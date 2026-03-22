# API Contracts & Implementation Plan

## Booking System

### Frontend Components
1. **BookingForm.jsx** - Public booking form
   - Fields: name, phone, email, eventType, eventDate, location, duration, message
   - Submits to backend API
   - Shows success message with WhatsApp notification info

2. **AdminDashboard.jsx** - Password-protected dashboard at `/admin`
   - Login form (simple password check)
   - Display bookings by month (calendar view or list)
   - Each booking shows: all form details, status (pending/accepted/declined)
   - Accept/Decline buttons that generate WhatsApp messages

### Backend APIs

#### 1. POST /api/bookings
**Request:**
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "eventType": "Temple/Cultural/Private",
  "eventDate": "YYYY-MM-DD",
  "location": "string",
  "duration": "string (optional)",
  "message": "string"
}
```
**Response:**
```json
{
  "success": true,
  "bookingId": "string",
  "whatsappLink": "https://wa.me/919876543210?text=..."
}
```

#### 2. GET /api/bookings
**Query params:** month (optional), year (optional)
**Response:**
```json
{
  "bookings": [
    {
      "id": "string",
      "name": "string",
      "phone": "string",
      "email": "string",
      "eventType": "string",
      "eventDate": "string",
      "location": "string",
      "duration": "string",
      "message": "string",
      "status": "pending/accepted/declined",
      "createdAt": "timestamp"
    }
  ]
}
```

#### 3. PUT /api/bookings/:id/status
**Request:**
```json
{
  "status": "accepted/declined",
  "adminPassword": "string"
}
```
**Response:**
```json
{
  "success": true,
  "whatsappLink": "https://wa.me/BOOKER_PHONE?text=..."
}
```

#### 4. POST /api/admin/login
**Request:**
```json
{
  "password": "string"
}
```
**Response:**
```json
{
  "success": true,
  "token": "simple-session-token"
}
```

### WhatsApp Message Templates

**To Artist (on new booking):**
```
🎵 New Performance Booking Request!

Name: {name}
Phone: {phone}
Email: {email}
Event Type: {eventType}
Date: {eventDate}
Location: {location}
Duration: {duration}
Message: {message}

To manage this booking, visit your dashboard.
```

**To Booker (on acceptance):**
```
✅ Booking Confirmed!

Dear {name},

Your booking request for {eventType} on {eventDate} at {location} has been ACCEPTED by Vaidehi Suresh.

We look forward to performing at your event!

- Vaidehi Suresh Team
```

**To Booker (on decline):**
```
❌ Booking Update

Dear {name},

Unfortunately, we are unable to confirm your booking request for {eventType} on {eventDate}.

Please contact us to discuss alternative dates.

- Vaidehi Suresh Team
```

### MongoDB Schema

**Collection: bookings**
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  email: String,
  eventType: String,
  eventDate: Date,
  location: String,
  duration: String,
  message: String,
  status: String (default: "pending"),
  createdAt: Date,
  updatedAt: Date
}
```

**Collection: admin_config**
```javascript
{
  _id: ObjectId,
  password: String (hashed),
  artistWhatsapp: String
}
```

---

## Gallery System

### Frontend Components

**ImageGallery.jsx** - Redesigned gallery
- Display thumbnail images in grid
- Each thumbnail has external link (YouTube/Instagram)
- Click opens link in new tab
- Show icon badge for link type (YouTube/Instagram)

### Mock Data Structure (mock.js)

```javascript
export const gallery = [
  {
    id: 1,
    thumbnail: "url-to-thumbnail-image",
    linkType: "youtube", // youtube | instagram-post | instagram-reel
    externalLink: "https://youtube.com/watch?v=...",
    title: "Performance Title",
    caption: "Description"
  },
  // ...
]
```

### Backend (Optional - if needed for managing gallery)

#### POST /api/gallery (Admin only)
**Request:**
```json
{
  "thumbnail": "image-url",
  "linkType": "youtube",
  "externalLink": "https://...",
  "title": "string",
  "caption": "string"
}
```

---

## Implementation Steps

### Phase 1: Frontend with Mock Data
1. Update mock.js with gallery links structure
2. Create BookingForm component with form validation
3. Create AdminDashboard component with login
4. Redesign ImageGallery with thumbnails and external links
5. Update Contact.jsx to integrate BookingForm

### Phase 2: Backend Development
1. Create booking endpoints (POST, GET, PUT)
2. Create admin authentication endpoint
3. MongoDB models for bookings
4. WhatsApp link generation utility
5. Admin password configuration

### Phase 3: Integration
1. Connect BookingForm to backend API
2. Connect AdminDashboard to backend API
3. Test WhatsApp link generation
4. Test accept/decline workflow

### Phase 4: Testing
1. Test booking form submission
2. Test dashboard login
3. Test accept/decline with WhatsApp links
4. Test gallery external links
5. Test responsive design

---

## Environment Variables Needed

```
ADMIN_PASSWORD=<secure-password>
ARTIST_WHATSAPP=+919876543210
```

---

## Notes
- WhatsApp links use wa.me format (no API needed)
- Admin dashboard uses simple session-based auth (no JWT complexity)
- Gallery thumbnails are static images with external links
- Booking dates use HTML5 date picker
- Status updates trigger WhatsApp link generation (not automatic sending)
