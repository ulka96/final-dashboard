import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleAddUser = async (e) => {
    e.preventDefault();
    
    const newUser = {
      photo,
      email,
      userName,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const data = await response.json();
      };
  
      setPhoto('');
      setEmail('');
      setUsername('');
      setPassword('');


      navigate("/users")
      
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleAddUser} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
        <input 
            type="file" 
            placeholder="Image URL" 
            value={photo} 
            onChange={(e) => setPhoto(e.target.value)} 
            className="border p-2" 
            required 
          />
          
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Username" 
            value={userName} 
            onChange={(e) => setUsername(e.target.value)} 
            className="border p-2" 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border p-2" 
            required 
          />
        </div>
        <button className="mt-4 p-2  relative h-[50px] w-40 overflow-hidden border border-green-900 bg-white text-green-900 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-900 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4"> <span className="relative z-10">Add User</span></button>
      </form>
    </div>
  );
};

export default AddUser;
