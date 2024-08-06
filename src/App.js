
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Pages from './Components/Navbar/pages/Pages';
import AppContext from './Components/AppContext/AppContext';

function App() {
  return (
    <h1 className='App'>
      <BrowserRouter>
      <AppContext>
     <Pages/>
     </AppContext>
     </BrowserRouter>
    </h1>  
  );
}

export default App;
