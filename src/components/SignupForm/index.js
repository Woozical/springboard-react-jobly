import { useState } from "react";
import { Form, FormFeedback, Card, CardBody, Label, FormGroup, Button, Input } from "reactstrap";
import schema from "../../schemas/SignupForm.json";
import { validateFormData } from "../../utils";
import LoadingSpinner from "../LoadingSpinner";

const DEFAULT_STATE = {username: "", password: "", email: "", firstName: "", lastName: ""};
const DEFAULT_FEEDBACK_STATE = {
  username : [],
  password: [],
  email: [],
  firstName: [],
  lastName: [],
  failedSignup : false,
  apiResponse: ""
};

const SignupForm = ({submitCallback}) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [formFeedback, setFormFeedback] = useState(DEFAULT_FEEDBACK_STATE);
  const [awaitingAPI, setAwaitingAPI] = useState(false);
  
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData( data => ({...data, [name] : value}) );
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = validateFormData(formData, schema);
    if (res.success){
      setAwaitingAPI(true);
      const [signupResult, apiResponse] = await submitCallback(formData);
      if (!signupResult){
        // On a failed attempt, move the API's error response into feedback state
        setFormFeedback({...DEFAULT_FEEDBACK_STATE, apiResponse, failedSignup: true});
        setAwaitingAPI(false);
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
            <Label htmlFor="login-email"><b>Email</b></Label>
            <Input
              onChange={handleChange}
              type="email"
              id="login-email"
              name="email"
              value={formData.email}
              invalid={formFeedback.email.length > 0} />
            <FormFeedback>
              {formFeedback.email.map((msg, i) => <small key={`email-${i}`}>{msg} <br/></small>)}
            </FormFeedback>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="login-firstName"><b>First name</b></Label>
            <Input
              onChange={handleChange}
              type="text"
              id="login-firstName"
              name="firstName"
              value={formData.firstName}
              invalid={formFeedback.firstName.length > 0} />
            <FormFeedback>
              {formFeedback.firstName.map((msg, i) => <small key={`firstName-${i}`}>{msg} <br/></small>)}
            </FormFeedback>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="login-lastName"><b>Last name</b></Label>
            <Input
              onChange={handleChange}
              type="text"
              id="login-lastName"
              name="lastName"
              value={formData.lastName}
              invalid={formFeedback.lastName.length > 0} />
            <FormFeedback>
              {formFeedback.lastName.map((msg, i) => <small key={`lastName-${i}`}>{msg} <br/></small>)}
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
          
          {formFeedback.failedSignup && <p className="text-center text-danger">{formFeedback.apiResponse}</p>}

          <div className="text-center">
            { awaitingAPI ? <LoadingSpinner noPadding /> : <Button color="primary">Submit</Button> }
          </div>
        </Form>
      </CardBody>
    </Card>

  )
}

export default SignupForm;