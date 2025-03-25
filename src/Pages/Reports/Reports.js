/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import manimg from "../../Asset/Images/Memberone.svg";
import arrowdown from "../../Asset/Icons/arrow-down.svg";
import paymentreceived from "../../Asset/Icons/PaymentReceived.svg";
import unsuccessfullpayment from "../../Asset/Icons/unsuccessfullpayment.svg";
import { FaFileExcel, FaFilePdf } from "react-icons/fa"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

function ReportsTab({ state }) {

  const dispatch = useDispatch();

  const Success = state.Report.successreport || [];
  const UnSuccess = state.Report.unsuccessreport || [];
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  const [loading, setLoading] = useState(true);
  const [unpaidStart, setUnpaidStart] = useState("");
  const [unpaidEnd, setUnpaidEnd] = useState("");
  const [paidStart, setPaidStart] = useState("");
  const [paidEnd, setPaidEnd] = useState("");
  const [filterunpaid, setFilterUnpaid] = useState("");
  const [filterpaid, setFilterPaid] = useState("");

  const [selectedFilter1, setSelectedFilter1] = useState("");
  const [selectedFilter2, setSelectedFilter2] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);


  const options = [
    { label: "This week", value: "weekly" },
    { label: "This month", value: "this_month" },
    { label: "This year", value: "this_year" },
    { label: "Customise", value: "customise" },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [reportType, setReportType] = useState("");

  const pdfURL = "https://smartstaydevs.s3.ap-south-1.amazonaws.com/Report/UnsuccessfulPayments_1742493051264.pdf";
  const excelURL = "https://smartstaydevs.s3.ap-south-1.amazonaws.com/Report/REPORT_Unsuccess1742493051476.xlsx";

  const SuccesspdfURL = "https://smartstaydevs.s3.ap-south-1.amazonaws.com/Report/SuccessfulPayments_1742624503148.pdf";
  const SuccessexcelURL = "https://smartstaydevs.s3.ap-south-1.amazonaws.com/Report/REPORT_success1742624503227.xlsx";

  useEffect(() => {
    setLoading(true);
    dispatch({ type: 'UNSUCCESS_REPORT' });
    dispatch({ type: 'SUCCESS_REPORT' });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setIsOpen1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsOpen2(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])
  useEffect(() => {
    if (state.successReport || state.unsuccessReport) {
      setFilterPaid("");
      setFilterUnpaid("");
      setSelectedFilter1("");
      setSelectedFilter2("");
    }
  }, [state.successReport, state.unsuccessReport]);
  

  useEffect(() => {
    if (filterpaid || filterunpaid) {
      handleCommonClick(3);
    }
  },[filterpaid, filterunpaid, reportType]);


  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
 
  const handleOptionClick = (option, e, type) => {
    setReportType(type);
  
    if (type === 1) {
      setFilterUnpaid(option.value);
      setSelectedFilter1(option.label);
    } else {
      setFilterPaid(option.value);
      setSelectedFilter2(option.label);
    }
  
    if (option.value === "customise") {
      setShowPopup(type);
    }
    setIsOpen1(false);
    setIsOpen2(false);
  };


  const handleCommonClick = (reportType) => {

    let payload;

    if (reportType === 1) {
      payload = {
        start_date_Paid: "",
        end_date_Paid: "",
        start_date_UnPaid: unpaidStart,
        end_date_UnPaid: unpaidEnd,
        filter_Paid: "",
        filter_UnPaid: "",
      };
      dispatch({ type: "UNSUCCESS_REPORT", payload });
    } else if (reportType === 2) {
      payload = {
        start_date_Paid: paidStart,
        end_date_Paid: paidEnd,
        start_date_UnPaid: "",
        end_date_UnPaid: "",
        filter_Paid: "",
        filter_UnPaid: "",
      };
      dispatch({ type: "SUCCESS_REPORT", payload });
    } else {
      payload = {
        start_date_Paid: "",
        end_date_Paid: "",
        start_date_UnPaid: "",
        end_date_UnPaid: "",
        filter_Paid: filterpaid,
        filter_UnPaid: filterunpaid,
      };

      if (filterpaid) {
        dispatch({ type: "SUCCESS_REPORT", payload });
      } else if (filterunpaid) {
        dispatch({ type: "UNSUCCESS_REPORT", payload });
      }
    }

  };

  const handleApply = () => {

    if (reportType === 1) {
      setUnpaidStart("");
      setUnpaidEnd("");
    }
    else {
    setPaidStart("");
    setPaidEnd("");
    }

    setShowPopup(false);
    setTimeout(() => {
      handleCommonClick(reportType);
    }, 500);
  };


  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
        <ClipLoader color="#7f00ff" loading={loading} size={30} />
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 container">
        <div className="pl-8 pr-8 w-full bg-white rounded-lg ">
          <div className="flex justify-between items-center w-full">
            <p className="font-Gilroy font-semibold text-xl ml-6 lg:ml-1 mt-2">
              Reports
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-8">

            <div className="bg-[#F4F7FF] p-4 rounded-[24px] w-full w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold font-Gilroy flex items-center gap-2">
                  <img src={unsuccessfullpayment} alt='unsuccesfullpayment' className="h-[24px] w-[24px]" />
                  Unsuccessful Payments
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"
                    onClick={() => handleDownload(excelURL, "Unsuccessful_Payments.xlsx")}
                  >
                    <FaFileExcel className="text-green-600 text-[20px]" />
                  </button>
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"
                    onClick={() => handleDownload(pdfURL, "Unsuccessful_Payments.pdf")}
                  >
                    <FaFilePdf className="text-red-600 text-[20px]" />
                  </button>
                </div>

                <div className="relative">
                  <button
                    className="bg-white text-black w-[121px] h-[44px] rounded-[60px] px-[16px] py-[14px] border border-[#D9D9D9] flex items-center justify-between"
                    onClick={() => setIsOpen1(!isOpen1)}
                    
                  >
                      {selectedFilter1 || "This Month"}
                    <span>
                      <img src={arrowdown} alt='arrowdown' className="h-[16px] w-[16px]" />
                    </span>
                  </button>

                  {isOpen1 && (
                    <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow-md">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 text-black hover:bg-blue-100 cursor-pointer text-[14px] font-Gilroy"
                          onClick={(e) => { handleOptionClick(option, e, 1) }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}

                  {showPopup === 1 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">
                        <h2 className="text-lg font-semibold mb-4 text-center">Select Date Range</h2>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">Start Date</label>
                          <input
                            type="date"
                            value={unpaidStart}
                            onChange={(e) => {
                              setUnpaidStart(e.target.value)
                            }}
                            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">End Date</label>
                          <input
                            type="date"
                            value={unpaidEnd}
                            onChange={(e) => setUnpaidEnd(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            className="bg-gray-200 px-4 py-2 rounded-lg"
                            onClick={() => setShowPopup(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={handleApply}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full border border-[#E7E7E7] mx-auto -mt-2"></div>

              <div className="space-y-4 mt-5 overflow-y-auto max-h-[400px]">
                {UnSuccess.length > 0 ? (
                  UnSuccess.map((report, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={manimg} alt='manimg' className="w-10 h-10 rounded-full" />
                        <div className="space-y-3">
                          <p className="text-black font-semibold text-[16px]">
                            {report.User_Name}
                          </p>
                          <div className="flex space-x-2">
                            <span className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm">
                              {report.Member_Id}
                            </span>
                            <span className="bg-orange-200 text-black px-3 py-1 rounded-full text-sm">
                              {report.Status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[black]">
                          ₹{report.Pending_Amount}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(report.Created_At).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No unsuccessful payments found.</p>
                )}
              </div>
            </div>

            <div className="bg-[#F4F7FF] p-4 rounded-[24px] w-full w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold leading-[100%] tracking-[0%] font-Gilroy flex items-center gap-2">
                  <img src={paymentreceived} alt='paymentreceived' className="h-[24px] w-[24px]" />
                  Payments Received
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"
                    onClick={() => handleDownload(SuccessexcelURL, "Unsuccessful_Payments.xlsx")}
                  >
                    <FaFileExcel className="text-green-600 text-[20px]" />
                  </button>
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"
                    onClick={() => handleDownload(SuccesspdfURL, "Unsuccessful_Payments.pdf")}
                  >
                    <FaFilePdf className="text-red-600 text-[20px]" />
                  </button>
                </div>

                <div className="relative" >
                  <button
                    className="bg-white text-black w-[121px] h-[44px] rounded-[60px] px-[16px] py-[14px] border border-[#D9D9D9] flex items-center justify-between"
                    onClick={() => setIsOpen2(!isOpen2)}
                  >
                             {selectedFilter2 || "This Month"}
                    <span>
                      <img src={arrowdown} alt='arrowdown' className="h-[16px] w-[16px]" />
                    </span>
                  </button>
                  {isOpen2 && (
                    <div className="absolute mt-2 w-full bg-white border border-[#D9D9D9] rounded-lg shadow-lg">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 text-black hover:bg-blue-100 cursor-pointer text-[14px] font-Gilroy"
                          onClick={(e) => handleOptionClick(option, e, 2)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {showPopup === 2 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">
                        <h2 className="text-lg font-semibold mb-4 text-center">Select Date Range</h2>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">Start Date</label>
                          <input
                            type="date"
                            value={paidStart}
                            onChange={(e) => setPaidStart(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">End Date</label>
                          <input
                            type="date"
                            value={paidEnd}
                            onChange={(e) => setPaidEnd(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            className="bg-gray-200 px-4 py-2 rounded-lg"
                            onClick={() => setShowPopup(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={handleApply}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full border border-[#E7E7E7] mx-auto -mt-2"></div>

              <div className="space-y-4 mt-5 overflow-y-auto max-h-[400px]">
                {Success.length > 0 ? (
                  Success.map((report, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={manimg} alt='manimg' className="w-10 h-10 rounded-full" />
                        <div className="space-y-3">
                          <p className="text-black font-semibold text-[16px]">
                            {report.Member_Id}
                          </p>
                          <div className="flex space-x-2">
                            <span className="bg-blue-100 text-black px-3 py-1 rounded-full text-sm">
                              {report.User_Name}
                            </span>
                            <span className="bg-orange-200 text-black px-3 py-1 rounded-full text-sm">
                              {report.Status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[green]">

                          +₹{report.Amount}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(report.Created_At).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No Successful payments found.</p>
                )}
              </div>
            </div>

          </div>


        </div>
      </div>
    </>
  );
}

const mapsToProps = (stateInfo) => ({
  state: stateInfo,
});

ReportsTab.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(ReportsTab);