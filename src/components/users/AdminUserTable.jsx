import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const AdminUserTable = () => {

const [users, setUsers] = useState([])

const fetchUsers = async () =>{
  try {
    console.log("object")
    const response = await fetch('http://localhost:8000/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

  useEffect(() => {
    fetchUsers();
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // await response.json();
        const data = await response.json();

      };
      
      // Remove the deleted user from the state
      setUsers(users.filter(users => users._id !== id));
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return (
    <div className="my-8 mx-8 overflow-x-auto">
  <Link to="/AddUser" >
        <button className="mb-4 p-2 rounded-md  relative h-[50px] w-40 overflow-hidden border border-gray-500
         bg-white text-gray-900 shadow-2xl transition-all before:absolute before:left-0 
         before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-500 before:duration-500 
         after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-500 
         after:duration-500 hover:text-white
        hover:shadow-gray-400 hover:before:h-2/4 hover:after:h-2/4">
          <span className="relative z-10">Add User</span></button>
  </Link>


    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
        <th className="py-2 px-4 border border-gray-300">ID</th>
          <th className="py-2 px-4 border border-gray-300">photo</th>
          <th className="py-2 px-4 border border-gray-300">username</th>
          <th className="py-2 px-4 border border-gray-300">e-mail</th>
          <th className="py-2 px-4 border border-gray-300">password</th>
          <th className="py-2 px-4 border border-gray-300">settings</th>

        </tr>
      </thead>
      <tbody>
          {users && users.map((users) => (
            <tr key={users._id} className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300">{users._id}</td>

              <td className="py-2 px-4 border border-gray-300">
                <img src={users.photo}/>
                
                </td>
              <td className="py-2 px-4 border border-gray-300">{users.username}</td>
              <td className="py-2 px-4 border border-gray-300">{users.email}</td>
              <td className="py-2 px-4 border border-gray-300">{users.password}</td>
              <td className="py-2 px-4 border border-gray-300">
              <Link to={`/users/${users._id}`}>
              <button className="group relative min-h-[50px] w-40 overflow-hidden border border-purple-500 bg-white text-purple-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
      <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
      <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">Edit</span>
    </button>
              </Link>

              <button onClick={() => handleDelete(users._id)} className="text-red hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full"><span className="relative z-10">Delete</span></button>

              </td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
  )
}

export default AdminUserTable