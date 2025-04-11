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

function LoanSetting({ state }) {

  const dispatch = useDispatch();

  const loanGetSetting = state;
  const statusCode = state.SettingLoan.statusCodeLoans;
  const datePickerRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a due type");
  const [selectedWeekDay, setSelectedWeekDay] = useState("Select a due type");
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  const [selectedMonthlyType, setSelectedMonthlyType] = useState("Select Monthly Type");
  const [isMonthlyDropdownOpen, setIsMonthlyDropdownOpen] = useState(false);

  const options = ["Daily", "Weekly", "Monthly"];
  const weeklyOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const monthlyOptions = ["Day", "Date"];
  const dayOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [selectedLoanName, setSelectedLoanName] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState(new Date());
  const [selectedDueCount, setSelectedDueCount] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState("Select a day");
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);


  const [isOrdinalDropdownOpen, setIsOrdinalDropdownOpen] = useState(false);
  const [selectedOrdinal, setSelectedOrdinal] = useState("1st");
  const dropdownRef = useRef(null);


  const ordinalOptions = ["1st", "2nd", "3rd", "4th", "5th"];



  const [loanNameError, setLoanNameError] = useState("");
  const [dueTypeError, setDueTypeError] = useState("");
  const [dueCountError, setDueCountError] = useState("");
  const [interestError, setInterestError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);





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
      setLoanNameError("Loan Name is required");
      isValid = false;
    } else {
      setLoanNameError("");
    }

    if (selectedOption === "Select a due type") {
      setDueTypeError("Please select a Due Type");
      isValid = false;
    } else {
      setDueTypeError("");
    }

    if (!selectedDueCount.trim()) {
      setDueCountError("Due Count is required");
      isValid = false;
    } else {
      setDueCountError("");
    }

    if (!selectedInterest.trim()) {
      setInterestError("Interest is required");
      isValid = false;
    } else {
      setInterestError("");
    }

    if (!isValid) return;




    const payload = {
      loan_name: selectedLoanName,
      due_on: selectedDueDate,
      due_type: selectedOption,
      due_count: selectedDueCount,
      Id: loanGetSetting,
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
      dispatch({ type: "SETTINGS_GET_LOAN" });

    }


    setSelectedLoanName("");
    setSelectedDueDate("");
    setSelectedDueCount("");
    setSelectedInterest("");
    setSelectedLoanName("");
    setSelectedOption("Select a due type");
    setSelectedWeekDay("Select a due type");
    setSelectedMonthlyType("Select Monthly Type");
    setSelectedOrdinal("1st");
    setSelectedDay("Select a day");

    setSelectedDueCount("");
    setIsModalOpen(false);
    setLoanNameError("");
    setDueTypeError('');
    setDueCountError('');
    setInterestError('');


  }, [statusCode, dispatch]);


  useEffect(() => {
    dispatch({ type: "SETTINGS_GET_LOAN" });
  }, [dispatch]);


  useEffect(() => {
    if (state.SettingGetLoan?.statusCodeLoans === 200) {
      dispatch({ type: "CLEARSETTINGADDLOAN" });
    }
  }, [state.SettingGetLoan?.statusCodeLoans, dispatch]);


  useEffect(() => {
    if (state.SettingLoan.statusCodeLoans === 200) {
      dispatch({ type: "SETTINGS_GET_LOAN" });

      setTimeout(() => {
        dispatch({ type: "CLEARSETTINGLOAN" })
      }, 500)
    }
  }, [state.SettingLoan.statusCodeLoans, dispatch])


  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  const itemsPerPage = 3;

  const allLoans = loanGetSetting?.SettingLoan?.getLoan.loans || [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLoans = allLoans.slice(indexOfFirstItem, indexOfLastItem);




  const handleDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      setSelectedDueDate(date);
    } else {
      setSelectedDueDate(null);
    }

  };




  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between w-full gap-4 sm:gap-0">
        <div className="px-4 sm:px-6 lg:px-0 mt-4 sm:mt-6">
          <p className="font-Gilroy font-semibold text-lg sm:text-xl text-black">
            Loan
          </p>
          <p className="mt-3 sm:mt-5 text-gray-500 text-sm sm:text-base font-Gilroy font-medium">
            Set up the loan type and manage them
          </p>
        </div>

        <div className="px-4 sm:px-0 mt-2 sm:mt-0 w-full sm:w-auto flex justify-center sm:justify-start">
          <button
            className="w-full max-w-[300px] sm:w-[155px] bg-black font-Gilroy text-white text-sm sm:text-base font-medium py-[14px] sm:py-[16px] px-[20px] rounded-[60px]"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            + Loan type
          </button>
        </div>


      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center  justify-center bg-black bg-opacity-50">
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

                  setSelectedLoanName('')
                  setSelectedOption('')
                  setSelectedWeekDay('')
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
                <div className="flex items-center text-red-500 text-sm mt-1">
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
                  <span className={`text-base font-Gilroy font-medium ${selectedOption === "Select a due type" ? "text-gray-400" : "text-black"}`}>
                    {selectedOption}
                  </span>
                  <ChevronDown className="w-5 h-5  text-gray-500" />
                </div>
                {dueTypeError && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
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
                            setSelectedDueDate("Daily");
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
                    onClick={() => setIsWeekDropdownOpen(!isWeekDropdownOpen)}

                  >
                    <span className={`text-base font-Gilroy font-medium ${selectedWeekDay === "Select a due type" ? "text-gray-400" : "text-black"}`}>
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
                    <span className={`text-base font-Gilroy font-medium ${selectedMonthlyType === "Select Monthly Type" ? "text-gray-400" : "text-black"}`}>
                      {selectedMonthlyType}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>

                  {isMonthlyDropdownOpen && (
                    <div className="mt-3 bg-white border border-[#D9D9D9] rounded-2xl shadow-lg">
                      {monthlyOptions.map((type, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 text-black text-base font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
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






              {selectedMonthlyType === "Day" && (
                <div className="relative w-full mt-3 flex gap-2">



                  <div className="flex gap-4">

                    <div className="lg:w-[80px] relative">
                      <div
                        className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => setIsOrdinalDropdownOpen(!isOrdinalDropdownOpen)}
                      >
                        <span className={`text-base font-Gilroy font-medium ${selectedOrdinal === "Select a day count" ? "text-gray-400" : "text-black"}`}>
                          {selectedOrdinal}
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </div>

                      {isOrdinalDropdownOpen && (
                        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#D9D9D9] rounded-2xl shadow-lg z-10">
                          {ordinalOptions.map((ordinal, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 text-black text-base font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
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

                    <div className="lg:w-[320px] relative">
                      <div
                        className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
                      >
                        <span className={`text-base font-Gilroy font-medium ${selectedDay === "Select a day" ? "text-gray-400" : "text-black"}`}>
                          {selectedDay}
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </div>

                      {isDayDropdownOpen && (
                        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#D9D9D9] rounded-2xl shadow-lg z-10">
                          {dayOptions.map((day, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 text-black text-base font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
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





              {selectedMonthlyType === "Date" && (

                <div className="mt-2 relative" >
                  <label className="text-black text-sm font-Gilroy font-medium text-lg">Due</label>
                  <DatePicker
                    ref={datePickerRef}
                    selected={selectedDueDate}
                    onChange={handleDate}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select a date"
                    className="cursor-pointer w-[410px] h-[60px]  mt-4 border border-[#D9D9D9] rounded-2xl p-4 text-black text-base font-Gilroy font-medium"
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
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <MdError className="mr-1 text-base" />
                    <p >{dueCountError}</p>
                  </div>
                )}
              </div>


              <div className="mt-5">
                <label className="text-black font-Gilroy text-sm font-medium text-lg">Interest <span className="text-red-500 text-[20px]">*</span></label>
                <input
                  type="text" value={selectedInterest}
                  placeholder="Enter interest count"
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
                  <div className="flex items-center text-red-500 text-sm mt-1">
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
      <div className="mt-5 max-h-[300px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentLoans && currentLoans.length > 0 ? (
          currentLoans.map((loan, index) => (
            <div key={index} className="w-full max-w-sm h-[200px] bg-[#F4F7FF] flex flex-col rounded-3xl mx-auto">
              <div className="flex items-center px-4 py-4">
                <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
                <p className="text-darkGray text-base font-medium leading-[19.09px] ml-2 font-Gilroy">
                  {loan.Loan_Name}
                </p>
                <div className="flex-grow"></div>
                <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
              </div>

              <div className="w-[90%] mx-auto border-t border-[#E7E7E7]"></div>

              <div className="flex justify-between w-[90%] mx-auto px-2 pt-5">
                <p className="text-[#939393] font-Gilroy font-medium text-sm leading-[16.48px]">Due Count</p>
                <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">{loan.Due_Count}</p>
              </div>

              <div className="flex justify-between w-[90%] mx-auto px-2 pt-5">
                <p className="text-[#939393] font-Gilroy font-medium text-sm leading-[16.48px]">Interest</p>
                <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">{loan.Interest}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-[300px]">

            <div className="w-64 h-64">
              <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
            </div>

            <p className="text-violet-600 text-lg text-center font-Gilroy">
              No Data Found
            </p>
          </div>
        )}

      </div>


      {allLoans.length > 0 && (
        <div className="flex justify-end mt-[150px]">
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



