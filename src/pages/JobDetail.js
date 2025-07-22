// JobDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './JobDetail.css';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/fetch`)
      .then(res => res.json())
      .then(data => {
        const selectedJob = data.find(job => job.id === id);
        setJob(selectedJob);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  if (!job) return <div className="not-found">Job not found</div>;

  return (
    <div className="job-detail-container">
      <div className="job-header">
        <h1 className="job-title">{job.title}</h1>
        <p className="job-company"><strong>Company:</strong> {job.company}</p>
        <p className="job-location"><strong>Location:</strong> {job.location}</p>
        <a href={job.url} target="_blank" rel="noreferrer" className="original-listing">
          View Original Listing
        </a>
      </div>
      
      <div className="job-content">
        <div className="job-description" dangerouslySetInnerHTML={{ __html: job.description }}></div>
      </div>
      
      <Link to="/jobs" className="back-link">← Back to Jobs</Link>
    </div>
  );
};

export default JobDetail;