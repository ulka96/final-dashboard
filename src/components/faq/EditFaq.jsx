import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditFaq = () => {
  const navigate = useNavigate();
  const { faqId } = useParams();
  console.log('faqId:', faqId);

  // States 
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");


  useEffect(() => {
    const fetchFaq = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/faqs/${faqId}`);
          const faq = await response.json();
          console.log(faq)
          
          setQuestion(faq?.question);
          setAnswer(faq?.answer);
        } catch (error) {
          console.error("Failed to fetch FAQ:", error);
        }
      };
      
      
      fetchFaq();
  }, [faqId]);
   

  const handleEditFaq = async (e) => {
    e.preventDefault();

    const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);


    try {
      const response = await fetch(`http://localhost:3000/api/faqs/${faqId}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/faqs");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
};


  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleEditFaq} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Question" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2" 
            required 
          />
          
          <input 
            type="text" 
            placeholder="Answer" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2" 
            required 
          />
        </div>
        <button className="mt-4 p-2 relative h-[50px] w-40 overflow-hidden border border-green-900 bg-white text-green-900 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-900 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4">
          <span className="relative z-10">Edit Faq</span>
        </button>
      </form>
    </div>
  );
};

export default EditFaq;
