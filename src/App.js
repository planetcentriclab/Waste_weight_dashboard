import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homePage';
import './index.css'

function App() {
  return (
    <div className='container'>
      <Router>
          <Routes>
            <Route path='/waste-weight' components={App} />
            <Route path='/waste-weight/'element= {<HomePage/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
