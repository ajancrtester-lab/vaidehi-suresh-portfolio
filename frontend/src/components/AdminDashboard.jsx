import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, LogOut, Save, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from '../hooks/use-toast';
import MediaManagement from './MediaManagement';
import SiteSettings from './SiteSettings';
import ContentEditor from './ContentEditor';
import GalleryUpload from './GalleryUpload';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
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

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    window.location.href = '/';
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
    loadBookings();
  }, []);

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
              <CardContent>
                <GalleryUpload onUploadSuccess={handleRefresh} />
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
