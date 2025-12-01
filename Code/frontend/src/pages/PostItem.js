import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostItem({ user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'LOST',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: '',
    imageRef: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData(prev => ({ ...prev, imageRef: '' }));
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/items/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.fileName;
    } catch (err) {
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Upload image first if one is selected
      let imageFileName = formData.imageRef;
      if (selectedFile) {
        imageFileName = await uploadImage();
      }

      const response = await axios.post('/api/items', {
        ...formData,
        imageRef: imageFileName
      });

      navigate(`/items/${response.data.id}`);
    } catch (err) {
      setError(err.message || 'Failed to post item. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '30px' }}>
      <div className="card">
        <h1>📝 Post a New Item</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Help your campus community by posting lost or found items
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Lost Samsung Galaxy Phone"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the item in detail. Include color, brand, distinctive features, etc."
              required
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="LOST">🔴 Lost - I'm looking for this item</option>
              <option value="FOUND">🟢 Found - I found this item</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Near the Library, Student Center"
              required
            />
          </div>

          <div className="form-group">
            <label>Date (when lost/found) *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Information *</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="e.g., your-email@example.com or phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Item Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            {previewUrl && (
              <div style={{ marginTop: '10px', position: 'relative' }}>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px', 
                    borderRadius: '8px',
                    border: '2px solid #ddd'
                  }} 
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(220, 53, 69, 0.9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    lineHeight: '1'
                  }}
                >
                  ×
                </button>
              </div>
            )}
            <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
              Max file size: 5MB. Supported formats: JPG, PNG, GIF
            </small>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading || uploading}
              style={{ flex: 1 }}
            >
              {uploading ? 'Uploading...' : loading ? 'Posting...' : 'Post Item'}
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/items')}
              disabled={loading || uploading}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px', marginTop: '20px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Posted as: <strong>{user.username}</strong> ({user.role})
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
