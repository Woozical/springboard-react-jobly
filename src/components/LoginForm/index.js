import { useState } from "react";

const DEFAULT_STATE = {username: "", password: ""};

const LoginForm = ({submitCallback}) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData( data => ({...data, [name] : value}) );
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await submitCallback(formData);
    setFormData(DEFAULT_STATE);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login-username">Username</label>
      <input onChange={handleChange} type="text" id="login-username" name="username" value={formData.username} />
      <label htmlFor="login-password">Password</label>
      <input onChange={handleChange} type="password" id="login-password" name="password" value={formData.password} />
      <button>Login</button>
    </form>
  )
}

export default LoginForm;