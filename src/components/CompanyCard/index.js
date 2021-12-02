import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./style.css";

const CompanyCard = ({handle, name, description, logoUrl}) => {
  return (
    <Card className="CompanyCard pt-2 pb-2 mb-1">
        <CardBody>
          <CardTitle tag="h6" className="row">
            <Link className="col-sm-10 stretched-link" to={`/companies/${handle}`}>{name}</Link>
            {logoUrl && <img alt={name} src={logoUrl} className="col-sm-2 float-right" />}
          </CardTitle>
          <CardText className="row">
            <small className="col-sm-10">
            {description}
            </small>
          </CardText>
        </CardBody>
    </Card>
  )
}

export default CompanyCard;