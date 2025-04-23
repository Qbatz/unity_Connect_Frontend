/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import CloseCircleIcon from '../../Asset/Icons/close-circle.svg';
import ExpensesIcon from "../../Asset/Icons/ExpensesIcon.svg";
import ThreeDotMore from "../../Asset/Icons/ThreeDotMore.svg";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { useDispatch, connect } from "react-redux";
import { MdError } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import EmptyState from '../../Asset/Images/Empty-State.jpg'
import { ClipLoader } from "react-spinners";

function LoanSetting({ state }) {

  const dispatch = useDispatch();

  const loanGetSetting = state;
  const statusCode = state.SettingLoan.statusCodeLoans;
  const datePickerRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const placeholderOption = "Select a due type";
  const [selectedOption, setSelectedOption] = useState(placeholderOption);
  const placeholderOptionWeekly = "Select Weekly Type"
  const [selectedWeekDay, setSelectedWeekDay] = useState(placeholderOptionWeekly);
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  const placeholderOptionMonth = "Select Monthly Type"
  const [selectedMonthlyType, setSelectedMonthlyType] = useState(placeholderOptionMonth);
  const [isMonthlyDropdownOpen, setIsMonthlyDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const options = ["Daily", "Weekly", "Monthly"];
  const weeklyOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const monthlyOptions = ["Day", "Date"];
  const dayOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [selectedLoanName, setSelectedLoanName] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [selectedDueCount, setSelectedDueCount] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const placeholderSelect = "Select a day"
  const [selectedInterest, setSelectedInterest] = useState(placeholderSelect);
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);


  const [isOrdinalDropdownOpen, setIsOrdinalDropdownOpen] = useState(false);
  const [selectedOrdinal, setSelectedOrdinal] = useState("week");
  const dropdownRef = useRef(null);






  const [loanNameError, setLoanNameError] = useState("");
  const [dueTypeError, setDueTypeError] = useState("");
  const [dueCountError, setDueCountError] = useState("");
  const [interestError, setInterestError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);



  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsWeekDropdownOpen(false);
        setIsMonthlyDropdownOpen(false)
        setIsOrdinalDropdownOpen(false)
        setIsDayDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();



    let isValid = true;

    if (!selectedLoanName.trim()) {
      setLoanNameError("Loan Name is Required");
      isValid = false;
    } else {
      setLoanNameError("");
    }


    if (selectedOption === placeholderOption) {
      setDueTypeError("Please select a Due Type");
      isValid = false;
    } else {
      setDueTypeError("");
    }

    if (!selectedDueCount.trim()) {
      setDueCountError("Due Count is Required");
      isValid = false;
    } else {
      setDueCountError("");
    }

    if (!selectedInterest.trim()) {
      setInterestError("Interest is Required");
      isValid = false;
    } else {
      setInterestError("");
    }

    if (!isValid) return;


    const payload = {
      loan_name: selectedLoanName,
      due_on: formattedDate,
      due_type: selectedOption,
      due_count: selectedDueCount,

      interest: selectedInterest,
    };


    dispatch({
      type: "SETTINGS_LOAN",
      payload,
    });
  };


  useEffect(() => {
    if (statusCode === 200) {
      dispatch({ type: "CLEARSETTINGLOAN" });
      setIsModalOpen(false);


    }


    setSelectedLoanName("");
    setSelectedDueDate("");
    setSelectedDueCount("");
    setSelectedInterest("");
    setSelectedLoanName("");
    setSelectedOption("Select a due type");
    setSelectedWeekDay("Select Weekly Type");
    setSelectedMonthlyType("Select Monthly Type");
    setSelectedOrdinal("week");
    setSelectedDay("Select a day");

    setSelectedDueCount("");
    setIsModalOpen(false);
    setLoanNameError("");
    setDueTypeError('');
    setDueCountError('');
    setInterestError('');


  }, [statusCode]);


  useEffect(() => {
    setLoading(true)
    dispatch({ type: "SETTINGS_GET_LOAN" });
  }, []);





  useEffect(() => {
    if (state.SettingLoan?.statusCodeLoans === 200) {
      setLoading(false)


      setTimeout(() => {
        dispatch({ type: "CLEARSETTINGLOAN" })
      }, 500)
    }
  }, [state.SettingLoan.statusCodeLoans])

  useEffect(() => {
    if (state.SettingLoan?.statusCodeLoansAdd === 200) {

      dispatch({ type: "SETTINGS_GET_LOAN" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTING_LOAN_ADD" })
      }, 500)
    }
  }, [state.SettingLoan.statusCodeLoansAdd])


  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  const itemsPerPage = 3;

  const allLoans = loanGetSetting?.SettingLoan?.getLoan.loans || [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLoans = allLoans.slice(indexOfFirstItem, indexOfLastItem);




  const handleDate = (date) => {

    setSelectedDueDate(date);



  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const formattedDate = (selectedDueDate instanceof Date && !isNaN(selectedDueDate))
    ? formatDate(selectedDueDate)
    : selectedDueDate;



  const isValidDateFor_DueOn = (date) => {
    const [day, month, year] = date.split("-");
    const isoDate = `${year}-${month}-${day}`;
    const parsedDate = new Date(isoDate);
    return parsedDate instanceof Date && !isNaN(parsedDate);
  };


  const getDateWithSuffix = (date) => {
    const [day] = date.split("-");
    const dayNum = parseInt(day, 10);

    const suffix = (dayNum % 10 === 1 && dayNum !== 11)
      ? 'st'
      : (dayNum % 10 === 2 && dayNum !== 12)
        ? 'nd'
        : (dayNum % 10 === 3 && dayNum !== 13)
          ? 'rd'
          : 'th';

    return `${dayNum}${suffix} of Every Month`;
  };

  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
        <ClipLoader color="#7f00ff" loading={loading} size={30} />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
        <div>
          <p className="font-Gilroy font-semibold text-xl text-black">Loan</p>
          <p className="mt-5 text-gray-500 text-sm font-Gilroy font-medium">
            Set up the loan type and manage them
          </p>
        </div>
        <button
          className="bg-black font-Gilroy text-white w-[155px] rounded-[60px] text-base font-medium pt-[16px] pr-[20px]
                    pb-[16px] pl-[20px]"
          onClick={() => {
            setIsModalOpen(true);

          }}
        >
          + Loan type
        </button>
      </div>

      {isModalOpen && (

        <div className="fixed inset-0  z-50  flex  items-center  justify-center bg-black bg-opacity-50 ">
          <div className="bg-white w-[464px] rounded-40 p-6 shadow-lg ">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-Gilroy">Add new loan</h2>
              <img
                alt="Close Circle icon"
                src={CloseCircleIcon}
                onClick={() => {
                  setIsModalOpen(false);
                  setLoanNameError("");
                  setDueTypeError('');
                  setDueCountError('');
                  setInterestError('');
                  setSelectedOption(placeholderOption);
                  setSelectedMonthlyType(placeholderOptionMonth)
                  setSelectedLoanName('')

                  setSelectedWeekDay(placeholderOptionWeekly)
                  setSelectedMonthlyType('')
                  setSelectedOrdinal('')
                  setSelectedDay('')
                  setSelectedDueCount('')
                  setSelectedInterest('')
                  setSelectedOrdinal("")
                  setSelectedDueDate("")
                }}
                className="w-32 h-32 cursor-pointer"
              />
            </div>

            <div className="w-full border border-[#E7E7E7]"></div>

            <div className="mt-7 max-h-[450px] overflow-y-auto">

              <label className="text-black text-sm font-medium font-Gilroy text-lg">Name <span className="text-red-500 text-[20px]">*</span></label>
              <input value={selectedLoanName}
                type="text"
                placeholder="Enter Name"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setSelectedLoanName(value);
                    setLoanNameError("");
                  }
                }}
                className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3  font-Gilroy
                                        placeholder:text-base placeholder:font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"/>


              {loanNameError && (
                <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                  <MdError className="mr-1 text-base" />
                  <p >{loanNameError}</p>
                </div>
              )}


              <div className="relative w-full mt-5">
                <label className="text-black text-sm font-Gilroy font-medium text-lg">Due on <span className="text-red-500 text-[20px]">*</span></label>
                <div
                  className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 mt-3 flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setDueTypeError("");
                  }}

                >
                  <span
                    className={`text-base font-Gilroy font-medium ${selectedOption === placeholderOption ? "text-gray-400" : "text-black"
                      }`}
                  >
                    {selectedOption}
                  </span>
                  <ChevronDown className="w-5 h-5  text-gray-500" />
                </div>
                {dueTypeError && (
                  <div className="flex items-center text-red-500 text-xs font-Gilroy mt-1">
                    <MdError className="mr-1 text-base" />
                    <p >{dueTypeError}</p>
                  </div>
                )}

                {isOpen && (
                  <div className="mt-3 bg-white border border-[#D9D9D9] rounded-2xl shadow-lg max-h-[90px] overflow-y-auto">
                    {options.map((option, index) => (
                      <div

                        key={index}
                        className="px-4 py-3 text-black text-base font-Gilroy font-medium cursor-pointer border-b last:border-b-0 border-gray-300 hover:bg-#F4F7FF"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOption(option);
                          setIsOpen(false);
                          if (option === "Daily") {
                            setSelectedDueDate(option);
                            setSelectedMonthlyType("");
                            setSelectedOrdinal('')
                          }
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedOption === "Weekly" && (
                <div className="relative w-full mt-3">
                  <label className="text-black text-sm  font-Gilroy font-medium text-lg">Due Type</label>
                  <div
                    className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 mt-3 flex items-center justify-between cursor-pointer"
                    onClick={() => {
                      setIsWeekDropdownOpen(!isWeekDropdownOpen)
                      setSelectedMonthlyType("")
                      setSelectedOrdinal('')

                    }
                    }

                  >



                    <span className={`text-base font-Gilroy font-medium ${selectedWeekDay === placeholderOptionWeekly ? " text-gray-400" : "text-black"}`}>
                      {selectedWeekDay}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>

                  {isWeekDropdownOpen && (
                    <div className="mt-3 bg-white border border-[#D9D9D9] rounded-2xl shadow-lg max-h-[90px] overflow-y-auto">
                      {weeklyOptions.map((day, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 text-black text-base font-Gilroy font-medium cursor-pointer border-b last:border-b-0 border-gray-300  hover:bg-#F4F7FF"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWeekDay(day);
                            setIsWeekDropdownOpen(false);
                            setSelectedDueDate(day);
                          }}

                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}


              {selectedOption === "Monthly" && (
                <div className="relative w-full mt-3">
                  <label className="text-black text-sm font-Gilroy font-medium text-lg">Monthly Type</label>

                  <div
                    className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 mt-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsMonthlyDropdownOpen(!isMonthlyDropdownOpen)}
                  >
                    <span className={`text-base font-Gilroy font-medium ${!selectedMonthlyType || selectedMonthlyType === placeholderOptionMonth ? "text-gray-400" : "text-black"}`}>
                      {selectedMonthlyType || placeholderOptionMonth}
                    </span>

                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>


                  {isMonthlyDropdownOpen && (

                    <div className="mt-3 bg-white border border-[#D9D9D9] rounded-2xl shadow-lg max-h-[90px] overflow-y-auto">
                      {monthlyOptions.map((type, index) => (
                        <div
                          key={index}

                          className="px-4 py-3 text-black text-base font-medium cursor-pointer border-b last:border-b-0 border-gray-300    hover:bg-#F4F7FF"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMonthlyType(type);
                            setIsMonthlyDropdownOpen(false);
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}


              {selectedMonthlyType === "Day" && selectedOption === "Monthly" && (
                <div className="relative w-full mt-3 flex gap-2">

                  <div className="grid grid-cols-12 gap-4 w-full">

                    <div className="relative col-span-12 sm:col-span-4">
                      <div
                        className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => setIsOrdinalDropdownOpen(!isOrdinalDropdownOpen)}
                      >


                        <span className={`text-base font-Gilroy font-medium ${selectedOrdinal === "week" || !selectedOrdinal ? "text-gray-400" : "text-black"}`}>
                          {selectedOrdinal || "week"}
                        </span>


                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </div>


                      {isOrdinalDropdownOpen && (
                        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#D9D9D9] rounded-2xl shadow-lg z-10 max-h-[100px] overflow-y-auto ">
                          {["1st", "2nd", "3rd", "4th", "5th"].map((ordinal, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 text-black text-base font-medium cursor-pointer border-b last:border-b-0 border-gray-300 hover:bg-#F4F7FF"
                              onClick={() => {
                                setSelectedOrdinal(ordinal);
                                setIsOrdinalDropdownOpen(false);
                                setSelectedDueDate(`${ordinal} ${selectedDay}`);
                              }}
                            >
                              {ordinal}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative col-span-12 sm:col-span-8">
                      <div
                        className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
                      >
                        <span className={`text-base font-Gilroy font-medium ${selectedDay === placeholderSelect ? "text-gray-400" : "text-black "}`}>
                          {selectedDay || "Select a day"}
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </div>

                      {isDayDropdownOpen && (
                        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#D9D9D9] rounded-2xl shadow-lg z-10  max-h-[100px] overflow-y-auto ">
                          {dayOptions.map((day, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 text-black text-base font-medium cursor-pointer border-b last:border-b-0 border-gray-300 hover:bg-#F4F7FF"
                              onClick={() => {
                                setSelectedDay(day);
                                setIsDayDropdownOpen(false);
                                setSelectedDueDate(`${selectedOrdinal} ${day}`);
                              }}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>


                </div>
              )}

              {selectedMonthlyType === "Date" && selectedOption === "Monthly" && (

                <div className="mt-2 relative" >
                  <label className="text-black text-sm font-Gilroy font-medium text-lg">Due</label>

                  <DatePicker
                    ref={datePickerRef}

                    selected={isValidDate(selectedDueDate) ? selectedDueDate : null}
                    onChange={(date) => handleDate(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select a date"
                    className="cursor-pointer w-[410px] h-[60px] mt-4 border border-[#D9D9D9] rounded-2xl p-4 text-black text-base font-Gilroy font-medium"
                  />

                  <div
                    className="absolute right-4 top-[70px] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => datePickerRef.current.setFocus()}
                  >
                    <CalendarDays size={20} />
                  </div>
                </div>
              )}

              <div className="mt-5">
                <label className="text-black font-Gilroy text-sm font-medium text-lg">Due count <span className="text-red-500 text-[20px]">*</span></label>
                <input
                  type="text" value={selectedDueCount}
                  placeholder="Enter due count"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setSelectedDueCount(value);
                      setDueCountError("");
                    }
                  }}
                  className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 font-Gilroy"
                />

                {dueCountError && (
                  <div className="flex items-center text-red-500 text-xs font-Gilroy mt-1">
                    <MdError className="mr-1 text-base" />
                    <p >{dueCountError}</p>
                  </div>
                )}
              </div>


              <div className="mt-5">
                <label className="text-black font-Gilroy text-sm font-medium text-lg">Interest <span className="text-red-500 text-[20px]">*</span></label>
                <input
                  type="text" value={selectedInterest}
                  placeholder="Enter interest "
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setSelectedInterest(value);
                      setInterestError("");
                    }
                  }}

                  className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 font-Gilroy"
                />

                {interestError && (
                  <div className="flex items-center text-red-500 text-xs font-Gilroy mt-1">
                    <MdError className="mr-1 text-base" />
                    <p >{interestError}</p>
                  </div>
                )}
              </div>
            </div>


            <button onClick={handleSubmit}
              className="mt-10 w-full h-60 font-Gilroy bg-black text-white rounded-60 pt-[20px] pr-[40px] pb-[20px] pl-[40px]
 text-base font-medium"
            >
              Add loan
            </button>
          </div>

        </div>

      )}


      <div className="max-h-[280px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {currentLoans && currentLoans.length > 0 ? (
          currentLoans.map((loan, index) => (
            <div key={index} className="w-full h-[220px] bg-[#F4F7FF] flex flex-col rounded-3xl p-4">
              <div className="flex items-center">
                <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
                <p className="text-darkGray text-base font-medium leading-[19.09px] ml-2 font-Gilroy">
                  {loan.Loan_Name}
                </p>
                <div className="flex-grow"></div>
                <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
              </div>
              <div className="w-full border-t border-[#E7E7E7] my-2"></div>



              <div className="flex justify-between w-full pt-3">
                <p className="text-[#939393] font-Gilroy font-medium text-sm ">Requiring Type</p>
                <p className="text-black font-Gilroy font-semibold text-sm text-right">
                  {loan ? loan.Due_Type : ''}
                </p>
              </div>

              {loan && loan.Due_Type !== 'Daily' && (
                <div className="flex justify-between w-full pt-3">
                  <p className="text-[#939393] font-Gilroy font-medium text-sm ">Requiring on</p>
                  <p className="text-black font-Gilroy font-semibold text-sm text-right">
                    {loan.Due_Type === 'Monthly' ? (
                      isValidDateFor_DueOn(loan.Due_On)
                        ? getDateWithSuffix(loan.Due_On)
                        : loan.Due_On
                    ) : (
                      loan.Due_On
                    )}
                  </p>
                </div>
              )}



              <div className="flex justify-between w-full pt-3">
                <p className="text-[#939393] font-Gilroy font-medium text-sm ">Due Count</p>
                <p className="text-black font-Gilroy font-semibold text-sm text-right">{loan.Due_Count}</p>
              </div>



              <div className="flex justify-between w-full pt-3">
                <p className="text-[#939393] font-Gilroy font-medium text-sm ">Interest</p>
                <p className="text-black font-Gilroy font-semibold text-sm text-right">{loan.Interest}%</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-[280px]">

            <div className="w-64 h-64">
              <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
            </div>

            <p className="text-violet-600 text-lg font-medium text-center font-Gilroy">
              No Data Found
            </p>
          </div>
        )}
      </div>

      {allLoans.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            className={`px-4 py-2 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="px-4 py-2 border rounded">{currentPage}</span>
          <button
            className={`px-4 py-2 mx-2 border rounded ${indexOfLastItem >= allLoans.length ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= allLoans.length}
          >
            &gt;
          </button>
        </div>

      )}
    </div>
  );
}


const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo
  }
}
LoanSetting.propTypes = {
  state: PropTypes.object,
};


export default connect(mapsToProps)(LoanSetting);



