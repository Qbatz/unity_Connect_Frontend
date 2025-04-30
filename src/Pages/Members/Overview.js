/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import call from "../../Asset/Icons/call.svg";
import sms from "../../Asset/Icons/sms.svg";
import building from "../../Asset/Icons/buildings.svg";
import calender from "../../Asset/Icons/calendar-tick.svg";
import profile from "../../Asset/Icons/profile.svg";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

function Overview({ member }) {
  const dispatch = useDispatch();
  const isApiCalled = useRef(false);

  useEffect(() => {
    if (member?.Id && !isApiCalled.current) {
      dispatch({
        type: "MEMBEROVERVIEW",
        payload: { id: member.Id },
      });
      isApiCalled.current = true;
    }
  }, [member?.Id]);

  return (
    <div className="mt-6 px-2 sm:px-2 md:px-4 lg:px-2" >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:grid-cols-2">


        <div className="bg-blue-50 p-2 md:p-2 rounded-2xl w-full shadow-md">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold font-Gilroy">Basic Information</h3>
            <BsThreeDots className="text-gray-500 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700">

            <div className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium mb-2 font-Gilroy">Subscription</span>
              <div className="flex items-center gap-2">
                <img src={calender} alt="calendar" className="w-5 h-5" />
                <span className="text-gray-800 text-sm font-semibold font-Gilroy">Since April 2024</span>
              </div>
            </div>


            <div className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium mb-2 font-Gilroy">Status</span>
              <div className="flex items-center gap-2">
                <img src={profile} alt="profile" className="w-5 h-5" />
                <span className="text-green-800 text-sm font-semibold font-Gilroy">{member?.Status}</span>
              </div>
            </div>


            <div className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium mb-2 font-Gilroy">Email</span>
              <div className="flex items-center gap-2">
                <img src={sms} alt="sms" className="w-5 h-5" />
                <span className="text-gray-800 text-sm font-semibold break-all font-Gilroy">{member?.Email_Id}</span>
              </div>
            </div>


            <div className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium mb-2 font-Gilroy">Mobile No</span>
              <div className="flex items-center gap-2">
                <img src={call} alt="call" className="w-5 h-5" />
                <span className="text-gray-800 text-sm font-semibold font-Gilroy">+91 {member?.Mobile_No}</span>
              </div>
            </div>
          </div>


          <div className="mt-4">
            <span className="text-gray-500 text-xs font-medium mb-2 font-Gilroy">Address</span>
            <div className="flex items-start gap-2 flex-wrap sm:flex-nowrap ">
              <img src={building} alt="building" className="w-5 h-5 mt-0.5" />
              <span className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold break-words font-Gilroy">
                {member?.Address}
              </span>
            </div>
          </div>
        </div>


        <div className="bg-blue-50 p-4 md:p-6 rounded-2xl w-full  shadow-md">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold font-Gilroy">Documents</h3>
            <BsThreeDots className="text-gray-500 cursor-pointer" />
          </div>

          <div className="flex justify-center items-center min-h-[100px]">
            {member?.Document_Url ? (
              (() => {
                const fileUrl = member.Document_Url;
                const fileExtension = fileUrl.split(".").pop().toLowerCase();

                if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension)) {
                  return (
                    <img
                      src={fileUrl}
                      alt="Document"
                      className="w-[100px] h-auto object-contain"
                    />
                  );
                } else if (fileExtension === "pdf") {
                  return (
                    <a
                      href={fileUrl}
                      download
                      className="flex flex-col items-center text-red-600 hover:underline"
                      title="Download PDF"
                    >
                      <FaFilePdf className="text-5xl" />
                      <span className="text-sm mt-2">PDF Document</span>
                    </a>
                  );
                } else if (["xls", "xlsx", "csv"].includes(fileExtension)) {
                  return (
                    <a
                      href={fileUrl}
                      download
                      className="flex flex-col items-center text-green-600 hover:underline"
                      title="Download Excel"
                    >
                      <FaFileExcel className="text-5xl" />
                      <span className="text-sm mt-2">Excel Document</span>
                    </a>
                  );
                } else {
                  return (
                    <span className="text-gray-500 text-sm">Unsupported file format</span>
                  );
                }
              })()
            ) : (
              <p className="text-gray-500 text-sm">No Document Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Overview.propTypes = {
  member: PropTypes.object,
};

export default Overview;
