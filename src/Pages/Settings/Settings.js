import React, { useState } from "react";
import ExpensesSetting from "./ExpensesSetting";
import LoanSetting from "./LoanSetting";
import MemberID from "./MemberID";
import LoanID from "./LoanID";
import TransactionID from "./TransactionID";
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
      <div className="flex flex-col lg:flex-row w-full gap-3 lg:gap-[125px] justify-center items-center lg:items-center">

       {/* <div className="border-b border-gray-300 flex overflow-x-auto whitespace-nowrap flex-nowrap gap-8 md:gap-10 lg:gap-[125px] scrollbar-hide justify-center"> */}
        {["Member ID", "Loan ID", "Transaction ID", "Loan", "Expenses", "Payment"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-[16px] font-base font-Gilroy flex justify-center items-center text-center transition-all relative min-w-max ${activeTab === tab ? "text-[#7F00FF] font-semibold" : "text-[#939393]"
              }`}
          >
            {tab}
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] lg:w-[140px] transition-all ${activeTab === tab ? "bg-[#7F00FF]" : "bg-transparent"
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
        {activeTab === "Transaction ID" && <TransactionID />}
        {activeTab === "Payment" && <Payment />}
      </div>
    </div>
  );
};

export default Settings;
