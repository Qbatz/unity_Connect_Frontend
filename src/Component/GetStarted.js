import React from "react";
import UnityConnectWhiteLetter from "../Icons/UnityConnectWHiteLeter.svg";
import GetStartedBackgroundImage from "../Icons/GetStartedBG.svg";
import VectorOne from "../Icons/Vector-1.svg";
import VectorTwo from "../Icons/Vector-2.svg";
import VectorThree from "../Icons/Vector-3.svg";
import VectorFour from "../Icons/Vector-4.svg";

function GetStarted() {
  return (
    <div className="container mx-auto p-6 relative mt-20">
      <div
        className="relative bg-black bg-opacity-10 border border-black rounded-60 p-12 text-center shadow-lg"
        style={{
          backgroundImage: `url(${GetStartedBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "black",
        }}
      >
        <img
          src={VectorOne}
          className="absolute top-[0px] left-[0px] hidden lg:block"
          alt="Vector One"
        />
        <img
          src={VectorTwo}
          className="absolute top-[-0px] left-[00px] hidden lg:block"
          alt="Vector Two"
        />
        <img
          src={VectorThree}
          className="absolute bottom-[0px] right-[0px] hidden lg:block"
          alt="Vector Three"
        />
        <img
          src={VectorFour}
          className="absolute bottom-[0px] right-[0px] hidden lg:block"
          alt="Vector Four"
        />

   
        <img src={UnityConnectWhiteLetter} className="mb-4 mx-auto" alt="Unity Connect" />

        <h2 className="font-Gilroy font-bold text-6xl leading-[67.2px] text-white mt-5">
          Ready to Make Your <br /> <span>Money Work for You?</span>
        </h2>

        <p className="font-Gilroy font-light text-lg leading-[28.8px] text-white mt-6">
          Join now and be part of a new era of collaborative investment.
        </p>


        <button className="lg:mb-10 mt-10 bg-#7F00FF font-Raleway text-lg text-white p-32 rounded-2xl lg:w-232 h-85">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default GetStarted;
