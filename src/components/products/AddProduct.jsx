import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // image null olarak ayarlanıyor
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();
  
  // Cloudinary'ye resim yükleme fonksiyonu
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ujdnc7cj'); // Cloudinary dashboard'dan alabilirsiniz

    const response = await fetch('https://api.cloudinary.com/v1_1/dacsfvaap/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // Cloudinary'den gelen URL
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      // Eğer resim seçilmişse önce Cloudinary'e yükle
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      const newProduct = {
        title,
        price,
        category,
        image: imageUrl, // Yüklenen resmin URL'si
        size: size.split(','),  // Size bir array olduğu için virgül ile ayırıyoruz
        color: color.split(','), // Color bir array olduğu için virgül ile ayırıyoruz
        description,
        quantity,
      };

      // Ürünü backend'e gönder
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setTitle('');
        setPrice('');
        setCategory('');
        setImage(null); // Resmi temizle
        setSize('');
        setColor('');
        setDescription('');
        setQuantity('');
        navigate("/products");
      } else {
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Resmi state'de saklıyoruz
  };

  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleAddProduct} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Form alanları */}
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="border p-2" 
            required 
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="border p-2" 
            required 
          />
          <input 
            type="file" 
            placeholder="Image" 
            onChange={handleFileChange} // Resim değişikliğini dinliyoruz
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Size (comma separated)" 
            value={size} 
            onChange={(e) => setSize(e.target.value)} 
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Color (comma separated)" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            className="border p-2" 
            required 
          />
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="border p-2" 
            required 
          />
          <input 
            type="number" 
            placeholder="Quantity" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            className="border p-2" 
            required 
          />
        </div>
        <button className="mt-4 p-2  relative h-[50px] w-40 overflow-hidden border border-green-900 bg-white text-green-900 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-900 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4">
          <span className="relative z-10">Add Product</span>
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
