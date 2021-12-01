const CompanyHeader = ({name, numEmployees, description, jobs, logo}) => {
  // DEBUG: LOGO
  logo = "http://joelburton-jobly.surge.sh/logos/logo2.png";
  return (
    <div className="CompanyHeader text-start">
      <div className="row">
        <h1 className="col-10">
          {name}
        </h1>
        {logo && <img className="col-2" src={logo} alt={name} />}
      </div>
      <div className="text-start">
        <h6 className="text-secondary">
          {numEmployees} Employees, {jobs.length} Open Positions 
        </h6>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default CompanyHeader;