import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const { _id } = useParams(); 
  const [formData, setFormData] = useState({
    photo: null,
    email: '',
    username: '',
    password: '',
  });

  const getUserById = async (id) => {
    const resp = await fetch(`http://localhost:3000/api/users/${id}`);
    const data = await resp.json();
    setFormData(data);
  };

  useEffect(() => {
    getUserById(_id);
  }, [_id]);

  const uploadPhotoToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ujdnc7cj'); 

    const response = await fetch('https://api.cloudinary.com/v1_1/dacsfvaap/image/upload', {
      credentials: "include",
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.secure_url; 
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let photoUrl = formData.photo; 

      if (formData.photo && typeof formData.photo === 'object') {
        photoUrl = await uploadPhotoToCloudinary(formData.photo);
      }

      const updatedData = {
        ...formData,
        photo: typeof photoUrl === 'string' ? photoUrl : formData.photo, 
      };

      const response = await fetch(`http://localhost:3000/api/users/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error('User update failed');
      }

      const data = await response.json();
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="file"
            name="photo" 
            onChange={handleFileChange} 
            className="border p-2" 
          />
          <input 
            type="email"
            name="email" 
            placeholder="E-mail" 
            value={formData.email} 
            onChange={handleInputChange} 
            className="border p-2" 
            required 
          />
          <input 
            type="text"
            name="username" 
            placeholder="Username" 
            value={formData.username} 
            onChange={handleInputChange} 
            className="border p-2" 
            required 
          />
          <input 
            type="password"
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            className="border p-2" 
            required 
          />
        </div>
        <button type='submit' className=" mt-4 relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-gray-800 text-white  transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56">
      <span className="relative z-10">Update User</span>
    </button>
      </form>
    </div>
  );
};

export default EditUser;
