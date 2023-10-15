import React, { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import { useUser } from './UserContext'; 
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

function Job({ jobProp }) {
  const { jobId: jobIdFromUrl } = useParams(); 
  const jobId = jobProp ? jobProp.id : jobIdFromUrl;
  const [job, setJob] = useState(jobProp || null);

  const { appliedJobs, applyToJob, user } = useUser(); 
  
  useEffect(() => {
    const getJobData = async () => {
      try {
        const jobData = await JoblyApi.getJobById(jobId);
        console.log("Fetched job data:", jobData); 
        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job data:", err);
      }
    };
    if (!jobProp) {
      getJobData();
    }
  }, [jobId, jobProp]);

  const isApplied = appliedJobs.has(jobId);

  const handleApply = async () => {
    try {
      await applyToJob(jobId);
      console.log("Applied to job with ID:", jobId);
    } catch (err) {
      console.error("Error applying for job:", err);
    }
  };
  if (!job) return <p>Loading...</p>;

  return (
    <div className="col-md-4 mb-4">
      <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card>
          <CardBody>
            <CardTitle>{job.title}</CardTitle>
            <CardText>{job.companyName}</CardText>
            <CardText>
              Salary: ${job.salary ? job.salary : 'Not Available'}
            </CardText>
            {job.equity != null && <CardText>Equity: {job.equity}</CardText>}
            {isApplied ? (
              <Button disabled>Applied</Button>
            ) : (
              <Button color="primary" onClick={handleApply}>
                Apply For Job
              </Button>
            )}
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}

export default Job;
