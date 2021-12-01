import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './Routes';
import NavBar from './components/NavBar';
import './App.css';
import { useState, useEffect } from 'react';
import UserContext from './UserContext';
import JoblyAPI from './api';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  /** Outside of just looking nice, we NEED a loading component for App, as all pages look
   *  at currentUser, which is derived from an AJAX call. If we didn't have this, navigating
   *  directly to a page via address bar would not work as it would check currentUser (which isnt loaded yet)
   *  and redirect to login / home page.
   */
  const [loading, setIsLoading] = useState(true);

  /** Component Mount, attempt to read user info from local storage */
  useEffect( () => {
    async function loadUser(token, username){
      JoblyAPI.token = token;
      const user = await JoblyAPI.getUserApps(username, true);
      if (user){
        setCurrentUser(user);
        setIsLoading(false);
      }
    }

    const localToken = localStorage.getItem("jobly-token");
    const localUsername = localStorage.getItem("jobly-username");
    if (localToken && localUsername){
      loadUser(localToken, localUsername);
    } else {
      setIsLoading(false);
    };
  } , []);

  /** Attempts to authenticate with API, if successful updates state and saves info to localStorage */
  const login = async ({username, password}) => {
    const token = await JoblyAPI.getToken({username, password});
    // Will need to test and address cases where token is good, but user isnt
    if (token){
      JoblyAPI.token = token;
      const user = await JoblyAPI.getUserApps(username, true);
      if (user){
        localStorage.setItem("jobly-token", token);
        localStorage.setItem("jobly-username", user.username);
        setCurrentUser(user);
        return true;
      }
    }
    return false;
  }

  const logout = () => {
    localStorage.setItem("jobly-token", "");
    localStorage.setItem("jobly-username", "");
    JoblyAPI.token = "";
    setCurrentUser(null);
  }
  // To do: Improve API error response handling
  const signup = async ({username, password, firstName, lastName, email}) => {
    const token = await JoblyAPI.registerUser({username, password, firstName, lastName, email});
    if (token){
      JoblyAPI.token = token;
      localStorage.setItem("jobly-token", token);
      localStorage.setItem("jobly-username", username);
      setCurrentUser({username, firstName, lastName, email, applications: [], isAdmin : false});
      return true;
    }
    return false;
  }

  const editUser = async ({username, password, firstName, lastName, email}) => {
    // Confirm password by getting new auth token
    const token = await JoblyAPI.getToken({username, password});
    if (token){
      JoblyAPI.token = token;
      const user = await JoblyAPI.patchUser(username, {firstName, lastName, email});
      if (user){
        localStorage.setItem("jobly-token", token);
        localStorage.setItem("jobly-username", user.username);
        setCurrentUser( (current) => {
          return {...current, firstName, lastName, email}
        });
      }
    }
  }

  const apply = async (jobID) => {
    if (!currentUser) return;
    const res = await JoblyAPI.applyToJob(jobID, currentUser.username);
    if (res) setCurrentUser( (current) => ({...current, applications : [...current.applications, {id : jobID}]}))
  }

  return (
    <UserContext.Provider value={ { currentUser, login, logout, signup, editUser, apply } }>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          {loading ? <p>Loading...</p> : <PageRoutes />}
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
