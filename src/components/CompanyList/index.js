import CompanyCard from "../CompanyCard";
import "./style.css";

const CompanyList = ({companies}) => {
  return (
    <div className="CompanyList">
      {companies.length ?
      companies.map( c => <CompanyCard {...c} key={c.handle} />)
      : <p className="text-center">No companies found.</p>}
    </div>
  )
}

export default CompanyList