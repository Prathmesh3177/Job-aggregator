// Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2 className="home-title">Welcome to Startify</h2>
        <p className="home-subtitle">
          Find entry-level and fresher jobs from top job APIs all in one place. 
          Use our smart filters and simple interface to kick-start your career!
        </p>
        <div className="home-cta">
          <a href="/jobs" className="cta-button">
            Browse Jobs
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;