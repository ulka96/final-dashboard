import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const AdminProductTable = () => {

  const [products, setProducts] = useState([])

const fetchProducts = async () =>{
  try {
    console.log("object")
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

  useEffect(() => {
    fetchProducts();
  }, [])


  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
      });

      console.log("Deleting product with id:", productId);


      if (!response.ok) {
        const data = await response.json();
      };
      
      setProducts(products.filter(products => products._id !== productId));
    } catch (error) {
      console.error('Error deleting products:', error);
    }

    console.log("mongoid", products._id)
  };


  // Edit

  const handleEdit = async (productId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? updatedProduct : product
          )
        );
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      fetchProducts();
    }
  };

  return (
    <div className="my-8 mx-8 overflow-x-auto max-w-[1200px]">
  <Link to="/AddProduct" >
        <button className="mb-4 p-2  relative h-[50px] w-40 overflow-hidden 
    border border-green-900 bg-white text-green-900 shadow-2xl transition-all
    before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full
     before:bg-green-900 before:duration-500 after:absolute after:bottom-0
     after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900
     after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4
     hover:after:h-2/4"> <span className="relative z-10">Add Product</span></button>
  </Link>

    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
        <th className="py-2 px-4 border text-[14px] border-gray-300">ID</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">image</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">title</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">price</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">category</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">material</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">color</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">description</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">quantity</th>
            <th className="py-2 px-4 border text-[14px] border-gray-300">SKU</th>
            <th className="py-2 px-4 border text-[14px] border-gray-300">Slug</th>

        </tr>
      </thead>
      <tbody>
          {products&&products.map((products) => (
            <tr key={products._id} className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300 text-[14px]">{products._id}</td>

              <td className="py-2 px-4 border border-gray-300">
                <img src={`http://localhost:3000/${products.productPic}`}/>
                
                </td>
              <td className="py-2 px-4 border text-[14px]  border-gray-300">{products.title}</td>
              <td className="py-2 px-4 border text-[14px] items-center text-center justify-center border-gray-300">{products.price}</td>
              <td className="py-2 px-4 border text-[14px] items-center text-center justify-center border-gray-300">{products.category}</td>
              <td className="py-2 px-4 border text-[14px] items-center text-center justify-center border-gray-300">{products.material}</td>
              <td className="py-2 px-4 border text-[14px] items-center text-center justify-center border-gray-300">{products.color}</td>
              <td className="py-2 px-4 border text-[14px] items-center text-center justify-center border-gray-300">{products.description}</td>
              <td className="py-2 px-4 border text-[14px]  items-center text-center justify-center border-gray-300">{products.quantity}</td>
              <td className="py-2 px-4 border text-[14px]  items-center text-center justify-center border-gray-300">{products.sku}</td>
              <td className="py-2 px-4 border text-[14px]  items-center text-center justify-center border-gray-300">{products.slug}</td>
              <td className="py-2 px-4 border text-[14px] items-center text-center justify-center border-gray-300">
              <Link to={`/products/${products._id}`}>
         
    <button onClick={() => handleEdit(products._id)} className="group relative min-h-[50px] w-40 overflow-hidden border border-purple-500 bg-white text-purple-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
      <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                    <span className="absolute text-[14px] bottom-0 left-0 right-0 
                      top-0 z-10 flex h-full w-full items-center
                      justify-center group-hover:text-white">Edit</span>
    </button>
              </Link>
                <button onClick={() => handleDelete(products._id)} className="text-red text-[14px] 
              hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden
              border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all
              before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full
              before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white
               hover:shadow-red-500 hover:before:left-0 hover:before:w-full"><span className="relative z-10 
               text-[14px]">Delete</span></button>

                {/* <button onClick={() => handleDelete(products._id)} className="mb-4 p-2 bg-blue-500
               text-white">Delete</button> */}

              </td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
  )
}

export default AdminProductTable