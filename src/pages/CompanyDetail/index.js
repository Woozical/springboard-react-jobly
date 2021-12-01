import { useAuthenticated } from "../../hooks";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import JobList from "../../components/JobList";
import CompanyHeader from "../../components/CompanyHeader";
import NotFound404 from "../../components/NotFound404";
import JoblyAPI from "../../api";

const CompanyDetailPage = () => {
  const [company, setCompany] = useState({name: "", numEmployees: 0, description: "", jobs: []});
  const { handle } = useParams();

  /** Load in company data on initial page render */
  useEffect( () => {
    async function loadCompany(){
      const c = await JoblyAPI.getCompany(handle) || null;
      setCompany(c);
    }
    loadCompany();
  }, [handle]);

  const [auth, redirect] = useAuthenticated("/login");
  if (!auth) return redirect;
  if (!company) return <NotFound404 />

  return(
    <main className="pt-5 pb-2 text-center">
      <div className="container col-md-8 offset-md-2">
        <CompanyHeader {...company} />
        <hr />
        <div className="text-start">
          <h5>Job Listings</h5>
          <JobList columns={4} jobs={company.jobs} />
        </div>
      </div>
    </main>
  )
}

export default CompanyDetailPage;