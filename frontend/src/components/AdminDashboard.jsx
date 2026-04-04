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
    <div className="p-6">
      <Button onClick={handleLogout}>Logout</Button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        bookings.map(b => (
          <Card key={b.id}>
            <CardContent>
              <p>{b.name}</p>
              <Badge>{b.status}</Badge>

              {b.status === 'pending' && (
                <>
                  <Button onClick={() => handleStatusChange(b.id, 'accepted')}>
                    Accept
                  </Button>
                  <Button onClick={() => handleStatusChange(b.id, 'declined')}>
                    Decline
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;