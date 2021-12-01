import { useState } from "react";
import { Form, Input } from "reactstrap";

const NumberDrop = ({fieldName, options=[], placeholder, changeCallback}) => {
  const [formData, setFormData] = useState({ [fieldName] : 0 });

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    changeCallback({...formData, [name] : value});
    setFormData(data => ({...data, [name] : value}));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    changeCallback(formData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input onChange={handleChange} name={fieldName} type="select" value={formData[fieldName]}>
        <option value={0}>{placeholder}</option>
        {options.map(o => <option value={o[1]} key={o[1]}>{o[0]}</option>)}
      </Input>
    </Form>
  )
}

export default NumberDrop;