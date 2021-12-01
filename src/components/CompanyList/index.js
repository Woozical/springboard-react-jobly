import CompanyCard from "../CompanyCard";

// DEBUG: LOGO
const CompanyList = ({companies}) => {
  return (
    <div>
      {companies.length ?
      companies.map((c, i) => <CompanyCard {...c} key={c.handle} logo={`http://joelburton-jobly.surge.sh/logos/logo${1 + i % 4}.png`} />)
      : <p>No companies found.</p>}
    </div>
  )
}

export default CompanyList