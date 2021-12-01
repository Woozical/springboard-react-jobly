import { useContext } from "react";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";

/** To do / Bug: This method for route protection isn't working as expected. If the user manually goes
 * to a URL in the browser, it will redirect every time to home page, as currentUser hasn't been loaded in yet
 * from the API. 
 */

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