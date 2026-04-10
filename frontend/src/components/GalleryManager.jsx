import { useState, useEffect } from 'react';
import { Trash2, Edit2, Check, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryManager = ({ onUpdate }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleting, setDeleting] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch existing images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/performance-gallery`);
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Start editing
  const startEdit = (image) => {
    setEditingId(image.id);
    setEditForm({
      title: image.title,
      caption: image.caption || '',
      order: image.order,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Save edits
  const saveEdit = async (imageId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/performance-gallery/${imageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        await fetchImages();
        setEditingId(null);
        setEditForm({});
        if (onUpdate) onUpdate();
      } else {
        alert('Failed to update image');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Error updating image');
    }
  };

  // Delete image
  const deleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      setDeleting(imageId);
      const response = await fetch(`${BACKEND_URL}/api/admin/performance-gallery/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchImages();
        if (onUpdate) onUpdate();
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block w-8 h-8 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin"></div>
        <p className="text-gray-400 mt-4">Loading images...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
        <p className="text-gray-400">No images uploaded yet</p>
        <p className="text-gray-500 text-sm mt-2">Upload your first performance image above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#d4af37]">
          Uploaded Images ({images.length})
        </h3>
        <button
          onClick={fetchImages}
          className="text-sm text-gray-400 hover:text-[#d4af37] transition-colors"
        >
          Refresh
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {images
          .sort((a, b) => a.order - b.order)
          .map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-[#d4af37]/30 transition-colors"
            >
              {editingId === image.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <img
                      src={image.thumbnail || image.url}
                      alt={image.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    {/* Edit Form */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Caption</label>
                        <textarea
                          value={editForm.caption}
                          onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                          rows="2"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#d4af37] resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                        <input
                          type="number"
                          value={editForm.order}
                          onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                          className="w-32 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#d4af37]"
                          min="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Lower numbers appear first in carousel
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(image.id)}
                      className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#c19b2f] transition-colors flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="text-gray-500 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Order Badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold text-sm">
                    {image.order}
                  </div>

                  {/* Thumbnail */}
                  <img
                    src={image.thumbnail || image.url}
                    alt={image.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{image.title}</h4>
                    {image.caption && (
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{image.caption}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      Status: {image.isActive ? '✓ Active' : '✗ Inactive'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(image)}
                      className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-zinc-700 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteImage(image.id)}
                      disabled={deleting === image.id}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-zinc-700 rounded transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting === image.id ? (
                        <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default GalleryManager;
