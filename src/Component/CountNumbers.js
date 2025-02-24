import React from "react";
import CountUp from "react-countup";

const CountNumbers = () => {
  return (
    <div className="bg-#FAF9FF py-10 px-4 flex flex-wrap justify-around gap-6 text-center mt-20" >
     
      <div className="w-full sm:w-auto">
        <div className="text-6xl font-bold font-Gilroy text-black">
          <CountUp start={1} end={200} duration={2} />K
        </div>
        <div className="text-lg
 font-normal font-Gilroy text-black">
          Users use this platform
        </div>
      </div>

      
      <div className="w-full sm:w-auto">
        <div className="text-6xl
 font-bold font-Gilroy text-black">
          <CountUp start={1} end={30} duration={2} />K+
        </div>
        <div className="text-lg
 font-normal font-Gilroy text-black">
          Active users this month
        </div>
      </div>

      
      <div className="w-full sm:w-auto">
        <div className="text-6xl
 font-bold
 font-Gilroy text-black">
          <CountUp start={1} end={25} duration={2} />K+
        </div>
        <div className="text-lg
 font-normal font-Gilroy text-black">
          Available states
        </div>
      </div>
    </div>
  );
};

export default CountNumbers;
