import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import { addCommas } from "../../utils";
import "./style.css";


const JobCard = ({id, title, salary, equity, companyHandle, companyName, applied, apply, placeholder}) => {
  const salaryFormatted = addCommas(salary);

  const handleClick = () => {
    apply(id);
  }

  if (placeholder){
    return <Card className="JobCard JobCard-placeholder"></Card>
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
        {applied ?
          <Button outline color="primary" disabled>Applied</Button>
          :
          <Button color="primary" onClick={handleClick}>Apply</Button>}
      </CardBody>
    </Card>
  )
}

export default JobCard;