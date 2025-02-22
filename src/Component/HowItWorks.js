import React from "react";
import HowItWorksImage from "../Icons/HowItWorksTw.svg";
import PurpleDot from "../Icons/PurpleDot.svg";
import Line from "../Icons/Line 10.svg";

const HowItWorks = () => {
  return (
    <div className="relative container mx-auto px-6 mt-20 flex flex-col lg:flex-row items-center gap-10">
      <div className="lg:w-1/2">
        <h2 className="text-[36px] sm:text-[42px] lg:text-[56px] font-bold text-black mb-6 leading-[67.2px] tracking-[0%] font-gilroy">
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
              <div className="relative flex flex-col items-center">
                <img src={PurpleDot} alt="Step Indicator" className="w-[24px] h-[24px]" />
                {index !== 2 && <img src={Line} alt="Dashed Line" className="h-[90px]" />}
              </div>
              <div>
                <h3 className="text-[24px] font-[600] text-black leading-[38.4px] tracking-[0%] font-gilroy">
                  {step.title}
                </h3>
                <p className="text-[18px] text-black-600 leading-[28.8px] tracking-[0%] font-montserrat">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0  hidden lg:block lg:-mr-[40px]">
        <img
          src={HowItWorksImage}
          alt="How It Works UI"
          className="w-[500px] max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
