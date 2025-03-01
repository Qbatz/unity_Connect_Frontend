import React from "react";
import PeopleUnity from '../../Asset/Icons/People -unityconnect.svg';
import MoneyBag from '../../Asset/Icons/MoneyBag.svg';
import SearchNote from '../../Asset/Icons/SearchNote.svg';
import PinkSpiril from '../../Asset/Icons/PinkSpiril.svg';

const WhyUnityConnect = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-200 mt-20">


        <img
          src={PinkSpiril}
          alt="Pink Spiral"
          className="hidden lg:block w-218 h-217  rotate-[20.84deg] left-200 pr-100 rotate-[1.05deg]"
        />

        <p className="font-Gilroy font-bold text-6xl leading-[67.2px] tracking-normal text-center lg:text-left">
          Why Unity Connect
        </p>

      </div>

      <div className="container mx-auto">


        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 px-5 gap-6 mt-10">


          <div className="bg-#FAF9FF p-6 shadow-lg rounded-60 border border-gray-200 flex flex-col items-center text-center">
            <img src={PeopleUnity} alt="Community Driven" />
            <h3 className="font-Gilroy font-semibold text-3xl leading-[33.6px] tracking-normal">
              Community-Driven
            </h3>
            <p className="mb-10 font-Gilroy font-normal text-lg leading-[28.8px] tracking-normal text-center text-gray-600 mt-5">
              Every member’s success is our collective triumph.
            </p>
          </div>


          <div className="bg-#FAF9FF p-6 shadow-lg rounded-60 border border-gray-200 flex flex-col items-center text-center">
            <img src={MoneyBag} alt="Flexible" />
            <h3 className="font-Gilroy font-semibold text-3xl leading-[33.6px] tracking-normal">
              Flexible
            </h3>
            <p className="mb-10 font-Gilroy font-normal text-lg leading-[28.8px] tracking-normal text-center text-gray-600 mt-5">
              Your emergency shouldn’t be a roadblock to your financial goals.
            </p>
          </div>

          <div className="bg-#FAF9FF p-6 shadow-lg rounded-60 border border-gray-200 flex flex-col items-center text-center">
            <img src={SearchNote} alt="Transparent" className="mt-5" />
            <h3 className="font-Gilroy font-semibold text-3xl leading-[33.6px] tracking-normal mt-45">
              Transparent
            </h3>
            <p className="mb-10 font-Gilroy font-normal text-lg leading-[28.8px] tracking-normal text-center text-gray-600 mt-5">
              Clear terms, no hidden fees, and a system built on trust.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default WhyUnityConnect;
