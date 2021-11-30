import CompanyCard from "../CompanyCard";

const CompanyList = ({companies}) => {
  return (
    <div>
      {companies.length ?
      companies.map(c => <CompanyCard {...c} key={c.handle} />)
      : <p>No companies found.</p>}
    </div>
  )
}

export default CompanyList