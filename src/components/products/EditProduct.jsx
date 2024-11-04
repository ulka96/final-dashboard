import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const { _id } = useParams(); // URL'den ürün ID'sini al
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: null,
    size: '',
    color: '',
    description: '',
    quantity: '',
    newArrival: false,
    topSelling: false,
  });

  const getProductById = async (id) => {
    try {
      const resp = await fetch(`http://localhost:8000/products/${id}`);
      const data = await resp.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    getProductById(_id);
  }, [_id]);

  // Cloudinary'ye resim yükleme fonksiyonu
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ujdnc7cj'); // Cloudinary dashboard'dan alınır

    const response = await fetch('https://api.cloudinary.com/v1_1/dacsfvaap/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.secure_url; // Yüklenen resmin URL'si
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file, // Resmi state'e kaydet
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image; // Eğer yeni resim yüklenmemişse mevcut resmi kullan

      // Eğer yeni bir resim seçilmişse, Cloudinary'ye yükle
      if (formData.image && typeof formData.image === 'object') {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      const updatedData = {
        ...formData,
        image: imageUrl, // Cloudinary'den gelen resim URL'si
      };

      const response = await fetch(`http://localhost:8000/products/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Product update failed');
      }

      const data = await response.json();
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border px-4"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border p-2"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border p-2"
          />
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            placeholder="Size (comma separated)"
            className="border p-2"
            required
          />
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            placeholder="Color (comma separated)"
            className="border p-2"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="border p-2"
            required
          />
          <div className="col-span-2 flex items-center">
            <label className='flex items-center mr-4'>
              <input
                type='checkbox'
                name='newArrival'
                checked={formData.newArrival}
                onChange={handleInputChange}
              />
              <span className='ml-2'>New Arrival</span>
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='topSelling'
                checked={formData.topSelling}
                onChange={handleInputChange}
              />
              <span className='ml-2'>Top Selling</span>
            </label>
          </div>
        </div>
        {/* <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">
          Update Product
        </button> */}
            <button type='submit' className=" mt-4 relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-gray-800 text-white  transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56">
      <span className="relative z-10">Update Product</span>
    </button>
      </form>
    </div>
  );
};

export default EditProduct;
