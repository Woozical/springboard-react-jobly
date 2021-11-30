import CompanyList from "../../components/CompanyList";
import JoblyAPI from "../../api";
import { useEffect, useState } from "react";

// const TEST_LOGO = "https://www.springboard.com/assets/images/springboard-logo-dark@2x.png";
// const companies = [
//   {handle: "springboard", name:"Springboard", description:"Lorem ipsum dolor est", logo : TEST_LOGO},
//   {handle: "linkedin", name:"LinkedIn", description:"Lorem ipsum dolor est", logo : TEST_LOGO},
//   {handle: "microsoft", name:"Microsoft", description:"Lorem ipsum dolor est", logo : TEST_LOGO},
//   {handle: "smith-llc", name:"Smith LLC", description:"Lorem ipsum dolor est", logo : TEST_LOGO},
//   {handle: "pepperridge-farms", name:"Pepperridge Farms", description:"Lorem ipsum dolor est", logo : TEST_LOGO},
// ];

const CompaniesPage = () => {

  const [companies, setCompanies] = useState([]);

  /** Load in Company data from API on initial render of this page */
  useEffect( () => {
    async function loadCompanies(){
      const companies = await JoblyAPI.getCompanies() || [];
      setCompanies(companies);
    }
    loadCompanies();
  }, [])



  return (
  <main>
    <h1>Companies</h1>
    <CompanyList companies={companies} />
  </main>
  );
}

export default CompaniesPage;