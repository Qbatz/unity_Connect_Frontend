import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Diamond from '../../Asset/Icons/DiamondGreen.svg';

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


      <div className="mt-20 flex flex-col" data-testid='get-answer-container'>
        <h2
          className="text-6xl font-Gilroy font-bold leading-[67.2px] text-gray-900 text-center"

        >
          Get answers to some FAQs
        </h2>
        <p
          className="text-lg font-Gilroy font-light leading-[28.8px] text-gray-500 text-center mt-4 mb-5"

        >
          Take a look at our most Frequently Asked Questions
        </p>
      </div>
      <div className="relative mt-10">
        <img
          src={Diamond}
          alt="Pink Spiral"
          className="hidden lg:block absolute right-[-50px] top-[-200px] w-218 h-217 "
        />
      </div>


      <div className="container mx-auto text-center px-12 mt-16">


        <div className="mt-8 bg-#FAF9FF rounded-[40px] p-5 pr-10 border-l-[1px] border-violet-700 border-t-[1px] border-r-[1px] border-b-[1px] border-teal-500 border-t-violet-500 border-r-teal-500 border-b-teal-500">
          
          {faqs.map((faq, index) => (
            <div key={index}
              className="border-b border-[#C3C3C3] last:border-none"
            >
              <button
                data-testid={`button-toggle-faq-${index}`}
                className="w-full flex justify-between items-center text-left py-4 px-4 text-black font-500 text-xl rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className="text-xl font-medium leading-32 font-Gilroy py-5 text-gray-800"

                >
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <FaChevronUp className="text-#000000" />
                ) : (
                  <FaChevronDown className="text-#000000" />
                )}
              </button>
              {openIndex === index && (
                <div data-testid='div-answers' className="px-4 pb-4 text-#000000 text-sm">{faq.answer}</div>
              )}

            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default FAQSection;
