import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageContent.trim()) return;

    setSending(true);
    try {
      await axios.post('/api/messages', {
        receiverUsername: item.createdBy,
        itemId: item.id,
        content: messageContent
      });

      setMessageContent('');
      setShowMessageBox(false);
      alert('Message sent successfully!');
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const markAsClaimed = async () => {
    try {
      await axios.put(`/api/items/${id}/claim`);
      fetchItem();
      alert('Item marked as claimed/returned!');
    } catch (err) {
      alert('Failed to mark as claimed');
    }
  };

  const markAsUnclaimed = async () => {
    try {
      await axios.put(`/api/items/${id}/unclaim`);
      fetchItem();
      alert('Item marked as available again');
    } catch (err) {
      alert('Failed to unmark as claimed');
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
            {item.isClaimed && (
              <span style={{ 
                display: 'inline-block',
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#28a745',
                color: 'white',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                ✓ Claimed/Returned
              </span>
            )}
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
          {item.isClaimed && item.claimedAt && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">✓ Claimed:</span>
              <span> {new Date(item.claimedAt).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {user && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {user.username !== item.createdBy && !item.isClaimed && (
              <button 
                className="btn-primary"
                onClick={() => setShowMessageBox(!showMessageBox)}
              >
                💬 Contact Owner
              </button>
            )}
            
            {user.username === item.createdBy && (
              <>
                {!item.isClaimed ? (
                  <button 
                    className="btn-primary"
                    onClick={markAsClaimed}
                    style={{ backgroundColor: '#28a745' }}
                  >
                    ✓ Mark as Claimed/Returned
                  </button>
                ) : (
                  <button 
                    className="btn-secondary"
                    onClick={markAsUnclaimed}
                  >
                    Reopen Item
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Message box */}
        {showMessageBox && user && user.username !== item.createdBy && (
          <div style={{ marginTop: '20px', padding: '20px', border: '2px solid #007bff', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
            <h3>Send a Message to {item.createdBy}</h3>
            <form onSubmit={sendMessage}>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Write your message here..."
                rows="4"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px' }}
                required
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-primary" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowMessageBox(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

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
