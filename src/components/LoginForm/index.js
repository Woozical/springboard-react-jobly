import { useState } from "react";
import { Form, Card, CardBody, Label, FormGroup, Button, Input, FormFeedback } from "reactstrap";
import { validateFormData } from "../../utils";
import schema from "../../schemas/LoginForm.json";

const DEFAULT_STATE = {username: "", password: ""};
const DEFAULT_FEEDBACK_STATE = {username: [], password: [], failedAuth: false};

const LoginForm = ({submitCallback}) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [formFeedback, setFormFeedback] = useState(DEFAULT_FEEDBACK_STATE);
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData( data => ({...data, [name] : value}) );
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = validateFormData(formData, schema);
    if (res.success){
      const loginAttempt = await submitCallback(formData);
      console.log(loginAttempt);
      if (!loginAttempt){
        setFormFeedback(f => ({...DEFAULT_FEEDBACK_STATE, failedAuth : true}));
        setFormData(DEFAULT_STATE);
      }
    } else {
      setFormFeedback({...DEFAULT_FEEDBACK_STATE, ...res.errors});
    }
  }
  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="login-username"><b>Username</b></Label>
            <Input
              onChange={handleChange}
              type="text"
              id="login-username"
              name="username"
              value={formData.username} 
              invalid={formFeedback.username.length > 0} />
              <FormFeedback>
                {formFeedback.username.map(msg => <p>{msg}</p>)}
              </FormFeedback>
          </FormGroup>

          <FormGroup>
          <Label htmlFor="login-password"><b>Password</b></Label>
          <Input
            onChange={handleChange}
            type="password"
            id="login-password"
            name="password"
            value={formData.password}
            invalid={formFeedback.password.length > 0} />
            <FormFeedback>
              {formFeedback.password.map(msg => <p>{msg}</p>)}
            </FormFeedback>
          </FormGroup>
          {formFeedback.failedAuth && <p className="text-danger text-center">Incorrect username or password.</p> }
          <div className="text-center">
            <Button color="primary">Submit</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default LoginForm;