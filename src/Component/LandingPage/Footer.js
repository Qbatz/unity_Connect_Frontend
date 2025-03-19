/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import UnityConnectLetter from "../../Asset/Icons/UnityConnectLetter.svg";
import FB from "../../Asset/Icons/Facebook.svg";
import Twitter from "../../Asset/Icons/Twitter.svg";
import LinkedIn from "../../Asset/Icons/LinkedIn.svg";
import Instagram from "../../Asset/Icons/Instagram.svg";

const Footer = () => {
  return (

    <footer className="bg-[#FAF9FF] w-full py-10 px-5 lg:px-20 mt-20">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-10">
        <div className="sm:col-span-12 md:col-span-12 lg:col-span-6">
          <img src={UnityConnectLetter} alt="Unity Connect" className="lg:w-[231px] lg:h-[33px] mb-2" />
          <p className="text-gray-700 text-xl font-Gilroy font-normal leading-[25.6px] mt-5">
            Invest as a community, withdraw with
            <span className="block font-Gilroy">trust, and repay with growth.</span>
          </p>
        </div>

        <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 text-2xl mb-4 font-Gilroy">Company</h3>
            <ul className="text-gray-600 text-xl space-y-6 font-Gilroy">
              <li><a href="#">About</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Product</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-2xl mb-4 font-Gilroy">Resources</h3>
            <ul className="text-gray-600 text-xl space-y-6 font-Gilroy">
              <li><a href="#">Careers</a></li>
              <li><a href="#">Downloads</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-2xl mb-4 font-Gilroy">Help</h3>
            <ul className="text-gray-600 text-xl space-y-6 font-Gilroy">
              <li><a href="#">Terms of use</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mt-20">
        <p className="font-Outfit font-light text-base">
          <span className="text-lg">&copy;</span> 2025 Unity Connect. All rights reserved
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0 lg:mr-80 justify-end">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src={FB} alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src={Twitter} alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src={LinkedIn} alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <img src={Instagram} alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
