import JobList from "../../components/JobList";
import NameSearchBar from "../../components/NameSearchBar";
import JoblyAPI from "../../api";
import { useEffect, useState } from "react";
import { useAuthenticated } from "../../hooks";


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

  const [auth, redirect] = useAuthenticated("/login");
  if (!auth) return redirect;

  return (
    <main className="pt-5 text-center">
      <div className="container col-md-6 offset-md-3 col-lg-8 offset-lg-2">
        <h1>Jobs</h1>
        <hr />
        <div className="text-start">
          <NameSearchBar submitCallback={updateTitleFilter}/>
          <JobList jobs={jobs} />
        </div>
      </div>
  </main>
  );
}

export default JobsPage;