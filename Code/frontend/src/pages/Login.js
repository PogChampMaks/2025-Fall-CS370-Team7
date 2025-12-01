import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });

      // Create auth token with Basic prefix
      const authToken = 'Basic ' + btoa(`${username}:${password}`);
      
      onLogin(response.data, authToken);
      navigate('/post-item');
    } catch (err) {
      setError('Invalid username or password. Try admin/adminpass or user/userpass');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>🔐 Login</h1>
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', marginBottom: '20px' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ background: '#e7f3ff', padding: '15px', borderRadius: '4px', marginTop: '20px' }}>
        <p><strong>Test Credentials:</strong></p>
        <p>
          <strong>Admin:</strong><br />
          Username: <code>admin</code><br />
          Password: <code>adminpass</code>
        </p>
        <p>
          <strong>User:</strong><br />
          Username: <code>user</code><br />
          Password: <code>userpass</code>
        </p>
      </div>
    </div>
  );
}

export default Login;
