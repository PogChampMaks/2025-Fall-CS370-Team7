import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🔍 Lost & Found
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/items" className="nav-link">
              Browse Items
            </Link>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <Link to="/post-item" className="nav-link nav-link-primary">
                  Post Item
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/messages" className="nav-link">
                  💬 Messages
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">👤 {user.username}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-logout">
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <li className="nav-item">
              <Link to="/login" className="nav-link nav-link-primary">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
