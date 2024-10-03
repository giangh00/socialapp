import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Pages from './Components/Navbar/pages/Pages';
import AppContext from './Components/AppContext/AppContext';

function App() {
  return (
    <div className='App'> {/* Changed from <h1> to <div> */}
      <BrowserRouter>
        <AppContext>
          <Pages />
        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
