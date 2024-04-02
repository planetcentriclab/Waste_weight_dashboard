import React from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import SideNavBar from '../components/NavBar';
import classes from './css/MachinePage.module.css'

function MachinePage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    Axios.get('http://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/all')
    .then(res => setData(res.data)); // get the response data instead of the whole response object
  }, []);

  console.log(data)

  return (
    <div className={classes.container}>
        <SideNavBar>
            <h1 className={classes.title}>เครื่องชั่งและบันทึกน้ำหนักขยะ</h1>
        </SideNavBar>
    </div>
  );
}

export default MachinePage;