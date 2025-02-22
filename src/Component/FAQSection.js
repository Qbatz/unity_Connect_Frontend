import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Diamond from '../Icons/DiamondGreen.svg';

const faqs = [
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
        

<div className="mt-20 flex flex-col">
<h2
  className="text-[56px] font-bold leading-[67.2px] text-gray-900 text-center"
  
>
  Get answers to some FAQs
</h2>
<p
  className="text-[18px] font-light leading-[28.8px] text-gray-500 text-center mt-2"
  
>
  Take a look at our most Frequently Asked Questions
</p>
</div>
<div className="relative mt-10">
  <img 
    src={Diamond} 
    alt="Pink Spiral" 
    className="hidden lg:block absolute right-[0px] top-[-200px] w-[218px] h-[217px] "
  />
</div>

   
    <div className="container mx-auto text-center px-6 mt-20">


<div className="mt-6 bg-[#FAF9FF] rounded-[40px]  border border-purple-200 p-10 pr-10 ">
  {faqs.map((faq, index) => (
    <div key={index}
     className="border-b border-[#C3C3C3] last:border-none"
     >
      <button
        className="w-full flex justify-between items-center text-left py-4 px-4 text-[#000000] font-500 text-[20px] rounded-lg"
        onClick={() => toggleFAQ(index)}
      >
        <span
          className="text-[20px] font-medium leading-[32px] text-gray-800"
          style={{ fontFamily: "Gilroy" }}
        >
          {faq.question}
        </span>

        {openIndex === index ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </button>
      {openIndex === index && (
        <div className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</div>
      )}
    
    </div>
  ))}
</div>

    </div>
    </>
  );
};

export default FAQSection;
