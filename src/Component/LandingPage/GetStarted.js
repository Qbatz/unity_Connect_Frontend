import React from "react";
import UnityConnectWhiteLetter from "../../Asset/Icons/UnityConnectWHiteLeter.svg";
import GetStartedBackgroundImage from "../../Asset/Icons/GetStartedBG.svg";
import VectorOne from "../../Asset/Icons/Vector-1.svg";
import VectorTwo from "../../Asset/Icons/Vector-2.svg";
import VectorThree from "../../Asset/Icons/Vector-3.svg";
import VectorFour from "../../Asset/Icons/Vector-4.svg";
import { useNavigate } from "react-router-dom";

function GetStarted() {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);

  };


  return (
    <div className="container mx-auto p-4 sm:p-6 relative mt-10 sm:mt-20">
      <div
        className="relative border rounded-[60px] text-center shadow-lg overflow-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 lg:py-[100px]"
        style={{
          backgroundImage: `url(${GetStartedBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "black",
        }}
      >

        <img
          src={VectorOne}
          className="absolute top-0 left-0 hidden lg:block"
          alt="Vector One"
        />
        <img
          src={VectorTwo}
          className="absolute top-0 left-0 hidden lg:block"
          alt="Vector Two"
        />
        <img
          src={VectorThree}
          className="absolute bottom-0 right-0 hidden lg:block"
          alt="Vector Three"
        />
        <img
          src={VectorFour}
          className="absolute bottom-0 right-0 hidden lg:block"
          alt="Vector Four"
        />


        <img
          src={UnityConnectWhiteLetter}
          className="mb-4 mt-5 sm:mt-10 mx-auto w-[180px] sm:w-[240px] md:w-[300px]"
          alt="Unity Connect"
        />


        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-Gilroy font-semibold text-white mt-4 leading-snug sm:leading-snug lg:leading-[67.2px]">
          Ready to Make Your <br />
          <span>Money Work for You?</span>
        </h2>


        <p className="font-Gilroy font-light text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 mt-4 sm:mt-5 max-w-2xl mx-auto">
          Join now and be part of a new era of collaborative investment.
        </p>


        <button
          className="mt-6 sm:mt-10 bg-[#7F00FF] text-white text-sm sm:text-base md:text-lg font-Raleway px-6 py-2 sm:px-8 sm:py-3 rounded-2xl w-[160px] sm:w-[200px] md:w-[232px] h-[45px] sm:h-[60px] md:h-[85px]"
          onClick={() => handleNavigation("/create-account")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default GetStarted;


