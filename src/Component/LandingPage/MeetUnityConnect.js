import React from "react";
import MoneyBag from "../../Asset/Icons/MoneyBag.svg";
import FlyingDollar from "../../Asset/Icons/CashwithWings.svg";

const MeetUnityConnect = () => {

  return (

    <div className="container mx-auto mb-8">
      <div className="relative flex flex-col items-center text-center w-full px-4 py-10 sm:px-6 md:px-10 lg:px-20">


        <img
          src={MoneyBag}
          alt="Money Bag"
          className="hidden lg:block absolute w-[100px] sm:w-[130px] lg:w-[150px] h-auto top-[180px] left-[20px] lg:left-[120px] rotate-[0.16deg]"
        />


        <div className="text-black font-Outfit font-medium text-sm sm:text-base leading-[1.8] px-4 py-1 rounded-full">
          👋 MEET UNITY CONNECT
        </div>


        <div className="mt-4 text-[36px] sm:text-[45px] md:text-[60px] lg:text-[80px] leading-tight text-center">
          <span className="text-purple-600 font-kalam font-normal">Invest</span>{" "}
          <span className="text-black font-Gilroy font-bold">Together</span>,
          <br />
          <span className="text-black font-Gilroy font-bold">Grow</span>{" "}
          <span className="text-black font-Gilroy font-light">Together</span>
        </div>


        <p className="mt-6 text-black font-Gilroy font-normal text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed max-w-xl lg:max-w-full lg:whitespace-nowrap lg:overflow-auto lg:text-ellipsis">
          Join a community of investors who thrive on mutual support and collective growth.
        </p>



        <button
          className="mt-6 w-[180px] sm:w-[200px] md:w-[215px] py-4 text-white bg-[#7F00FF] rounded-2xl font-Raleway font-semibold text-sm sm:text-base hover:bg-[#6b00d6] transition"
        >
          Join a community
        </button>


        <img
          src={FlyingDollar}
          alt="Flying Dollar"
          className="hidden lg:block absolute w-[100px] sm:w-[130px] lg:w-[150px] top-10 right-[20px] lg:right-[60px] rotate-[-6.59deg]"
        />
      </div>
    </div>
  );
};

export default MeetUnityConnect;
