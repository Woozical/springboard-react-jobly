// import Placeholder from "../../components/placeholder";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import JobList from "../../components/JobList";
import JoblyAPI from "../../api";

const CompanyDetailPage = () => {
  const [company, setCompany] = useState({name: "", numEmployees: 0, description: "", jobs: []});
  const { handle } = useParams();

  /** Load in company data on initial page render */
  useEffect( () => {
    async function loadCompany(){
      const c = await JoblyAPI.getCompany(handle);
      // if !c, return 404 component
      setCompany(c);
    }
    loadCompany();
  }, [handle])

  // To Do: Make Company Info header component
  return(
    <main>
      <h1>{company.name}</h1>
      <h6>Employees: {company.numEmployees}</h6>
      <p>{company.description}</p>
      <JobList jobs={company.jobs} />
    </main>
  )
}

export default CompanyDetailPage;