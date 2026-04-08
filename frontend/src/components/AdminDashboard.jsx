import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, Check, X, ExternalLink, LogOut, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';
import { content as defaultContent } from '../content/bilingual';
import MediaManagement from './MediaManagement';
import SiteSettings from './SiteSettings';
import ContentEditor from './ContentEditor';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [contentData, setContentData] = useState({
    en: { ...defaultContent.en },
    ml: { ...defaultContent.ml }
  });

  // ✅ Load content
  const loadContent = useCallback(async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/content`);

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // Handle the nested content structure correctly
        if (data.content) {
          setContentData({
            en: { ...defaultContent.en },
            ml: { ...defaultContent.ml }
          });
        }
      }
    } catch (error) {
      console.log('Using default content', error);
      // Set default content on error
      setContentData({
        en: { ...defaultContent.en },
        ml: { ...defaultContent.ml }
      });
    }
  }, []);

  // ✅ FIXED: Memoized fetchBookings
  const fetchBookings = useCallback(async () => {
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
  }, [selectedMonth, selectedYear]);

  // ✅ FIXED: Proper dependencies
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // ✅ ALSO load content on mount
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!response.ok) throw new Error();

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        toast({
          title: "Welcome!",
          description: "Successfully logged in"
        });
      }
    } catch {
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
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

      const response = await fetch(`${BACKEND_URL}/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminPassword: password })
      });

      if (!response.ok) throw new Error();

      const data = await response.json();

      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
      );

      window.open(data.whatsappLink, '_blank');

      toast({
        title: "Updated",
        description: `Booking ${newStatus}`
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status) => ({
    pending: 'bg-yellow-500/20 text-yellow-500',
    accepted: 'bg-green-500/20 text-green-500',
    declined: 'bg-red-500/20 text-red-500'
  }[status] || '');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin}>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#d4af37]">Admin Dashboard</h1>
          <Button 
            onClick={handleLogout}
            className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="media">Media Management</TabsTrigger>
            <TabsTrigger value="content">Content Editor</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-[#d4af37]">Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-gray-400">Loading...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-gray-400">No bookings yet</p>
                ) : (
                  bookings.map(b => (
                    <Card key={b.id} className="mb-4 bg-zinc-800">
                      <CardContent className="pt-6">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-semibold">{b.name}</p>
                            <p className="text-sm text-gray-400">{b.email}</p>
                          </div>
                          <Badge className={getStatusBadge(b.status)}>{b.status}</Badge>
                        </div>
                        {b.status === 'pending' && (
                          <div className="flex gap-2 mt-4">
                            <Button onClick={() => handleStatusChange(b.id, 'accepted')} size="sm">
                              <Check className="mr-2 h-4 w-4" /> Accept
                            </Button>
                            <Button onClick={() => handleStatusChange(b.id, 'declined')} variant="destructive" size="sm">
                              <X className="mr-2 h-4 w-4" /> Decline
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Management Tab */}
          <TabsContent value="media">
            <MediaManagement />
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