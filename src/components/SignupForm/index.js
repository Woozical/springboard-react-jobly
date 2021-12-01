import { useState } from "react";
import { Form, Card, CardBody, Label, FormGroup, Button, Input } from "reactstrap";

const DEFAULT_STATE = {username: "", password: "", email: "", firstName: "", lastName: ""};

const SignupForm = ({submitCallback}) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData( data => ({...data, [name] : value}) );
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await submitCallback(formData);
    // setFormData(DEFAULT_STATE);
  }
  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="login-username"><b>Username</b></Label>
            <Input onChange={handleChange} type="text" id="login-username" name="username" value={formData.username} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="login-email"><b>Email</b></Label>
            <Input onChange={handleChange} type="email" id="login-email" name="email" value={formData.email} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="login-firstName"><b>First name</b></Label>
            <Input onChange={handleChange} type="text" id="login-firstName" name="firstName" value={formData.firstName} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="login-lastName"><b>Last name</b></Label>
            <Input onChange={handleChange} type="text" id="login-lastName" name="lastName" value={formData.lastName} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="login-password"><b>Password</b></Label>
            <Input onChange={handleChange} type="password" id="login-password" name="password" value={formData.password} />
          </FormGroup>
          <div className="text-center">
            <Button color="primary">Submit</Button>
          </div>
        </Form>
      </CardBody>
    </Card>

  )
}

export default SignupForm;