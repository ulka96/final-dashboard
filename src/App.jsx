import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/layout/Dashboard';
import { Outlet } from 'react-router-dom';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('home');

  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
    setSidebarToggle(false); // Optional: Close sidebar when an item is selected
  };

  return (
    <div className="flex overflow-hidden ">
      <div className="container mx-auto w-full flex">
        <Sidebar sidebarToggle={sidebarToggle} onMenuItemClick={handleMenuItemClick} />
        <Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} selectedMenu={selectedMenu} />
      </div>
    </div>
  );
}

export default App;