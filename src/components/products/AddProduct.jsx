import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux hooks
import { useDispatch } from 'react-redux';

// Actions
import { mainCategories, selectCategory } from '../../slices/category.slice.js';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // States for each field
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [sku, setSku] = useState("");
  const [slug, setSlug] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const [categories, setCategories] = useState([])
  // const [selectedCategory, setSelectedCategory] = useState("")
  
  // const selectCategoryHandler = (category) => {
  //   setSelectedCategory(category);
  // };

  // dispatch(selectCategory(selectedCategory))

  // console.log(selectedCategory)


  // Event handlers
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("material", material);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("color", color);
    formData.append("sku", sku);
    formData.append("slug", slug);
    formData.append("rating", rating);
    if (file) {
      formData.append("productPic", file);
    }

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      console.log(response);

      if (response.ok) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


  const fetchCategories = async() => {
    const response = await fetch("http://localhost:3000/api/categories")
    const data = await response.json()

    setCategories(data)
    
    dispatch(mainCategories(data))
  }
  
  useEffect(() => {
    fetchCategories()
  }, [])



  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId); 
  };
  
  

  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleAddProduct} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
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

          <select 
            value={category}
            onChange={handleCategoryChange}
            className="border p-2" 
            required
          >
            <option value="">Select a category</option>
            {categories && categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>




          <input 
            type="file" 
            placeholder="Image" 
            onChange={handleFileChange}
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Material" 
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
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
          <input 
            type="text" 
            placeholder="Slug" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="SKU" 
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Rating" 
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2" 
            required 
          />
        </div>
        <button className="mt-4 p-2 relative h-[50px] w-40 overflow-hidden border border-green-900 bg-white text-green-900 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-900 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4">
          <span className="relative z-10">Add Product</span>
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
