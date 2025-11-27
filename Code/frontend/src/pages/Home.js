import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🔍 Lost & Found</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          Help your campus community find lost items and reunite people with their belongings
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <Link to="/items?status=LOST" className="btn-primary">
            🔴 View Lost Items
          </Link>
          <Link to="/items?status=FOUND" className="btn-primary">
            🟢 View Found Items
          </Link>
          <Link to="/login" className="btn-primary">
            📝 Post an Item
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>🎯 Lost Something?</h3>
            <p>Browse through found items posted by other users. You might just find what you're looking for!</p>
          </div>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>📷 Found Something?</h3>
            <p>Post what you found with photos and description. Help someone in your community get their item back!</p>
          </div>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>💬 Get in Touch</h3>
            <p>Contact item posters directly via the contact information they provide for items they've posted.</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', background: '#e7f3ff', borderRadius: '8px', textAlign: 'left' }}>
          <h3>How it works:</h3>
          <ol>
            <li><strong>Login</strong> with your campus account (or create one)</li>
            <li><strong>Post</strong> an item you found with description, location, and photo</li>
            <li><strong>Browse</strong> all items or filter by LOST/FOUND</li>
            <li><strong>Contact</strong> the item poster if you find what you're looking for</li>
            <li><strong>Return</strong> items safely to their rightful owners!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Home;
