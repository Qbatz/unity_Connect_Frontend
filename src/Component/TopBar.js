import React, { useState } from "react";
import UnityConnectLetter from "../Icons/UnityConnectLetter.svg";
import { Menu, X } from "lucide-react"; 

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="container mx-auto flex items-center justify-between px-6 py-4 ">
 <div className="flex items-center space-x-2 md:pr-[20px] lg:pr-[20px]">
  <img 
    src={UnityConnectLetter} 
    alt="Logo" 
    className="w-[120px] h-auto min-w-[100px] md:w-[150px] lg:w-[180px]" 
  />
</div>


<ul className="hidden md:flex items-center text-[#000000]-500 text-[16px] md:text-[15px] sm:text-[14px] font-medium leading-[18.83px] 
  space-x-[80px] md:space-x-[60px] sm:space-x-[40px]">
  <li className="hover:text-black cursor-pointer whitespace-nowrap">How it works</li>
  <li className="hover:text-black cursor-pointer whitespace-nowrap">Why us</li>
  <li className="hover:text-black cursor-pointer">About</li>
  <li className="hover:text-black cursor-pointer">Testimonials</li>
</ul>


<div className="hidden md:flex items-center space-x-[22px] lg:space-x-[20px] sm:space-x-[20px]">
  <button className="md:pl-[20px] lg:pl-[20px] text-[#000000]-500 hover:text-black text-[16px] md:text-[15px] sm:text-[14px] font-medium leading-[18.83px] whitespace-nowrap">
    Sign in
  </button>

  <button className="bg-[#7F00FF] text-white w-[161px] h-[59px] px-6 py-5 rounded-[16px] 
   hover:bg-purple-700 text-[16px] font-semibold leading-[19.09px]">
    Get Started
  </button>
</div>





    
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

  
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700">
            <li className="hover:text-black cursor-pointer">How it works</li>
            <li className="hover:text-black cursor-pointer">Why us</li>
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Testimonials</li>
            
            <button className="text-gray-700 hover:text-black">Sign in</button>
            <button className="bg-[#7F00FF] text-white px-4 py-2 rounded-full ">
              Get Started
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
