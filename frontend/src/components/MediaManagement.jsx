import { useState, useEffect } from 'react';
import { Music, Video, Image, MessageSquare, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const MediaManagement = () => {
  const [audioTracks, setAudioTracks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState(null);

  useEffect(() => {
    loadAllMedia();
  }, []);

  const loadAllMedia = async () => {
    setLoading(true);
    try {
      const [audioRes, videoRes, galleryRes, testimonialsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/admin/audio-tracks`),
        fetch(`${BACKEND_URL}/api/admin/video-performances`),
        fetch(`${BACKEND_URL}/api/admin/gallery`),
        fetch(`${BACKEND_URL}/api/admin/testimonials`),
      ]);

      const audioData = await audioRes.json();
      const videoData = await videoRes.json();
      const galleryData = await galleryRes.json();
      const testimonialsData = await testimonialsRes.json();

      setAudioTracks(audioData.tracks || audioData.audioTracks || []);
      setVideos(videoData.videos || []);
      setGallery(galleryData.gallery || []);
      setTestimonials(testimonialsData.testimonials || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load media',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (type, item) => {
    try {
      const endpoints = {
        audio: 'audio-tracks',
        video: 'video-performances',
        gallery: 'gallery',
        testimonial: 'testimonials',
      };

      const endpoint = endpoints[type];
      const isNew = !item.id || item.id === 'new';

      // Ensure required fields
      if (!item.title && !item.name) {
        toast({
          title: 'Error',
          description: 'Title/Name is required',
          variant: 'destructive',
        });
        return;
      }

      // For new items, generate ID
      if (isNew) {
        item.id = `${type}-${Date.now()}`;
      }

      const response = await fetch(
        `${BACKEND_URL}/api/admin/${endpoint}${isNew ? '' : `/${item.id}`}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to save');
      }

      toast({
        title: 'Success',
        description: `${type} ${isNew ? 'created' : 'updated'} successfully`,
      });

      setEditingItem(null);
      setEditType(null);
      loadAllMedia();
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save item',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoints = {
        audio: 'audio-tracks',
        video: 'video-performances',
        gallery: 'gallery',
        testimonial: 'testimonials',
      };

      const endpoint = endpoints[type];

      const response = await fetch(`${BACKEND_URL}/api/admin/${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });

      loadAllMedia();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete item',
        variant: 'destructive',
      });
    }
  };

  const EditDialog = ({ type, item, onClose, onSave }) => {
    const [formData, setFormData] = useState(item || {});

    const handleChange = (field, value) => {
      setFormData({ ...formData, [field]: value });
    };

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="bg-[#0a0a0a] border-[#d4af37]/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#d4af37]">
              {item?.id && item.id !== 'new' ? 'Edit' : 'Add New'} {type}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {type === 'Audio Track' && (
              <>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Raga</Label>
                  <Input
                    value={formData.raga || ''}
                    onChange={(e) => handleChange('raga', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Duration (e.g., 5:23)</Label>
                  <Input
                    value={formData.duration || ''}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Temple</Label>
                  <Input
                    value={formData.temple || ''}
                    onChange={(e) => handleChange('temple', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Audio URL</Label>
                  <Input
                    value={formData.audioUrl || ''}
                    onChange={(e) => handleChange('audioUrl', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label>Active</Label>
                </div>
              </>
            )}

            {type === 'Video' && (
              <>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Venue</Label>
                  <Input
                    value={formData.venue || ''}
                    onChange={(e) => handleChange('venue', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Date (e.g., March 2024)</Label>
                  <Input
                    value={formData.date || ''}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={formData.thumbnail || ''}
                    onChange={(e) => handleChange('thumbnail', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Video URL (YouTube embed)</Label>
                  <Input
                    value={formData.videoUrl || ''}
                    onChange={(e) => handleChange('videoUrl', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label>Active</Label>
                </div>
              </>
            )}

            {type === 'Gallery Item' && (
              <>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Caption</Label>
                  <Input
                    value={formData.caption || ''}
                    onChange={(e) => handleChange('caption', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={formData.thumbnail || ''}
                    onChange={(e) => handleChange('thumbnail', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Link Type</Label>
                  <select
                    value={formData.linkType || 'instagram-post'}
                    onChange={(e) => handleChange('linkType', e.target.value)}
                    className="w-full p-2 bg-black/50 border border-[#d4af37]/30 rounded text-white"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="instagram-post">Instagram Post</option>
                    <option value="instagram-reel">Instagram Reel</option>
                  </select>
                </div>
                <div>
                  <Label>External Link</Label>
                  <Input
                    value={formData.externalLink || ''}
                    onChange={(e) => handleChange('externalLink', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                    placeholder="https://www.instagram.com/p/..."
                  />
                </div>
              </>
            )}

            {type === 'Testimonial' && (
              <>
                <div>
                  <Label>Name</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={formData.role || ''}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Temple/Organization</Label>
                  <Input
                    value={formData.temple || ''}
                    onChange={(e) => handleChange('temple', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Quote</Label>
                  <Textarea
                    value={formData.quote || ''}
                    onChange={(e) => handleChange('quote', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image || ''}
                    onChange={(e) => handleChange('image', e.target.value)}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                    className="bg-black/50 border-[#d4af37]/30"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label>Active</Label>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#800020] to-[#9b2335]"
              onClick={() => onSave(formData)}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const MediaList = ({ items, type, icon: Icon }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#d4af37] text-xl font-semibold flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {type}s ({items.length})
        </h3>
        <Button
          onClick={() => {
            setEditType(type);
            setEditingItem({ id: 'new', isActive: true, order: items.length + 1 });
          }}
          className="bg-gradient-to-r from-[#800020] to-[#9b2335]"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      {items.length === 0 && (
        <p className="text-gray-500 text-center py-8">No {type.toLowerCase()}s yet</p>
      )}

      {items.map((item) => (
        <Card key={item.id} className="border-[#d4af37]/30 bg-black/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-white font-semibold">{item.title || item.name}</h4>
                <p className="text-gray-400 text-sm mt-1">
                  {type === 'Audio Track' && `${item.raga} • ${item.temple}`}
                  {type === 'Video' && `${item.venue} • ${item.date}`}
                  {type === 'Gallery Item' && `${item.linkType} • ${item.caption}`}
                  {type === 'Testimonial' && `${item.role} • ${item.temple}`}
                </p>
                <div className="flex gap-2 mt-2">
                  {item.isActive !== undefined && (
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.isActive
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-gray-500/20 text-gray-500'
                      }`}
                    >
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  )}
                  <span className="text-xs px-2 py-1 rounded bg-[#d4af37]/20 text-[#d4af37]">
                    Order: {item.order || 0}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditType(type);
                    setEditingItem(item);
                  }}
                  className="text-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(type.toLowerCase().replace(' ', ''), item.id)}
                  className="text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      <Tabs defaultValue="audio" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/50 border border-[#d4af37]/30">
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="audio">
          <MediaList items={audioTracks} type="Audio Track" icon={Music} />
        </TabsContent>

        <TabsContent value="videos">
          <MediaList items={videos} type="Video" icon={Video} />
        </TabsContent>

        <TabsContent value="gallery">
          <MediaList items={gallery} type="Gallery Item" icon={Image} />
        </TabsContent>

        <TabsContent value="testimonials">
          <MediaList items={testimonials} type="Testimonial" icon={MessageSquare} />
        </TabsContent>
      </Tabs>

      {editingItem && editType && (
        <EditDialog
          type={editType}
          item={editingItem}
          onClose={() => {
            setEditingItem(null);
            setEditType(null);
          }}
          onSave={(data) => handleSave(editType.toLowerCase().replace(' ', ''), data)}
        />
      )}
    </div>
  );
};

export default MediaManagement;
