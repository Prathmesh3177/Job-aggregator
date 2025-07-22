import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/fetch`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFiltered(data);
      });
  }, []);

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
  }, [search, location, company, jobs]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          className="border rounded p-2 w-60"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location"
          className="border rounded p-2 w-60"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by company"
          className="border rounded p-2 w-60"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
      </div>

      {/* Job Cards */}
      {filtered.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        filtered.map(job => (
          <Link to={`/jobs/${job.id}`} key={job.id} className="block border rounded p-4 mb-4 hover:bg-gray-100">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default Jobs;
