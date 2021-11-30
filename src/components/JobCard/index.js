import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { addCommas } from "../../utils";

const JobCard = ({id, title, salary, equity, companyHandle, companyName}) => {
  const salaryFormatted = addCommas(salary);
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
      </CardBody>
    </Card>
  )
}

export default JobCard;