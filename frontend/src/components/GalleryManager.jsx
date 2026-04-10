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
    <div>
      <div className="flex items-center justify-between mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {images
            .sort((a, b) => a.order - b.order)
            .map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-[#d4af37]/30 transition-all hover:shadow-xl hover:shadow-[#d4af37]/10"
              >
              {editingId === image.id ? (
                // Edit Mode
                <div className="p-4 space-y-4">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video">
                    <img
                      src={image.thumbnail || image.url}
                      alt={image.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-bold text-sm shadow-lg">
                      {editForm.order}
                    </div>
                  </div>

                  {/* Edit Form */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#d4af37] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Caption</label>
                      <textarea
                        value={editForm.caption}
                        onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#d4af37] resize-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={editForm.order}
                        onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-[#d4af37] text-sm"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Lower numbers appear first
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={cancelEdit}
                      className="flex-1 px-3 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(image.id)}
                      className="flex-1 px-3 py-2 bg-[#d4af37] text-black rounded hover:bg-[#c19b2f] transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode - Vertical Card
                <div>
                  {/* Image with Order Badge */}
                  <div className="relative w-full aspect-video">
                    <img
                      src={image.thumbnail || image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Order Badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-bold text-lg shadow-lg">
                      {image.order}
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        image.isActive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {image.isActive ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <h4 className="text-white font-semibold text-lg line-clamp-1">
                      {image.title}
                    </h4>

                    {/* Caption */}
                    {image.caption && (
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {image.caption}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => startEdit(image)}
                        className="flex-1 px-3 py-2 bg-zinc-700 text-gray-300 hover:text-[#d4af37] hover:bg-zinc-600 rounded transition-colors flex items-center justify-center gap-2 text-sm"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        disabled={deleting === image.id}
                        className="flex-1 px-3 py-2 bg-zinc-700 text-gray-300 hover:text-red-400 hover:bg-zinc-600 rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                        title="Delete"
                      >
                        {deleting === image.id ? (
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryManager;
