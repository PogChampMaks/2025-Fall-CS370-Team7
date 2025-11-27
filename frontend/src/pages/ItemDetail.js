import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/items/${id}`);
      setItem(response.data);
    } catch (err) {
      setError('Item not found or failed to load.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ marginTop: '30px' }}>
        <p>Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="alert alert-danger">{error}</div>
        <button onClick={() => navigate('/items')} className="btn-secondary">
          Back to Items
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container" style={{ marginTop: '30px' }}>
        <p>Item not found.</p>
      </div>
    );
  }

  return (
    <div className="container detail-container" style={{ marginTop: '30px' }}>
      <div className="detail-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <div>
            <h1>{item.title}</h1>
            <span className={`item-status ${item.status === 'LOST' ? 'status-lost' : 'status-found'}`}>
              {item.status === 'LOST' ? '🔴 LOST' : '🟢 FOUND'}
            </span>
          </div>
          <button onClick={() => navigate('/items')} className="btn-secondary">
            Back
          </button>
        </div>

        {item.imageRef && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img 
              src={`/uploads/${item.imageRef}`}
              alt={item.title}
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                borderRadius: '12px',
                border: '3px solid #ddd',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          {item.description}
        </p>

        <div className="detail-meta">
          <div className="detail-meta-item">
            <span className="detail-meta-label">📍 Location:</span>
            <span> {item.location}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">📅 Date:</span>
            <span> {new Date(item.date).toLocaleDateString()}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">👤 Posted by:</span>
            <span> {item.createdBy}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">📧 Contact:</span>
            <span> {item.contactInfo}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">⏰ Posted:</span>
            <span> {new Date(item.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#e7f3ff', borderRadius: '4px' }}>
          <p>
            <strong>Contact {item.createdBy}:</strong>
            <br />
            📧 {item.contactInfo}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
