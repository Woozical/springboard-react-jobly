import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const CompanyCard = ({handle, name, description, logo}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h6">
          {name}
          {logo && <img alt={name} style={{width: "100px"}} src={logo} className="float-right ml-5" />}
        </CardTitle>
        <CardText>
          {description}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default CompanyCard;