// JobCard.js
import React from 'react';
import './JobCard.css';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-meta">{job.company} - {job.location}</p>
      <p className="job-description">{job.description}</p>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="job-link"
      >
        View & Apply
      </a>
    </div>
  );
}

export default JobCard;