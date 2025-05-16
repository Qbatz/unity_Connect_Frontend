
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, connect, } from "react-redux";
import PropTypes from 'prop-types';
import moment from "moment";

function TransactionTable({ state }) {
   


    const location = useLocation();
    const { loanId } = useParams();
    const selectedLoan = location.state?.loan;


    const dispatch = useDispatch();
    const loanDetails = state?.Member?.GetTransactionsList?.loan_details || {};
    const result = state?.Member?.GetTransactionsList?.result || [];


    

    const [currentPage, setCurrentPage] = useState(1);


    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedData = result.slice(indexOfFirstItem, indexOfLastItem);

 
    useEffect(() => {
        if (selectedLoan) {
            dispatch({
                type: "GETTRANSACTIONSLIST",
                payload: { member_id: selectedLoan.Member_Id, loan_id: selectedLoan.Loan_Id, id: selectedLoan.Id }
            });
        }
    }, [selectedLoan]);



    return (
        <div className="p-4">
            <h2 className="text-base sm:text-lg md:text-2xl font-semibold font-Gilroy mb-4 mt-3">Loan Statement:
                <span className="text-[#8338EC] text-2xl font-Gilroy font-semibold pl-2">{loanId}</span>

            </h2>
            <div>
                {loanDetails && (
                    <div className=" rounded-xl overflow-hidden ">
                        <div className="flex flex-col md:flex-row justify-between gap-4 ">

                            <div className="flex-1 border rounded-2xl shadow bg-white p-4  ">
                                <div className="grid grid-cols-4  md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-800">
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


                            <div className="flex-1 border rounded-2xl shadow bg-white 
  p-4 sm:p-6 
  flex flex-col items-center justify-center 
  text-center">

                                <p className="text-purple-600 font-Gilroy font-medium 
    text-sm sm:text-base md:text-lg">
                                    Remaining Balance
                                </p>

                                <p className="text-black font-Gilroy font-semibold 
    text-base sm:text-xl md:text-2xl mt-1">
                                    {loanDetails.Remaining_Amount}
                                </p>
                            </div>



                        </div>

                    </div>
                )}
            </div>
            <div className="bg-#F4F7FF shadow-md rounded-xl overflow-hidden mt-4">
                <div className="w-full overflow-x-auto max-h-[450px]  ">
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
                            {paginatedData.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 font-Gilroy">
                                        {moment(transaction.Transaction_Date).format("DD MMM YYYY, h:mm A")}
                                    </td>
                                    <td className="px-4 py-2 font-Gilroy">Cash</td>
                                    <td className="px-4 py-2 font-Gilroy">{transaction.Transaction_Id}</td>
                                    <td className="px-4 py-2 font-Gilroy">{transaction.Amount}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-3 py-1.5 rounded-full text-black font-Gilroy ${transaction.Status === "Paid" ? "bg-emerald-100" : "bg-red-100"
                                                }`}
                                        >
                                            {transaction.Status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>


            {result.length > 6 && (

                <div className="fixed bottom-0 right-0 w-full p-2 bg-white  flex justify-end z[1000]">
                    <button
                        className={`px-4 py-2 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;

                    </button>
                    <span className="px-4 py-2 border rounded">{currentPage}</span>
                    <button
                        className={`px-4 py-2 mx-2 border rounded ${indexOfLastItem >= result.length ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastItem >= result.length}
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

TransactionTable.propTypes = {
    state: PropTypes.object,


};

export default connect(mapsToProps)(TransactionTable);

