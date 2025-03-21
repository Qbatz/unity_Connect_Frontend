import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media (min-width: 750px) and (max-width: 810px) {
        .custom-text {
          font-size: 14px;
        }
      }
  
      @media (min-width: 200px) and (max-width: 270px) {
        .unity-logo {
          width: 150px;
        }
  
        .toggle-icon {
          width: 20px;
        }
      }
    `;

    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  return (
    <>
      <nav className="w-full px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">

          <div className="lg:p-5 flex items-center space-x-2">
            <img src={UnityConnectLetter} alt="Logo" className="unity-logo" />

          </div>

          <ul className="hidden md:flex font-Gilroy items-center space-x-6 md:space-x-8 lg:space-x-12 text-black text-sm md:text-base lg:text-lg font-medium custom-text">
            <li className="hover:text-gray-600 cursor-pointer">How it works</li>
            <li className="hover:text-gray-600 cursor-pointer">Why us</li>
            <li className="hover:text-gray-600 cursor-pointer">About</li>
            <li className="hover:text-gray-600 cursor-pointer">Testimonials</li>
          </ul>

          <div className="hidden md:flex items-center space-x-4 md:space-x-5 lg:space-x-6">
            <button
              data-testid='button-sign-in'
              className="text-black font-Gilroy hover:text-gray-600 text-sm md:text-base lg:text-lg custom-text"
              onClick={() => handleNavigation("/sign-in")}
            >
              Sign in
            </button>

            <button
              data-testid='button-create-account'
              onClick={() => handleNavigation("/create-account")}
              className="bg-[#7F00FF] text-white px-4 md:px-5  pt-[20px] pr-[24px] pb-[20px] pl-[24px] lg:px-6 py-2 rounded-2xl 
    text-sm md:text-base lg:text-lg  lg:w-[161px]
    font-Gilroy custom-text"

            >
              Get Started
            </button>
          </div>


          <button
            data-testid='button-menu'
            className="md:hidden flex items-center text-black toggle-icon"
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
              <button data-testid='button-signin' className="text-black" onClick={() => handleNavigation("/sign-in")}>Sign in</button>
              <button data-testid='button-create-account-2'
                onClick={() => handleNavigation("/create-account")} className="bg-#7F00FF text-white p-[20px] pr-[24px] pb-[20px] pl-[24px]
 rounded-2xl">
                Get Started
              </button>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default TopBar;
