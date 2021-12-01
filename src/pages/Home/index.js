import UserContext from "../../UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <main>
      <h1>Jobly</h1>
      <p>All the jobs in one convenient place.</p>
      { currentUser ?
        <p>Welcome back, {currentUser.firstName}!</p>
        :
        <div>
          <NavLink to="/login"><button>Login</button></NavLink>
          <NavLink to="/signup"><button>Signup</button></NavLink>
        </div>
      }
    </main>
  )
}

export default HomePage;