/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

function Transactions({ state, member }) {

  const dispatch = useDispatch();

  const transactionList = state.Member.GetTransactionsList




  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = transactionList.slice(indexOfFirstItem, indexOfLastItem);



  useEffect(() => {
    if (member?.Id) {
      dispatch({
        type: "GETTRANSACTIONSLIST",
        payload: { member_id: member.Id },
      });
    }
  }, [member]);




  return (

    <div className="p-4">
      <div className="bg-[#F4F7FF] shadow-md rounded-xl overflow-hidden">
        <div className="min-w-max overflow-y-auto max-h-[320px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#F4F7FF] z-10 border-b border-gray-300">
              <tr className="bg-[#F4F7FF] text-[#939393]  font-light text-sm font-Gilroy">
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

                      {moment(item.Created_At).format("DD MMM YYYY . hh:mm A")}
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
                      className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.status === "+ Success"
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

        <div className="fixed bottom-0 left-0 w-full p-4 flex justify-end">
          <button
            className={`px-4 py-2 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;

          </button>
          <span className="px-4 py-2 border rounded">{currentPage}</span>
          <button
            className={`px-4 py-2 mx-2 border rounded ${indexOfLastItem >= transactionList.length ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= transactionList.length}
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
    state: stateInfo,
  };
};

Transactions.propTypes = {
  state: PropTypes.object,
  member: PropTypes.object,
};

export default connect(mapsToProps)(Transactions);

