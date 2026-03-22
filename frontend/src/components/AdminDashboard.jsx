import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, Mail, Check, X, ExternalLink, LogOut, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { mockBookings, contactInfo } from '../mock';
import { toast } from '../hooks/use-toast';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);

  // Load bookings (mock data for now)
  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated, selectedMonth, selectedYear]);

  const loadBookings = async () => {
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
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Bookings List */}
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

export default AdminDashboard;
