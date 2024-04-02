import {NavLink} from 'react-router-dom'
import classes from './css/HomePage.module.css'
import SideNavBar from '../components/NavBar';

function HomePage() {
  return (
    <div className={classes.container}>
        <SideNavBar>
          <p className={classes.title}>รายละเอียดข้อมูลขยะ</p>
        </SideNavBar>
    </div>
  );
}

export default HomePage;