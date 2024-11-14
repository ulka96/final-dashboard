import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate();

  // States for each field
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("videoUrl", videoUrl);

    try {
      const response = await fetch("http://localhost:3000/api/blogs", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      console.log(response);

      if (response.ok) {
        navigate("/blogs");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleAddBlog} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2" 
            required 
          />
          
          <textarea 
            type="text" 
            placeholder="Content" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2" 
            required 
          />

            <input 
            type="text" 
            placeholder="Image" 
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2" 
                  />  
                  
          <input 
            type="text" 
            placeholder="VideoUrl" 
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="border p-2" 
    
          />        

          
        </div>
        <button className="mt-4 p-2 relative h-[50px] w-40 overflow-hidden border border-green-900 bg-white text-green-900 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-900 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4">
          <span className="relative z-10">Add Blog</span>
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
