import { useState } from "react";

const DEFAULT_STATE = {username: "", password: "", email: "", firstName: "", lastName: ""};

const SignupForm = ({submitCallback}) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);
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
      <label htmlFor="login-username">Username</label>
      <input onChange={handleChange} type="text" id="login-username" name="username" value={formData.username} />
      <label htmlFor="login-email">Email</label>
      <input onChange={handleChange} type="email" id="login-email" name="email" value={formData.email} />
      <label htmlFor="login-firstName">First name</label>
      <input onChange={handleChange} type="text" id="login-firstName" name="firstName" value={formData.firstName} />
      <label htmlFor="login-lastName">Last name</label>
      <input onChange={handleChange} type="text" id="login-lastName" name="lastName" value={formData.lastName} />
      <label htmlFor="login-password">Password</label>
      <input onChange={handleChange} type="password" id="login-password" name="password" value={formData.password} />
      <button>Login</button>
    </form>
  )
}

export default SignupForm;