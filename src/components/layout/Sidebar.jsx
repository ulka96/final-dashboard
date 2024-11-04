// Sidebar.jsx
import React from 'react';
import { FaHome, FaUsers } from 'react-icons/fa';
import { AiFillProduct } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import adminLogo from "../../assets/adminLogo.png"

const Sidebar = ({ sidebarToggle, onMenuItemClick }) => {
  return (
    <div className={`${sidebarToggle ? 'hidden' : 'block'} w-64   fixed h-full px-4 py-2 bg-gray-100`}>
      <div className="my-7 mb-4 flex flex-row gap-2 items-center justify-center">
        <img src={adminLogo} alt="adminLogo" className='w-[16px] h-[30px]' />
        <h1 className=" text-2xl font-bold">Admin</h1>
      </div>

      <hr />


   <div className='flex flex-col gap-3 mt-14'>
        <Link className=' hover: flex items-center text-center justify-center h-[50px] 
   before:ease relative overflow-hidden hover:bg-gray-300
   shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6
   before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10
   before:duration-700 hover:shadow-[#c5c2c2] 
   hover:before:-translate-x-40' to="/users">
          <FaUsers className='mr-3'/>
          Users
        </Link>

        <Link className=' hover: flex items-center text-center justify-center h-[50px] 
   before:ease relative overflow-hidden hover:bg-gray-300
   shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6
   before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10
   before:duration-700 hover:shadow-[#c5c2c2] 
   hover:before:-translate-x-40' to="/products">
          <FaUsers className='mr-3'/>
          Products
        </Link>

     {/* <Link className=' hover: flex items-center text-center justify-center uppercase h-[50px] before:ease relative  overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40'  to="/categories">Categories </Link>
     <Link className=' hover: flex items-center text-center justify-center uppercase h-[50px] before:ease relative  overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40'  to="/contacts">Contact </Link>
     <Link className=' hover: flex items-center text-center justify-center uppercase h-[50px] before:ease relative  overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40'  to="/commons">Commons </Link>
     <Link className=' hover: flex items-center text-center justify-center uppercase h-[50px] before:ease relative  overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40'  to="/faqs">Faqs </Link> */}
   </div>

    </div>
  );
};

export default Sidebar;
