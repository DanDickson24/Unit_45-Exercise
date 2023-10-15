import React, { useState, useEffect } from "react";
import Job from "./Job";
import JoblyApi from "./JoblyApi";

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      try {
        let jobs = await JoblyApi.getJobs();
        console.log("Fetched jobs:", jobs); 
        setJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    getJobs();
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <Job key={job.id} jobProp={job} />
      ))}
    </div>
  );
}

export default JobsList;
