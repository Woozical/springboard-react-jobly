import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { addCommas } from "../../utils";


const JobCard = ({id, title, salary, equity, companyHandle, companyName, applied, apply}) => {
  const salaryFormatted = addCommas(salary);

  const handleClick = () => {
    apply(id);
  }

  return (
    <Card className="JobCard">
      <CardBody>
        <CardTitle tag="h6">{title}</CardTitle>
        <CardSubtitle><NavLink to={`/companies/${companyHandle}`}>{companyName}</NavLink></CardSubtitle>
        <CardText>
          Salary: {salary ? `$${salaryFormatted}` : "N/A"}
          <br />
          Equity: {+equity ? equity : 'None'}
        </CardText>
        {applied ? <button disabled>Applied</button> : <button onClick={handleClick}>Apply</button>}
      </CardBody>
    </Card>
  )
}

export default JobCard;