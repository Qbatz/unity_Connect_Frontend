import React, { useState } from "react";
import manimg from "../../Asset/Images/Memberone.svg";
import arrowdown from "../../Asset/Icons/arrow-down.svg";
import paymentreceived from "../../Asset/Icons/PaymentReceived.svg";
import unsuccessfullpayment from "../../Asset/Icons/unsuccessfullpayment.svg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

function ReportsTab({ state }) {

  const dispatch = useDispatch();


  const Success = state.Report.successreport || [];
  const UnSuccess = state.Report.unsuccessreport || [];


  const [paidStart] = useState("");
  const [paidEnd] = useState("");
  const [unpaidStart, setunpaidStart] = useState("");
  const [unpaidEnd, setunpaidEnd] = useState("");
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportType, setReportType] = useState("");

  const handleOptionClick = (option, e, type) => {
    e.preventDefault();
    setReportType(type);


    if (type === 1) {
      setFilterUnpaid(option.value);
    } else {
      setFilterPaid(option.value);
    }
    if (option.value === "customise") {
      setShowPopup(true);
    } else {

      if (type === 1) {
        setSelectedFilter1(option.label);
      } else {
        setSelectedFilter2(option.label);
      }
      setTimeout(() => {
        handleCommonClick();
      }, 500);
    }
    setIsOpen2(false);
    setIsOpen1(false);
  };

  const handleCommonClick = () => {

    const payload = {
      start_date_Paid: paidStart,
      end_date_Paid: paidEnd,
      start_date_UnPaid: unpaidStart,
      end_date_UnPaid: unpaidEnd,
      filter_Paid: filterpaid,
      filter_UnPaid: filterunpaid,

    };

    dispatch({ type: "SUCCESS_REPORT", payload });
  };


  const handleApply = () => {
    if (reportType === 1) {
      setSelectedFilter1(`Custom: ${startDate} - ${endDate}`);
    } else {
      setSelectedFilter2(`Custom: ${startDate} - ${endDate}`);
    }
    setTimeout(() => {
      handleCommonClick();
    }, 500);
    setShowPopup(false);
  };


  const handleFilterChange = (option) => {

    setFilterUnpaid(option.value);
    dispatch({

      type: "UNSUCCESS_REPORT",
      payload: {
        start_date_Paid: paidStart,
        end_date_Paid: paidEnd,
        start_date_UnPaid: unpaidStart,
        end_date_UnPaid: unpaidEnd,
        filter_UnPaid: option.value,
        filter_Paid: filterpaid,
      },
    });

  };




  return (
    <>
      <div className="mt-5 container">
        <div className="pl-8 pr-8 w-full bg-white rounded-lg ">
          <div className="flex justify-between items-center w-full">
            <p className="font-Gilroy font-semibold text-[24px] leading-[100%] tracking-[0%]">
              Reports
            </p>
            <button className="bg-black font-Gilroy text-white w-[202px] h-[52px] rounded-[60px] px-[20px] py-[16px]">
              Download Reports
            </button>
          </div>

          <div className="flex gap-6 mt-5">

            <div className="bg-[#F4F7FF] p-4 rounded-[24px]  w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-semibold leading-[100%] tracking-[0%] font-Gilroy flex items-center gap-2">
                  <img src={unsuccessfullpayment} alt='unsuccesfullpayment' className="h-[24px] w-[24px]" />
                  Unsuccessful Payments
                </h2>

                <div className="relative">
                  <button
                    className="bg-white text-black w-[121px] h-[44px] rounded-[60px] px-[16px] py-[14px] border border-[#D9D9D9] flex items-center justify-between"
                    onClick={() => setIsOpen1(!isOpen1)}
                  >
                    <span className="font-Gilroy text-[14px] text-black font-medium">
                      {selectedFilter1}
                    </span>
                    <span>
                      <img src={arrowdown} alt='arrowdown' className="h-[16px] w-[16px]" />
                    </span>
                  </button>
                  {isOpen1 && (
                    <div className="absolute mt-2 w-full bg-white border border-[#D9D9D9] rounded-lg shadow-lg">
                      <select
                        className="border p-2 rounded-lg mt-2"
                        onChange={(e) =>
                          handleFilterChange({ value: e.target.value }, "paid")
                        }
                      >
                        <option value="">Select Filter</option>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                    </div>
                  )}
                  {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">
                        <h2 className="text-lg font-semibold mb-4 text-center">Select Date Range</h2>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">Start Date</label>
                          <input
                            type="date"
                            value={unpaidStart}
                            onChange={(e) => {
                              setunpaidStart(e.target.value)
                            }}
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">End Date</label>
                          <input
                            type="date"
                            value={unpaidEnd}
                            onChange={(e) => setunpaidEnd(e.target.value)}
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

              <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>

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
                            <span className="bg-yellow-100 text-black px-3 py-1 rounded-full text-sm">
                              {report.Status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[black]">
                          ₹{report.Amount}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(report.Created_At).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No unsuccessful payments found.</p>
                )}
              </div>
            </div>

            <div className="bg-[#F4F7FF] p-4 rounded-[24px] w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-semibold leading-[100%] tracking-[0%] font-Gilroy flex items-center gap-2">
                  <img src={paymentreceived} alt='paymentreceived' className="h-[24px] w-[24px]" />
                  Payments Received
                </h2>

                <div className="relative" >
                  <button
                    className="bg-white text-black w-[121px] h-[44px] rounded-[60px] px-[16px] py-[14px] border border-[#D9D9D9] flex items-center justify-between"
                    onClick={() => setIsOpen2(!isOpen2)}
                  >
                    <span className="font-Gilroy text-[14px] text-black font-medium">
                      {selectedFilter2}
                    </span>
                    <span>
                      <img src={arrowdown} alt='arrowdown' className="h-[16px] w-[16px]" />
                    </span>
                  </button>
                  {isOpen2 && (
                    <div className="absolute mt-2 w-full bg-white border border-[#D9D9D9] rounded-lg shadow-lg">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer text-[14px] font-Gilroy"
                          onClick={(e) => handleOptionClick(option, e, 2)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">
                        <h2 className="text-lg font-semibold mb-4 text-center">Select Date Range</h2>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">Start Date</label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium">End Date</label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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

              <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>

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
                            <span className="bg-yellow-100 text-black px-3 py-1 rounded-full text-sm">
                              {report.Status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[green]">
                          ₹{report.Pending_Amount}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(report.Created_At).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No unsuccessful payments found.</p>
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
