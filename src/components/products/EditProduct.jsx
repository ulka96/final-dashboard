import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  // States for each field
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [newArrival, setNewArrival] = useState(false);

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
  const [categories, setCategories] = useState([]); // State for all categories

  // Fetch product data to prefill the form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${_id}`);
        const product = await response.json();
        
        setTitle(product.title);
        setPrice(product.price);
        setDiscountedPrice(product.discountedPrice)
        setDiscount(product.discount)
        setNewArrival(product.newArrival)
        setCategory(product.category); 
        setMaterial(product.material);
        setDescription(product.description);
        setQuantity(product.quantity);
        setColor(product.color);
        setSku(product.sku);
        setSlug(product.slug);
        setRating(product.rating);
        setImageUrl(product.productPic);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [_id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();
        setCategories(data); // Set all categories
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Event handlers
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId); // Only update local state
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("discountedPrice", discountedPrice);
    formData.append("discount", discount);
    formData.append("newArrival", newArrival);
    formData.append("category", category); 
    formData.append("material", material);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("color", color);
    formData.append("sku", sku);
    formData.append("slug", slug);
    formData.append("rating", rating);

    // Append the new image file if it exists, otherwise send the existing image URL
    if (file) {
      formData.append("productPic", file);
    } else {
      formData.append("existingImage", imageUrl); // Send the URL of the existing image
    }

    try {
      const response = await fetch(`http://localhost:3000/api/products/${_id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleEditProduct} className="mb-8">
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

            <input 
            type="number" 
            placeholder="Discounted price" 
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            className="border p-2" 
            required 
          />

            <input 
            type="number" 
            placeholder="Discount" 
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border p-2" 
            required 
          />

          <select 
            value={category} // Bind to category state
            onChange={handleCategoryChange} // Use handleCategoryChange for selection
            className="border p-2" 
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>

          <input 
            type="file" 
            placeholder="Image" 
            onChange={handleFileChange}
            className="border p-2" 
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

           <div className='flex flex-row items-center gap-2'>
           <label className="block font-medium">New Arrival</label>
           <input 
            type="checkbox" 
            placeholder="New Arrival" 
            checked={newArrival}
            onChange={(e) => setNewArrival(e.target.checked)}
            className="border p-6 " 
            />
          </div>

        </div>
        <button className="mt-4 p-2 relative h-[50px] w-40 overflow-hidden border border-green-900 bg-white text-green-900 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-900 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4">
          <span className="relative z-10">Edit Product</span>
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
