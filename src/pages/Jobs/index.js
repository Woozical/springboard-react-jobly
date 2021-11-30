import JobList from "../../components/JobList";
import NameSearchBar from "../../components/NameSearchBar";
import JoblyAPI from "../../api";
import { useEffect, useState } from "react";


const JobsPage = () => {

  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});

  /** Load in Job data from API on initial render of this page. Fetch new data whenever our filters change. */
  useEffect( () => {
    async function loadJobs(){
      const j = await JoblyAPI.getJobs(filters) || [];
      setJobs(j);
    }
    loadJobs();
  }, [filters])

  const updateTitleFilter =({ name }) => {
    setFilters(f => ({...f, title: name}))
  }

  return (
  <main>
    <h1>Jobs</h1>
    <NameSearchBar submitCallback={updateTitleFilter}/>
    <JobList jobs={jobs} />
  </main>
  );
}

export default JobsPage;