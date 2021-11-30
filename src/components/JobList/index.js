import JobCard from "../JobCard";

const JobList = ({jobs}) => {
  return (
    <div>
      {jobs.length ?
      jobs.map(j => <JobCard {...j} key={j.id} />)
      : <p>No jobs found.</p>}
    </div>
  )
}

export default JobList