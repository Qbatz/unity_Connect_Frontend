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
        className="hidden lg:block absolute w-[148.89px] h-auto 
        top-[205.12px] left-[140.59px] transform rotate-[4.16deg]"
      />


      <div className="text-black font-[500] text-[16px] sm:text-[18px] leading-[28.8px] tracking-[0%] text-center px-4 py-1 
      rounded-full inline-block font-[Outfit]">
        👋 MEET UNITY CONNECT
      </div>

    
      <div className="text-[40px] sm:text-[60px] md:text-[80px] leading-[50px] sm:leading-[72px] md:leading-[96px] text-center">
        <span className="italic text-purple-600 font-[400] font-[Kalam]">Invest</span>{" "}
        <span className="text-black font-[700] font-[Gilroy]">Together</span>,
        <br />
        <span className="text-black font-[700] font-[Gilroy]">Grow</span>{" "}
        <span className="text-[#000000]-700 font-[300] font-[Gilroy]">Together</span>
      </div>

     
      <p className="text-black text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28.8px] text-center font-[400] mt-4">
        Join a community of investors who thrive on mutual support and collective growth.
      </p>


      <button className="mt-5 rounded-[16px] bg-[#7F00FF] text-white 
      px-[20px] py-[16px] md:px-[32px] md:py-[24px] 
      font-[600] text-[16px] sm:text-[18px] font-semibold hover:bg-purple-700 transition">
        Join a community
      </button>

    
      <img
        src={FlyingDollar}
        alt="Flying Dollar"
        className="hidden lg:block absolute w-[150px] h-auto 
        top-[50px] left-[1080.79px] transform rotate-[-6.59deg]"
      />

    </div>
    </div>
  );
};

export default MeetUnityConnect;
