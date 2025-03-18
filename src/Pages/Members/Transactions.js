/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";

function Transactions({ state }) {

  const dispatch = useDispatch();

  const transactionList = state.Member.GetTransactionsList

  useEffect(() => {
    dispatch({ type: "GETTRANSACTIONSLIST" });
  }, []);


  return (
    <div className="p-4">
      <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">
        <div className="overflow-y-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr style={{ color: "#939393" }} className="bg-blue-50 border-b font-light text-sm font-Gilroy">
                <th className="p-4 font-Gilroy">Transactions</th>
                <th className="p-4 font-Gilroy">Date & Time</th>
                <th className="p-4 font-Gilroy">Transaction Id</th>
                <th className="p-4 font-Gilroy">Amount</th>
                <th className="p-4 font-Gilroy">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionList.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 font-Gilroy">{item.Loan_Name}</td>

                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {new Date(item.Transaction_Date).toISOString().split("T")[0]}
                    </span>
                  </td>


                  <td className="p-4">
                    <span className="bg-orange-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {item.Transaction_Id}
                    </span>
                  </td>
                  <td className="p-4 font-Gilroy">{item.Amount}</td>
                  <td className="p-4 font-Gilroy">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.status === "Success" ? "bg-green-200 text-green-700" : "bg-red-100 text-red-700"
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
};

export default connect(mapsToProps)(Transactions);

