import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homePage';
import MachinePage from './pages/machinePage';
import './index.css'

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
            <Route path='https://planetcentriclab.github.io/Waste_weight_dashboard/'element= {<HomePage/>} />
            <Route path='https://planetcentriclab.github.io/Waste_weight_dashboard/machine-page'element= {<MachinePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
