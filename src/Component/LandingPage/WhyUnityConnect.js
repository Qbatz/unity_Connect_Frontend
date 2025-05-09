import React from "react";
import PeopleUnity from '../../Asset/Icons/People -unityconnect.svg';
import MoneyBag from '../../Asset/Icons/MoneyBag.svg';
import SearchNote from '../../Asset/Icons/SearchNote.svg';
import PinkSpiril from '../../Asset/Icons/PinkSpiril.svg';

const WhyUnityConnect = () => {





  return (
    <>
      <div className="w-full px-0 py-10">

        <div className="relative flex flex-col items-center lg:flex-row lg:items-start lg:justify-center  py-8">
          <div className="absolute left-[-45px] top-1/2 -translate-y-1/2 hidden lg:block">
            <img
              src={PinkSpiril}
              alt="Pink Spiral"
              className=" w-[218px] h-[217px] rotate-[0.05deg]"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold  font-Gilroy text-center">
            Why Unity Connect?
          </h2>

        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-8">

          <div className="bg-[#FAF9FF] p-6 rounded-[40px] flex flex-col items-center text-center border border-t-[#7F00FF] border-l-[#7F00FF] border-b-[#0086FF] border-r-[#0086FF]">
            <img src={PeopleUnity} alt="Community Driven" />
            <h3 className="text-3xl font-semibold font-Gilroy ">Community-Driven</h3>
            <p className="text-black mt-3 text-lg leading-relaxed  max-w-[250px] font-normal font-Gilroy">
              Every member’s success is our collective triumph.
            </p>
          </div>


          <div className="bg-[#FAF9FF] p-6 rounded-[40px] flex flex-col items-center text-center border border-t-[#7F00FF] border-l-[#7F00FF] border-b-[#0086FF] border-r-[#0086FF]">
            <img src={MoneyBag} alt="Flexible" />
            <h3 className="text-3xl font-semibold font-Gilroy  ">Flexible</h3>
            <p className="text-black  text-lg leading-relaxed  max-w-[300px] font-normal font-Gilroy">
              Your emergency shouldn’t be a roadblock to your financial goals.
            </p>
          </div>


          <div className="bg-[#FAF9FF] p-6 rounded-[40px] flex flex-col items-center text-center border border-t-[#7F00FF] border-l-[#7F00FF] border-b-[#0086FF] border-r-[#0086FF]">
            <img src={SearchNote} alt="Transparent" />
            <h3 className="text-3xl font-semibold font-Gilroy mt-14">Transparent</h3>
            <p className="text-black mt-3 text-lg leading-relaxed  max-w-[250px] font-normal font-Gilroy">
              Clear terms, no hidden fees, and a system built on trust.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyUnityConnect;
