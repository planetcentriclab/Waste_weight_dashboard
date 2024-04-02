import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './css/NavBar.module.css'
import data from './img/data.png'
import machine from './img/machine.png'

const NavBar = ({children}) => {
  const menuItem = [
    {
        path:"/waste-weight",
        name:"รายละเอียดข้อมูลขยะ",
        icon: data
    },
    {
        path:"/waste-weight/machine-page",
        name:"เครื่องชั่งน้ำหนักขยะ",
        icon: machine
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
                          <p className={classes.h2}>{item.name}</p>
                      </NavLink>
                  ))
              }
          </div>
          <main>{children}</main>
      </div>
  );
}

export default NavBar