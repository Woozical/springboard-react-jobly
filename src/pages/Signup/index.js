import { useContext } from "react";
import SignupForm from "../../components/SignupForm";
import { useAuthenticated } from "../../hooks";
import UserContext from "../../UserContext";

const SignupPage = () => {
  const [auth, redirect] = useAuthenticated("/");
  const { signup } = useContext(UserContext);
  if (auth) return redirect;
  return (
    <main>
      <h1>Sign Up</h1>
      <SignupForm submitCallback={signup} />
    </main>
  )
}

export default SignupPage;