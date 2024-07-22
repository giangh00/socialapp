
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';


import Navbar from './Components/Navbar/Navbars/Navbar';
import Home from './Components/Navbar/pages/Home';
function App() {
  return (
    <Router>
       <Home/>
    </Router>
    
  );
}

export default App;
