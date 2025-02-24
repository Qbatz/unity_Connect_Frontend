import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UnityConnectLetter from '../Icons/UnityConnectLetter.svg';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  const navigate = useNavigate();



const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); 
  };

  return (
    <nav className="w-full px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
    
        <div className="flex items-center space-x-2">
          <img src={UnityConnectLetter} alt="Logo"  />
         
        </div>

 
        <ul className="hidden md:flex font-Gilroy items-center space-x-20 text-black text-base font-medium">
          <li className="text-black  hover:text-black">How it works</li>
          <li className="text-black hover:text-black">Why us</li>
          <li className="text-black hover:text-black">About</li>
          <li className="text-black hover:text-black">Testimonials</li>
        </ul>

        <div className="hidden md:flex items-center space-x-6">
        <button className="text-black font-Gilroy hover:text-black" onClick={() => handleNavigation("/sign-in")}>
            Sign in
          </button>
          <button className="bg-#7F00FF lg:w-[161px] lg:h[51px] text-base font-Gilroy text-white p-[20px] pr-[24px] pb-[20px] pl-[24px]
 rounded-2xl">
            Get Started
          </button>
        </div>

    
        <button
          className="md:hidden flex items-center text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

 
      {isOpen && (
        <div className="md:hidden mt-4 bg-white  rounded-lg p-4">
          <ul className="flex flex-col font-Gilroy items-center space-y-4 text-black text-base font-medium">
            <li className="text-black hover:text-black">How it works</li>
            <li className="text-black hover:text-black">Why us</li>
            <li className="text-black hover:text-black">About</li>
            <li className="text-black hover:text-black">Testimonials</li>
            <button className="text-black">Sign in</button>
            <button className="bg-#7F00FF text-white p-[20px] pr-[24px] pb-[20px] pl-[24px]
 rounded-2xl">
              Get Started
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
