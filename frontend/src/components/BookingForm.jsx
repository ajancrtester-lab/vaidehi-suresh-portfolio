import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, User, Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { contactInfo } from '../mock';
import { toast } from '../hooks/use-toast';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    location: '',
    duration: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, eventType: value }));
  };

  const generateWhatsAppMessage = () => {
    const message = `🎵 New Performance Booking Request!

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Event Type: ${formData.eventType}
Date: ${formData.eventDate}
Location: ${formData.location}
Duration: ${formData.duration || 'Not specified'}
Message: ${formData.message}

To manage this booking, visit your dashboard.`;
    
    return `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.eventType || !formData.eventDate || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Call backend API
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      const data = await response.json();

      // Show success message
      toast({
        title: "Booking Request Submitted!",
        description: "We'll send the details to the artist via WhatsApp",
      });

      // Open WhatsApp in new tab
      window.open(generateWhatsAppMessage(), '_blank');

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventType: '',
        eventDate: '',
        location: '',
        duration: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-r from-[#800020]/10 to-[#d4af37]/10 blur-2xl" />
      <form onSubmit={handleSubmit} className="relative border-2 border-[#d4af37]/30 bg-black/50 backdrop-blur-sm p-8">
        <h3 className="font-cormorant text-3xl font-semibold text-[#d4af37] mb-6 text-center">
          Book a Performance
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300 flex items-center gap-2">
              <User className="h-4 w-4 text-[#d4af37]" />
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300 flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#d4af37]" />
              WhatsApp Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
              className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#d4af37]" />
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
            />
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="eventType" className="text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#d4af37]" />
              Event Type *
            </Label>
            <Select value={formData.eventType} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#d4af37]/30">
                <SelectItem value="Temple">Temple</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <Label htmlFor="eventDate" className="text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#d4af37]" />
              Event Date *
            </Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-gray-300 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#d4af37]" />
              Duration (optional)
            </Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2 hours"
              className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2 mt-6">
          <Label htmlFor="location" className="text-gray-300 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#d4af37]" />
            Event Location *
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Full address or venue name"
            required
            className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
          />
        </div>

        {/* Message */}
        <div className="space-y-2 mt-6">
          <Label htmlFor="message" className="text-gray-300 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#d4af37]" />
            Additional Message
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any special requirements or details..."
            rows={4}
            className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#800020] to-[#9b2335] hover:from-[#9b2335] hover:to-[#800020] text-white py-6 text-lg border-2 border-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Booking Request
              </>
            )}
          </Button>
        </div>

        <p className="text-gray-500 text-xs text-center mt-4">
          * This will send the booking details to the artist via WhatsApp
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
