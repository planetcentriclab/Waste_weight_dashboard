import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homePage';
import MachinePage from './pages/machinePage';
import './index.css'

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
            <Route path='/waste-weight'element= {<HomePage/>} />
            <Route path='/waste-weight/machine-page'element= {<MachinePage/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
