import { useState } from "react";
import { Form, Card, CardBody, Label, FormGroup, Button, Input, FormFeedback } from "reactstrap";
import { validateFormData } from "../../utils";
import schema from "../../schemas/LoginForm.json";
import LoadingSpinner from "../LoadingSpinner";

const DEFAULT_STATE = {username: "", password: ""};
const DEFAULT_FEEDBACK_STATE = {username: [], password: [], apiResponse: ""};

const LoginForm = ({submitCallback}) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [formFeedback, setFormFeedback] = useState(DEFAULT_FEEDBACK_STATE);
  const [awaitingAPI, setAwaitingAPI] = useState(false);
  
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData( data => ({...data, [name] : value}) );
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // Client-side form validation
    const res = validateFormData(formData, schema);
    if (res.success){
      setAwaitingAPI(true);
      const [loginAttempt, apiResponse] = await submitCallback(formData);
      // If the API did not respond with a success, clear all state and display fail message
      if (!loginAttempt){
        setAwaitingAPI(false);
        setFormFeedback({...DEFAULT_FEEDBACK_STATE, apiResponse});
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
                {formFeedback.username.map((msg, i) => <small key={`username-${i}`}>{msg} <br/></small>)}
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
              {formFeedback.password.map((msg, i) => <small key={`password-${i}`}>{msg} <br/></small>)}
            </FormFeedback>
          </FormGroup>
          {formFeedback.apiResponse && <p className="text-danger text-center">{formFeedback.apiResponse}</p> }
          <div className="text-center">
            {awaitingAPI ? <LoadingSpinner noPadding /> : <Button color="primary">Submit</Button>}
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default LoginForm;