/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FaAngleDown } from "react-icons/fa6";

function Transactions({ state, member }) {

  const dispatch = useDispatch();

  const transactionList = state.Member.GetTransactionsList
  console.log("transactionList",member);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(transactionList.length / pageSize);

     useEffect(() => {
       
          dispatch({
            type: "GETTRANSACTIONSLIST",
            payload: { member_id :  member.Id  },
          });
console.log("",member.Id);

      }, [member?.Id]);

  useEffect(() => {
    dispatch({ type: "GETTRANSACTIONSLIST" });
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };


  const paginatedData = transactionList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  return (

    <div className="p-4">
      <div className="bg-[#F4F7FF] shadow-md rounded-xl overflow-hidden">
        <div className="min-w-max overflow-y-auto max-h-[320px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#F4F7FF] z-10">
              <tr className="bg-[#F4F7FF] text-[#939393] border-b font-light text-sm font-Gilroy">
                <th className="p-4 font-Gilroy font-normal">Transactions</th>
                <th className="p-4 font-Gilroy font-normal">Date & Time</th>
                <th className="p-4 font-Gilroy font-normal">Transaction Id</th>
                <th className="p-4 font-Gilroy font-normal">Amount</th>
                <th className="p-4 font-Gilroy font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 font-Gilroy">{item.Loan_Name}</td>

                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {new Date(item.Transaction_Date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </td>


                  <td className="p-4">
                    <span className="bg-[#FFEFCF] text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {item.Transaction_Id}
                    </span>
                  </td>
                  <td className="p-4 font-Gilroy">₹{item.Amount.toLocaleString("en-IN")}</td>
                  <td className="p-4 font-Gilroy">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.status === "Success"
                        ? "bg-green-200 text-green-700"
                        : "bg-[#FFDDDB]"
                        }`}
                    >
                      {item.Status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {transactionList.length > 5 && (
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
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,
  };
};

Transactions.propTypes = {
  state: PropTypes.object,
  member: PropTypes.object,
};

export default connect(mapsToProps)(Transactions);

