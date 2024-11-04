import React from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <nav className=' px-4 py-3 flex justify-between bg-gray-100'>
        <div className='flex items-center text-xl mt-6'>
            <FaBars className=' me-4 cursor-pointer' 
             onClick={() => setSidebarToggle(!sidebarToggle) }
            />
            <span className='font-semibold'>E-commerce</span>
        </div>
        
        <div className='flex items-center gap-x-5 mt-4 mr-4'>
            <div className='relative w-96 mr-60'>
                <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
                    <button className='p-1 focus:outline-none text-white md:text-black'><FaSearch/></button>
                </span>
                <input 
                      type="text"
                      placeholder='Search'
                className='w-full px-4 pl-12 py-1 rounded shadow outline-none hidden md:block'
                 />
              </div>
              <div><Link to="">Login</Link></div>
            
            <div className='relative flex flex-row'>
                  <button className='group'>
                  
                                      
                <FaUserCircle className='w-8 h-8 mt-1 '/>
                      <div className='z-10 hidden absolute bg-white rounded-lg shadow 
                w-32 group-focus:block top-full right-0'>
                          <ul className='py-2 text-sm text-gray-950'>

                        <li>
                            <Link to="">Profile</Link>
                        </li>
                        <li>
                            <a href="">Logout</a>
                        </li>
                    </ul>
                </div>
             </button>


            </div>



        </div>
    </nav>
  )
}

export default Navbar