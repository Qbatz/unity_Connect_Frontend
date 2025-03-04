import React, { useState } from "react";
import img1 from "../../Asset/Images/Memberone.svg";
import Overview from "./Overview";
import PropTypes from 'prop-types';
import {connect } from "react-redux";

function MemberDetails  ({ member, onBack })  {
  const [activeTab, setActiveTab] = useState("Overview");
  return (
    <>
      <button onClick={onBack} className="mb-4 text-blue-500 font-Gilroy text-xl">
        ← Back
      </button>
      <div className=" member-card bg-blue-50 p-6 rounded-xl">

        <div className="flex items-center gap-4">
          <img src={img1} alt='Member' className="rounded-full" />
          <div>
            <h3 className="font-semibold text-base font-Gilroy">{member.User_Name}</h3>
            <div className="flex gap-2 text-sm mt-1">
              <span className="bg-blue-100 text-sm font-medium font-Gilroy  px-2 py-1 rounded-xl">
                {member.Member_Id
                }
              </span>


            </div>
          </div>
        </div>

      </div>

      <div className="flex overflow-x-auto whitespace-nowrap flex-nowrap gap-8 scrollbar-hide mt-8">
        {["Overview", "Comments", "Transactions", "Statements"].map((tab) => (
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
      <div className="">
        {activeTab === "Overview" && <Overview member={member} />}

      </div>
    </>
  );
};

const mapsToProps = (stateInfo) => {
  return {
    member: stateInfo,
    onBack: stateInfo
  }
}
MemberDetails.propTypes = {
  member: PropTypes.object,
  onBack: PropTypes.object,
};
export default connect(mapsToProps)(MemberDetails)