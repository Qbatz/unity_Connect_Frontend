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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import closecircle from '../../Asset/Icons/close-circle.svg';
import { MdError } from "react-icons/md";
import moment from "moment";


function ReportsTab({ state }) {






  const dispatch = useDispatch();

  const Success = state.Report.successreport || [];
  const totalAmount = state.Report.total_Received_Amount;

  const UnSuccess = state.Report.unsuccessreport || [];
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const popupRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [unpaidStart, setUnpaidStart] = useState("");
  const [unpaidEnd, setUnpaidEnd] = useState("");
  const [paidStart, setPaidStart] = useState("");
  const [paidEnd, setPaidEnd] = useState("");
  const [filterunpaid, setFilterUnpaid] = useState("this_month");
  const [filterpaid, setFilterPaid] = useState("this_month");

  const [selectedFilterUnpaid, setSelectedFilterUnpaid] = useState("This Month");
  const [selectedFilterPaid, setSelectedFilterPaid] = useState("This Month");



  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [unpaidStartError, setUnpaidStartError] = useState("");
  const [unpaidEndError, setUnpaidEndError] = useState("");
  const [paidStartError, setPaidStartError] = useState("");
  const [paidEndError, setPaidEndError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [reportType, setReportType] = useState("");

  const [isCustomisePopup, setIsCustomisePopup] = useState(false);
  const [isUnpaidCustomisePopup, setIsUnpaidCustomisePopup] = useState(false);

  const options = [
    { label: "This week", value: "weekly" },
    { label: "This month", value: "this_month" },
    { label: "This year", value: "this_year" },
    { label: "Customise", value: "customise" },
  ];


  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'UNSUCCESS_REPORT', payload: {
        start_date_UnPaid: unpaidStart,
        end_date_UnPaid: unpaidEnd,
        filter_UnPaid: "this_month",
      }
    });
    dispatch({
      type: 'SUCCESS_REPORT', payload: {
        start_date_Paid: paidStart,
        end_date_Paid: paidEnd,
        filter_Paid: "this_month",
      }
    });

  }, []);




  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setIsOpen1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsOpen2(false);
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {


    if (state.Report.statusCodeUnSuccess === 200) {
      setLoading(false);



      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_UNSUCCESSREPORT' })
      }, 500);
    }
  }, [state.Report.statusCodeUnSuccess]);

  useEffect(() => {
    if (state.Report.statusCodeSuccess === 200) {
      setLoading(false);



      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_SUCCESSREPORT' })
      }, 500);
    }
  })

  useEffect(() => {


    if (filterpaid) {

      let payload = {
        start_date_Paid: paidStart,
        end_date_Paid: paidEnd,
        filter_Paid: filterpaid,
      };
      dispatch({ type: "SUCCESS_REPORT", payload });
    }
  }, [filterpaid])
  useEffect(() => {
    if (filterunpaid) {
      let payload = {
        start_date_UnPaid: unpaidStart,
        end_date_UnPaid: unpaidEnd,
        filter_UnPaid: filterunpaid,
      };
      dispatch({ type: "UNSUCCESS_REPORT", payload });
    }
  }, [filterunpaid])









  useEffect(() => {

    if (state.Report.SuccessPDF?.pdfURL !== "" && state.Report.StatusCodeForSuccessPDF === 200) {

      window.open(state.Report.SuccessPDF.pdfURL, "_blank");
      setTimeout(() => {
        dispatch({ type: 'CLEAR_SUCCESS_PDF' })
      }, 1000);

    }
  }, [state.Report.SuccessPDF]);

  useEffect(() => {



    if (state.Report.UnSuccessPDF?.pdfURL !== "" && state.Report.StatusCodeForUnSuccessPDF === 200) {


      window.open(state.Report.UnSuccessPDF.pdfURL, "_blank");
      setTimeout(() => {
        dispatch({ type: 'CLEAR_UNSUCCESS_PDF' })
      }, 1000);
    }
  }, [state.Report.UnSuccessPDF]);



  useEffect(() => {


    if (state.Report.SuccessExcel?.excelURL !== "" && state.Report.StatusCodeForSuccessExcel === 200) {

      const link = document.createElement('a');
      link.href = state.Report.SuccessExcel.excelURL;
      link.download = 'Success_Report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        dispatch({ type: 'CLEAR_SUCCESS_EXCEL' });
      }, 1000);
    }
  }, [state.Report.SuccessExcel]);


  useEffect(() => {
    if (state.Report.UnSuccessExcel?.excelURL !== "" && state.Report.StatusCodeForUnSuccessExcel === 200) {

      const link = document.createElement('a');
      link.href = state.Report.UnSuccessExcel.excelURL;
      link.download = 'UnSuccess_Report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        dispatch({ type: 'CLEAR_UNSUCCESS_EXCEL' })
      }, 1000);

    }
  }, [state.Report.UnSuccessExcel]);




  const handleDownloadSuccessExcel = () => {
    const payload = {
      start_date_Paid: paidStart,
      end_date_Paid: paidEnd,
      filter_Paid: filterpaid,
    };
    dispatch({ type: 'SUCCESS_EXCEL', payload: payload })



  };


  const handleDownloadUnSuccessExcel = () => {
    const payload = {
      start_date_UnPaid: unpaidStart,
      end_date_UnPaid: unpaidEnd,
      filter_UnPaid: filterunpaid,
    };
    dispatch({ type: 'UNSUCCESS_EXECL', payload: payload })


  };

  const handleDownloadSuccessPDF = () => {


    const payload = {
      start_date_Paid: paidStart,
      end_date_Paid: paidEnd,
      filter_Paid: filterpaid,
    };


    dispatch({ type: 'SUCCESS_PDF', payload: payload })



  }




  const handleDownloadUnSuccessPDF = () => {
    const payload = {
      start_date_UnPaid: unpaidStart,
      end_date_UnPaid: unpaidEnd,
      filter_UnPaid: filterunpaid,
    };


    dispatch({ type: 'UNSUCCESS_PDF', payload: payload })

  }


  const handleOptionClick = (option) => {
    setReportType(option.value);

    if (option.value === "customise") {
      setSelectedFilterUnpaid(option.label);
      setShowPopup(1);
      setIsOpen1(false);
      setUnpaidStart("")
      setUnpaidEnd("")
      setIsUnpaidCustomisePopup(true)
      return;
    }
    else {
      setUnpaidStart("")
      setUnpaidEnd("")
    }

    setFilterUnpaid(option.value);
    setSelectedFilterUnpaid(option.label);


    handleCommonClick(option.value);
    setIsOpen1(false);
  };



  const handleOptionSuccessClick = (option) => {
    setReportType(option.value);


    if (option.value === "customise") {
      setSelectedFilterPaid(option.label);
      setShowPopup(2);
      setIsOpen2(false);
      setPaidStart("")
      setPaidEnd("")
      setIsCustomisePopup(true);
      return;
    } else {

      setPaidStart("");
      setPaidEnd("");

      setUnpaidStart("");
      setUnpaidEnd("");

      setFilterPaid(option.value);
      setSelectedFilterPaid(option.label);
      handleCommonClick(option.value);
      setIsOpen2(false);
    }
  };






  useEffect(() => {
    if (filterpaid || filterunpaid) {
      handleCommonClick(3);
    }
  }, [filterpaid, filterunpaid, reportType]);


  const handleCommonClick = (reportType, isFromPopup = false) => {
    let payload;


    if (!isFromPopup && (filterpaid === "customise" || filterunpaid === "customise")) {

      return;
    }

    if (reportType === 1) {


      payload = {
        start_date_UnPaid: unpaidStart,
        end_date_UnPaid: unpaidEnd,
        filter_UnPaid: "",
      };
      dispatch({ type: "UNSUCCESS_REPORT", payload });
    } else if (reportType === 2) {

      payload = {
        start_date_Paid: paidStart,
        end_date_Paid: paidEnd,
        filter_Paid: "",
      };

      dispatch({ type: "SUCCESS_REPORT", payload });
    }





  };

  const validateDatesUnpaid = () => {
    let isValid = true;

    if (isUnpaidCustomisePopup) {
      if (!unpaidStart) {
        setUnpaidStartError("Start date is required");
        isValid = false;
      } else {
        setUnpaidStartError("");
      }

      if (!unpaidEnd) {
        setUnpaidEndError("End date is required");
        isValid = false;
      } else if (unpaidStart && unpaidEnd && unpaidEnd < unpaidStart) {
        setUnpaidEndError("End date should be after start date");
        isValid = false;
      } else {
        setUnpaidEndError("");
      }
    }
    return isValid
  };
  const validateDatesPaid = () => {
    let isValid = true;
    if (isCustomisePopup) {
      if (!paidStart) {
        setPaidStartError("Start date is required");
        isValid = false;
      } else {
        setPaidStartError("");
      }

      if (!paidEnd) {
        setPaidEndError("End date is required");
        isValid = false;
      } else if (paidStart && paidEnd && paidEnd < paidStart) {
        setPaidEndError("End date should be after start date");
        isValid = false;
      } else {
        setPaidEndError("");
      }
    }
    return isValid;
  };



  const handleApply = () => {
    const isValid = validateDatesUnpaid();
    if (!isValid) return;

    setShowPopup(false);

    setIsUnpaidCustomisePopup(false)
    setFilterUnpaid("customise");
    setSelectedFilterUnpaid("Customise");

    handleCommonClick(1, true);


  };


  const handleApplySuccess = () => {

    const isValid = validateDatesPaid();

    if (!isValid) return;

    setShowPopup(false);
    setIsCustomisePopup(false);

    setFilterPaid("customise");
    setSelectedFilterPaid("Customise");


    handleCommonClick(2, true);



  };




  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
        <ClipLoader color="#7f00ff" loading={loading} size={30} />
      </div>
    );
  }

  const handleClose = () => {
    setShowPopup(false)
    setPaidStartError("");
    setPaidEndError("");
    setUnpaidStartError("");
    setUnpaidEndError("")
  }




  return (
    <>
      <div className="mt-5">
        <div className="pl-8 pr-8 w-full bg-white rounded-lg ">
          <div className="flex justify-between items-center w-full">
            <p className="font-Gilroy font-semibold text-xl ml-6 lg:ml-1 mt-2">
              Reports
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 mt-8">

            <div className="bg-[#F4F7FF] p-4 rounded-[24px] w-full xl:w-1/2">
              <div className="flex flex-col md:flex-row md:justify-between items-center md:items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold leading-[100%] tracking-[0%] font-Gilroy flex items-center gap-2">
                  <img src={paymentreceived} alt='paymentreceived' className="h-[24px] w-[24px]" />
                  Payments Received
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"
                    onClick={handleDownloadSuccessExcel}
                  >
                    <FaFileExcel className="text-green-600 text-[20px]" />
                  </button>

                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"

                    onClick={handleDownloadSuccessPDF}
                  >
                    <FaFilePdf className="text-red-600 text-[20px]" />
                  </button>

                  <div className="bg-white px-4 py-2 mr-2 font-Gilroy rounded-md shadow-md border border-gray-200 text-sm font-semibold text-gray-800">
                    Total Amout: ₹{totalAmount}
                  </div>

                </div>


                <div ref={dropdownRef2} className="relative" >
                  <button
                    className="bg-white text-black w-[121px] h-[44px] rounded-[60px] px-[16px] py-[14px] border border-[#D9D9D9] flex items-center justify-between"
                    onClick={() => setIsOpen2(!isOpen2)}
                  >
                    <span className="text-[13px] font-Gilroy text-black">

                      {selectedFilterPaid || "This Month"}

                    </span>


                    <span>
                      <img src={arrowdown} alt='arrowdown' className="h-[16px] w-[16px]" />
                    </span>
                  </button>
                  {isOpen2 && (
                    <div className="absolute mt-2 w-full bg-white border border-[#D9D9D9] rounded-lg shadow-lg z-30">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 text-black hover:bg-blue-100 cursor-pointer text-[14px] font-Gilroy"
                          onClick={() => handleOptionSuccessClick(option)}

                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {showPopup === 2 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
                      <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-[350px]">

                        <div className="flex items-center justify-between border-b pb-4 mb-2 bg-white">
                          <p className="font-semibold font-Gilroy text-lg leading-6 tracking-normal">
                            Select Date Range
                          </p>
                          <button className="text-gray-600" onClick={handleClose}>
                            <img src={closecircle} alt="Close" className="w-8 h-8" />
                          </button>
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-semibold mb-3 font-Gilroy">Start Date</label>
                          <div className="relative">
                            <DatePicker
                              selected={paidStart}

                              onChange={(date) => {
                                setPaidStart(moment(date).format("YYYY-MM-DD"));
                                setPaidStartError("");
                              }}
                              className="w-[300px] border border-gray-300 rounded-lg p-2 cursor-pointer"
                              dateFormat="dd-MM-yyyy"
                              placeholderText="Select start date"
                              ref={startDateRef}
                            />
                            <CalendarDays
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                              onClick={() => startDateRef.current.setOpen(true)}
                            />
                          </div>
                          {paidStartError && (

                            <div className="flex items-center justify-start mt-2  text-red-500 text-xs font-semibold font-Gilroy">
                              <MdError className="text-sm mr-2" />
                              <p>{paidStartError}</p>
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="block text-sm font-semibold mb-3 font-Gilroy">End Date</label>
                          <div className="relative">
                            <DatePicker
                              selected={paidEnd}

                              onChange={(date) => {
                                setPaidEnd(moment(date).format("YYYY-MM-DD"));
                                setPaidEndError("");
                              }}
                              className="w-[300px] border border-gray-300 rounded-lg p-2 cursor-pointer"
                              dateFormat="dd-MM-yyyy"
                              placeholderText="Select end date"
                              ref={endDateRef}
                            />
                            <CalendarDays
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                              onClick={() => endDateRef.current.setOpen(true)}
                            />
                          </div>
                          {paidEndError && (

                            <div className="flex items-center justify-start mt-2  text-red-500 text-xs font-semibold font-Gilroy">
                              <MdError className="text-sm mr-2" />
                              <p>{paidEndError}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">

                          <button
                            className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg font-Gilroy"
                            onClick={handleApplySuccess}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full border border-[#E8E8E8] -border-1 mx-auto -mt-2"></div>

              <div className="space-y-4 mt-5 overflow-y-auto max-h-[350px]">
                {Success.length > 0 ? (
                  Success.map((report, index) => (
                    <div key={index} className="flex items-center justify-between">

                      <div className="flex items-center space-x-3">
                        <img src={manimg} alt="manimg" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col justify-center">
                          <p className="text-black font-semibold text-[16px] font-Gilroy">{report.User_Name}</p>
                          <div className="flex space-x-2 mt-1">
                            <span className="bg-[#D9E9FF] text-black px-3 py-1 rounded-full text-[14px] font-Gilroy font-medium">
                              {report.Member_Id}
                            </span>
                            <span className="bg-orange-100 text-black px-3 py-1 rounded-full text-sm font-Gilroy">
                              {report.Status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-[green] font-Gilroy">
                          +₹{report.Amount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[#939393] text-xs font-Gilroy">
                          {new Date(report.Transaction_Date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-500 font-Gilroy text-center">No Successful payments found</p>
                )}
              </div>
            </div>

            <div className="bg-[#F4F7FF] p-4 rounded-[24px] w-full xl:w-1/2">
              <div className="flex flex-col md:flex-row md:justify-between items-center md:items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold leading-[100%] tracking-[0%] font-Gilroy flex items-center gap-2">
                  <img src={unsuccessfullpayment} alt='unsuccesfullpayment' className="h-[24px] w-[24px]" />
                  Unsuccessful Payments
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"
                    onClick={handleDownloadUnSuccessExcel}
                  >
                    <FaFileExcel className="text-green-600 text-[20px]" />
                  </button>
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-blue-100"

                    onClick={handleDownloadUnSuccessPDF}
                  >
                    <FaFilePdf className="text-red-600 text-[20px]" />
                  </button>
                </div>

                <div ref={dropdownRef1} className="relative">


                  <button
                    className="bg-white font-Gilroy text-black w-[121px] h-[44px] rounded-[60px] px-[16px] py-[14px] border border-[#D9D9D9] flex items-center justify-between"
                    onClick={() => setIsOpen1(!isOpen1)}
                  >
                    <span className="text-[13px]">

                      {selectedFilterUnpaid || "This Month"}
                    </span>
                    <span>
                      <img src={arrowdown} alt="arrowdown" className="h-[16px] w-[16px]" />
                    </span>
                  </button>


                  {isOpen1 && (
                    <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow-md">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 text-black hover:bg-blue-100 cursor-pointer text-[14px] font-Gilroy"

                          onClick={() => handleOptionClick(option)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}

                  {showPopup === 1 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
                      <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg w-[350px]">

                        <div className="flex items-center justify-between border-b pb-4 mb-2 bg-white">
                          <p className="font-semibold font-Gilroy text-lg leading-6 tracking-normal">
                            Select Date Range
                          </p>
                          <button className="text-gray-600" onClick={handleClose}>
                            <img src={closecircle} alt="Close" className="w-8 h-8" />
                          </button>
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-semibold font-Gilroy mb-3">Start Date</label>
                          <div className="relative">
                            <DatePicker
                              selected={unpaidStart}
                              onChange={(date) => {
                                setUnpaidStart(moment(date).format("YYYY-MM-DD"));

                                setUnpaidStartError("");
                              }}

                              className="w-[300px] border border-gray-300 rounded-lg p-2 cursor-pointer"
                              dateFormat="dd-MM-yyyy"
                              placeholderText="Select start date"
                              ref={startDateRef}
                            />
                            <CalendarDays
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                              onClick={() => startDateRef.current.setOpen(true)}
                            />
                          </div>
                          {unpaidStartError && (

                            <div className="flex items-center justify-start mt-2  text-red-500 text-xs font-semibold font-Gilroy">
                              <MdError className="text-sm mr-2" />
                              <p>{unpaidStartError}</p>
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="block text-sm font-semibold font-Gilroy mb-3">End Date</label>
                          <div className="relative">
                            <DatePicker
                              selected={unpaidEnd}
                              onChange={(date) => {
                                setUnpaidEnd(moment(date).format("YYYY-MM-DD"));
                                setUnpaidEndError("");
                              }}

                              className="w-[300px] border border-gray-300 rounded-lg p-2 cursor-pointer"
                              dateFormat="dd-MM-yyyy"
                              placeholderText="Select end date"
                              ref={endDateRef}
                            />
                            <CalendarDays
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                              onClick={() => endDateRef.current.setOpen(true)}
                            />
                          </div>
                          {unpaidEndError && (

                            <div className="flex items-center justify-start mt-2  text-red-500 text-xs font-semibold font-Gilroy">
                              <MdError className="text-sm mr-2" />
                              <p>{unpaidEndError}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">

                          <button
                            className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg font-Gilroy"
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

              <div className="w-full border border-[#E8E8E8] -border-1 mx-auto -mt-2"></div>

              <div className="space-y-4 mt-5 overflow-y-auto max-h-[350px]">
                {UnSuccess.length > 0 ? (
                  UnSuccess.map((report, index) => (
                    <div key={index} className="flex items-center justify-between">

                      <div className="flex items-center space-x-3">
                        <img src={manimg} alt="manimg" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col justify-center">
                          <p className="text-black font-semibold text-[16px] font-Gilroy">{report.Member_Name}</p>
                          <div className="flex space-x-2 mt-1">
                            <span className="bg-[#D9E9FF] text-black px-3 py-1 rounded-full text-[14px] font-Gilroy font-medium">
                              {report.Member_Id}
                            </span>
                            <span className="bg-orange-100 text-black px-3 py-1 rounded-full text-sm font-Gilroy">
                              {report.Status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-[black] font-Gilroy">

                          ₹{report.Due_Balance === null ? report.Due_Amount : report.Due_Balance}
                        </p>
                        <p className="text-[#939393] text-xs font-Gilroy">
                          {moment(report.Due_Date).format("DD MMM YYYY")}
                        </p>

                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-500 font-Gilroy text-center">No unsuccessful payments found</p>
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