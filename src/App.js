import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './Routes';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <PageRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
