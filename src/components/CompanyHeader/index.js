const CompanyHeader = ({name, numEmployees, description, jobs, logo}) => {
  return (
    <div>
      <h1>{name}</h1>
      <h6>
        {numEmployees} Employees  
        {jobs.length} Open Positions 
        {logo && <img src={logo} alt={name} width="50px" />}</h6>
      <p>{description}</p>
    </div>
  )
}

export default CompanyHeader;