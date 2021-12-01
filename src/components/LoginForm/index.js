import { useState } from "react";
import { Form, Card, CardBody, Label, FormGroup, Button, Input } from "reactstrap";

const DEFAULT_STATE = {username: "", password: ""};

const LoginForm = ({submitCallback}) => {
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
          <Label htmlFor="login-username">Username</Label>
          <Input onChange={handleChange} type="text" id="login-username" name="username" value={formData.username} />
          </FormGroup>

          <FormGroup>
          <Label htmlFor="login-password">Password</Label>
          <Input onChange={handleChange} type="password" id="login-password" name="password" value={formData.password} />
          </FormGroup>
          <div className="text-center">
            <Button color="primary">Login</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default LoginForm;