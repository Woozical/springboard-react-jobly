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
      const c = await JoblyAPI.getCompany(handle);
      setCompany(c);
    }
    loadCompany();
  }, [handle]);

  const [auth, redirect] = useAuthenticated("/login");
  if (!auth) return redirect;
  if (!company) return <NotFound404 />

  return(
    <main>
      <CompanyHeader {...company} />
      <JobList jobs={company.jobs} />
    </main>
  )
}

export default CompanyDetailPage;