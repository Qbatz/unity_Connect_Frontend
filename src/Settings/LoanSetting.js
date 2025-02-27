import React, { useState,useEffect } from "react";
import CloseCircleIcon from '../Icons/close-circle.svg';
import { ChevronDown } from "lucide-react";
import ExpensesIcon from "../Icons/ExpensesIcon.svg";
import ThreeDotMore from "../Icons/ThreeDotMore.svg";
import PropTypes from "prop-types";
import { useDispatch, useSelector, connect } from "react-redux";

function LoanSetting({ state }) {

    const dispatch = useDispatch();
    const statusCode = useSelector((state) => state.SettingLoan.statusCodeLoan);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select a due type");
    const [selectedWeekDay, setSelectedWeekDay] = useState("Select a due type");
    const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
    const [selectedMonthlyType, setSelectedMonthlyType] = useState("Select Monthly Type");
    const [isMonthlyDropdownOpen, setIsMonthlyDropdownOpen] = useState(false);
const [selectedDay, setSelectedDay] = useState("Select a day");
    const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);

    const options = ["Daily", "Weekly", "Monthly"];
    const weeklyOptions = ["Daily", "Weekly", "Monthly", "Yearly"];
    const monthlyOptions = ["Day", "Date"];
const dayOptions = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const [selectedLoanName, setSelectedLoanName] = useState("");  
const [selectedDueDate, setSelectedDueDate] = useState("");    
const [selectedDueCount, setSelectedDueCount] = useState("");  


const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      loan_name: selectedLoanName, 
      due_on: selectedDueDate, 
      due_type: selectedOption, 
      due_count: selectedDueCount, 
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

  }, [statusCode, dispatch]);





    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between w-full">
                <div>
                    <p className="font-Gilroy font-semibold text-xl text-black">Loan</p>
                    <p className="mt-5 text-gray-500 text-sm font-Gilroy font-medium">
                        Set up the loan type and manage them
                    </p>
                </div>
                <button 
                   className="bg-black font-Gilroy text-white w-[155px] rounded-[60px] text-base font-medium pt-[16px] pr-[20px]
                    pb-[16px] pl-[20px]"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Loan type
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-464 rounded-40 p-6 shadow-lg">
                  
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold font-Gilroy">Add new loan</h2>
                            <img 
                            alt="Close Circle icon"
                                src={CloseCircleIcon} 
                                onClick={() => setIsModalOpen(false)} 
                                className="w-32 h-32 cursor-pointer"
                            />
                        </div>

                        <div className="w-full border border-[#E7E7E7]"></div>

                        <div className="mt-7">
               
                            <label className="text-black text-sm font-medium font-Gilroy text-lg">Name</label>
                            <input  value={selectedLoanName}
                                type="text"
                                placeholder="Enter Name" onChange={(e) => setSelectedLoanName(e.target.value)}
                                className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 
                                        placeholder:text-base placeholder:font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"/>
                            
                  
                            <div className="relative w-full mt-5">
                                <label className="text-black text-sm font-Gilroy font-medium text-lg">Due on</label>
                                <div 
                                    className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 mt-3 flex items-center justify-between cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className={`text-base font-Gilroy font-medium ${selectedOption === "Select a due type" ? "text-gray-400" : "text-black"}`}>
                                        {selectedOption}
                                    </span>
                                    <ChevronDown className="w-5 h-5  text-gray-500" />
                                </div>

                              
                                {isOpen && (
                                    <div className="mt-3 bg-white border border-[#D9D9D9] rounded-2xl shadow-lg">
                                        {options.map((option, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 text-black text-base font-Gilroy font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
                                                onClick={() => {
                                                    setSelectedOption(option);
                                                    setIsOpen(false);
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
                                        <div className="mt-3 bg-white border border-[#D9D9D9] rounded-2xl shadow-lg">
                                            {weeklyOptions.map((day, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-3 text-black text-base font-Gilroy font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
                                                    onClick={() => {
                                                        setSelectedWeekDay(day);
                                                        setIsWeekDropdownOpen(false);
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
                                                    onClick={() => {
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
    
    
    <div className="w-1/2 relative">
      <div 
        className="w-full h-[60px] border border-[#D9D9D9] rounded-2xl p-4 flex items-center justify-between cursor-pointer"
        onClick={() => {
          setIsDayDropdownOpen(!isDayDropdownOpen);
          
        }}
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
              }}
            >
              {day}
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
)}



                    
                            <div className="mt-5">
                                <label className="text-black font-Gilroy text-sm font-medium text-lg">Due count</label>
                                <input
                                    type="text"  value={selectedDueCount}
                                    placeholder="Enter due count" onChange={(e) => setSelectedDueCount(e.target.value)}
                                    className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3"
                                />
                            </div>
                        </div>
                        
                       
                        <button   onClick={handleSubmit}
                            className="mt-10 w-full h-60 font-Gilroy bg-black text-white rounded-60 pt-[20px] pr-[40px] pb-[20px] pl-[40px]
 text-base font-medium"
                        >
                            Add loan
                        </button>
                    </div>
                    
                </div>
            
            )}
            <div className="mt-5 w-350 h-170 border border-[#E7E7E7] bg-#F4F7FF flex flex-col rounded-3xl">
                
        <div className="flex items-center px-4 py-4">
          <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
          <p className="text-darkGray text-base font-medium leading-[19.09px] ml-2 font-Gilroy" >
            Category Name
          </p>
          <div className="flex-grow"></div>
          <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="w-310 mx-auto border-t border-[#E7E7E7]"></div>
        <div className="flex justify-between w-310 mx-auto px-2 pt-5">
          <p className="text-grayCustom font-Gilroy font-medium text-sm leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">Name</p>
        </div>
        <div className="flex justify-between w-310 mx-auto px-2 pt-5">
          <p className="text-grayCustom font-Gilroy font-medium text-sm leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">Name</p>
        </div>
      </div>
        </div>
    );
}

LoanSetting.propTypes = {
    state: PropTypes.object,
  };
  
  export default connect((stateInfo) => ({ state: stateInfo }))(LoanSetting);
  
