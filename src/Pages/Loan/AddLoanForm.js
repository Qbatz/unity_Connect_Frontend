/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CloseCircleIcon from '../../Asset/Icons/close-circle.svg';
import { useDispatch } from "react-redux";
import img1 from "../../Asset/Images/Memberone.svg";
import tick from '../../Asset/Icons/tick-circle.svg';
import { MdError } from "react-icons/md";
import EmptyState from '../../Asset/Images/Empty-State.jpg'
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { FaEllipsisH } from "react-icons/fa";
import editIcon from "../../Asset/Icons/edit_blue.svg";


function AddLoanForm({ state }) {
  const dispatch = useDispatch();


  const members = state.Member?.ActiveMemberdata || [];


  const [loans, setLoans] = useState(state.Loan?.getLoanTab || []);

  const [editLoanId, setEditLoanId] = useState(null);

  const loanGetSetting = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vitDetails, setVitDetails] = useState({});
  const [memberId, setMemberId] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedWitnesses, setSelectedWitnesses] = useState([]);

  const [isWitnessModalOpen, setIsWitnessModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Active loan");

  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [memberLoanType, setMemberLoanType] = useState("");
  const [eligibleLoanAmount, setEligibleLoanAmount] = useState("");


  const [approve, setApprove] = useState("");
  const [loading, setLoading] = useState(true);

  const [interesttype, setInterestType] = useState("");

  const [loanTypeError, setLoanTypeError] = useState("");

  const [loanAmountError, setLoanAmountError] = useState("");
  const [memberError, setMemberError] = useState("");
  const [witnessError, setWitnessError] = useState("");
  const [initialWitnesses, setInitialWitnesses] = useState([]);

  const [isRejectPopupOpen, setisRejectPopupOpen] = useState(false);
  const [rejectLoanData, setRejectLoanData] = useState('');

  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastApproved = currentPageApproved * itemsPerPage;
  const indexOfFirstApproved = indexOfLastApproved - itemsPerPage;

  const [NewwitnessOptions, setNewWitnessOptions] = useState("")
  const [openMenu, setOpenMenu] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [formError, setFormError] = useState("");
  const [createFrom, setCreateFrom] = useState()

  const handledots = (event, index) => {
    event.stopPropagation();
    setOpenMenu(openMenu === index ? null : index);

    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY + rect.height - 0,
      left: rect.left + window.scrollX - 130,
    });
  };

  const initialEditValues = useRef({});


  const handleEditclick = (item, loan, Loan_Id) => {

    setEditLoanId(Loan_Id)
    setIsModalOpen(true);
    setCreateFrom("edit");
    setOpenMenu(null);


    const selectedMemberOption = options.find(opt => opt.label === item.User_Name);

    const memberValue = selectedMemberOption?.value || "";

    const witnessValues = loan.Witness_Details.map(w => {
      const match = witnessOptions.find(opt => opt.label === w.User_Name);
      return match?.value;
    }).filter(Boolean);
    setSelectedWitnesses(witnessValues);

    const loanAmt = loan.Loan_Amount || "";


    initialEditValues.current = {
      memberId: memberValue,
      selectedWitnesses: witnessValues,
      loanAmount: loanAmt,
    };


    setMemberId(memberValue);
    setSelectedWitnesses(witnessValues);
    setLoanAmount(loanAmt);


  };

  const hasChanges = () => {
    if (createFrom !== "edit") return true;

    const original = initialEditValues.current;

    return (
      memberId !== original.memberId ||
      loanAmount !== original.loanAmount ||
      JSON.stringify(selectedWitnesses.sort()) !== JSON.stringify(original.selectedWitnesses.sort())
    );
  };

  const popupRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      setFormError("No Changes Detected");
      return;
    }

    let isValid = true;

    if (!memberId) {
      setMemberError("Please Select a Member");
      isValid = false;
    } else {
      setMemberError("");
    }

    if (selectedWitnesses.length === 0) {
      setWitnessError("Please Select at Least One Witness");
      isValid = false;
    } else {
      setWitnessError("");
    }

    if (!loanAmount) {
      setLoanAmountError("Please Enter the Loan Amount");
      isValid = false;
    } else {
      setLoanAmountError("");
    }

    if (!isValid) return;

    const payload = {
      member_id: parseInt(memberId),
      widness_ids: selectedWitnesses,
      loan_amount: parseFloat(loanAmount),
    };

    const Editpayload = {
      ...payload,
      id: editLoanId,
    };


    dispatch({
      type: 'LOAN_ADD',
      payload: createFrom ? Editpayload : payload,
    });

    setIsModalOpen(false);
    setCreateFrom("add");
    setLoanAmount("");
    setSelectedWitnesses([]);
    setMemberId("");
    setEditLoanId(null);
    setLoanAmountError('');
    setWitnessError('');
    setMemberError('');
    setFormError("");

  };






  useEffect(() => {
    if (state.Loan.statusCodeLoans === 200) {

      setLoading(false);
      dispatch({ type: "CLEARLOAN" });
      setIsModalOpen(false);

    }

    setMemberId("");
    setLoanAmount("");
    setIsModalOpen(false);
    setMemberLoanType("");
    setEligibleLoanAmount("");
    setIsApprovePopupOpen(false);

  }, [state.Loan.statusCodeLoans]);





  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "GET_LOAN",
    });

  }, []);

  useEffect(() => {

    if (state.Loan?.statusCodeLoansAddLoan === 200) {
      dispatch({ type: "GET_LOAN" });
      setTimeout(() => {
        dispatch({ type: "CLEARLOANADDED" })
      }, 500)
    }
  }, [state.Loan?.statusCodeLoansAddLoan])

  useEffect(() => {
    if (state.Loan?.statusCodeApprovalLoan === 200) {
      dispatch({ type: "GET_LOAN" });


      setTimeout(() => {
        dispatch({ type: "CLEAR_APPROVALLOAN" })
      }, 500)
    }
  }, [state.Loan?.statusCodeApprovalLoan])

  useEffect(() => {
    if (state.Loan?.statusCodewitness === 200) {
      dispatch({ type: "GET_LOAN" });


      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDWITNESS" })
      }, 500)
    }
  }, [state.Loan?.statusCodewitness])

  useEffect(() => {
    if (state.Loan?.statusCodeRejectLoan === 200) {
      dispatch({ type: "GET_LOAN" });


      setTimeout(() => {
        dispatch({ type: "CLEAR_REJECTLOAN" })
      }, 500)
    }
  }, [state.Loan?.statusCodeRejectLoan])



  useEffect(() => {
    dispatch({ type: 'MEMBERLIST' });
  }, []);

  useEffect(() => {
    dispatch({ type: "SETTINGS_GET_LOAN" });
  }, [dispatch]);


  useEffect(() => {
    if (isWitnessModalOpen) {
      setSelectedWitnesses([...initialWitnesses]);
    }
  }, [isWitnessModalOpen]);



  const handleAddNewWitness = (loan) => {
    setIsWitnessModalOpen(true);
    setVitDetails({ ...loan });

    const existingWitnesses = loan.Widness_Id
      ? loan.Widness_Id.split(",").map(Number)
      : [];

    setSelectedWitnesses(existingWitnesses);
    setInitialWitnesses(existingWitnesses);

    const memberId = loan.Member_Id;

    const updatedWitnessOptions = members
      ?.filter((member) => String(member.Id) !== String(memberId))
      .map((member) => ({
        value: member.Id,
        label: member.User_Name,
      }));

    setNewWitnessOptions(updatedWitnessOptions);
  };

  const handleAddWitness = () => {
    if (selectedWitnesses.length === 0) {
      setWitnessError("No changes detected. Please select at least one witness");
      return;
    }

    const isSelectionUnchanged =
      JSON.stringify([...selectedWitnesses].sort()) === JSON.stringify([...initialWitnesses].sort());

    if (isSelectionUnchanged) {
      setWitnessError("No changes detected");
      return;
    }

    const updatedWitnesses = [...new Set([...initialWitnesses, ...selectedWitnesses])];

    const witnessPayload = {
      id: vitDetails.Loan_Id,
      member_id: vitDetails.Member_Id,
      widness_ids: selectedWitnesses,
    };

    dispatch({ type: "ADD_WITNESS", payload: witnessPayload });


    setInitialWitnesses(updatedWitnesses);
    setIsWitnessModalOpen(false);
    setSelectedWitnesses([]);
    setWitnessError("");
  };




  const witnessOptions = members
    ?.filter((member) => String(member.Id) !== String(memberId))
    .map((member) => ({
      value: member.Id,
      label: member.User_Name,
    }));








  const [selectedLoan, setSelectedLoan] = useState(null);



  const handleApproval = (loan, selectedMember) => {
    setApprove({ ...loan, ...selectedMember });



    setIsApprovePopupOpen(true);
    setSelectedLoan(loan);

  }



  const approvalSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!memberLoanType) {
      setLoanTypeError("Please select a loan type ");
      isValid = false;
    } else {
      setLoanTypeError("");
    }



    if (!eligibleLoanAmount) {
      setLoanAmountError("Please Enter loan amount");
      isValid = false;
    } else {
      setLoanAmountError("");
    }

    if (!isValid) return;

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

    setInterestType("")
  };

  const handleClose = () => {
    setIsModalOpen(false)

    setLoanAmountError('');
    setWitnessError('');
    setMemberError('');
    setFormError("");
  }

  const handleReject = (loan) => {
    if (!loan) {
      console.error("Loan ID is missing");
      return;
    }

    dispatch({
      type: "LOAN_REJECT",
      payload: { loan_status: "Reject", id: loan.Loan_Id },
    });
    setisRejectPopupOpen(false);
  };

  useEffect(() => {
    setLoans(state?.Loan?.getLoanTab)
    setPaginatedActiveLoans(state.Loan?.getLoanTab?.filter(loan => !loan.Loan_Type && !loan.Loan_Status).slice(indexOfFirstActive, indexOfLastActive))

  }, [state.Loan.getLoanTab])

  const indexOfLastRejected = currentPageApproved * itemsPerPage;
  const indexOfFirstRejected = indexOfLastApproved - itemsPerPage;
  const paginatedRejectedLoans = loans?.length > 0 && loans?.filter(loan => loan?.Loan_Status === 'Reject').slice(indexOfFirstRejected, indexOfLastRejected);


  const [paginatedActiveLoans, setPaginatedActiveLoans] = useState([]);
  useEffect(() => {
    if (loans && loans.length > 0) {
      const filtered = loans.filter(loan => !loan?.Loan_Type && loan.Loan_Status !== "Reject");
      const indexOfLastActive = currentPageActive * itemsPerPage;
      const indexOfFirstActive = indexOfLastActive - itemsPerPage;
      setPaginatedActiveLoans(filtered.slice(indexOfFirstActive, indexOfLastActive));
    }
  }, [loans, currentPageActive]);
  const totalActiveLoans = loans?.filter(loan => !loan?.Loan_Type && loan.Loan_Status !== "Reject") || [];
  const indexOfLastActive = currentPageActive * itemsPerPage;
  const indexOfFirstActive = indexOfLastActive - itemsPerPage;

  const paginatedApprovedLoans = loans?.length > 0 && loans?.filter(loan => loan.Loan_Type).slice(indexOfFirstApproved, indexOfLastApproved);


  const options = members.map((member) => ({
    value: member.Id,
    label: member.User_Name,
  }));


  useEffect(() => {
    if (isApprovePopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isApprovePopupOpen]);

  const loanOptions = loanGetSetting?.SettingLoan?.getLoan?.loans?.map((loan) => ({
    value: loan.Id,
    label: loan.Loan_Name,
    interest: loan.Interest || "",
  })) || [];


  const customLoanStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",

      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: '60px',
      marginTop: '10px',
      fontStyle: 'Gilroy',
      "&:hover": { borderColor: "#666" },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Gilroy",
      fontSize: "16px",
      color: "#9CA3AF",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: loanOptions.length > 3 ? "150px" : "auto",
      overflowY: loanOptions.length > 3 ? "auto" : "hidden",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",

      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: '60px',
      marginTop: '10px',
      "&:hover": { borderColor: "#666" },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Gilroy",
      fontSize: "16px",
      color: "#9CA3AF",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: options.length > 3 ? "150px" : "auto",
      overflowY: options.length > 3 ? "auto" : "hidden",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
  };

  const customStyled = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",

      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: '60px',
      marginTop: '10px',
      minHeight: "48px",
      maxHeight: "auto",
      overflowY: "auto",
      "&:hover": { borderColor: "#666" },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Gilroy",
      fontSize: "16px",
      color: "#9CA3AF",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: witnessOptions.length > 3 ? "150px" : "auto",
      overflowY: witnessOptions.length > 3 ? "auto" : "hidden",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),

    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "wrap",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#E2E8F0",
      borderRadius: "4px",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      fontSize: "14px",
      color: "#333",
    }),

  };


  const customWitStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",
      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: "60px",
      marginTop: "10px",
      minHeight: "48px",
      maxHeight: "auto",
      overflowY: "auto",
      "&:hover": { borderColor: "#666" },
    }),
    menu: (base) => ({
      ...base,
      maxHeight: NewwitnessOptions.length > 3 ? "150px" : "auto",
      overflowY: "auto",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "wrap",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#E2E8F0",
      borderRadius: "4px",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      fontSize: "14px",
      color: "#333",
    }),

  };



  useEffect(() => {
    if (paginatedActiveLoans?.length === 0 && totalActiveLoans.length > 0) {
      setCurrentPageActive((prev) => (prev > 1 ? prev - 1 : 1));
    }
  }, [paginatedActiveLoans, totalActiveLoans]);




  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
        <ClipLoader color="#7f00ff" loading={loading} size={30} />
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto mt-5 p-4 ">
        <div>
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between w-full px-4 sm:px-5 gap-3 sm:gap-0">
            <p className="font-Gilroy font-semibold text-2xl text-black">
              Loan Request
            </p>

            <button
              className="bg-black text-white py-3 px-4 rounded-full text-base font-Gilroy font-medium"
              onClick={() => {
                setIsModalOpen(true);
                setCreateFrom("create");
                setSelectedWitnesses([]);
                setMemberId("");
                setLoanAmount("");
              }}
            >
              + Create Request
            </button>
          </div>

        </div>

        <div
          data-testid="Loans-tab"
          className="mt-5 px-4 sm:px-5 flex flex-col sm:flex-row overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal gap-4 sm:gap-10"
        >
          {["Active loan", "Approved loan", "Rejected loan"].map((tab, index) => (
            <button
              data-testid={`button-tab-${index}`}
              key={tab}

              onClick={() => {
                setActiveTab(tab);
                if (tab === "Approved loan") {
                  setCurrentPageApproved(1);
                } else if (tab === "Active loan") {
                  setCurrentPageActive(1);
                } else if (tab === "Rejected loan") {
                  setCurrentPageApproved(1);
                }
              }}
              className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative ${activeTab === tab ? "text-black font-medium" : "text-[#939393]"
                }`}
            >
              {tab}
              <span
                className={`absolute left-1/2 bottom-0 h-[2px] w-[100px] sm:w-[130px] transform -translate-x-1/2 transition-all ${activeTab === tab ? "bg-black" : "bg-transparent"
                  }`}
              ></span>
            </button>
          ))}
        </div>


        {isModalOpen && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[464px] rounded-2xl p-6 shadow-lg transition-all duration-300 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">
                  {createFrom === "edit" ? "Edit a loan request" : "Add a loan request"}
                </h2>


                <img
                  src={CloseCircleIcon}
                  alt="Close"
                  onClick={handleClose}
                  className="w-8 h-8 cursor-pointer"
                />
              </div>
              <div className="w-full border border-[#E7E7E7] mx-auto"></div>


              <div className="mt-7">

                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Member<span className="text-red-500 text-[20px]">*</span>
                </label>

                <Select
                  value={options.find((opt) => opt.value === memberId)}
                  onChange={(selectedOption) => {
                    setMemberId(selectedOption ? selectedOption.value : "");

                    setMemberError("");
                    setFormError("");
                  }}
                  options={options}
                  placeholder="Select a member"
                  styles={customStyles}
                  isSearchable={true}
                  menuShouldScrollIntoView={true}
                  isValidNewOption={() => false} t
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change" && /\d/.test(inputValue)) {
                      return "";
                    }
                  }}
                />


                {memberError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center font-Gilroy">
                    <MdError className="mr-1" /> {memberError}
                  </p>
                )}

              </div>


              <div className="relative mt-7">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Witnesses <span className="text-red-500 text-[20px]">*</span>
                </label>

                <Select
                  value={witnessOptions.filter((opt) => selectedWitnesses.includes(opt.value))}
                  onChange={(selectedOptions) => {
                    setSelectedWitnesses(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
                    setWitnessError("");
                    setFormError("");
                  }}
                  options={witnessOptions}
                  placeholder="Select witnesses"
                  styles={customStyled}
                  isSearchable={true}
                  isMulti={true}
                  menuShouldScrollIntoView={true}
                />

                {witnessError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center font-Gilroy">
                    <MdError className="mr-1" /> {witnessError}
                  </p>
                )}
              </div>


              <div className="mt-7">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">Loan amount <span className="text-red-500 text-[20px]">*</span></label>
                <input
                  value={loanAmount}

                  onChange={(e) => {

                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setLoanAmount(value);
                    setFormError("");
                    setLoanAmountError('');
                  }}
                  type="text"
                  placeholder="Enter approved loan amount"
                  className="w-full h-60 border border-[#D9D9D9] font-Gilroy rounded-2xl p-4 mt-3 
             focus:border-gray-400 focus:outline-none"
                />
                {loanAmountError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center font-Gilroy">
                    <MdError className="mr-1" /> {loanAmountError}
                  </p>
                )}

              </div>
              {formError && (
                <div className="flex items-center justify-center text-red-500 text-xs mt-6 font-Gilroy">
                  <MdError className="mr-1 text-base" />
                  <p >
                    {formError}
                  </p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="mt-10 pt-[20px] pr-[40px] pb-[20px] pl-[40px] w-full h-59 bg-black text-white rounded-60 text-base font-Gilroy font-medium"
              >
                {createFrom === "edit" ? "Update loan request" : "Add loan request"}
              </button>

            </div>
          </div>
        )}

        {activeTab === "Active loan" && (
          <div>



            <div
              className={`active-loan max-h-[400px] overflow-y-auto p-5 scroll grid ${paginatedActiveLoans?.length > 0
                ? "gap-6 grid-cols-1 md:grid-cols-1  lg:grid-cols-2"
                : "place-items-center"
                }`}
            >

              {paginatedActiveLoans?.length > 0 ? (
                paginatedActiveLoans?.map((loan, index) => {

                  const selectedMember = members?.find(member => String(member.Id) === String(loan.Member_Id)) || null;


                  return (loan.Loan_Type === null && loan.Loan_Status !== "Reject") && (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex flex-col xs:flex-row items-center justify-between">
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

                            <p className="text-[#000000] text-sm bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block font-Gilroy">
                              {selectedMember?.Member_Id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-x-4">
                          <div className="flex items-center gap-2">
                            <p className="text-black font-semibold text-base font-Gilroy">
                              Loan amount: ₹{loan.Loan_Amount ? Number(loan.Loan_Amount).toLocaleString('en-IN') : "0"}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`cursor-pointer h-9 w-9 border border-gray-300 rounded-full flex justify-center items-center 
                                                        bg-white ${openMenu === index ? "!bg-blue-100" : ""}`}
                              onClick={(event) => handledots(event, index)}
                            >
                              <FaEllipsisH className="text-gray-600 text-sm"
                                onClick={(event) => handledots(event, index)} />
                            </div>
                            {openMenu === index && (
                              <div
                                ref={popupRef}
                                style={{
                                  position: 'fixed',
                                  top: `${popupPosition.top}px`,
                                  left: `${popupPosition.left}px`,
                                  right: '110px',
                                  zIndex: 50,

                                }}
                                className="absolute  top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-[130px]">
                                <button
                                  onClick={() => handleEditclick(selectedMember, loan, loan.Loan_Id)}
                                  className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy rounded-lg"
                                >
                                  <img src={editIcon} alt="Edit" className="h-4 w-4" />
                                  Edit
                                </button>

                              </div>
                            )}
                          </div>
                        </div>




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
                                  <div key={witnessData.Id} className="flex items-center  py-2 rounded-lg">
                                    <img src={img1} alt="Witness Profile" className="w-10 h-10 rounded-full" />
                                    <div className="ml-2">
                                      <p className="text-black font-semibold text-sm font-Gilroy font-semibold">{witnessData.User_Name}</p>
                                      <p className="text-[#000000] text-xs bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block font-Gilroy">{witnessData.Member_Id}</p>
                                    </div>
                                  </div>
                                ) : null;
                              })}



                            </div>
                          ) : null}


                        </div>

                      </div>



                      <div className="mt-10 flex flex-row max-[370px]:flex-col items-center justify-between gap-4 max-[370px]:gap-4">
                        <div className="font-Gilroy font-medium text-base text-[#222222] cursor-pointer max-[370px]:w-fullter"
                          onClick={() => handleAddNewWitness(loan)}
                        >+ Add witness</div>


                        <div className="flex sm:flex-row flex-col max-[370px]:w-full gap-3">
                          <button className="w-full sm:w-auto border border-black text-[#222222] py-3 px-6 rounded-full text-base font-Gilroy font-medium cursor-pointer "

                            onClick={() => {
                              setisRejectPopupOpen(true);
                              setRejectLoanData({ ...loan })
                            }}
                          >
                            Reject
                          </button>



                          <button className="w-full sm:w-auto bg-black text-white py-3 px-6 rounded-full text-base font-Gilroy font-medium cursor-pointer"

                            onClick={() => handleApproval(loan, selectedMember)}
                          >
                            Approve
                          </button>
                        </div>
                      </div>



                      {isRejectPopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-[9999]">
                          <div className="bg-white w-[388px] h-[200px] mx-auto rounded-2xl shadow-lg">

                            <div className="flex justify-center items-center p-4">
                              <h2 className="text-[18px] font-semibold text-[#222222] font-Gilroy">
                                Reject Loan ?
                              </h2>
                            </div>


                            <div className="text-center text-[14px] font-medium text-[#646464] font-Gilroy mt-[-10px]">
                              Are you sure you want to reject the loan?
                            </div>


                            <div className="flex justify-center mt-4 p-4">
                              <button
                                className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-white text-[#1E45E1] border border-[#1E45E1] font-semibold font-Gilroy text-[14px] mr-2"
                                onClick={() => setisRejectPopupOpen(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-[#1E45E1] text-white font-semibold font-Gilroy text-[14px]"
                                onClick={() => handleReject(rejectLoanData)}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      )}


                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center">

                  <div className="w-64 h-64">
                    <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
                  </div>

                  <p className="text-violet-600 text-lg text-center font-medium font-Gilroy">
                    No Data Found
                  </p>
                </div>

              )}

            </div>




            {totalActiveLoans.length > itemsPerPage && (
              <div className="md:justify-end  fixed bottom-0 left-0 w-full p-2 flex justify-end">
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
                  className={`px-4 py-2 mx-2 border rounded ${indexOfLastActive >= totalActiveLoans.length
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageActive(currentPageActive + 1)}
                  disabled={indexOfLastActive >= totalActiveLoans.length}
                >
                  &gt;
                </button>

              </div>
            )}
          </div>



        )}



        {isWitnessModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] p-4">
            <div className="bg-white w-[400px] rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Add New  Witnesses</h2>
                <button
                  className="text-gray-600 text-xl"
                  onClick={() => {
                    setIsWitnessModalOpen(false);
                    setWitnessError("");
                    setInitialWitnesses([])
                  }}
                >
                  <img src={CloseCircleIcon} alt="Close" />
                </button>

              </div>
              <div className="w-full border border-[#E7E7E7] mx-auto my-2 mb-4"></div>
              <div className="relative">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Witnesses Names
                </label>
                <Select
                  value={NewwitnessOptions.filter((opt) => selectedWitnesses.includes(opt.value))}

                  onChange={(selectedOptions) => {
                    setSelectedWitnesses(selectedOptions.map((opt) => opt.value));
                    setWitnessError("");
                  }}



                  options={NewwitnessOptions}
                  placeholder="Select witnesses"
                  styles={customWitStyles}
                  isSearchable={true}
                  isMulti={true}
                  menuShouldScrollIntoView={true}
                  isValidNewOption={() => false}
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change" && /\d/.test(inputValue)) {
                      return "";
                    }
                  }}
                />
              </div>

              {witnessError &&

                <p className="text-red-500 text-xs flex items-center justify-center font-Gilroy mt-2">
                  <MdError className="mr-1" />
                  {witnessError}
                </p>
              }

              <button
                className="mt-6 bg-black text-white border font-Gilroy font-medium text-base cursor-pointer rounded-[60px] w-full h-[51px] pt-4 pr-5 pb-4 pl-5"
                onClick={handleAddWitness}
              >
                Add Witnesses
              </button>
            </div>
          </div>
        )}


        {isApprovePopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4 overflow-hidden">
            <div className="bg-white p-4 rounded-2xl shadow-lg w-[465px] max-w-xl max-h-[98vh] overflow-y-auto flex flex-col">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Approve Loan?</h2>
                <button
                  className="text-gray-600 text-xl"

                  onClick={() => {
                    setIsApprovePopupOpen(false);
                    setLoanAmountError("");

                    setLoanTypeError("");
                    setMemberLoanType("");
                    setInterestType("");
                    setEligibleLoanAmount('');
                  }}
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



              <div className="mt-4 relative">
                <label className="text-black text-sm font-medium font-Gilroy">
                  Loan type <span className="text-red-500 text-[20px]">*</span>
                </label>

                <Select
                  value={loanOptions.find((opt) => String(opt.value) === String(memberLoanType)) || null}
                  onChange={(selectedOption) => {
                    setMemberLoanType(selectedOption ? selectedOption.value : "");
                    setInterestType(selectedOption ? selectedOption.interest : "");
                    setLoanTypeError("")
                  }}
                  options={loanOptions}
                  placeholder="Select a loan type"
                  styles={customLoanStyles}
                  isSearchable={true}
                  menuShouldScrollIntoView={true}
                  isValidNewOption={() => false}
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change" && /\d/.test(inputValue)) {
                      return "";
                    }
                  }}
                />

                {loanTypeError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center font-Gilroy">
                    <MdError className="mr-1" /> {loanTypeError}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="text-black font-Gilroy text-sm font-medium text-lg mt-10">Interest type<span className="text-red-500 text-[20px]">*</span></label>
                <input
                  type="text"
                  value={interesttype}
                  readOnly
                  className="w-full h-60 font-Gilroy border border-[#D9D9D9] rounded-2xl p-4 mt-3  focus:border-gray-400 focus:outline-none"
                />

              </div>

              <div className="mt-4">
                <label className="text-black text-sm font-medium font-Gilroy">Loan Amount<span className="text-red-500 text-[20px]">*</span></label>

                <input
                  value={eligibleLoanAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value !== "" && Number(value) > selectedLoan.Loan_Amount) {

                      setLoanAmountError(`Loan amount cannot exceed ₹ ${selectedLoan.Loan_Amount}`);
                    } else {
                      setLoanAmountError("");
                    }
                    setEligibleLoanAmount(value);
                  }}
                  type="text"
                  placeholder="Enter approved loan amount"
                  className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-3 mt-2 font-Gilroy  focus:border-gray-400 focus:outline-none"
                />

                {loanAmountError && <p className="text-red-500 text-xs mt-1 flex items-center font-Gilroy"><MdError className="mr-1" /> {loanAmountError}</p>}
              </div>

              <div className="mt-5">
                <p className="font-Gilroy text-sm font-medium text-[#939393]">Note: Once loan approved cannot be canceled!</p>
              </div>



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



            <div
              className={`active-loan max-h-[400px] overflow-y-auto p-5 scroll grid ${paginatedApprovedLoans?.length > 0
                ? "gap-6 grid-cols-1 md:grid-cols-1  lg:grid-cols-2"
                : "place-items-center"
                }`}
            >
              {paginatedApprovedLoans.length > 0 ? (
                paginatedApprovedLoans.map((loan) => {

                  const selectedMember = members?.find((member) => String(member.Id) === String(loan.Member_Id)) || null;

                  return (loan.Loan_Type && loan.Loan_Status !== 'Reject') && (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex flex-col xs:flex-row items-center justify-between">
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

                        <p
                          style={{ marginTop: '' }}
                          className="text-black font-semibold text-base font-Gilroy"
                        >
                          Loan amount: ₹{loan.Approved_Amount ? Number(loan.Approved_Amount).toLocaleString('en-IN') : "0"}
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
                                  <div key={witnessData.Id} className="flex items-center  py-2 rounded-lg">
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
                              <span className="text-black text-base font-Gilroy font-semibold">
                                {new Date(loan.Approvel_Date).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>{" "}
                              with interest of {" "}
                              {loan?.Interest_Type}% p.m

                            </p>

                          </div>
                        )}





                      </div>
                    </div>
                  );
                })
              ) : (

                <div className="flex flex-col items-center justify-center">

                  <div className="w-64 h-64">
                    <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
                  </div>

                  <p className="text-violet-600 text-lg font-medium text-center font-Gilroy">
                    No Data Found
                  </p>
                </div>
              )}

            </div>
            {loans?.filter(loan => loan.Loan_Type).length > itemsPerPage && (
              <div className=" md:justify-end  fixed bottom-0 left-0 w-full p-2 flex justify-end">

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
                  className={`px-4 py-2 mx-2 border rounded ${indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageApproved(currentPageApproved + 1)}
                  disabled={indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>


        )}



        {activeTab === "Rejected loan" && (

          <div>



            <div
              className={`active-loan max-h-[400px] overflow-y-auto p-5 scroll grid ${paginatedRejectedLoans?.length > 0
                ? "gap-6 grid-cols-1 md:grid-cols-1  lg:grid-cols-2"
                : "place-items-center"
                }`}
            >
              {paginatedRejectedLoans.length > 0 ? (
                paginatedRejectedLoans.map((loan) => {

                  const selectedMember = members?.find((member) => String(member.Id) === String(loan.Member_Id)) || null;

                  return (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex flex-col xs:flex-row items-center justify-between">
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


                        <p style={{ marginTop: '' }} className="text-black font-semibold text-base font-Gilroy font-semibold">

                          Loan amount: ₹{loan.Loan_Amount ? Number(loan.Loan_Amount).toLocaleString('en-IN') : "0"}
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
                                  <div key={witnessData.Id} className="flex items-center  py-2 rounded-lg">
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


                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center">

                  <div className="w-64 h-64">
                    <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
                  </div>

                  <p className="text-violet-600 text-lg font-medium text-center font-Gilroy">
                    No Data Found
                  </p>
                </div>

              )}

            </div>
            {loans?.filter(loan => loan.Loan_Type).length > itemsPerPage && (
              <div className="md:justify-end  fixed bottom-0 left-0 w-full p-2 flex justify-end">
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
                  className={`px-4 py-2 mx-2 border rounded ${indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageApproved(currentPageApproved + 1)}
                  disabled={indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length}
                >
                  &gt;
                </button>
              </div>
            )}
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