import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobList.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/jobs/fetch');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/jobs/refresh');
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading jobs...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="job-list-container">
      <div className="header">
        <h1>Entry Level Job Listings</h1>
        <button onClick={handleRefresh} className="refresh-button">
          Refresh Jobs
        </button>
      </div>
      
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <div className="job-meta">
              <span className="company">{job.company}</span>
              <span className="location">{job.location}</span>
            </div>
            <p className="description">
              {job.description.length > 200 
                ? `${job.description.substring(0, 200)}...` 
                : job.description}
            </p>
            <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="apply-button"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;