import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./style.css";

const CompanyCard = ({handle, name, description, logo}) => {
  return (
    <Card className="CompanyCard">
      <CardBody>
        <CardTitle tag="h6">
          {name}
          {logo && <img alt={name} src={logo} className="float-right ml-5" />}
        </CardTitle>
        <CardText>
          {description}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default CompanyCard;