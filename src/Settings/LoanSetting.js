import React, { useState } from "react";
import CloseCircleIcon from '../Icons/close-circle.svg';
import { ChevronDown } from "lucide-react";
import ExpensesIcon from "../Icons/ExpensesIcon.svg";
import ThreeDotMore from "../Icons/ThreeDotMore.svg";
function LoanSetting() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select a due type");
    const [selectedWeekDay, setSelectedWeekDay] = useState("Select a due type");
    const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
    const [selectedMonthlyType, setSelectedMonthlyType] = useState("Select Monthly Type");
    const [isMonthlyDropdownOpen, setIsMonthlyDropdownOpen] = useState(false);

    const options = ["Daily", "Weekly", "Monthly"];
    const weeklyOptions = ["Daily", "Weekly", "Monthly", "Yearly"];
    const monthlyOptions = ["Day", "Date"];

    return (
        <div className="container mx-auto mt-10">
            <div className="flex items-center justify-between w-full pb-4">
                <div>
                    <p className="font-gilroy font-semibold text-[20px] text-black">Loan</p>
                    <p className="mt-5 text-gray-500 text-[14px] font-medium">
                        Set up the loan type and manage them
                    </p>
                </div>
                <button 
                    className="bg-black text-white w-[155px] h-[51px] rounded-[60px] text-[16px] font-medium px-[20px] py-[16px]"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Loan type
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-[464px] rounded-[40px] p-6 shadow-lg">
                  
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[20px] font-semibold">Add new loan</h2>
                            <img 
                                src={CloseCircleIcon} 
                                onClick={() => setIsModalOpen(false)} 
                                className="w-[32px] h-[32px] cursor-pointer"
                            />
                        </div>

                        <div className="w-full border border-[#E7E7E7]"></div>

                        <div className="mt-7">
               
                            <label className="text-black text-sm font-medium text-[18px]">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="w-full h-[60px] border border-[#D9D9D9] rounded-[16px] p-4 mt-3 
                                        placeholder:text-[16px] placeholder:font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"/>
                            
                  
                            <div className="relative w-full mt-5">
                                <label className="text-black text-sm font-medium text-[18px]">Due on</label>
                                <div 
                                    className="w-full h-[60px] border border-[#D9D9D9] rounded-[16px] p-4 mt-3 flex items-center justify-between cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className={`text-[16px] font-medium ${selectedOption === "Select a due type" ? "text-gray-400" : "text-black"}`}>
                                        {selectedOption}
                                    </span>
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                </div>

                              
                                {isOpen && (
                                    <div className="mt-3 bg-white border border-[#D9D9D9] rounded-[16px] shadow-lg">
                                        {options.map((option, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 text-black text-[16px] font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
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
                                    <label className="text-black text-sm font-medium text-[18px]">Due Type</label>
                                    <div 
                                        className="w-full h-[60px] border border-[#D9D9D9] rounded-[16px] p-4 mt-3 flex items-center justify-between cursor-pointer"
                                        onClick={() => setIsWeekDropdownOpen(!isWeekDropdownOpen)}
                                    >
                                        <span className={`text-[16px] font-medium ${selectedWeekDay === "Select a due type" ? "text-gray-400" : "text-black"}`}>
                                            {selectedWeekDay}
                                        </span>
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    </div>

                                    {isWeekDropdownOpen && (
                                        <div className="mt-3 bg-white border border-[#D9D9D9] rounded-[16px] shadow-lg">
                                            {weeklyOptions.map((day, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-3 text-black text-[16px] font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
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
                                    <label className="text-black text-sm font-medium text-[18px]">Monthly Type</label>
                                    <div 
                                        className="w-full h-[60px] border border-[#D9D9D9] rounded-[16px] p-4 mt-3 flex items-center justify-between cursor-pointer"
                                        onClick={() => setIsMonthlyDropdownOpen(!isMonthlyDropdownOpen)}
                                    >
                                        <span className={`text-[16px] font-medium ${selectedMonthlyType === "Select Monthly Type" ? "text-gray-400" : "text-black"}`}>
                                            {selectedMonthlyType}
                                        </span>
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    </div>

                                    {isMonthlyDropdownOpen && (
                                        <div className="mt-3 bg-white border border-[#D9D9D9] rounded-[16px] shadow-lg">
                                            {monthlyOptions.map((type, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-3 text-black text-[16px] font-medium cursor-pointer border-b last:border-b-0 border-gray-300"
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

                    
                            <div className="mt-5">
                                <label className="text-black text-sm font-medium text-[18px]">Due count</label>
                                <input
                                    type="text"
                                    placeholder="Enter due count"
                                    className="w-full h-[60px] border border-[#D9D9D9] rounded-[16px] p-4 mt-3"
                                />
                            </div>
                        </div>
                        
                       
                        <button 
                            className="mt-10 w-full h-[59px] bg-black text-white rounded-[60px] px-[40px] py-[20px] text-[16px] font-medium"
                        >
                            Add loan
                        </button>
                    </div>
                    
                </div>
            
            )}
            <div className="mt-10 w-[350px] h-[170px] border border-[#E7E7E7] bg-[#F4F7FF] flex flex-col rounded-[24px]">
        <div className="flex items-center px-4 py-4">
          <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
          <p className="text-[#222222] text-[16px] font-semibold leading-[19.09px] ml-2" style={{ fontFamily: "Gilroy", letterSpacing: "0%" }}>
            Category Name
          </p>
          <div className="flex-grow"></div>
          <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="w-[310px] mx-auto border-t border-[#E7E7E7]"></div>
        <div className="flex justify-between w-[310px] mx-auto px-2 pt-5">
          <p className="text-[#939393] font-gilroy font-[500] text-[14px] leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-gilroy font-semibold text-[14px] leading-[16.7px] text-right">Name</p>
        </div>
        <div className="flex justify-between w-[310px] mx-auto px-2 pt-5">
          <p className="text-[#939393] font-gilroy font-medium text-[14px] leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-gilroy font-semibold text-[14px] leading-[16.7px] text-right">Name</p>
        </div>
      </div>
        </div>
    );
}

export default LoanSetting;
