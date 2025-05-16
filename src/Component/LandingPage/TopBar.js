import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UnityConnectLetter from '../../Asset/Icons/UnityConnectLetter.svg';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {

      const isMobile = window.innerWidth <= 768;

      const yOffset = isMobile ? -280 : 0;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsOpen(false);
    }
  };



  return (
    <nav className="w-full px-4 sm:px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">

        <div className="flex items-center space-x-2">
          <img src={UnityConnectLetter} alt="Logo" className="w-[160px] sm:w-[180px] md:w-[200px]" />
        </div>



        <ul className="hidden md:flex items-center space-x-4 lg:space-x-10 font-Gilroy text-sm md:text-base lg:text-lg font-medium text-black">
          <li className="cursor-pointer hover:text-gray-600" onClick={() => scrollToSection("how-it-works")}>How it works</li>
          <li className="cursor-pointer hover:text-gray-600" onClick={() => scrollToSection("why-us")}>Why us</li>
          <li className="cursor-pointer hover:text-gray-600" onClick={() => scrollToSection("faq-section")}>About</li>
          <li className="cursor-pointer hover:text-gray-600" onClick={() => scrollToSection("get-started")}>Testimonials</li>
        </ul>


        <div className="hidden md:flex items-center space-x-4">
          <button data-testid='button-sign-in'
            className="text-black hover:text-gray-600 font-Gilroy text-sm md:text-base lg:text-lg"
            onClick={() => handleNavigation("/sign-in")}
          >
            Sign in
          </button>
          <button data-testid='button-create-account'
            onClick={() => handleNavigation("/create-account")}
            className="bg-[#7F00FF] text-white px-5 py-4 rounded-2xl text-sm md:text-base lg:text-lg font-Gilroy"
          >
            Get Started
          </button>
        </div>


        <button data-testid='button-menu'
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {isOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg p-4 space-y-4 text-center shadow-lg">

          <p onClick={() => scrollToSection("how-it-works")} className="cursor-pointer text-black hover:text-gray-600">How it works</p>
          <p onClick={() => scrollToSection("why-us")} className="cursor-pointer text-black hover:text-gray-600">Why us</p>
          <p onClick={() => scrollToSection("faq-section")} className="cursor-pointer text-black hover:text-gray-600">About</p>
          <p onClick={() => scrollToSection("get-started")} className="cursor-pointer text-black hover:text-gray-600">Testimonials</p>
          <button data-testid='button-signin'
            className="text-black" onClick={() => handleNavigation("/sign-in")}>Sign in</button>
          <button data-testid='button-create-account-2'
            onClick={() => handleNavigation("/create-account")}
            className="w-full bg-[#7F00FF] text-white px-5 py-2 rounded-2xl font-Gilroy">
            Get Started
          </button>

        </div>
      )}
    </nav>
  );
};

export default TopBar;
