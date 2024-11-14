import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'


const AdminFaqTable = () => {

const [faqs, setFaqs] = useState([])

const fetchFaqs = async () =>{
  try {
    console.log("object")
    const response = await fetch('http://localhost:3000/api/faqs');
    if (!response.ok) throw new Error('Failed to fetch faqs');
    const data = await response.json();
    setFaqs(data);
  } catch (error) {
    console.error('Error fetching faqs:', error);
  }
}

  useEffect(() => {
    fetchFaqs();
  }, [])


  const handleFaqDelete = async (faqId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/faqs/${faqId}`, {
        method: 'DELETE',
      });

      console.log("Deleting faq with id:", faqId);


      if (!response.ok) {
        const data = await response.json();
      };
      
      setFaqs(faqs.filter(faq => faq._id !== faqId));
    } catch (error) {
      console.error('Error deleting faqs:', error);
    }

    // console.log("mongoid", faq._id)
  };


  // Edit

  const handleFaqEdit = async (faqId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/faqs/${faqId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedFaq = await response.json();

        setFaqs((prevFaqs) =>
          prevFaqs.map((faq) =>
            faq._id === faqId ? updatedFaq : faq
          )
        );
      } else {
        console.error("Failed to update faq");
      }
    } catch (error) {
      console.error("Error updating faq:", error);
    } finally {
        fetchFaqs();
    }
  };

  return (
    <div className="my-8 mx-8 overflow-x-auto max-w-[1200px]">
  <Link to="/addFaq" >
        <button className="mb-4 p-2  relative h-[50px] w-40 overflow-hidden 
    border border-green-900 bg-white text-green-900 shadow-2xl transition-all
    before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full
     before:bg-green-900 before:duration-500 after:absolute after:bottom-0
     after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900
     after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4
     hover:after:h-2/4"> <span className="relative z-10">Add Faq</span></button>
  </Link>

    <table className=" mt-3 bg-white border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
        <th className="py-2 px-4 border text-[14px] border-gray-300">ID</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">question</th>
          <th className="py-2 px-4 border text-[14px] border-gray-300">answer</th>
        </tr>
      </thead>
      <tbody>
          {faqs && faqs.map((faq) => (
            <tr key={faq._id} className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-8 border border-gray-300 text-[14px]">{faq._id}</td>

              <td className="py-2 px-8 border text-[14px]  border-gray-300">{faq.question}</td>
              <td className="py-2 px-8 border text-[14px]  border-gray-300">{faq.answer}</td>

                  <td className=" border text-[14px] items-baseline flex flex-col py-2 px-8 space-x-3  border-gray-300">
                      
              <Link to={`/faqs/${faq._id}`}>
                          <button onClick={() => handleFaqEdit(faq._id)} className="group relative min-h-[50px] w-40 
                overflow-hidden border border-purple-500 bg-white text-purple-500 shadow-2xl transition-all
                before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-purple-500
                before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4
                 after:bg-purple-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                              <span className="top-0 flex  items-center justify-center before:absolute 
               before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-purple-500
               before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4
                after:bg-purple-500 after:duration-500 hover:text-white group-hover:before:h-full
                group-hover:after:h-full"></span>
                    <span className="absolute text-[14px] bottom-0 left-0 right-0 
                      top-0 z-10 flex  items-center
                      justify-center group-hover:text-white">Edit</span>
               </button>
                </Link>
                  
                <button onClick={() => handleFaqDelete(faq._id)} className="text-red text-[14px] 
              hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden 
              border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all
              before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full
              before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white
               hover:shadow-red-500 hover:before:left-0 hover:before:w-full"><span className="relative z-10 
               text-[14px]">Delete</span></button>



              </td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
  )
}

export default AdminFaqTable