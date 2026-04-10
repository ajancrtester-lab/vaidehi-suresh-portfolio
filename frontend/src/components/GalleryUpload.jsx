import { useState } from 'react';
import { Upload, X, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryUpload = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newErrors = {};

    const validFiles = files.filter((file, index) => {
      // Validate file type
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        newErrors[file.name] = 'Invalid file format. Only JPG, PNG, and WebP are allowed.';
        return false;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        newErrors[file.name] = `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`;
        return false;
      }

      return true;
    });

    setErrors(newErrors);
    setSelectedFiles(validFiles);

    // Generate previews
    const newPreviews = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            url: reader.result,
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then(setPreviews);
  };

  const updatePreviewTitle = (index, newTitle) => {
    const updatedPreviews = [...previews];
    updatedPreviews[index].title = newTitle;
    setPreviews(updatedPreviews);
  };

  const updatePreviewCaption = (index, newCaption) => {
    const updatedPreviews = [...previews];
    updatedPreviews[index].caption = newCaption;
    setPreviews(updatedPreviews);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setSuccessMessage('');
    const newProgress = {};
    const newErrors = {};

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const preview = previews[i];

      try {
        newProgress[file.name] = { status: 'uploading', percent: 0 };
        setUploadProgress({ ...newProgress });

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
          `${BACKEND_URL}/api/admin/performance-gallery?title=${encodeURIComponent(preview.title)}&caption=${encodeURIComponent(preview.caption || '')}&order=${i}`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Upload failed');
        }

        newProgress[file.name] = { status: 'success', percent: 100 };
        setUploadProgress({ ...newProgress });

      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        newErrors[file.name] = error.message;
        newProgress[file.name] = { status: 'error', percent: 0 };
        setUploadProgress({ ...newProgress });
      }
    }

    setErrors(newErrors);
    setUploading(false);

    const successCount = Object.values(newProgress).filter(p => p.status === 'success').length;
    if (successCount > 0) {
      setSuccessMessage(`✅ Successfully uploaded ${successCount} image(s)`);
      
      // Clear after 3 seconds
      setTimeout(() => {
        setSelectedFiles([]);
        setPreviews([]);
        setUploadProgress({});
        if (onUploadSuccess) onUploadSuccess();
      }, 3000);
    }
  };

  return (
    <div className="bg-black/30 border border-[#d4af37]/30 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-cormorant font-bold text-[#d4af37] mb-2">
          Upload Performance Gallery Images
        </h3>
        <p className="text-gray-400 text-sm">
          Upload images for the 3D performance gallery. Images will be automatically resized to 1280x720 and center-cropped.
        </p>
      </div>

      {/* File Input */}
      <div className="mb-6">
        <label
          htmlFor="gallery-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#d4af37]/50 rounded-lg cursor-pointer hover:bg-black/20 hover:border-[#d4af37] transition-all"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 text-[#d4af37] mb-4" />
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG, or WebP (Max 10MB per file)
            </p>
          </div>
          <input
            id="gallery-upload"
            type="file"
            className="hidden"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Validation Errors */}
      <AnimatePresence>
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
          >
            {Object.entries(errors).map(([fileName, error]) => (
              <div key={fileName} className="flex items-start gap-2 text-sm text-red-400 mb-2 last:mb-0">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>{fileName}:</strong> {error}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="space-y-4 mb-6">
          <h4 className="text-lg font-semibold text-[#d4af37]">
            Selected Images ({previews.length})
          </h4>

          <div className="grid gap-4">
            {previews.map((preview, index) => {
              const progress = uploadProgress[selectedFiles[index]?.name];
              const hasError = errors[selectedFiles[index]?.name];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex gap-4 p-4 rounded-lg border ${
                    hasError
                      ? 'border-red-500/30 bg-red-900/10'
                      : 'border-[#d4af37]/30 bg-black/20'
                  }`}
                >
                  {/* Preview Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-[#d4af37]/30">
                    <img
                      src={preview.url}
                      alt={preview.title}
                      className="w-full h-full object-cover"
                    />
                    {progress?.status === 'success' && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <Check className="w-8 h-8 text-green-400" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Title *</label>
                      <input
                        type="text"
                        value={preview.title}
                        onChange={(e) => updatePreviewTitle(index, e.target.value)}
                        className="w-full px-3 py-2 bg-black/30 border border-[#d4af37]/30 rounded text-white text-sm focus:outline-none focus:border-[#d4af37]"
                        placeholder="Performance title"
                        disabled={uploading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Caption (Optional)</label>
                      <input
                        type="text"
                        value={preview.caption || ''}
                        onChange={(e) => updatePreviewCaption(index, e.target.value)}
                        className="w-full px-3 py-2 bg-black/30 border border-[#d4af37]/30 rounded text-white text-sm focus:outline-none focus:border-[#d4af37]"
                        placeholder="Short description"
                        disabled={uploading}
                      />
                    </div>

                    {/* Progress bar */}
                    {progress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className={
                            progress.status === 'success' ? 'text-green-400' :
                            progress.status === 'error' ? 'text-red-400' :
                            'text-gray-400'
                          }>
                            {progress.status === 'uploading' && 'Uploading...'}
                            {progress.status === 'success' && 'Uploaded ✓'}
                            {progress.status === 'error' && 'Failed ✗'}
                          </span>
                          <span className="text-gray-400">{progress.percent}%</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percent}%` }}
                            className={`h-full ${
                              progress.status === 'success' ? 'bg-green-500' :
                              progress.status === 'error' ? 'bg-red-500' :
                              'bg-[#d4af37]'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(index)}
                    disabled={uploading}
                    className="text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {previews.length > 0 && (
        <button
          onClick={uploadFiles}
          disabled={uploading || previews.length === 0}
          className="w-full py-3 px-6 bg-[#d4af37] text-black font-semibold rounded-lg hover:bg-[#c19b2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              Upload {previews.length} Image{previews.length > 1 ? 's' : ''}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default GalleryUpload;
