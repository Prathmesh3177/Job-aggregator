import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';// Placeholder - use your actual logo

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Startify Logo" className="logo" />
        <span>Startify</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/jobs" className={`nav-link ${pathname === '/jobs' ? 'active' : ''}`}>Jobs</Link>
        <Link to="/resources" className={`nav-link ${pathname === '/resources' ? 'active' : ''}`}>Resources</Link>
        <Link to="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
      </div>
      <div className="navbar-actions">
        <Link to="/login" className="login-button">Log In</Link>
        <Link to="/signup" className="signup-button">Sign Up</Link>
      </div>
      <button className="mobile-menu-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;