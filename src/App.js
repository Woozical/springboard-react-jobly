import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './Routes';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
