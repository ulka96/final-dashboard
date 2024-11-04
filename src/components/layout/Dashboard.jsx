import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = ({ sidebarToggle, setSidebarToggle, selectedMenu }) => {


  return (
    <div className={`${sidebarToggle ? '' : 'ml-64'} w-full  `}>
      <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <Outlet/>
    </div>
  );
};

export default Dashboard;
