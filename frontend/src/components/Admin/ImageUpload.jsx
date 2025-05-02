import React, { useState } from 'react';
import { BASE_URL } from '../../utils/config';

const ImageUpload = ({ onImageUploaded, entityId }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) return;
    
    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', image);

    try {
      // Using the existing upload endpoint
      const res = await fetch(`${BASE_URL}/upload/${entityId || 'temp'}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const data = await res.json();
      
      // Pass the image URL back to the parent component
      onImageUploaded(data.url);
      
      // Clear the preview and file after successful upload
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    setImage(null);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-4">
        <input 
          type="file" 
          onChange={handleImageChange} 
          accept="image/*"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        
        {previewUrl && !uploading && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleUpload}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              disabled={uploading}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={cancelUpload}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      
      {uploading && (
        <div className="mt-2 text-blue-600">
          Uploading... Please wait.
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-red-600">
          Error: {error}
        </div>
      )}
      
      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-32 h-32 object-cover border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 