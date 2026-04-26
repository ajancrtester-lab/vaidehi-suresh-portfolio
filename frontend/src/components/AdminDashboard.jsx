import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, LogOut, Save, RefreshCw, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { toast } from '../hooks/use-toast';
import MediaManagement from './MediaManagement';
import SiteSettings from './SiteSettings';
import ContentEditor from './ContentEditor';
import GalleryUpload from './GalleryUpload';
import GalleryManager from './GalleryManager';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/bookings`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
    toast({
      title: 'Refreshed',
      description: 'Data reloaded successfully',
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        sessionStorage.setItem('adminAuth', 'true');
        setIsAuthenticated(true);
        setPassword('');
        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Invalid password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to login',
        variant: 'destructive',
      });
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Booking status updated',
        });
        loadBookings();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update booking',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    loadBookings();
  }, []);

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="bg-zinc-900 border-[#d4af37]/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-[#d4af37]" />
                </div>
              </div>
              <CardTitle className="text-3xl font-cormorant text-[#d4af37]">
                Admin Login
              </CardTitle>
              <p className="text-gray-400 mt-2">Enter your password to access the dashboard</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500"
                    disabled={loggingIn}
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black"
                  disabled={loggingIn || !password}
                >
                  {loggingIn ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-cormorant font-bold text-[#d4af37] mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your portfolio content</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/50 text-red-500 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="gallery">Performance Gallery</TabsTrigger>
            <TabsTrigger value="media">Media Management</TabsTrigger>
            <TabsTrigger value="content">Content Editor</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-[#d4af37]">Performance Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-400">Loading bookings...</div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bookings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="bg-black/50 border-[#d4af37]/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#d4af37] mb-2">
                                {booking.name}
                              </h3>
                              <div className="space-y-1 text-sm text-gray-400">
                                <p>📧 {booking.email}</p>
                                <p>📞 {booking.phone}</p>
                                <p>📅 {booking.preferredDate}</p>
                                <p>📍 {booking.venue}</p>
                                {booking.message && <p className="text-gray-300 mt-2">💬 {booking.message}</p>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="border-red-500/50 text-red-500"
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Management Tab */}
          <TabsContent value="media">
            <MediaManagement />
          </TabsContent>

          {/* Performance Gallery Tab */}
          <TabsContent value="gallery">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-[#d4af37]">Performance Gallery</CardTitle>
                <p className="text-sm text-gray-400">
                  Upload images for the 3D carousel gallery. Images are automatically resized to 1280x720.
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Upload Section */}
                <div>
                  <h3 className="text-lg font-semibold text-[#d4af37] mb-4">Upload New Images</h3>
                  <GalleryUpload onUploadSuccess={handleRefresh} />
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-700 my-8"></div>

                {/* Manage Existing Images */}
                <div>
                  <h3 className="text-lg font-semibold text-[#d4af37] mb-4">Manage Existing Images</h3>
                  <GalleryManager onUpdate={handleRefresh} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Editor Tab */}
          <TabsContent value="content">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-[#d4af37]">Content Editor</CardTitle>
                <p className="text-sm text-gray-400">
                  Edit all website content including Services, About, and other sections
                </p>
              </CardHeader>
              <CardContent>
                <ContentEditor />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
