import { useState, useEffect } from 'react';
import { Settings, Upload, Music, Save, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SiteSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/site-settings`);
      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/site-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save');

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.includes('audio')) {
      toast({
        title: 'Error',
        description: 'Please upload an audio file (MP3, WAV, etc.)',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BACKEND_URL}/api/admin/upload-audio`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error('Upload failed');

      // Update settings with new audio URL
      setSettings({
        ...settings,
        backgroundMusic: {
          ...settings.backgroundMusic,
          audioUrl: data.url,
        },
      });

      toast({
        title: 'Success',
        description: 'Audio file uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload audio file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const updateField = (path, value) => {
    const keys = path.split('.');
    
    // Create a deep copy with immutable updates
    const newSettings = { ...settings };
    
    // Navigate to the parent object and create new copies along the way
    let current = newSettings;
    for (let i = 0; i < keys.length - 1; i++) {
      // Create a new copy of the nested object
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    // Set the final value
    current[keys[keys.length - 1]] = value;
    setSettings(newSettings);
  };

  if (!settings) {
    return <div className="text-center py-8 text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#d4af37] flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Site Settings
        </h2>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-[#800020] to-[#9b2335]"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Background Music */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37] flex items-center gap-2">
            <Music className="h-5 w-5" />
            Background Music
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Upload Audio File (MP3, WAV)</Label>
            <div className="mt-2 flex items-center gap-4">
              <label
                htmlFor="audio-upload"
                className="flex items-center gap-2 px-4 py-2 border border-[#d4af37]/30 hover:border-[#d4af37] rounded cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4 text-[#d4af37]" />
                <span className="text-sm text-gray-300">
                  {uploading ? 'Uploading...' : 'Choose Audio File'}
                </span>
              </label>
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
                disabled={uploading}
              />
              {settings.backgroundMusic?.audioUrl && (
                <span className="text-xs text-gray-500">
                  Current: {settings.backgroundMusic.audioUrl}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label>Or Enter Audio URL</Label>
            <Input
              value={settings.backgroundMusic?.audioUrl || ''}
              onChange={(e) => updateField('backgroundMusic.audioUrl', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30"
              placeholder="https://example.com/audio.mp3 or /audio/filename.mp3"
            />
          </div>

          <div>
            <Label>Duration (seconds)</Label>
            <Input
              type="number"
              value={settings.backgroundMusic?.duration || 30}
              onChange={(e) => updateField('backgroundMusic.duration', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>

          <div>
            <Label>Music Title</Label>
            <Input
              value={settings.backgroundMusic?.title || ''}
              onChange={(e) => updateField('backgroundMusic.title', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30"
              placeholder="e.g., Sopana Sangeetham"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.backgroundMusic?.enabled !== false}
              onChange={(e) => updateField('backgroundMusic.enabled', e.target.checked)}
              className="w-4 h-4"
            />
            <Label>Enable background music</Label>
          </div>
        </CardContent>
      </Card>

      {/* Instagram Integration Card */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37] flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            Instagram Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="instagram" className="text-gray-200">
              Instagram Username
              <span className="text-xs text-gray-500 ml-2">(without @)</span>
            </Label>
            <Input
              id="instagram"
              value={settings.instagramUsername || ''}
              onChange={(e) => updateField('instagramUsername', e.target.value)}
              placeholder="iraneesam_vaidehi_suresh"
              className="bg-black/50 border-[#d4af37]/30 text-white mt-2"
            />
            <p className="text-xs text-gray-500 mt-2">
              Instagram posts will appear in the Performance Videos section (managed via Gallery)
            </p>
          </div>
        </CardContent>
      </Card>

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
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={settings.hero?.subtitle || ''}
              onChange={(e) => updateField('hero.subtitle', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
          <div>
            <Label>Tagline</Label>
            <Input
              value={settings.hero?.tagline || ''}
              onChange={(e) => updateField('hero.tagline', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37]">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Years of Experience</Label>
            <Input
              type="number"
              value={settings.stats?.yearsOfExperience || 0}
              onChange={(e) => updateField('stats.yearsOfExperience', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
          <div>
            <Label>Temples Performed</Label>
            <Input
              type="number"
              value={settings.stats?.templesPerformed || 0}
              onChange={(e) => updateField('stats.templesPerformed', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
          <div>
            <Label>Students Trained</Label>
            <Input
              type="number"
              value={settings.stats?.studentsTrained || 0}
              onChange={(e) => updateField('stats.studentsTrained', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
          <div>
            <Label>Awards Received</Label>
            <Input
              type="number"
              value={settings.stats?.awardsReceived || 0}
              onChange={(e) => updateField('stats.awardsReceived', parseInt(e.target.value))}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="border-[#d4af37]/30 bg-black/50">
        <CardHeader>
          <CardTitle className="text-[#d4af37]">Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Instagram URL</Label>
            <Input
              value={settings.socialMedia?.instagram || ''}
              onChange={(e) => updateField('socialMedia.instagram', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
          <div>
            <Label>YouTube URL</Label>
            <Input
              value={settings.socialMedia?.youtube || ''}
              onChange={(e) => updateField('socialMedia.youtube', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
          <div>
            <Label>Facebook URL</Label>
            <Input
              value={settings.socialMedia?.facebook || ''}
              onChange={(e) => updateField('socialMedia.facebook', e.target.value)}
              className="bg-black/50 border-[#d4af37]/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-[#800020] to-[#9b2335]"
          size="lg"
        >
          <Save className="h-5 w-5 mr-2" />
          {loading ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;
