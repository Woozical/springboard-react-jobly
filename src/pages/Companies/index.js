import Placeholder from "../../components/placeholder";
import CompanyCard from "../../components/CompanyCard";

const TEST_LOGO = "https://www.springboard.com/assets/images/springboard-logo-dark@2x.png";

const CompaniesPage = () => {
  return (
  <div>
    <Placeholder text="Companies" />
    <CompanyCard name="Smith LLC" description="Lorem Ipsum Dolor Est" logo={TEST_LOGO} />
  </div>
  );
}

export default CompaniesPage;