import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

const CompanyCard = ({handle, name, description, logo}) => {
  return (
    <Card className="CompanyCard">
      <NavLink to={`/companies/${handle}`}>
        <CardBody>
          <CardTitle tag="h6">
            {name}
            {logo && <img alt={name} src={logo} className="float-right ml-5" />}
          </CardTitle>
          <CardText>
            {description}
          </CardText>
        </CardBody>
      </NavLink>
    </Card>
  )
}

export default CompanyCard;