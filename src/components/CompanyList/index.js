import CompanyCard from "../CompanyCard";

const CompanyList = ({companies}) => {
  return (
    <div>
      {companies.map(c => {
        return (
          <CompanyCard
            key={c.handle} handle={c.handle}
            name={c.name} logo={c.logo}
            description={c.description}
          />)
      })}
    </div>
  )
}

export default CompanyList