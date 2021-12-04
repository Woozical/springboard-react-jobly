import JobList from "../../components/JobList";
import NameSearchBar from "../../components/NameSearchBar";
import NumberDrop from "../../components/NumberDrop";
import BooleanCheck from "../../components/BooleanCheck";
import LoadingSpinner from "../../components/LoadingSpinner";
import JoblyAPI from "../../api";
import { useEffect, useState } from "react";
import { useAuthenticated } from "../../hooks";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  /** Load in Job data from API on initial render of this page. Fetch new data whenever our filters change. */
  useEffect( () => {
    async function loadJobs(){
      const j = await JoblyAPI.getJobs(filters) || [];
      setJobs(j);
      setIsLoading(false);
    }
    loadJobs();
  }, [filters])

  const updateFilters = (formData) => {
    const incFilters = {...filters, ...formData};
    // Using queries on the API is a bit more intensive than getting all, so these code blocks will delete filters 
    // when the fields are returned to their placeholder / "no value" state.
    if ("minSalary" in formData && formData.minSalary === 0){
      delete incFilters["minSalary"];
    }
    if ("hasEquity" in formData && formData.hasEquity === false){
      delete incFilters["hasEquity"];
    }
    if ("title" in formData && formData.title === ""){
      delete incFilters["title"];
    }
    setFilters(incFilters);
  }

  const [auth, redirect] = useAuthenticated("/login");
  if (!auth) return redirect;

  return (
    <main className="pt-5 pb-2 text-center">
      <div className="container col-md-8 offset-md-2">
        <h1>Jobs</h1>
        <hr />
        { isLoading ? <LoadingSpinner /> :
        <div className="text-start">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <NameSearchBar submitCallback={updateFilters} fieldName="title" placeholder="Filter by job title" />
            </div>
            <div className="col-lg-4 col-sm-9">
              <NumberDrop
                fieldName="minSalary"
                changeCallback={updateFilters}
                options={[["$25,000+", 25000],
                          ["$30,000+", 30000],
                          ["$45,000+", 45000],
                          ["$60,000+", 60000],
                          ["$80,000+", 80000],
                          ["$100,000+", 100000],
                          ["$150,000+", 150000],
                          ["$200,000+", 200000],
                          ["$300,000+", 300000]]}
                placeholder="Filter by Minimum Salary"
                maxValue={300000} />
            </div>
            <div className="col-lg-2 col-sm-3">
              <BooleanCheck fieldName="hasEquity" label="Require Equity" changeCallback={updateFilters} />
            </div>
          </div>
          <hr />
          <JobList jobs={jobs} />
        </div>
        }
      </div>
  </main>
  );
}

export default JobsPage;