import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get('status') || 'ALL';

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      let url = '/api/items';
      
      if (status !== 'ALL') {
        url = `/api/items/status/${status}`;
      }
      
      const response = await axios.get(url);
      setItems(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError('Failed to load items. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newStatus) => {
    setSearchParams({ status: newStatus });
  };

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1>Browse Items</h1>

      <div className="filter-section">
        <h3>Filter by Status</h3>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${status === 'ALL' ? 'active' : ''}`}
            onClick={() => handleFilter('ALL')}
          >
            All Items
          </button>
          <button 
            className={`filter-btn ${status === 'LOST' ? 'active' : ''}`}
            onClick={() => handleFilter('LOST')}
          >
            🔴 Lost Items
          </button>
          <button 
            className={`filter-btn ${status === 'FOUND' ? 'active' : ''}`}
            onClick={() => handleFilter('FOUND')}
          >
            🟢 Found Items
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading items...</p>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="no-items">
          <p>No items found. Try adjusting your filters or be the first to post an item!</p>
          <Link to="/post-item" className="btn-primary" style={{ marginTop: '20px' }}>
            Post an Item
          </Link>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Found {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
          {items.map((item) => (
            <div 
              key={item.id} 
              className="item-card"
              onClick={() => navigate(`/items/${item.id}`)}
            >
              <div style={{ display: 'flex', gap: '15px' }}>
                {item.imageRef && (
                  <div style={{ flexShrink: 0 }}>
                    <img 
                      src={`/uploads/${item.imageRef}`}
                      alt={item.title}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid #ddd'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0' }}>{item.title}</h3>
                      <span className={`item-status ${item.status === 'LOST' ? 'status-lost' : 'status-found'}`}>
                        {item.status === 'LOST' ? '🔴 LOST' : '🟢 FOUND'}
                      </span>
                      {item.isClaimed && (
                        <span style={{ 
                          display: 'inline-block',
                          marginLeft: '10px',
                          padding: '3px 8px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          ✓ Claimed
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ margin: '10px 0', color: '#666' }}>
                    {item.description?.substring(0, 100)}...
                  </p>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666', marginTop: '15px' }}>
                    <span>📍 {item.location}</span>
                    <span>👤 {item.createdBy}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
