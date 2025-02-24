import React from "react";
import MoneyBag from "../Icons/CashBag.svg"; 
import FlyingDollar from "../Icons/CashwithWings.svg"; 

const MeetUnityConnect = () => {
  return (
    <div className="container">
      <div className="relative flex flex-col items-center text-center px-6 py-10 md:px-10 lg:px-16">


        <img
          src={MoneyBag}
          alt="Money Bag"
          className="hidden md:hidden sm:hidden lg:block absolute w-[150px] h-auto 
          top-[210px] left-[120px] transform rotate-[0.16deg]"
        />

        <div className="text-black font-medium text-base sm:text-lg leading-[28.8px] text-center px-4 py-1 
        rounded-full inline-block font-Outfit">
          👋 MEET UNITY CONNECT
        </div>

    
        <div className="text-[60px] sm:text-[50px] md:text-[70px] lg:text-[80px] leading-[1.1] text-center">
          <span className="text-purple-600 font-normal font-kalam">Invest</span>{" "}
          <span className="text-black font-bold font-Gilroy">Together</span>,
          <br />
          <span className="text-black font-bold font-Gilroy">Grow</span>{" "}
          <span className="text-black font-light font-Gilroy">Together</span>
        </div>

  
        <p className="text-black font-Gilroy text-base sm:text-lg leading-[24px] sm:leading-[28.8px] text-center font-normal mt-6">
          Join a community of investors who thrive on mutual support and collective growth.
        </p>

    
        <button className="mt-5 font-Raleway rounded-2xl bg-[#7F00FF] text-white 
        px-5 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4
        font-semibold text-base sm:text-lg hover:bg-[#7F00FF] transition">
          Join a community
        </button>

        <img
          src={FlyingDollar}
          alt="Flying Dollar"
          className="hidden md:hidden sm:hidden lg:block absolute w-[150px] h-auto 
          top-40 left-[1080px] transform rotate-[-6.59deg]"
        />

      </div>
    </div>
  );
};

export default MeetUnityConnect;
