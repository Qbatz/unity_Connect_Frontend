/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, forwardRef } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordPaymentIcon from "../../Asset/Icons/RecordPayment.svg";
import CloseCircle from "../../Asset/Icons/close-circle.svg";
import { MdError } from "react-icons/md";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";

function MemberStatements({ state, member }) {



  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const Statement = state.Member.getStatement;


  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dueDate, setDueDate] = useState(null);
  const [paidAmount, setPaidAmount] = useState('');
  const [pendingAmount, setPendingAmount] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedStatement, setSelectedStatement] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(Statement.length / pageSize);
  const formattedDueDate = moment(Statement.Due_Date).format("DD-MM-YYYY");

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

  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (field === "loanAmount" || field === "paidAmount") {
      const loan = parseFloat(field === "loanAmount" ? value : selectedStatement?.Loan_Amount) || 0;
      const paid = parseFloat(field === "paidAmount" ? value : paidAmount) || 0;
      setPendingAmount((loan - paid).toString());
    }


    if (field === "dueDate") {
      setDueDate(value);
    } else if (field === "paidAmount") {
      setPaidAmount(value);
    } else if (field === "pendingAmount") {
      setPendingAmount(value);
    } else if (field === "status") {
      setStatus(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!paidAmount) newErrors.paidAmount = "Paid amount is required";
    if (!status) newErrors.status = "Status is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      const payload = {
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

      const TransactionPayload = {
        Member_Id: member.Id,
        Amount: paidAmount,
        Status: status,
        Loan_Id: selectedStatement.Loan_Id,
        Transaction_Date: dueDate
      };
      dispatch({
        type: 'ADDTRANSACTIONS',
        payload: TransactionPayload,
      });

      setDueDate("");
      setPaidAmount("");
      setPendingAmount("");
      setStatus("");
      setIsModalOpen(false);
    }
  };


  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };


  const paginatedData = Statement.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="relative w-full">
      <input
        ref={ref}
        type="text"
        className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none cursor-pointer"
        placeholder="DD-MM-YYYY"
        value={value}
        onClick={onClick}
        readOnly
      />
      <CalendarDays
        size={20}
        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
        onClick={onClick}
      />
    </div>
  ));
  CustomInput.displayName = "CustomInput";

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold font-Gilroy">Loan Statements</h2>

      </div>
      <div className="bg-#F4F7FF shadow-md rounded-xl overflow-hidden">
        <div className="overflow-y-auto h-[280px]">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="sticky top-0 bg-[#F4F7FF] z-10">
              <tr className="bg-[#F4F7FF] border-b  text-sm font-Gilroy text-[#939393]">
                <th className="p-4 font-Gilroy font-normal">Statement</th>
                <th className="p-4 font-Gilroy font-normal">Due Date</th>
                <th className="p-4 font-Gilroy font-normal">Loan Amount</th>
                <th className="p-4 font-Gilroy font-normal">Pending</th>
                <th className="p-4 font-Gilroy font-normal">Paid Amount</th>
                <th className="p-4 font-Gilroy font-normal">Status</th>
                <th className="p-4 font-Gilroy font-normal"></th>
              </tr>
            </thead>

            <tbody>
              {paginatedData?.map((item, index) => (

                <tr key={index}>

                  <td className="p-4 font-Gilroy">{`Repayment ${formattedDueDate}`}</td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {formattedDueDate}
                    </span>
                  </td>
                  <td className="p-4 font-Gilroy">{item.Loan_Amount}</td>
                  <td className="p-4 font-Gilroy">{item.Pending_Amount}</td>
                  <td className="p-4 font-Gilroy">{item.Paid_Amount}</td>
                  <td className="p-4 font-Gilroy">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.Status === "Paid"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                        }`}
                    >
                      {item.Status}
                    </span>
                  </td>
                  <td className="p-4 relative">
                    <button
                      className="text-gray-600 text-xl"
                      onClick={() => {
                        setShowOptions(showOptions === index ? null : index);
                        setSelectedStatement(item);
                      }}


                    >
                      ⋮
                    </button>

                    {showOptions === index && (
                      <div
                        ref={popupRef}
                        className="absolute right-8 top-4 bg-white w-40 border border-gray-200 rounded-lg shadow-lg z-10 w-[180px]"
                      >
                        <button
                          className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <img
                            src={RecordPaymentIcon}
                            alt="Record Payment"
                            className="h-4 w-4"
                          />
                          Record Payment
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>



          </table>

        </div>
      </div>

      {isModalOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 font-Gilroy">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-4 shadow-lg rounded-3xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <p className="text-lg font-semibold text-center text-black">
                Record payment
              </p>
              <button onClick={handleClose} className="text-gray-500 hover:text-black">
                <img src={CloseCircle} className="w-6 h-6" alt="CloseIcon" />
              </button>
            </div>

            <div className="font-Gilroy max-h-[300px] sm:max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold">Loan Amount</label>
                  <input
                    type="text"
                    value={selectedStatement?.Loan_Amount || ""}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
                  />

                </div>

                <div>
                  <label className="text-sm font-semibold">Due Date</label>

                  <DatePicker
                    selected={dueDate ? new Date(dueDate) : null}
                    onChange={(date) => handleInputChange("dueDate", date)}
                    dateFormat="dd-MM-yyyy"
                    customInput={<CustomInput />}
                  />

                  {errors.dueDate && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.dueDate}
                    </div>
                  )}
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

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">Status</label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none appearance-none"
                    >
                      <option value="">Select status</option>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <FaAngleDown size={15} />
                    </div>
                  </div>
                  {errors.status && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.status}
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

      {Statement.length > 5 && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md flex justify-end items-center gap-4">
          <div className="relative">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{ color: 'blue', borderColor: 'blue' }}
              className="border border-gray-300 px-4 py-1 rounded-lg appearance-none focus:outline-none cursor-pointer pr-8"
            >
              {[5, 10, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <FaAngleDown size={15} style={{ color: 'blue' }} />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg"
            >
              &lt;
            </button>
            <p className="text-gray-600 font-medium px-4 py-2">
              {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg"
            >
              &gt;
            </button>
          </div>
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