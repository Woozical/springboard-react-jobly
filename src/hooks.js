import { useContext } from "react";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";

// Checks to see if currentUser is defined in the UserContext, if not, redirects to the given path
// Example call:
// const [auth, redirect] = useAuthenticated("/login");
// if (!auth) return redirect;
const useAuthenticated = (redirectPath) => {
  const { currentUser } = useContext(UserContext);
  const nav = <Navigate to={redirectPath} />;
  return currentUser ? [true, nav] : [false, nav];
}

export { useAuthenticated };