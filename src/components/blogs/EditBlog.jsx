import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

  // States 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
        const blog = await response.json();
        
        setTitle(blog.title);
        setContent(blog.content)
        setImage(blog.image)
        setVideoUrl(blog.videoUrl)
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);


  const handleEditBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("videoUrl", videoUrl);



    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/blogs");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
};


  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleEditBlog} className="mb-8">
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
          <span className="relative z-10">Edit Blog</span>
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
