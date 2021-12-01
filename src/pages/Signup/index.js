import { useContext } from "react";
import SignupForm from "../../components/SignupForm";
import { useAuthenticated } from "../../hooks";
import UserContext from "../../UserContext";

const SignupPage = () => {
  const [auth, redirect] = useAuthenticated("/");
  const { signup } = useContext(UserContext);
  if (auth) return redirect;
  return (
    <main className="pt-5 pb-5 text-start">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h1 className="mb-3">Sign Up</h1>
        <SignupForm submitCallback={signup} />
      </div>
    </main>
  )
}

export default SignupPage;