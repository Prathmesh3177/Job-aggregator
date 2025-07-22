// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Startify</Link>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/jobs" className={`nav-link ${pathname === '/jobs' ? 'active' : ''}`}>Jobs</Link>
      </div>
    </nav>
  );
};

export default Navbar;