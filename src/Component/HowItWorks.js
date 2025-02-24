import React from "react";
import HowItWorksImage from "../Icons/HowItWorksTw.svg";
import PurpleDot from "../Icons/PurpleDot.svg";
import Line from "../Icons/Line 10.svg";

const HowItWorks = () => {
  return (
    <div className="relative container mx-auto px-6 mt-20 flex flex-col lg:flex-row items-center gap-10">
      <div className="lg:w-1/2">
        <h2 className="text-4xl text-5xl  font-bold text-black mb-6 leading-67.2
         tracking-[0%] font-Gilroy">
          How It Works
        </h2>

        <div className="space-y-8">
          {[
            {
              title: "Invest",
              description:
                "Pool your funds into a shared account and watch your investment grow with competitive interest rates.",
            },
            {
              title: "Withdraw",
              description:
                "In urgent situations, access your funds by presenting two witnesses from within our trusted community.",
            },
            {
              title: "Repay",
              description:
                "Return the amount at your convenience with the accrued interest, ensuring the collective pot thrives.",
            },
          ].map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
             <div className="relative flex flex-col items-center mt-2">
  <img src={PurpleDot} alt="Step Indicator" className="lg:w-24 lg:h-24  md:w-24 md:h-24  sm:w-24 sm:h-24" />
  {index !== 2 && (
    <div className="w-[1px] h-[90px] border-l-[5px] border-dashed border-gray"></div>
  )}
</div>

              <div>
                <h3 className="text-2xl mt-1 font-semibold text-black leading-38.4 tracking-[0%] font-Gilroy">
                  {step.title}
                </h3>
                <p className="text-lg text-black mt-2 font-normal leading-28.8 tracking-[0%] font-Gilroy">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0  hidden lg:block lg:-mr-40">
        <img
          src={HowItWorksImage}
          alt="How It Works UI"
          className="w-500 max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
