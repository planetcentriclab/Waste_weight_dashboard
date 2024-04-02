import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homePage';
import MachinePage from './pages/machinePage';
import './index.css'

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
            <Route path='/'element= {<HomePage/>} />
            <Route path='/machine-page'element= {<MachinePage/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
