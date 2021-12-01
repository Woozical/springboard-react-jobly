import { useState } from "react";
import { Form, Card, CardBody, Label, FormGroup, Button, Input } from "reactstrap";

const EditProfileForm = ({currentUser, submitCallback}) => {
  const [formData, setFormData] = useState({...currentUser, password: ""});
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
          <Label htmlFor="edit-username"><b>Username</b></Label>
          <Input onChange={handleChange} type="text" disabled id="edit-username" name="username" value={formData.username} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="edit-email"><b>Email</b></Label>
          <Input onChange={handleChange} type="email" id="edit-email" name="email" value={formData.email} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="edit-firstName"><b>First Name</b></Label>
          <Input onChange={handleChange} type="text" id="edit-firstName" name="firstName" value={formData.firstName} />
        </FormGroup>       
        <FormGroup>
          <Label htmlFor="edit-lastName"><b>Last Name</b></Label>
          <Input onChange={handleChange} type="text" id="edit-lastName" name="lastName" value={formData.lastName} />
        </FormGroup>
        <FormGroup className="text-center mt-4">
          <Label htmlFor="edit-password"><b>Confirm Password</b></Label>
          <Input onChange={handleChange} type="password" id="edit-password" name="password" value={formData.password} />
        </FormGroup>
        <div className="text-end">
          <Button className="mt-4" block color="success">Save Changes</Button>
        </div>
      </Form>
      </CardBody>
    </Card>

  )
}

export default EditProfileForm;