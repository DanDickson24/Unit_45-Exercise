import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Job from "./Job";
import JoblyApi from "./JoblyApi";

function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const { handle } = useParams(); 

  useEffect(() => {
    async function getJobs() {
      try {
        let fetchedJobs = await JoblyApi.getJobsByCompany(handle);
        setJobs(Array.isArray(fetchedJobs) ? fetchedJobs : []);
      } catch (err) {
        console.error("Error fetching jobs for company:", err);
        setJobs([]);
      }
    }
    getJobs();
  }, [handle]);

  return (
    <div>
      {jobs.map(job => (
        <Job key={job.id} jobProp={job} /> 
      ))}
    </div>
  );
}

export default CompanyJobs;
