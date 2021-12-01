import JobCard from "../JobCard";
import { CardGroup } from "reactstrap";
import UserContext from "../../UserContext";
import { useContext } from "react";

const JobList = ({jobs, columns=3}) => {
  const { currentUser, apply } = useContext(UserContext);
  const appliedTo = new Set(currentUser.applications.map(a => a.id));

  /** Split our list of jobs into sub-arrays of 3 */
  const jobGroups = [];
  let count = 0;
  for (let i = 0; i < jobs.length; i++){
    if (i % columns === 0) jobGroups.push([]);
    
    jobGroups[count].push(jobs[i]);
    
    if (i % columns === columns-1) count++;
  }
  /** Fill out job groups with data for empty, placeholder job cards */
  const last = jobGroups.length-1;
  if (Array.isArray(jobGroups[last]) && jobGroups[last].length < columns){
    const remaining = columns - jobGroups[last].length;
    for (let i = 0; i < remaining; i++){
      jobGroups[last].push({id: `ph${last}${i}`, placeholder: true})
    }
  }

  return (
    <div>
      {jobs.length ?
      jobGroups.map( (group, idx) => {
        return (
        <CardGroup key={idx}>
          {group.map(j => <JobCard {...j} apply={apply} applied={appliedTo.has(j.id)} key={j.id} />)}
        </CardGroup>) })
      : <p>No jobs found.</p>}
    </div>
  )
}

export default JobList