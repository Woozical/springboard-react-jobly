import { useAuthenticated } from "../../hooks";
import LoginForm from "../../components/LoginForm";
import { useContext } from "react";
import UserContext from "../../UserContext";

const LoginPage = () => {
  const [auth, redirect] = useAuthenticated("/");
  const { login } = useContext(UserContext);
  if (auth) return redirect;
  return (
    <main className="pt-5 text-start">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h1 className="mb-3">Log In</h1>
        <LoginForm submitCallback={login} />
      </div>
    </main>
  )
}

export default LoginPage;