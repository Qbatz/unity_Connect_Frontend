import React, { useState } from "react";
import ExpensesSetting from "./ExpensesSetting";
import LoanSetting from "./LoanSetting";
import MemberID from "./MemberID";
import LoanID from "./LoanID";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("Member ID");
  return (
    <div className="container mx-auto mt-10">
    <h2 
  className="text-[24px] font-semibold leading-[28.63px] text-black mb-4" 
  style={{ fontFamily: 'Gilroy', letterSpacing: '0%' }}
>
  Settings
</h2>

      <div className="border-b border-gray-300 flex space-x-[100px] mt-10">
  <button
    onClick={() => setActiveTab("Member ID")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Member ID" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Member ID
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Member ID" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>

  <button
    onClick={() => setActiveTab("Loan ID")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Loan ID" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Loan ID
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Loan ID" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>

  <button
    onClick={() => setActiveTab("Subscription")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Subscription" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Subscription
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Subscription" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>

  <button
    onClick={() => setActiveTab("Loan")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Loan" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Loan
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Loan" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>

  <button
    onClick={() => setActiveTab("Interest")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Interest" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Interest
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Interest" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>

  <button
    onClick={() => setActiveTab("Returns")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Returns" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Returns
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Returns" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>

    <div>
  <button
    onClick={() => setActiveTab("Expenses")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Expenses" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Expenses
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Expenses" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>
  </div>
  <button
    onClick={() => setActiveTab("Payment")}
    className={`pb-2 text-[16px] font-medium transition-all relative ${
      activeTab === "Payment" ? "text-purple-600 font-semibold" : "text-[#939393]"
    }`}
  >
    Payment
    <span
      className={`absolute left-1/2 bottom-0 h-[3px] w-[130px] -translate-x-1/2 transition-all ${
        activeTab === "Payment" ? "bg-purple-600" : "bg-transparent"
      }`}
    ></span>
  </button>
</div>

{activeTab === "Loan" && <LoanSetting />}
  {activeTab === "Expenses" && <ExpensesSetting />}
  {activeTab === "Member ID" && <MemberID />}
  {activeTab === "Loan ID" && <LoanID />}

    </div>
  );
};

export default Settings;
