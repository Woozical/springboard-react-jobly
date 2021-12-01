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
      try {
        const user = await JoblyAPI.getUserApps(username, true);
        setCurrentUser(user);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
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
    try {
      const token = await JoblyAPI.getToken({username, password});
      JoblyAPI.token = token;
      const user = await JoblyAPI.getUserApps(username, true);
      localStorage.setItem("jobly-token", token);
      localStorage.setItem("jobly-username", user.username);
      setCurrentUser(user);
      return [true, user];
    } catch (err) {
      console.error(err);
      return [false, err.message];
    }
  }

  const logout = () => {
    localStorage.setItem("jobly-token", "");
    localStorage.setItem("jobly-username", "");
    JoblyAPI.token = "";
    setCurrentUser(null);
  }

  const signup = async ({username, password, firstName, lastName, email}) => {
    try {
      const token = await JoblyAPI.registerUser({username, password, firstName, lastName, email});
      JoblyAPI.token = token
      localStorage.setItem("jobly-token", token);
      localStorage.setItem("jobly-username", username);
      setCurrentUser({username, firstName, lastName, email, applications: [], isAdmin : false});
      return [true, token];
    } catch (err) {
      return [false, err.message]
    }
  }

  const editUser = async ({username, password, firstName, lastName, email}) => {
    try {
      // Confirm password by getting new auth token
      const token = await JoblyAPI.getToken({username, password});
      JoblyAPI.token = token;
      const user = await JoblyAPI.patchUser(username, {firstName, lastName, email});
      localStorage.setItem("jobly-token", token);
      localStorage.setItem("jobly-username", user.username);
      setCurrentUser( (current) => {
        return {...current, firstName, lastName, email}
      });
      return [true, user];
    } catch (err) {
      return [false, err.message];
    }
  }

  const apply = async (jobID) => {
    if (!currentUser) return;
    try{
      await JoblyAPI.applyToJob(jobID, currentUser.username);
      setCurrentUser( (current) => ({...current, applications : [...current.applications, {id : jobID}]}));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <UserContext.Provider value={ { currentUser, login, logout, signup, editUser, apply } }>
      <div className="App">
        <div className="App-background bg-light"></div>
        <BrowserRouter>
          <NavBar />
          {loading ? <p>Loading...</p> : <PageRoutes />}
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
