/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordPaymentIcon from "../../Asset/Icons/RecordPayment.svg";
import CloseCircle from "../../Asset/Icons/close-circle.svg";
import { MdError } from "react-icons/md";
import moment from "moment";
import { CalendarDays } from "lucide-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function MemberStatements({ state, member }) {






  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const Statement = state.Member.getStatement;
  const loanDetails = state?.Member?.GetTransactionsList?.loan_details || []

  const result = state.Member.GetTransactionsList.result

  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paidAmount, setPaidAmount] = useState('');
  const [pendingAmount, setPendingAmount] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedStatement, setSelectedStatement] = useState();
  const [SelectedLoan, setSelectedLoan] = useState();


  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = Statement.slice(indexOfFirstItem, indexOfLastItem);

  const [showTransactionDetails, setShowTransactionDetails] = useState(false);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (member?.Id) {
      dispatch({
        type: "GETSTATEMENT",
        payload: { id: member.Id },
      });
    }
  }, [member?.Id]);


  useEffect(() => {
    if (state.Member.statusCodeForRecordPayment === 200) {
      setIsModalOpen(false);
      dispatch({ type: 'GETSTATEMENT', payload: { id: member.Id } })
      dispatch({ type: "CLEAR_STATUS_CODES_RECORD_PAYMENT" });
    }
  }, [state.Member.statusCodeForRecordPayment])

  useEffect(() => {
    if (state.Member.statusCodeAddTransactions === 200) {
      setIsModalOpen(false);
      dispatch({ type: 'GETSTATEMENT', payload: { id: member.Id } })
      dispatch({ type: "CLEAR_STATUS_CODE_ADD_TRANSACTIONS" });
    }
  }, [state.Member.statusCodeAddTransactions])

  useEffect(() => {
    if (selectedStatement) {
      setPaidAmount(selectedStatement.Paid_Amount || "");

      setPendingAmount(
        selectedStatement.Pending_Amount_For_Due === null ? selectedStatement.Due_Amount : selectedStatement.Pending_Amount_For_Due
      );


      setStatus(selectedStatement.Status || "");
    }
  }, [selectedStatement]);


  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (field === "loanAmount") {
      const loan = parseFloat(value) || 0;
      const paid = parseFloat(paidAmount) || 0;
      setPendingAmount((loan - paid).toString());
    }
    else if (field === "paidAmount") {
      setPaidAmount(value);

      const loan = parseFloat(
        selectedStatement?.Outstanding_Amount
          !== null
          ? selectedStatement?.Outstanding_Amount
          : selectedStatement?.Total_Amount
      ) || 0;

      const paid = parseFloat(value) || 0;
      setPendingAmount((loan - paid).toString());
    }
    else if (field === "pendingAmount") {
      setPendingAmount(value);
    }
    else if (field === "status") {
      setStatus(value);
    }
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!paidAmount) newErrors.paidAmount = "Paid amount is required";


    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      const payload = {
        member_id: selectedStatement.Member_Id,
        loan_amount: selectedStatement.Loan_Amount,
        due_date: selectedStatement.Due_Date,
        paid_amount: paidAmount,
        pending_amount: pendingAmount,
        status: status,
        loan_id: selectedStatement.Loan_Id,
        id: selectedStatement.Id
      };

      dispatch({
        type: 'ADDRECORDPAYMENT',
        payload: payload,
      });
      setPaidAmount('');


      setStatus("");
      setIsModalOpen(false);
    }
  };


  const handleClose = () => {
    setIsModalOpen(false);

    setPaidAmount('')
    setErrors({});
  };

  const handleLoanIdClick = (item) => {



    setSelectedLoan(item);
    setShowTransactionDetails(true);
    dispatch({
      type: "GETTRANSACTIONSLIST",
      payload: { member_id: item.Member_Id, loan_id: item.Loan_Id, id: item.Id },
    });
  };

  const handleBackToStatements = () => {
    setShowTransactionDetails(false);
    setSelectedLoan(null);
  };



  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="w-full border rounded-lg px-3 py-2 mt-1 flex items-center justify-between cursor-pointer"
    >
      <span>{value || "Select date"}</span>
      <CalendarDays className="w-5 h-5 text-gray-500" />
    </div>
  ));

  CustomDateInput.displayName = "CustomDateInput";


  return (
    <div className=" ">
      <div className="flex justify-between items-center mb-3">

        <h2 className="text-base sm:text-lg md:text-2xl font-semibold font-Gilroy mb-4 mt-3">
          Loan Statements
          {SelectedLoan && (
            <span className="text-[#8338EC] text-xl font-Gilroy font-semibold"> : Loan - {SelectedLoan.Loan_ID}</span>
          )}
        </h2>
        {SelectedLoan && (
          <button onClick={handleBackToStatements} className="mb-4 text-blue-500 font-Gilroy text-xl mt-3">
            ← Back
          </button>
        )}
      </div>
      {SelectedLoan && (
        <div className=" rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-4">

            <div className="flex-1 border rounded-2xl shadow bg-white p-6">
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-800">
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">Total Loan Amount</p>
                  <p className="font-semibold text-base font-Gilroy">{loanDetails.Total_Amount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">Interest %</p>
                  <p className="font-semibold text-base font-Gilroy">{loanDetails.Interest}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">Total Paid amount</p>
                  <p className="font-semibold text-base font-Gilroy">{loanDetails.total_Paid_Amount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">Loan Status</p>
                  <p className="font-semibold text-base text-green-600 font-Gilroy">{loanDetails.Loan_Status}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">EMIs Paid / Total EMIs</p>
                  <p className="font-semibold text-base font-Gilroy">{loanDetails.EMI_Paid_Due_Count} / {loanDetails.Due_Count}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">Type</p>
                  <p className="font-semibold text-base font-Gilroy">{loanDetails.Due_Type}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">Next EMI Due Date</p>
                  <p className="font-semibold text-base font-Gilroy">{loanDetails.next_due_date}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-Gilroy font-medium mb-1">Monthly EMI</p>
                  <p className="font-semibold text-base font-Gilroy">{loanDetails.Due_Amount}</p>
                </div>
              </div>
            </div>


            <div className="w-full md:w-1/3 border rounded-2xl shadow bg-white p-6 flex flex-col items-center justify-center">
              <p className="text-purple-600 font-medium font-Gilroy">Remaining Balance</p>
              <p className="text-black font-semibold text-2xl mt-1 font-Gilroy">{loanDetails.Remaining_Amount}</p>
            </div>
          </div>

        </div>
      )}
      <div className="bg-#F4F7FF shadow-md rounded-xl overflow-hidden mt-2">
        <div className="w-full overflow-x-auto max-h-[320px] max-[453px]:max-h-[120px] ">
          {!showTransactionDetails ? (
            <table className="min-w-[640px] w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#F4F7FF] z-10 border-b border-gray-300">
                <tr className="text-[#939393] font-light text-sm font-Gilroy">
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Serial Number</th>
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Loan ID</th>
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Due Date</th>
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Loan Amount</th>
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Interest Amount</th>
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Pending</th>
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Paid Amount</th>
                  <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 font-Gilroy font-normal"></th>

                </tr>
              </thead>

              <tbody>
                {paginatedData?.map((item, index) => (

                  <tr key={index}>


                    <td className="p-2 pl-4 text-sm font-Gilroy text-center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>


                    <td className="p-0 text-sm font-Gilroy">

                      <button
                        onClick={() => handleLoanIdClick(item)}
                        className="text-blue-600 hover:underline focus:outline-none bg-transparent p-0 m-0"
                      >
                        {item.Loan_ID}
                      </button>

                    </td>


                    <td className="p-0 text-sm">
                      <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-Gilroy whitespace-nowrap">
                        {moment(item.Due_Date).format("DD MMM YYYY")}
                      </span>
                    </td>

                    <td className="px-4 py-2 font-Gilroy">{item.Princ_Amount}</td>


                    <td className="px-4 py-2 font-Gilroy">{item.Intrest_Amount}</td>
                    <td className="px-4 py-2 font-Gilroy">{item.Outstanding_Amount === null ? 0 : item.Outstanding_Amount}</td>
                    <td className="px-4 py-2 font-Gilroy">{item.paid_amount === null ? 0 : item.paid_amount}</td>
                    <td className="px-4 py-2 font-Gilroy">
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.Status === "Paid"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                          }`}
                      >
                        {item.Status}
                      </span>


                    </td>


                    <td className="px-4 py-2 relative">
                      <button

                        className={`cursor-pointer h-9 w-9 border border-gray-300 rounded-full flex justify-center items-center 
      bg-white ${showOptions === index ? "!bg-blue-100" : ""}`}
                        onClick={() => {
                          setShowOptions(showOptions === index ? null : index);
                          setSelectedStatement(item);
                        }}
                      >
                        <PiDotsThreeOutlineVerticalFill size={20} />
                      </button>

                      {showOptions === index && (
                        <div
                          ref={popupRef}
                          className="absolute right-20 top-2 bg-white w-[180px] border border-gray-200 rounded-lg shadow-lg z-10"
                        >
                          <button
                            className="flex items-center gap-2 w-full px-2 py-2 font-Gilroy border-b border-gray-200"
                            onClick={() => {
                              setIsModalOpen(true);
                              setPaidAmount('');
                            }}
                          >
                            <img src={RecordPaymentIcon} alt="Record Payment" className="h-4 w-4" />
                            Record Payment
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>



            </table>
          ) : (
            <>




              {SelectedLoan && (
                <>

                  <table className="min-w-[640px] w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#F4F7FF] z-10 border-b border-gray-300">
                      <tr className="text-[#939393] font-light text-sm font-Gilroy">

                        <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Date & Time</th>
                        <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Pay mode</th>
                        <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Transaction ID</th>
                        <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Amount</th>
                        <th className="px-4 py-2 font-Gilroy font-normal  whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result?.map((transaction) => (
                        <tr key={transaction.id}>

                          <td className="px-4 py-2 font-Gilroy">{moment(transaction.Transaction_Date).format("DD MMM YYYY, h:mm A")}</td>
                          <td className="px-4 py-2 font-Gilroy">Cash</td>
                          <td className="px-4 py-2 font-Gilroy">{transaction.Transaction_Id}</td>
                          <td className="px-4 py-2 font-Gilroy">{transaction.Amount}</td>

                          <td className="p-2">
                            <span className={`px-3 py-1.5 rounded-full text-black font-Gilroy ${transaction.Status === "Paid" ? "bg-emerald-100 px-6" : "bg-red-100"}`}>
                              {transaction.Status}
                            </span>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}


            </>
          )}




        </div>

      </div>

      {isModalOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 font-Gilroy">
          <div className="bg-white rounded-lg w-full max-w-md px-4 py-2 shadow-lg rounded-3xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <p className="text-lg font-semibold text-center text-black">
                Record payment
              </p>
              <button onClick={handleClose} className="text-gray-500 hover:text-black cursor-pointer">
                <img src={CloseCircle} className="w-8 h-8" alt="CloseIcon" />
              </button>
            </div>

            <div className="font-Gilroy max-h-[400px] sm:max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 mb-4">


                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1">Due Date</label>

                  <DatePicker
                    selected={selectedStatement?.Due_Date ? new Date(selectedStatement.Due_Date) : null}
                    onChange={(date) => setSelectedStatement({ ...selectedStatement, Due_Date: date })}
                    dateFormat="yyyy-MM-dd"
                    customInput={<CustomDateInput />}
                  />
                </div>


                <div>
                  <label className="text-sm font-semibold">Paid Amount</label>
                  <input
                    type="text"
                    value={paidAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleInputChange("paidAmount", value);
                      }
                    }}
                    placeholder="Enter amount"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
                  />
                  {errors.paidAmount && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.paidAmount}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold">Pending</label>
                  <input
                    type="text"
                    value={pendingAmount}
                    onChange={(e) => handleInputChange("pendingAmount", e.target.value)}
                    placeholder="Enter pending amount"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none text-gray-500"
                    readOnly
                  />
                  {errors.pendingAmount && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.pendingAmount}
                    </div>
                  )}
                </div>


              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={handleSubmit}
              >
                Record payment
              </button>
            </div>

          </div>
        </div>
      )}

      {Statement.length > 3 && (

        <div className="fixed bottom-0 left-0 w-full px-4 py-2 flex justify-end">
          <button
            className={`px-4 py-2 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;

          </button>
          <span className="px-4 py-2 border rounded">{currentPage}</span>
          <button
            className={`px-4 py-2 mx-2 border rounded ${indexOfLastItem >= Statement.length ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= Statement.length}
          >
            &gt;

          </button>
        </div>
      )}


    </div>
  );
};

const mapsToProps = (stateInfo) => {
  return { state: stateInfo };
};

MemberStatements.propTypes = {
  state: PropTypes.object,
  member: PropTypes.object,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default connect(mapsToProps)(MemberStatements); 