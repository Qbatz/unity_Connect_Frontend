/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CloseCircleIcon from '../../Asset/Icons/close-circle.svg';
import { useDispatch } from "react-redux";
import img1 from "../../Asset/Images/Memberone.svg";
import tick from '../../Asset/Icons/tick-circle.svg';
import { MdError } from "react-icons/md";
import { GrDown } from "react-icons/gr";

function AddLoanForm({ state }) {
  const dispatch = useDispatch();

  const statusCode = state.Loan.statusCodeLoans;
  const members = state.Member?.ActiveMemberdata || [];
  const loans = state.Loan.getLoanTab || [];
  const loanGetSetting = state;


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vitDetails, setVitDetails] = useState({});
  const [memberId, setMemberId] = useState("");
  const [witnessId, setWitnessId] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedWitnesses, setSelectedWitnesses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWitnessModalOpen, setIsWitnessModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Active loan");

  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [memberLoanType, setMemberLoanType] = useState("");
  const [eligibleLoanAmount, setEligibleLoanAmount] = useState("");

  const [approve, setApprove] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [interesttype, setInterestType] = useState("");


  const handleSelectWitness = (id) => {
    setSelectedWitnesses((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((witnessId) => witnessId !== id)
        : [...prevSelected, id]
    );
    setIsDropdownOpen(false);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!memberId) {
      setErrorMessage("Please fill  all fields");
      return;
    }

    if (selectedWitnesses.length === 0) {
      setErrorMessage("Please select at least one witness");
      return;
    }

    if (!loanAmount) {
      setErrorMessage("Please enter the loan amount");
      return;
    }

    setErrorMessage("");

    const payload = {
      member_id: parseInt(memberId),
      widness_ids: selectedWitnesses.length > 0 ? selectedWitnesses : [],
      loan_amount: parseFloat(loanAmount)
    };

    dispatch({
      type: "LOAN_ADD",
      payload,
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      setErrorMessage("");
    }
  }, [isModalOpen]);


  useEffect(() => {
    if (statusCode === 200) {
      dispatch({ type: "CLEARLOAN" });
      setIsModalOpen(false);
      dispatch({ type: "GET_LOAN" });
    }

    setMemberId("");
    setWitnessId("");
    setLoanAmount("");
    setIsModalOpen(false);
    setMemberLoanType("");
    setEligibleLoanAmount("");
    setIsApprovePopupOpen(false);

  }, [statusCode]);



  useEffect(() => {
    if (state.Loan?.statusCodeLoans === 200) {
      dispatch({ type: "CLEARLOAN" });
    }
  }, [state.Loan?.statusCodeLoans]);


  useEffect(() => {
    dispatch({ type: "GET_LOAN" });
  }, [dispatch]);


  useEffect(() => {
    if (state.Loan?.statusCodeLoans === 200) {
      dispatch({ type: "GET_LOAN" });

      setTimeout(() => {
        dispatch({ type: "CLEARLOAN" })
      }, 500)
    }
  }, [state.Loan?.statusCodeLoans])

  useEffect(() => {
    dispatch({ type: 'MEMBERLIST' });
  }, []);

  useEffect(() => {
    dispatch({ type: "SETTINGS_GET_LOAN" });
  }, [dispatch]);


  const handleAddWitness = () => {
    const witnessPayload = {
      id: vitDetails.Loan_Id,
      member_id: vitDetails.Member_Id,
      widness_ids: selectedWitnesses.length > 0 ? selectedWitnesses : [],
    };


    dispatch({ type: "ADD_WITNESS", payload: witnessPayload });
    dispatch({ type: "GET_LOAN" });

    setIsWitnessModalOpen(false);
    setVitDetails({});
    setSelectedWitnesses([]);


  };

  const handleAddNewWitness = (loan) => {

    setIsWitnessModalOpen(true);
    setVitDetails({ ...loan });
    setSelectedWitnesses([...loan.Widness_Id.split(",").map(Number)])
  }
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleApproval = (loan, selectedMember) => {
    setApprove({ ...loan, ...selectedMember });

    setIsApprovePopupOpen(true);
    setSelectedLoan(loan);
  }
  const approvalSubmit = async (e) => {
    e.preventDefault();

    if (!memberLoanType) {
      setErrorMessage("Please select a loan type before approving the loan.");
      return;
    }

    if (!eligibleLoanAmount) {
      setErrorMessage("Please enter the approved loan amount.");
      return;
    }

    if (!interesttype) {
      setErrorMessage("Interest type is missing. Please select a valid loan type.");
      return;
    }
    setErrorMessage("");

    const payload = {
      id: approve.Loan_Id,
      loan_type: Number(memberLoanType),
      loan_amount: Number(eligibleLoanAmount),
      interest: Number(interesttype)
    };

    dispatch({
      type: "ADD_APPROVAL",
      payload,
    });

  };

  const handleClose = () => {
    setIsModalOpen(false)
    setIsDropdownOpen(false);
  }


  const [isOpen, setIsOpen] = useState(false);

  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastActive = currentPageActive * itemsPerPage;
  const indexOfFirstActive = indexOfLastActive - itemsPerPage;
  const paginatedActiveLoans = loans.filter(loan => !loan.Loan_Type).slice(indexOfFirstActive, indexOfLastActive);

  const indexOfLastApproved = currentPageApproved * itemsPerPage;
  const indexOfFirstApproved = indexOfLastApproved - itemsPerPage;
  const paginatedApprovedLoans = loans.filter(loan => loan.Loan_Type).slice(indexOfFirstApproved, indexOfLastApproved);



  return (
    <>
      <div className="container mx-auto mt-5 ">
        <div>
          <div className="flex items-center  justify-between w-full pl-5 pr-5">
            <p className="font-Gilroy font-semibold text-2xl text-black">Loan Request</p>
            <button
              className="bg-black text-white py-4 px-5 rounded-full text-base font-Gilroy font-medium"

              onClick={() => {
                setIsModalOpen(true);
                setSelectedWitnesses([]);
                setMemberId("");
                setLoanAmount("");
              }}
            >
              + Create Request
            </button>
          </div>
        </div>

        <div data-testid='Loans-tab' className="mt-5 pl-5 pr-5 flex overflow-x-auto whitespace-nowrap flex-nowrap gap-10 scrollbar-hide">
          {["Active loan", "Approved loan"].map((tab, index) => (
            <button
              data-testid={`button-tab-${index}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative min-w-max ${activeTab === tab ? "text-black font-semibold" : "text-[#939393]"
                }`}
            >
              {tab}
              <span
                className={`container absolute left-1/2 bottom-0 h-[2px] lg:w-[130px] 
          transition-all transform -translate-x-1/2 ${activeTab === tab ? "bg-black" : "bg-transparent"}
        `}
              ></span>
            </button>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-464 rounded-40 p-6 shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Add a loan request</h2>
                <img
                  src={CloseCircleIcon}
                  alt="Close"
                  onClick={handleClose}
                  className="w-[24] h-[24] cursor-pointer"
                />
              </div>
              <div className="w-full border border-[#E7E7E7] mx-auto"></div>


              <div className="mt-7">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">Member</label>


                <div className="relative">
                  <div
                    className="cursor-pointer w-full font-Gilroy h-14 border border-[#D9D9D9] rounded-2xl p-4 mt-3 flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {memberId ? members.find((m) => m.Id === memberId)?.User_Name : "Select a member"}
                    <GrDown className="w-5 h-5" />
                  </div>


                  {isOpen && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-xl mt-1  max-h-48  overflow-y-auto shadow-lg z-10">
                      {members.length > 0 ? (
                        members.map((member) => (
                          <div
                            key={member.Id}
                            className="cursor-pointer p-3 hover:bg-gray-200"
                            onClick={() => {
                              setMemberId(member.Id);
                              setIsOpen(false); setErrorMessage("");
                            }}
                          >
                            {member.User_Name}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500">No members available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>




              <div className="relative mt-7">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Witnesses
                </label>


                <div
                  className="w-full h-60 font-Gilroy border border-[#D9D9D9] rounded-2xl p-4 mt-3 cursor-pointer" value={witnessId}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedWitnesses.length > 0
                    ? members
                      .filter((member) => selectedWitnesses.includes(member.Id))
                      .map((member) => member.User_Name)
                      .join(", ")
                    : "Select witnesses"}
                </div>


                {isDropdownOpen && (
                  <div className="absolute z-10 w-full border border-[#D9D9D9] bg-white rounded-2xl mt-2 max-h-48 overflow-y-auto">
                    {members.filter((member) => member.Id !== memberId).map((member) => (
                      <label
                        key={member.Id}
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked={selectedWitnesses.includes(member.Id)}
                          onChange={() => handleSelectWitness(member.Id)}
                          className="mr-2"
                        />
                        {member.User_Name}

                      </label>
                    ))}
                  </div>

                )}
              </div>




              <div className="mt-7">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">Loan amount</label>
                <input
                  value={loanAmount}

                  onChange={(e) => {

                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setLoanAmount(value); setErrorMessage("");
                  }}
                  type="text"
                  placeholder="Enter approved loan amount"
                  className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3"
                />
              </div>

              {errorMessage && (
                <p className="flex items-center gap-2 text-[red] text-sm font-medium mt-3">
                  <MdError className="text-sm" /> {errorMessage}
                </p>
              )}
              <button
                onClick={handleSubmit}
                className="mt-10 pt-[20px] pr-[40px] pb-[20px] pl-[40px] w-full h-59 bg-black text-white rounded-60 text-base font-Gilroy font-medium"
              >
                Add loan request
              </button>
            </div>
          </div>
        )}

        {activeTab === "Active loan" && (
          <div>

            <div className="active-loan max-h-[400px] overflow-y-auto p-5 mt-5 scroll gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

              {paginatedActiveLoans?.length > 0 ? (
                paginatedActiveLoans?.map((loan) => {
                  const selectedMember = members?.find((member) => String(member.Id) === String(loan.Member_Id)) || null;

                  return !loan.Loan_Type && (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={img1}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="ml-3">

                            <p className="text-black font-semibold text-base font-Gilroy font-semibold">
                              {selectedMember?.User_Name}
                            </p>

                            <p className="text-[#000000] text-sm bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">
                              {selectedMember?.Member_Id}
                            </p>
                          </div>
                        </div>


                        <p className="text-black font-semibold text-base font-Gilroy font-semibold">
                          Loan amount: ₹{loan.Loan_Amount}
                        </p>
                      </div>

                      <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>


                      <div className="witness-div">
                        <div className="mt-3">

                          <p className="text-[#939393] font-medium text-xs font-Gilroy">Witnesses</p>

                          {loan.Witness_Details && loan.Witness_Details.length > 0 ? (
                            <div className="flex flex-wrap gap-4 mt-2">
                              {loan.Witness_Details.map((witness) => {
                                const witnessData = members.find((member) => String(member.Id) === String(witness.Widness_Id || witness.Id));

                                return witnessData ? (
                                  <div key={witnessData.Id} className="flex items-center px-3 py-2 rounded-lg">
                                    <img src={img1} alt="Witness Profile" className="w-10 h-10 rounded-full" />
                                    <div className="ml-2">
                                      <p className="text-black font-semibold text-sm font-Gilroy font-semibold">{witnessData.User_Name}</p>
                                      <p className="text-[#000000] text-xs bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">{witnessData.Member_Id}</p>
                                    </div>
                                  </div>
                                ) : null;
                              })}



                            </div>
                          ) : null}


                        </div>

                      </div>



                      <div className="mt-10 flex items-center justify-between">
                        <div className="font-Gilroy font-medium text-base text-[#222222] cursor-pointer"
                          onClick={() => handleAddNewWitness(loan)}
                        >+ Add witness</div>


                        <div className="flex gap-3">
                          <button className="border border-black text-[#222222] py-3 px-8 rounded-full text-base font-Gilroy
                           font-medium cursor-pointer ">
                            Reject
                          </button>
                          <button className="bg-black text-white py-3 px-8 rounded-full text-base font-Gilroy font-medium cursor-pointer"

                            onClick={() => handleApproval(loan, selectedMember)}
                          >
                            Approve
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No Loan Data Available</p>
              )}

            </div>
            <div className="fixed bottom-0 left-0 w-full p-4 flex justify-end">
              <button
                className={`px-4 py-2 mx-2 border rounded ${currentPageActive === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"
                  }`}
                onClick={() => setCurrentPageActive(currentPageActive - 1)}
                disabled={currentPageActive === 1}
              >
                &lt;
              </button>
              <span className="px-4 py-2 border rounded">{currentPageActive}</span>
              <button
                className={`px-4 py-2 mx-2 border rounded ${indexOfLastActive >= loans.filter(loan => !loan.Loan_Type).length
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-[#F4F7FF] text-black"
                  }`}
                onClick={() => setCurrentPageActive(currentPageActive + 1)}
                disabled={indexOfLastActive >= loans.filter(loan => !loan.Loan_Type).length}
              >
                &gt;
              </button>
            </div>
          </div>



        )}



        {isWitnessModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[400px] rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Add New  Witnesses</h2>
                <button
                  className="text-gray-600 text-xl"
                  onClick={() => setIsWitnessModalOpen(false)}
                >
                  <img src={CloseCircleIcon} alt="Close" />
                </button>

              </div>


              <div className="relative">

                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Witnesses Names
                </label>

                <div
                  className="w-full h-12 font-Gilroy overflow-y-auto border border-gray-300 rounded-2xl p-3 mt-3 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedWitnesses.length > 0
                    ? members
                      .filter((member) => selectedWitnesses.includes(member.Id))
                      .map((member) => member.User_Name)
                      .join(", ")
                    : "Select witnesses"}
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full border border-gray-300 bg-white rounded-2xl mt-2 max-h-48 overflow-y-auto">
                    {members.map((member) => (
                      <label
                        key={member.Id}
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked={selectedWitnesses.includes(member.Id)}
                          onChange={() => handleSelectWitness(member.Id)}
                          className="mr-2"
                        />
                        {member.User_Name}
                      </label>
                    ))}
                  </div>
                )}
              </div>


              {errorMessage && (
                <p className="flex items-center gap-2 text-[red] text-sm font-medium mt-3">
                  <MdError className="text-sm" /> {errorMessage}
                </p>
              )}
              <button
                className="mt-10 bg-black text-white border font-Gilroy font-medium text-base cursor-pointer rounded-[60px] w-full h-[51px] pt-4 pr-5 pb-4 pl-5"
                onClick={handleAddWitness}
              >
                Add Witnesses
              </button>
            </div>
          </div>
        )}


        {isApprovePopupOpen && (
          <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[465px] rounded-2xl p-6 rounded-[40px] shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Approve Loan?</h2>
                <button
                  className="text-gray-600 text-xl"
                  onClick={() => setIsApprovePopupOpen(false)}
                >
                  <img src={CloseCircleIcon} alt="Close" />
                </button>

              </div>

              <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>

              <div>
                {selectedLoan && (
                  <div>
                    <p className="font-Gilroy text-sm font-medium text-[#939393]">Are you sure you want to approve a loan of amount
                      <span className="text-black font-semibold"> ₹ {selectedLoan.Loan_Amount}? </span>
                      Select a loan type to approve the loan amount!</p>
                  </div>
                )}</div>


              <div className="mt-4">
                <label className="text-black text-sm font-medium font-Gilroy">Loan Type</label>
                <div className="relative overflow-y-auto max-h-[200px]">
                  <select
                    value={memberLoanType}
                    onChange={(e) => {
                      setMemberLoanType(e.target.value);
                      setInterestType("");
                      setErrorMessage("");
                      const selectedLoan = loanGetSetting?.SettingLoan?.getLoan.loans?.find(
                        (loan) => String(loan.Id) === String(e.target.value)
                      );

                      setInterestType(selectedLoan?.Interest || "");
                    }}
                    className="w-full h-14 font-Gilroy border border-[#D9D9D9] rounded-2xl p-4 pr-12 mt-3 appearance-none"
                  >
                    <option value="">Select a Loan Type</option>
                    {loanGetSetting?.SettingLoan?.getLoan.loans?.map((loan, index) => (
                      <option key={index} value={loan.Id} >
                        {loan.Loan_Name}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-4 top-10 -translate-y-1/2 pointer-events-none w-8 h-6">
                    <GrDown />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-black font-Gilroy text-sm font-medium text-lg mt-10">Interest Type</label>
                <input
                  type="text"
                  value={interesttype}
                  readOnly
                  className="w-full h-60 font-Gilroy border border-[#D9D9D9] rounded-2xl p-4 mt-3"
                />
              </div>

              <div className="mt-4">
                <label className="text-black text-sm font-medium font-Gilroy">Loan Amount</label>
                <input
                  value={eligibleLoanAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setEligibleLoanAmount(value); setErrorMessage("");
                  }}
                  type="text"
                  placeholder="Enter Approved Loan Amount"
                  className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-3 mt-2"
                />
              </div>

              <div className="mt-5">
                <p className="font-Gilroy text-sm font-medium text-[#939393]">Note: Once loan approved cannot be canceled!</p>
              </div>


              {errorMessage && (
                <p className="flex items-center gap-2 text-[red] text-sm font-medium mt-3">
                  <MdError className="text-sm" /> {errorMessage}
                </p>
              )}
              <button className="mt-5 bg-black text-white border font-Gilroy font-medium text-base 
                          cursor-pointer rounded-[60px] w-full h-[60px] pt-4 pr-5 pb-4 pl-5"
                onClick={approvalSubmit}
              >
                Approve Loan
              </button>
            </div>
          </div>
        )}







        {activeTab === "Approved loan" && (
          <div>

            <div className="active-loan max-h-[400px] overflow-y-auto p-5 mt-5 scroll gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

              {paginatedApprovedLoans.length > 0 ? (
                paginatedApprovedLoans.map((loan) => {

                  const selectedMember = members?.find((member) => String(member.Id) === String(loan.Member_Id)) || null;

                  return loan.Loan_Type && (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={img1}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="ml-3">

                            <p className="text-black font-semibold text-base font-Gilroy font-semibold">
                              {selectedMember?.User_Name}
                            </p>

                            <p className="text-[#000000] text-sm bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">
                              {selectedMember?.Member_Id}
                            </p>
                          </div>
                        </div>


                        <p className="text-black font-semibold text-base font-Gilroy font-semibold">
                          Loan amount: ₹{loan.Approved_Amount}
                        </p>
                      </div>

                      <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>


                      <div className="witness-div">
                        <div className="mt-3">

                          <p className="text-[#939393] font-medium text-xs font-Gilroy">Witnesses</p>

                          {loan.Witness_Details && loan.Witness_Details.length > 0 ? (
                            <div className="flex flex-wrap gap-4 mt-2">
                              {loan.Witness_Details.map((witness) => {
                                const witnessData = members.find((member) => String(member.Id) === String(witness.Widness_Id || witness.Id));

                                return witnessData ? (
                                  <div key={witnessData.Id} className="flex items-center px-3 py-2 rounded-lg">
                                    <img src={img1} alt="Witness Profile" className="w-10 h-10 rounded-full" />
                                    <div className="ml-2">
                                      <p className="text-black font-semibold text-sm font-Gilroy font-semibold">{witnessData.User_Name}</p>
                                      <p className="text-[#000000] text-xs bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">{witnessData.Member_Id}</p>
                                    </div>
                                  </div>


                                ) : null;

                              })}



                            </div>
                          ) : (
                            <p className="text-gray-500">No Witnesses</p>
                          )}

                        </div>

                      </div>

                      <div>

                        {loan?.Approvel_Date && (
                          <div className="flex items-center gap-2 mt-5 mb-5">
                            <img src={tick} alt="Approved" className="w-5 h-5" />
                            <p className="text-black text-base font-Gilroy font-medium">
                              Loan approved on {" "}
                              <span className="text-black text-base font-Gilroy font-semibold">{new Date(loan.Approvel_Date).toLocaleDateString("en-GB")}</span>{" "}
                              with interest of {" "}
                              {loan?.Interest_Type} {" "}% p.m

                            </p>

                          </div>
                        )}





                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No Loan Data Available</p>
              )}

            </div>
            <div className="fixed bottom-0 left-0 w-full p-4 flex justify-end">
              <button
                className={`px-4 py-2 mx-2 border rounded ${currentPageApproved === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"
                  }`}
                onClick={() => setCurrentPageApproved(currentPageApproved - 1)}
                disabled={currentPageApproved === 1}
              >
                &lt;
              </button>
              <span className="px-4 py-2 border rounded">{currentPageApproved}</span>
              <button
                className={`px-4 py-2 mx-2 border rounded ${indexOfLastApproved >= loans.filter(loan => loan.Loan_Type).length
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-[#F4F7FF] text-black"
                  }`}
                onClick={() => setCurrentPageApproved(currentPageApproved + 1)}
                disabled={indexOfLastApproved >= loans.filter(loan => loan.Loan_Type).length}
              >
                &gt;
              </button>
            </div>
          </div>


        )}







      </div>
    </>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo
  }
}
AddLoanForm.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(AddLoanForm);