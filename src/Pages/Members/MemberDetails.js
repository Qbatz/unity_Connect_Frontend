import React, { useState } from "react";
import img1 from "../../Asset/Images/Memberone.svg";
import Overview from "./Overview";
import PropTypes from 'prop-types';
import CommentSection from "./Comments";
import Transactions from "../Members/Transactions";

import LoanStatements from "./MemberStatement"

function MemberDetails({ member, onBack }) {


  const [activeTab, setActiveTab] = useState("Overview");



  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-3">
        <button onClick={onBack} className="mb-4 text-blue-500 font-Gilroy text-xl">
          ← Back
        </button>

        <div className=" member-card bg-blue-50 p-6 rounded-xl">

          <div className="flex items-center gap-4">
            <img src={img1} alt='Member' className="rounded-full" />
            <div>
              <h3 className="font-semibold text-xl font-Gilroy">{member?.User_Name}</h3>
              <div className="flex gap-2 text-sm mt-1">
                <span className="bg-blue-100 text-lg font-medium font-Gilroy  px-2 py-1 rounded-xl">
                  {member?.Member_Id
                  }
                </span>


              </div>
            </div>
          </div>

        </div>

        <div className="flex overflow-x-auto whitespace-nowrap flex-nowrap gap-8 scrollbar-hide mt-6 pl-2">
          {["Overview", "Comments", "Transactions", "Statements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative min-w-max ${activeTab === tab ? "text-black font-medium" : "text-[#939393]"
                }`}
            >
              {tab}
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-full transition-all ${activeTab === tab ? "bg-black" : "bg-transparent"
                  }`}
              ></span>
            </button>
          ))}

        </div>
        <div className="">
          {activeTab === "Overview" && <Overview member={member} />}
          {activeTab === "Comments" && <CommentSection member={member} />}
          {activeTab === "Transactions" && <Transactions member={member} />}
          {activeTab === "Statements" && <LoanStatements member={member} />}
        </div>
      </div>
    </>
  );
};


MemberDetails.propTypes = {
  member: PropTypes.object,
  onBack: PropTypes.func,

};
export default MemberDetails;