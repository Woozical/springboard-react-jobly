import JobCard from "../JobCard";
import UserContext from "../../UserContext";
import { useContext } from "react";

const JobList = ({jobs}) => {
  const { currentUser, apply } = useContext(UserContext);
  const appliedTo = new Set(currentUser.applications.map(a => a.id));
  return (
    <div>
      {jobs.length ?
      jobs.map(j => {
        return <JobCard {...j} apply={apply} applied={appliedTo.has(j.id)} key={j.id} />
      })
      : <p>No jobs found.</p>}
    </div>
  )
}

export default JobList