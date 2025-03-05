import React from "react";

const LoanStatements = () => {
  const statements = [
    { month: "Apr 2024", dueDate: "16 Apr 2024", loan: "₹5,000", pending: "₹500", paid: "₹3,000", status: "Paid" },
    { month: "May 2024", dueDate: "16 May 2024", loan: "₹4,000", pending: "₹400", paid: "₹2,500", status: "Paid" },
    { month: "Jun 2024", dueDate: "16 Jun 2024", loan: "₹3,000", pending: "₹300", paid: "₹2,000", status: "Paid" },
    { month: "Jul 2024", dueDate: "16 Jul 2024", loan: "₹2,000", pending: "₹200", paid: "₹1,500", status: "Unpaid" },
    { month: "Aug 2024", dueDate: "16 Aug 2024", loan: "₹1,000", pending: "₹100", paid: "₹1,000", status: "Unpaid" },
    { month: "Sept 2024", dueDate: "16 Sept 2024", loan: "₹0", pending: "₹0", paid: "₹500", status: "Unpaid" },
    { month: "Oct 2024", dueDate: "16 Oct 2024", loan: "₹0", pending: "₹0", paid: "₹0", status: "Unpaid" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-Gilroy">Loan Statements</h2>
        <button className="bg-black text-white px-6 py-3 rounded-2xl font-Gilroy">
          + Record Payment
        </button>
      </div>
      <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">
        {/* Make table scrollable on small screens */}
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
              {statements.map((item, index) => (
                <tr key={index} className="">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px] appearance-none bg-blue-50 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-300"
                    />
                  </td>
                  <td className="p-4 font-Gilroy">{`Repayment ${item.month}`}</td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {item.dueDate}
                    </span>
                  </td>
                  <td className="p-4 font-Gilroy">{item.loan}</td>
                  <td className="p-4 font-Gilroy">{item.pending}</td>
                  <td className="p-4 font-Gilroy">{item.paid}</td>
                  <td className="p-4 font-Gilroy">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.status === "Paid"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                        }`}
                    >
                      {item.status}
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

export default LoanStatements;
