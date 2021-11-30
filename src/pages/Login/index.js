import Placeholder from "../../components/placeholder";
import LoginForm from "../../components/LoginForm";
import { useContext } from "react";
import UserContext from "../../UserContext";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  return (
    <main>
      <h1>Log In</h1>
      <LoginForm submitCallback={login} />
    </main>
  )
}

export default LoginPage;