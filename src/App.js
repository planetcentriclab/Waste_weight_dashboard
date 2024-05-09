import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homePage';
import MachinePage from './pages/machinePage';
import FactorPage from './pages/factorPage';
import SideNavBar from './components/NavBar';
import './index.css'

function App() {
  return (
    <div className='container'>
      <Router basename={`${process.env.PUBLIC_URL}`}>
        <SideNavBar>
          <Routes>
              <Route path='/'element= {<HomePage/>} />
              <Route path='/machine-page'element= {<MachinePage/>} />
              <Route path='/emission-factor-page'element= {<FactorPage/>} />
          </Routes>
        </SideNavBar>
      </Router>
    </div>
  );
}

export default App;
