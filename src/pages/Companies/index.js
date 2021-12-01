import CompanyList from "../../components/CompanyList";
import NameSearchBar from "../../components/NameSearchBar";
import JoblyAPI from "../../api";
import { useEffect, useState } from "react";
import { useAuthenticated } from "../../hooks";


const CompaniesPage = () => {

  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({});

  /** Load in Company data from API on initial render of this page. Fetch new data whenever our filters change. */
  useEffect( () => {
    async function loadCompanies(){
      const companies = await JoblyAPI.getCompanies(filters) || [];
      setCompanies(companies);
    }
    loadCompanies();
  }, [filters])

  const updateNameFilter =({ name }) => {
    setFilters(f => ({...f, name}))
  }

  const [auth, redirect] = useAuthenticated("/login");
  if (!auth) return redirect;

  return (
  <main>
    <h1>Companies</h1>
    <NameSearchBar submitCallback={updateNameFilter}/>
    <CompanyList companies={companies} />
  </main>
  );
}

export default CompaniesPage;