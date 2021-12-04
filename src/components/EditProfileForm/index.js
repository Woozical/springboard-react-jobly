import { useState } from "react";
import { Form, FormFeedback, Card, CardBody, Label, FormGroup, Button, Input } from "reactstrap";
import schema from "../../schemas/EditProfileForm.json";
import { validateFormData } from "../../utils";
import LoadingSpinner from "../LoadingSpinner";

const DEFAULT_FEEDBACK_STATE = {
  username: [],
  firstName: [],
  lastName: [],
  email: [],
  password: [],
  apiResponse: "",
  responseClass: ""
}

const EditProfileForm = ({currentUser, submitCallback}) => {
  const [formData, setFormData] = useState({...currentUser, password: ""});
  const [formFeedback, setFormFeedback] = useState(DEFAULT_FEEDBACK_STATE);
  const [awaitingAPI, setAwaitingAPI] = useState(false);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    if (name === "username") return; // in case someone cheekily removes the disable attribute w/ inspect element
    setFormData( data => ({...data, [name] : value}) );
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = validateFormData(formData, schema);
    if (res.success){
      setAwaitingAPI(true);
      const [editResult, apiResponse] = await submitCallback(formData);
      if (!editResult) {
        // On a failed attempt, move the API's error response into feedback state
        setFormData(f => ({...f, password: ""}));
        setFormFeedback({...DEFAULT_FEEDBACK_STATE, apiResponse, responseClass: "text-danger"});
      } else {
        setFormData({...apiResponse, password: ""});
        setFormFeedback({...DEFAULT_FEEDBACK_STATE, apiResponse: "Success! Changes saved.", responseClass: "text-success"});
      }
      setAwaitingAPI(false);
    } else {
      setFormFeedback({...DEFAULT_FEEDBACK_STATE, ...res.errors});
    }
  }
  
  return (
    <Card>
      <CardBody>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="edit-username"><b>Username</b></Label>
          <Input 
            style = {{cursor: "not-allowed"}}
            onChange={handleChange}
            type="text"
            disabled
            id="edit-username"
            name="username"
            value={formData.username} />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="edit-email"><b>Email</b></Label>
          <Input 
            onChange={handleChange} 
            type="email" 
            id="edit-email" 
            name="email" 
            value={formData.email}
            invalid={formFeedback.email.length > 0} />
          <FormFeedback>
            {formFeedback.email.map((msg, i) => <small key={`email-${i}`}>{msg} <br/></small>)}
          </FormFeedback>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="edit-firstName"><b>First Name</b></Label>
          <Input 
            onChange={handleChange} 
            type="text" 
            id="edit-firstName" 
            name="firstName" 
            value={formData.firstName}
            invalid={formFeedback.firstName.length > 0} />
          <FormFeedback>
            {formFeedback.firstName.map((msg, i) => <small key={`firstName-${i}`}>{msg} <br/></small>)}
          </FormFeedback>
        </FormGroup>       
        
        <FormGroup>
          <Label htmlFor="edit-lastName"><b>Last Name</b></Label>
          <Input 
            onChange={handleChange} 
            type="text" 
            id="edit-lastName" 
            name="lastName" 
            value={formData.lastName}
            invalid={formFeedback.lastName.length > 0} />
          <FormFeedback>
            {formFeedback.lastName.map((msg, i) => <small key={`lastName-${i}`}>{msg} <br/></small>)}
          </FormFeedback>
        </FormGroup>
        
        <FormGroup className="text-center mt-4">
          <Label htmlFor="edit-password"><b>Confirm Password</b></Label>
          <Input 
            onChange={handleChange} 
            type="password" 
            id="edit-password" 
            name="password" 
            value={formData.password}
            invalid={formFeedback.password.length > 0} />
          <FormFeedback>
            {formFeedback.password.map((msg, i) => <small key={`password-${i}`}>{msg} <br/></small>)}
          </FormFeedback>
        </FormGroup>
        {formFeedback.apiResponse && <p className={`text-center ${formFeedback.responseClass}`}>{formFeedback.apiResponse}</p>}
        <div className="text-center">
          {awaitingAPI ? <LoadingSpinner noPadding />
          : <Button className="mt-4" block color="success">Save Changes</Button>
          }
        </div>
      </Form>
      </CardBody>
    </Card>

  )
}

export default EditProfileForm;