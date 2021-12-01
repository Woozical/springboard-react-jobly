import CompanyList from "../../components/CompanyList";
import NameSearchBar from "../../components/NameSearchBar";
import NumberDrop from "../../components/NumberDrop";
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

  const updateFilters = (formData) => {
    const incFilters = {...filters, ...formData};
    // Using queries on the API is a bit more intensive than getting all, so these code blocks will delete filters 
    // when the fields are returned to their placeholder / "no value" state.
    if ("maxEmployees" in formData && formData.maxEmployees === -1){
      delete incFilters["maxEmployees"];
    }
    if ("minEmployees" in formData && formData.minEmployees === -1){
      delete incFilters["minEmployees"];
    }
    if ("name" in formData && formData.name === ""){
      delete incFilters["name"];
    }
    setFilters(incFilters);
  }

  const [auth, redirect] = useAuthenticated("/login");
  if (!auth) return redirect;

  return (
  <main className="pt-5 pb-2 text-center">
    <div className="container col-md-8 offset-md-2">
      <h1>Companies</h1>
      <hr />
      <div className="text-start">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <NameSearchBar submitCallback={updateFilters}/>
          </div>
          <div className="col-md-3 col-sm-6">
            <NumberDrop
              fieldName="minEmployees"
              changeCallback={updateFilters}
              options={[["5", 5],
                        ["10", 10],
                        ["20", 20],
                        ["50", 50],
                        ["100", 100],
                        ["200", 200],
                        ["500", 500],
                        ["1000", 1000],
                        ["10000", 10000]]}
              placeholder="Filter by Min. Employees"
              placeholderVal={-1}
              maxValue={filters.maxEmployees ? filters.maxEmployees : 10000} />
          </div>
          <div className="col-md-3 col-sm-6">
            <NumberDrop
              fieldName="maxEmployees"
              changeCallback={updateFilters}
              options={[["10", 10],
                        ["20", 20],
                        ["50", 50],
                        ["100", 100],
                        ["200", 200],
                        ["500", 500],
                        ["1000", 1000],
                        ["10000", 10000],
                        ["20000", 20000]]}
              placeholder="Filter by Max. Employees"
              minValue={filters.minEmployees ? filters.minEmployees : 0}
              placeholderVal={-1}
              maxValue={20000} />
          </div>
        </div>
        <hr />
        <CompanyList companies={companies} />
      </div>
    </div>
  </main>
  );
}

export default CompaniesPage;