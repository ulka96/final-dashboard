import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

   // States
  const [imageUrl, setImageUrl] = useState(null)

  // Refs
  const fileInputRef = useRef()
  const titleRef = useRef()
  const priceRef = useRef()
  const categoryRef = useRef()
  const materialRef = useRef()
  const descriptionRef = useRef()
  const quantityRef = useRef()
  const colorRef = useRef()
  const skuRef = useRef()
  const slugRef = useRef()
  const ratingRef = useRef()



  const navigate = useNavigate();

  // Event handlers
  const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    setImageUrl(URL.createObjectURL(file))
  } 
  }
  
  const handleAddProduct = async(e) => {
    e.preventDefault()

    const title = titleRef.current.value.trim()
    const price = priceRef.current.value.trim()
    const category = categoryRef.current.value.trim()
    const material = materialRef.current.value.trim()
    const description = descriptionRef.current.value.trim()
    const quantity = quantityRef.current.value.trim()
    const color = colorRef.current.value.trim()
    const sku = skuRef.current.value.trim()
    const slug = slugRef.current.value.trim()
    const rating = ratingRef.current.value.trim()
    const file = fileInputRef.current.files[0]


    const formData = new FormData()
    formData.append("title", title)
    formData.append("price", price)
    formData.append("category", category)
    formData.append("material", material)
    formData.append("description", description)
    formData.append("quantity", quantity)
    formData.append("color", color)
    formData.append("sku", sku)
    formData.append("slug", slug)
    formData.append("rating", rating)



    if (file) {
      formData.append("productPic", file)
    }


    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await response.json()

      console.log(data)
      console.log(response)
     
    } catch (error) {
      console.error("Fetch error:", error);
    }



  }
  




  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleAddProduct} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Form alanları */}
          <input 
            type="text" 
            placeholder="Title" 
            ref={titleRef} 
            
            className="border p-2" 
            required 
          />
          <input 
            type="number" 
            placeholder="Price" 
            ref={priceRef} 
            
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Category" 
            ref={categoryRef} 
            
            className="border p-2" 
            required 
          />
          <input 
            type="file" 
            placeholder="Image" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Material" 
            ref={materialRef}
            className="border p-2" 
            required 
          />
          <input 
            type="text" 
            placeholder="Color (comma separated)" 
            ref={colorRef}
            className="border p-2" 
            required 
          />
          <textarea 
            placeholder="Description" 
            ref={descriptionRef}
            className="border p-2" 
            required 
          />
          <input 
            type="number" 
            placeholder="Quantity" 
            ref={quantityRef}
            className="border p-2" 
            required 
          />

             <input 
            type="text" 
            placeholder="Slug" 
            ref={slugRef}
            className="border p-2" 
            required 
          />

             <input 
            type="text" 
            placeholder="SKU" 
            ref={skuRef}
            className="border p-2" 
            required 
          />

            <input 
            type="text" 
            placeholder="rating" 
            ref={ratingRef}
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