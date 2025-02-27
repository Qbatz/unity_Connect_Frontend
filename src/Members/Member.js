import React, { useState } from "react";
import ActiveMember from "./Activemember";
import NonActiveMember from "./NonActivemember";



const Members = () => {
  const [activeTab, setActiveTab] = useState("Active members");

  return (
    <div className="container mx-auto mt-4">
      <h2
        className="text-[24px] font-semibold font-Gilroy leading-[28.63px] text-black mb-4"
        style={{ letterSpacing: "0%" }}
      >
        Members
      </h2>
      <div className="flex overflow-x-auto whitespace-nowrap flex-nowrap gap-8 scrollbar-hide">
        {["Active members", "Non active members"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative min-w-max ${activeTab === tab ? "text-black font-semibold" : "text-[#939393]"
              }`}
          >
            {tab}
            <span
              className={`absolute left-0 bottom-0 h-[3px] w-full transition-all ${activeTab === tab ? "bg-black" : "bg-transparent"
                }`}
            ></span>
          </button>
        ))}
      </div>



      <div className="mt-8">
        {activeTab === "Active members" && <ActiveMember />}
        {activeTab === "Non active members" && <NonActiveMember />}
      </div>
    </div>
  );
};

export default Members;
