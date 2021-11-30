import { useState } from "react"
const DEFAULT_STATE = {name : ""};
const NameSearchBar = ({ submitCallback }) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitCallback(formData);
    setFormData(DEFAULT_STATE);
  }

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData(data => ({...data, [name] : value}) );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} placeholder="Search by name" value={formData.name} />
      <button>Search</button>
    </form>
  )
}

export default NameSearchBar;