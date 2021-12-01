import { useAuthenticated } from "../../hooks";
import LoginForm from "../../components/LoginForm";
import { useContext } from "react";
import UserContext from "../../UserContext";

const LoginPage = () => {
  const [auth, redirect] = useAuthenticated("/");
  const { login } = useContext(UserContext);
  if (auth) return redirect;
  return (
    <main>
      <h1>Log In</h1>
      <LoginForm submitCallback={login} />
    </main>
  )
}

export default LoginPage;