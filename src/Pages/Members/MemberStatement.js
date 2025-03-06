/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';

function LoanStatements({ state, member }) {

  const dispatch = useDispatch();

  const Statement = state.Member.getStatement;



  useEffect(() => {
    if (member?.Id) {

      dispatch({
        type: "GETSTATEMENT",
        payload: { id: member.Id },
      });
    }

  }, [member?.Id]);

  useEffect(() => {
    if (state.Member.statusCodeForStatement === 200) {

      dispatch({ type: 'GETCOMMENTS', payload: { id: member.Id } })
      dispatch({ type: 'CLEAR_STATUS_CODE_GET_STATEMENT' })
    }
  }, [state.Member.statusCodeForStatement])





  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-Gilroy">Loan Statements</h2>
        <button className="bg-black text-white px-6 py-3 rounded-2xl font-Gilroy">
          + Record Payment
        </button>
      </div>
      <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">

        <div className="overflow-y-auto h-[300px]">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr style={{ color: "#939393" }} className="bg-blue-50 border-b font-light text-sm font-Gilroy">
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px] appearance-none bg-blue-50 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 font-Gilroy">Statement</th>
                <th className="p-4 font-Gilroy">Due Date</th>
                <th className="p-4 font-Gilroy">Loan Amount</th>
                <th className="p-4 font-Gilroy">Pending</th>
                <th className="p-4 font-Gilroy">Paid Amount</th>
                <th className="p-4 font-Gilroy">Status</th>
                <th className="p-4 font-Gilroy "></th>
              </tr>
            </thead>
            <tbody>
              {Statement.map((item, index) => (
                <tr key={index} className="">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px] appearance-none bg-blue-50 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-300"
                    />
                  </td>
                  <td className="p-4 font-Gilroy">{`Repayment ${item.Due_Date}`}</td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {item.Due_Date}
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
                  <td className="p-4">
                    <button className="text-gray-600 text-xl">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,

  }
}
LoanStatements.propTypes = {
  state: PropTypes.object,
  member: PropTypes.object
};

export default connect(mapsToProps)(LoanStatements);
