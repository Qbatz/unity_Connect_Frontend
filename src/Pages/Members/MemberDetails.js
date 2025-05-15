import React, { useState, useEffect } from "react";


import img1 from "../../Asset/Images/Memberone.svg";
import Overview from "./Overview";
import PropTypes from 'prop-types';
import CommentSection from "./Comments";
import { useLocation } from "react-router-dom";
import LoanStatements from "./MemberStatement"

function MemberDetails() {

  const [activeTab, setActiveTab] = useState("Overview");
  const location = useLocation();
  const [member, setMember] = useState(location.state?.member || null);

  useEffect(() => {
    if (member && location.pathname !== `/member-details/${member?.Id}`) {
      setMember(null);
    }
  }, [location.pathname, member]);

 
  useEffect(() => {
    const handleBackButton = (event) => {
      console.log("Back button was clicked");
      // You can also prevent navigation if needed
      // event.preventDefault();
    };
 
    window.addEventListener("popstate", handleBackButton);
 
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <>
      <div className="px-2 sm:px-2 md:px-4 lg:px-3">
      

        <div className=" member-card bg-blue-50 p-6 rounded-xl">

          <div className="flex items-center gap-4">
            <img src={img1} alt='Member' className="rounded-full" />
            <div>
              <h3 className="font-semibold text-xl font-Gilroy">{member?.User_Name}</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
                <span className="bg-blue-100 text-sm sm:text-base font-medium font-Gilroy px-3 py-1 rounded-xl break-all">
                  {member?.Member_Id
                  }
                </span>


              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-wrap gap-4 w-full mt-4">
          {["Overview", "Comments", "Statements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative min-w-max pb-2 text-[16px] font-Gilroy transition-all ${activeTab === tab ? "text-black font-medium" : "text-[#939393]"
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