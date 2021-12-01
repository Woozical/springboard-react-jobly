import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="edit-username">Username</label>
      <input onChange={handleChange} type="text" disabled id="edit-username" name="username" value={formData.username} />
      <label htmlFor="edit-email">Email</label>
      <input onChange={handleChange} type="email" id="edit-email" name="email" value={formData.email} />
      <label htmlFor="edit-firstName">First name</label>
      <input onChange={handleChange} type="text" id="edit-firstName" name="firstName" value={formData.firstName} />
      <label htmlFor="edit-lastName">Last name</label>
      <input onChange={handleChange} type="text" id="edit-lastName" name="lastName" value={formData.lastName} />
      <label htmlFor="edit-password">Confirm Password</label>
      <input onChange={handleChange} type="password" id="edit-password" name="password" value={formData.password} />
      <button>Save Changes</button>
    </form>
  )
}

export default EditProfileForm;