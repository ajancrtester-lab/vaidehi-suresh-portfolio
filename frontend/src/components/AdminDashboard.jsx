import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, Mail, Check, X, ExternalLink, LogOut, Eye, Edit, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { mockBookings, contactInfo } from '../mock';
import { toast } from '../hooks/use-toast';
import { content as defaultContent } from '../content/bilingual';
import MediaManagement from './MediaManagement';
import SiteSettings from './SiteSettings';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [contentData, setContentData] = useState({
    en: { ...defaultContent.en },
    ml: { ...defaultContent.ml }
  });

  

 // Load content
const loadContent = useCallback(async () => {
  try {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${BACKEND_URL}/api/content`);

    if (response.ok) {
      const data = await response.json();

      setContentData({
        en: { ...defaultContent.en, ...data.content?.en },
        ml: { ...defaultContent.ml, ...data.content?.ml }
      });
    }
  } catch (error) {
    console.log('Using default content');
  }
}, []);


// Load bookings
const fetchBookings = async () => {
  setIsLoading(true);

  try {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const response = await fetch(
      `${BACKEND_URL}/api/bookings?month=${selectedMonth + 1}&year=${selectedYear}`
    );

    if (!response.ok) {
      throw new Error('Failed to load bookings');
    }

    const data = await response.json();

    setBookings(data.bookings || []);

  } catch (error) {
    console.error(error);

    toast({
      title: "Error",
      description: "Failed to load bookings",
      variant: "destructive"
    });

  } finally {
    setIsLoading(false);
  }
};


// ✅ useEffect OUTSIDE
useEffect(() => {
  fetchBookings();
}, [selectedMonth, selectedYear]);
      
     
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        throw new Error('Invalid password');
      }

      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        toast({
          title: "Welcome!",
          description: "Successfully logged in to dashboard"
        });
      }
    } catch (error) {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
  };

  const handleContentUpdate = async (section, language, data) => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(
        `${BACKEND_URL}/api/content?admin_password=admin123`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section,
            language,
            data
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update content');
      }

      toast({
        title: "Success",
        description: "Content updated successfully! Changes will appear on the main site."
      });

      // Update local state
      setContentData(prev => ({
        ...prev,
        [language]: {
          ...prev[language],
          [section]: data
        }
      }));

      // Trigger content refresh on main site via custom event
      window.dispatchEvent(new Event('contentUpdated'));
      
      setEditingContent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus, 
          adminPassword: password 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const data = await response.json();

      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));

      // Open WhatsApp
      window.open(data.whatsappLink, '_blank');

      toast({
        title: "Status Updated",
        description: `Booking ${newStatus}. WhatsApp message opened.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      accepted: 'bg-green-500/20 text-green-500 border-green-500/30',
      declined: 'bg-red-500/20 text-red-500 border-red-500/30'
    };
    return variants[status] || variants.pending;
  };

  const getBookingsByStatus = (status) => {
    return bookings.filter(b => b.status === status);
  };

  const getBookingsThisMonth = () => {
    return bookings.filter(b => {
      const bookingDate = new Date(b.eventDate);
      return bookingDate.getMonth() === selectedMonth && 
             bookingDate.getFullYear() === selectedYear;
    }).length;
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-cormorant text-5xl font-bold text-[#d4af37] mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Booking Management System</p>
          </div>

          <form onSubmit={handleLogin} className="border-2 border-[#d4af37]/30 bg-black/50 backdrop-blur-sm p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="bg-black/50 border-[#d4af37]/30 text-white focus:border-[#d4af37]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#800020] to-[#9b2335] hover:from-[#9b2335] hover:to-[#800020] text-white py-6"
              >
                Login to Dashboard
              </Button>

              <p className="text-gray-500 text-xs text-center mt-4">
                Demo: Use password "admin123"
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-cormorant text-5xl font-bold text-[#d4af37] mb-2">
              Booking Dashboard
            </h1>
            <p className="text-gray-400">Manage your performance bookings</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#d4af37]/30 bg-black/50">
            <CardContent className="p-6">
              <div className="text-gray-400 text-sm mb-2">Total Bookings</div>
              <div className="text-3xl font-bold text-white">{bookings.length}</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-6">
              <div className="text-gray-400 text-sm mb-2">Pending</div>
              <div className="text-3xl font-bold text-yellow-500">
                {getBookingsByStatus('pending').length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="p-6">
              <div className="text-gray-400 text-sm mb-2">Accepted</div>
              <div className="text-3xl font-bold text-green-500">
                {getBookingsByStatus('accepted').length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#d4af37]/30 bg-black/50">
            <CardContent className="p-6">
              <div className="text-gray-400 text-sm mb-2">This Month</div>
              <div className="text-3xl font-bold text-[#d4af37]">
                {getBookingsThisMonth()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-8 bg-black/50 border border-[#d4af37]/30">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-4 mb-8 bg-black/50 border border-[#d4af37]/30">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="declined">Declined</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <BookingsList 
                  bookings={bookings} 
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="pending">
                <BookingsList 
                  bookings={getBookingsByStatus('pending')} 
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="accepted">
                <BookingsList 
                  bookings={getBookingsByStatus('accepted')} 
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="declined">
                <BookingsList 
                  bookings={getBookingsByStatus('declined')} 
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Media Management Tab */}
          <TabsContent value="media">
            <MediaManagement />
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <ContentManagement 
              contentData={contentData}
              onContentUpdate={handleContentUpdate}
            />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Bookings List Component
const BookingsList = ({ bookings, onStatusChange, getStatusBadge }) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border border-[#d4af37]/20 bg-black/30">
        <p className="text-gray-400">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="border-[#d4af37]/30 bg-black/50 hover:border-[#d4af37]/60 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-cormorant font-semibold text-[#d4af37]">
                    {booking.name}
                  </h3>
                  <Badge className={`${getStatusBadge(booking.status)} border`}>
                    {booking.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Requested on {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>

              {booking.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => onStatusChange(booking.id, 'accepted')}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    onClick={() => onStatusChange(booking.id, 'declined')}
                    size="sm"
                    variant="destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4 text-[#d4af37]" />
                <span>{booking.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4 text-[#d4af37]" />
                <span>{booking.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4 text-[#d4af37]" />
                <span>{new Date(booking.eventDate).toLocaleDateString()} - {booking.eventType}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4 text-[#d4af37]" />
                <span>{booking.location}</span>
              </div>

              {booking.duration && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4 text-[#d4af37]" />
                  <span>{booking.duration}</span>
                </div>
              )}
            </div>

            {booking.message && (
              <div className="mt-4 p-4 bg-black/50 border border-[#d4af37]/20">
                <p className="text-sm text-gray-400">
                  <strong className="text-[#d4af37]">Message:</strong> {booking.message}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Content Management Component
const ContentManagement = ({ contentData, onContentUpdate }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [editedData, setEditedData] = useState({});
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { key: 'about', label: 'About Section', fields: ['title', 'subtitle', 'quote'] },
    { key: 'achievements', label: 'Achievements', fields: ['title', 'subtitle'] },
    { key: 'training', label: 'Training & Education', fields: ['title', 'subtitle', 'formalEducation', 'musicEducation', 'gurusTitle'] }
  ];

  const handleFieldChange = (section, field, value) => {
    setEditedData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const handleSave = (section) => {
    const dataToSave = editedData[section] || {};
    const mergedData = {
      ...contentData[selectedLang][section],
      ...dataToSave
    };
    
    onContentUpdate(section, selectedLang, mergedData);
    setEditedData(prev => {
      const newData = { ...prev };
      delete newData[section];
      return newData;
    });
  };

  const getValue = (section, field) => {
    if (editedData[section] && editedData[section][field] !== undefined) {
      return editedData[section][field];
    }
    return contentData[selectedLang][section]?.[field] || '';
  };

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37]">Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6 items-center justify-between">
            <div className="flex gap-4">
              <Button
                onClick={() => setSelectedLang('en')}
                variant={selectedLang === 'en' ? 'default' : 'outline'}
                className={selectedLang === 'en' ? 'bg-[#d4af37] text-black' : 'border-[#d4af37]/30'}
              >
                English
              </Button>
              <Button
                onClick={() => setSelectedLang('ml')}
                variant={selectedLang === 'ml' ? 'default' : 'outline'}
                className={selectedLang === 'ml' ? 'bg-[#d4af37] text-black' : 'border-[#d4af37]/30'}
              >
                Malayalam (മലയാളം)
              </Button>
            </div>
            
            <Button
              onClick={() => window.open('/', '_blank')}
              variant="outline"
              size="sm"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Preview Website
            </Button>
          </div>

          <p className="text-gray-400 text-sm">
            Currently editing: <span className="text-[#d4af37]">{selectedLang === 'en' ? 'English' : 'Malayalam'}</span>
          </p>
        </CardContent>
      </Card>

      {/* Section Editors */}
      {sections.map(section => (
        <Card key={section.key} className="border-[#d4af37]/30 bg-black/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#d4af37]">{section.label}</CardTitle>
              <Button
                onClick={() => handleSave(section.key)}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                disabled={!editedData[section.key]}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map(field => (
              <div key={field}>
                <Label className="text-gray-300 mb-2 block capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                {field === 'quote' || field === 'description' ? (
                  <Textarea
                    value={getValue(section.key, field)}
                    onChange={(e) => handleFieldChange(section.key, field, e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30 text-white min-h-[100px]"
                    placeholder={`Enter ${field}...`}
                  />
                ) : (
                  <Input
                    value={getValue(section.key, field)}
                    onChange={(e) => handleFieldChange(section.key, field, e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30 text-white"
                    placeholder={`Enter ${field}...`}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Info Card */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="p-4">
          <p className="text-sm text-gray-400">
            <strong className="text-green-400">💡 How it works:</strong>
            <br />
            1. Edit content above and click "Save Changes"
            <br />
            2. Changes are saved to database instantly
            <br />
            3. Main website automatically refreshes content
            <br />
            4. Click "Preview Website" button to see your changes in a new tab
            <br />
            <span className="text-yellow-400">⚠️ Remember:</span> Save changes for both English AND Malayalam versions!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
