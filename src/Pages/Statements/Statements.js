import React, { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
import editIcon from "../../Asset/Icons/edit_blue.svg";
import trashRed from "../../Asset/Icons/trashRed.svg";
import RecordPayment from "../../Asset/Icons/RecordPayment.svg";

const Statement = () => {

  const [menuOpen, setMenuOpen] = useState(null);
  const [activeTab, setActiveTab] = useState("Loan statement");

  const popupRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setMenuOpen(null);
    }
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };


  const data = [
    { name: "Kellie Turcotte", id: "ABC001", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹2,500", due: "₹2,500", status: "Paid" },
    { name: "Tatiana Rosser", id: "ABC002", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹1,500", due: "₹1,500", status: "Unpaid" },
    { name: "Esther Williamson", id: "ABC003", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹500", due: "₹500", status: "Paid" },
    { name: "Kaylynn Kenter", id: "ABC004", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹1,000", due: "₹1,000", status: "Paid" },
    { name: "Sabrina Gleason", id: "ABC005", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹2,000", due: "₹2,000", status: "Unpaid" },
    { name: "Marissa Collins", id: "ABC006", date: "24 Nov 2024", dueDate: "01 Dec 2024", amount: "₹3,000", due: "₹3,000", status: "Paid" },
    { name: "George Reed", id: "ABC007", date: "24 Nov 2024", dueDate: "01 Dec 2024", amount: "₹750", due: "₹750", status: "Unpaid" },
  ];

  return (



    <div className="w-full p-4 bg-white rounded-xl">
      <h2 className="font-Gilroy font-semibold text-xl md:text-2xl mb-4 mt-1 ml-12 lg:ml-3 ">Statements</h2>

      <div className="flex gap-2 md:gap-4 mb-4">
        <button
          onClick={() => setActiveTab("Loan statement")}
          className={`font-Gilroy font-medium px-2 md:px-4 py-2 border-b-2 ${activeTab === "Loan statement" ? "border-gray-800 text-gray-800" : "border-transparent text-gray-500"}`}
        >
          Loan statement
        </button>
        <button
          onClick={() => setActiveTab("Subscriber statement")}
          className={`font-Gilroy font-medium px-2 md:px-4 py-2 border-b-2 ${activeTab === "Subscriber statement" ? "border-gray-800 text-gray-800" : "border-transparent text-gray-500"}`}
        >
          Subscriber statement
        </button>
      </div>

      <div className="relative overflow-hidden overflow-x-hidden rounded-3xl">
        <div className="overflow-x-auto overflow-y-scroll max-h-[400px] rounded-3xl">
          <table className="w-full bg-[#f4f7ff] shadow-md text-xs md:text-sm min-w-[800px]">
            <thead className="p-3 font-Gilroy font-medium text-gray-600 text-left border-b border-gray-300 sticky top-0 bg-[#f4f7ff] z-10">
              <tr>
                <th className="p-3 pl-5">Member Name</th>
                <th className="pl-5">Member ID</th>
                <th className="pl-10 min-w-[120px] md:min-w-[150px]">Date</th>
                <th className="pl-1">Amount</th>
                <th className="pl-8 min-w-[120px] md:min-w-[150px]">Due Date</th>
                <th className="pl-6">Due</th>
                <th className="pl-8">Status</th>
                <th className=""> </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="p-3 hover:bg-gray-100 border-b font-Gilroy">
                  <td className="p-3 flex items-center gap-2 truncate">
                    <img src={ProfileIcon} alt="avatar" className="w-6 h-6 rounded-full" />
                    <span className="truncate">{item.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-orange-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                      {item.id}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                      {item.date}
                    </span>
                  </td>
                  <td className="p-2">{item.amount}</td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                      {item.dueDate}
                    </span>
                  </td>
                  <td className="p-2 text-center">{item.due}</td>
                  <td className="p-2 text-center">
                    <span className={`px-3 py-2 rounded-full text-black ${item.status === "Paid" ? "bg-green-200" : "bg-red-200"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2 relative">
                    <button onClick={() => toggleMenu(index)} className="text-gray-600 bg-white rounded-full p-2 shadow">
                      <FiMoreVertical size={16} />
                    </button>
                    {menuOpen === index && (
                      <div
                        ref={popupRef}
                        className="absolute right-4 top-10 bg-white border-t border-b border-gray-200 rounded-lg shadow-lg z-10 w-[180px]"
                      >
                        <div>
                          <button className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200">
                            <img src={RecordPayment} alt="Record Payment" className="h-4 w-4" />
                            Record Payment
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200">
                            <img src={editIcon} alt="Edit" className="h-4 w-4" />
                            Edit
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-Gilroy">
                            <img src={trashRed} alt="Delete" className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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

export default Statement;





