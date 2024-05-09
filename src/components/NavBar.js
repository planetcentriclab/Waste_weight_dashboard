import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './css/NavBar.module.css'
import data from './img/data.png'
import machine from './img/machine.png'
import factor from './img/factor.png'

const NavBar = ({children}) => {
  const menuItem = [
    {
        path:"/",
        name:"รายละเอียดข้อมูลขยะ",
        icon: data
    },
    {
        path:"/machine-page",
        name:"เครื่องชั่งน้ำหนักขยะ",
        icon: machine
    },
    {
        path:"/emission-factor-page",
        name:"Emission Factor",
        icon: factor
    }
    ]

  const currentLocation = useLocation();

  return (
      <div className={classes.container}>
          <div className={classes.sidebar}>
            <h1 className={classes.title1}>Waste Weight</h1>
            <h1 className={classes.title2}>Recording System</h1>
              {
                  menuItem.map((item, index) => (
                      <NavLink to={item.path} key={index} className={`${classes.link} ${item.path === currentLocation.pathname ? classes.activeLink : ''}`}>
                          <img src={item.icon} alt='icon' width='22px' height='22px'/>
                          <p className={classes.menu}>{item.name}</p>
                      </NavLink>
                  ))
              }
          </div>
          <main>{children}</main>
      </div>
  );
}

export default NavBar