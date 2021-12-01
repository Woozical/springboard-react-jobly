import { useState } from "react";
import { Form, Input, FormGroup, Label } from "reactstrap";

const BooleanCheck = ({fieldName, label, changeCallback}) => {
  const [formData, setFormData] = useState({ [fieldName] : false });

  const handleChange = (evt) => {
    const {name, checked} = evt.target;
    changeCallback({...formData, [name] : checked});
    setFormData(data => ({...data, [name] : checked}));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    changeCallback(formData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup check>
        <Label check htmlFor={`boolCheck-${fieldName}`}>{label}</Label>
        <Input id={`boolCheck-${fieldName}`}
               onChange={handleChange}
               name={fieldName}
               type="checkbox"
               value={formData[fieldName]} />
      </FormGroup>
    </Form>
  )
}

export default BooleanCheck;