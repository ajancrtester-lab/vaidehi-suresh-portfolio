import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SiteSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/site-settings?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings || getDefaultSettings());
      } else {
        setSettings(getDefaultSettings());
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      setSettings(getDefaultSettings());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSettings = () => ({
    id: 'main_settings',
    instagramUsername: 'iraneesam_vaidehi_suresh',
    backgroundMusic: {
      enabled: true,
      audioUrl: '',
      title: 'Sopana Sangeetham'
    },
    hero: {
      mainTitle: 'Vaidehi Suresh',
      subtitle: 'Sopana Sangeetham Artist',
      tagline: 'Preserving the Sacred Melodies of Kerala Temples'
    },
    stats: {
      yearsOfExperience: 13,
      templesPerformed: 750,
      studentsTrained: 100,
      awardsReceived: 25
    },
    socialMedia: {
      instagram: 'https://www.instagram.com/iraneesam_vaidehi_suresh',
      youtube: '',
      facebook: ''
    }
  });

  const updateField = (path, value) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    
    let current = newSettings;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setSettings(newSettings);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${BACKEND_URL}/api/admin/site-settings?admin_password=admin123`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Settings saved successfully',
        });
        
        // Trigger refresh on other tabs/windows
        localStorage.setItem('admin-update', Date.now().toString());
        
        // Reload settings to confirm
        await loadSettings();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (loading || !settings) {
    return <div className="text-center py-8 text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37]">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Main Title</Label>
            <Input
              value={settings.hero?.mainTitle || ''}
              onChange={(e) => updateField('hero.mainTitle', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={settings.hero?.subtitle || ''}
              onChange={(e) => updateField('hero.subtitle', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
          <div>
            <Label>Tagline</Label>
            <Input
              value={settings.hero?.tagline || ''}
              onChange={(e) => updateField('hero.tagline', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37]">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Years of Experience</Label>
            <Input
              type="number"
              value={settings.stats?.yearsOfExperience || 13}
              onChange={(e) => updateField('stats.yearsOfExperience', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
          <div>
            <Label>Temples Performed</Label>
            <Input
              type="number"
              value={settings.stats?.templesPerformed || 750}
              onChange={(e) => updateField('stats.templesPerformed', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
          <div>
            <Label>Students Trained</Label>
            <Input
              type="number"
              value={settings.stats?.studentsTrained || 100}
              onChange={(e) => updateField('stats.studentsTrained', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
          <div>
            <Label>Awards Received</Label>
            <Input
              type="number"
              value={settings.stats?.awardsReceived || 25}
              onChange={(e) => updateField('stats.awardsReceived', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Instagram */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37]">Instagram</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Instagram Username (without @)</Label>
            <Input
              value={settings.instagramUsername || ''}
              onChange={(e) => updateField('instagramUsername', e.target.value)}
              placeholder="iraneesam_vaidehi_suresh"
              className="bg-black/50 border-[#d4af37]/30 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3 justify-end">
        <Button
          onClick={loadSettings}
          variant="outline"
          className="border-[#d4af37]/50 text-[#d4af37]"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-[#800020] to-[#9b2335]"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;
