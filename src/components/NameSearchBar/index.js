import { useState } from "react"
const DEFAULT_STATE = {name : ""};
const NameSearchBar = ({ submitCallback, fieldName="name", placeholder="Search by name" }) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitCallback(formData);
  }

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    submitCallback({...formData, [name] : value});
    setFormData(data => ({...data, [name] : value}) );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className="form-control"
        type="text" name={fieldName}
        onChange={handleChange}
        placeholder={placeholder}
        value={formData[fieldName]} />
      {/* <button className="btn btn-outline-success">Search</button> */}
    </form>
  )
}

export default NameSearchBar;