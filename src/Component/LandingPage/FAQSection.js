import React, { useState } from "react";
import Diamond from '../../Asset/Icons/DiamondGreen.svg';
import ArrowDown from '../../Asset/Icons/arrow-down.svg';

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
   
    <div className="mt-20 flex flex-col items-center text-center px-4 " data-testid='get-answer-container'>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-Gilroy font-bold text-gray-900">
        Get answers to some FAQs
      </h2>
      <p className="text-base sm:text-lg font-Gilroy font-light leading-relaxed text-black mt-4 mb-5">
        Take a look at our most Frequently Asked Questions
      </p>
    </div>


    <div className="relative mt-10">
      <img
        src={Diamond}
        alt="Diamond Spiral"
        className="hidden lg:block absolute right-[-50px] top-[-200px] w-[218px] h-[217px]"
      />
    </div>

   
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mt-10">
      <div className="bg-[#FAF9FF] rounded-[40px] p-4 sm:p-6 md:p-8 border border-teal-500">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-[#C3C3C3] last:border-none">
            <button  data-testid={`button-toggle-faq-${index}`}
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left py-4"
            >

              <span
                className="faq-content text-xl font-Gilroy font-medium leading-32 font-Gilroy py-5 text-gray-800"

              >
                {faq.question}
              </span>

              <span className="ml-2 flex-shrink-0">
                <img src={ArrowDown} alt="Toggle icon" className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} />
              </span>
            </button>

            {openIndex === index && (
              <div data-testid='div-answers'  className="text-sm sm:text-base text-black px-2 pb-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default FAQSection;



