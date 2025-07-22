// Jobs.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const jobsPerPage = 10;

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/fetch`);
        const data = await response.json();
        setJobs(data);
        setFiltered(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs based on search criteria
  useEffect(() => {
    let temp = jobs;

    if (search.trim()) {
      temp = temp.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location.trim()) {
      temp = temp.filter(j =>
        j.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (company.trim()) {
      temp = temp.filter(j =>
        j.company.toLowerCase().includes(company.toLowerCase())
      );
    }

    setFiltered(temp);
    setPage(1); // Reset to first page when filters change
    setHasMore(temp.length > jobsPerPage);
  }, [search, location, company, jobs]);

  // Update displayed jobs when filtered jobs or page changes
  useEffect(() => {
    if (filtered.length > 0) {
      const endIndex = page * jobsPerPage;
      const jobsToDisplay = filtered.slice(0, endIndex);
      setDisplayedJobs(jobsToDisplay);
      setHasMore(endIndex < filtered.length);
    } else {
      setDisplayedJobs([]);
    }
  }, [filtered, page]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMore
    ) {
      return;
    }
    setPage(prevPage => prevPage + 1);
  }, [hasMore]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="jobs-container">
      <h2 className="jobs-title">Job Listings</h2>

      {/* Filters */}
      <div className="jobs-filters">
        <input
          type="text"
          placeholder="Search by title"
          className="filter-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location"
          className="filter-input"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by company"
          className="filter-input"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
      </div>

      {/* Job List */}
      {loading ? (
        <div className="loading-spinner">Loading jobs...</div>
      ) : displayedJobs.length === 0 ? (
        <div className="no-jobs">No jobs found matching your criteria.</div>
      ) : (
        <>
          <div className="jobs-list">
            {displayedJobs.map(job => (
              <Link to={`/jobs/${job.id}`} key={job.id} className="job-item">
                <h3 className="job-item-title">{job.title}</h3>
                <p className="job-item-meta">{job.company} • {job.location}</p>
              </Link>
            ))}
          </div>
          {hasMore && (
            <div className="load-more">
              <button 
                onClick={() => setPage(prevPage => prevPage + 1)}
                className="load-more-button"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;