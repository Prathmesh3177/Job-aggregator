import React from 'react';
import './Home.css';
import heroImage from '../images/hero-image.jpg'; // Adjust if your hero image has a different name
import feature1 from '../images/feature1.png';
import feature2 from '../images/feature2.png';
import feature3 from '../images/feature3.png';
function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Launch Your Career with <span className="highlight">Startify</span>
          </h1>
          <p className="hero-subtitle">
            Discover the best entry-level and fresher jobs from top companies worldwide. 
            Our smart filters and simple interface help you find the perfect match.
          </p>
          <div className="hero-cta">
            <a href="/jobs" className="cta-button primary">
              Browse Jobs
            </a>
            <a href="#features" className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Young professionals working together" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose Startify?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src={feature1} alt="Comprehensive Search" />
            </div>
            <h3>Comprehensive Search</h3>
            <p>Aggregated listings from multiple job platforms to save you time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img src={feature2} alt="Smart Filters" />
            </div>
            <h3>Smart Filters</h3>
            <p>Find exactly what you need with our advanced filtering system.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img src={feature3} alt="Career Resources" />
            </div>
            <h3>Career Resources</h3>
            <p>Access resume tips, interview prep, and career guidance.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2 className="section-title">Success Stories</h2>
        <div className="testimonial-card">
          <blockquote>
            "Startify helped me land my first job right out of college. The platform made it so easy to find relevant opportunities!"
          </blockquote>
          <div className="testimonial-author">
            <div className="author-info">
              <strong>Sarah Johnson</strong>
              <span>Software Developer at TechCorp</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;