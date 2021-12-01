import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './Routes';
import NavBar from './components/NavBar';
import './App.css';
import { useState, useEffect } from 'react';
import UserContext from './UserContext';
import JoblyAPI from './api';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  /** Component Mount, attempt to read user info from local storage */
  useEffect( () => {
    async function loadUser(token, username){
      JoblyAPI.token = token;
      const user = await JoblyAPI.getUserApps(username, true);
      if (user) setCurrentUser(user);
    }

    const localToken = localStorage.getItem("jobly-token");
    const localUsername = localStorage.getItem("jobly-username");
    if (localToken && localUsername) loadUser(localToken, localUsername);
  } , []);

  /** Attempts to authenticate with API, if successful updates state and saves info to localStorage */
  const login = async ({username, password}) => {
    const token = await JoblyAPI.getToken({username, password});
    if (token){
      JoblyAPI.token = token;
      const user = await JoblyAPI.getUserApps(username, true);
      if (user){
        localStorage.setItem("jobly-token", token);
        localStorage.setItem("jobly-username", user.username);
        setCurrentUser(user);
      }
    }
  }

  const logout = () => {
    localStorage.setItem("jobly-token", "");
    localStorage.setItem("jobly-username", "");
    JoblyAPI.token = "";
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider value={ { currentUser, login, logout } }>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <PageRoutes />
        </BrowserRouter>
        {currentUser && currentUser.username}
      </div>
    </UserContext.Provider>
  );
}

export default App;
