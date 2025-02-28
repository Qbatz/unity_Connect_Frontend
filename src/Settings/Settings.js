import React, { useState } from "react";
import ExpensesSetting from "./ExpensesSetting";
import LoanSetting from "./LoanSetting";
import MemberID from "./MemberID";
import LoanID from "./LoanID";
import Payment from "./Payment";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Member ID");

  return (
    <div className="container mx-auto ">
      <h2 
        className="text-[24px] font-semibold font-Gilroy leading-[28.63px] text-black mb-4"
        style={{ fontFamily: "Gilroy", letterSpacing: "0%" }}
      >
        Settings
      </h2>

      
      <div className="border-b border-gray-300 flex overflow-x-auto whitespace-nowrap flex-nowrap gap-8 md:gap-10 lg:gap-[75px] scrollbar-hide">
        {["Member ID", "Loan ID", "Subscription", "Loan", "Interest", "Returns", "Expenses", "Payment"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative min-w-max ${
              activeTab === tab ? "text-purple-600 font-semibold" : "text-[#939393]"
            }`}
          >
            {tab}
            <span
              className={`absolute left-0 bottom-0 h-[3px] w-full transition-all ${
                activeTab === tab ? "bg-purple-600" : "bg-transparent"
              }`}
            ></span>
          </button>
        ))}
      </div>

     
      <div className="mt-6">
        {activeTab === "Loan" && <LoanSetting />}
        {activeTab === "Expenses" && <ExpensesSetting />}
        {activeTab === "Member ID" && <MemberID />}
        {activeTab === "Loan ID" && <LoanID />}
        {activeTab === "Payment" && <Payment />}
      </div>
    </div>
  );
};

export default Settings;
