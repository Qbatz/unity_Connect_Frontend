import React, { useState,useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
import editIcon from "../../Asset/Icons/edit_blue.svg";
import trashRed from "../../Asset/Icons/trashRed.svg";
import RecordPayment from "../../Asset/Icons/RecordPayment.svg";

const Statement = () => {

  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
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

  const handleCheckboxChange = (e) => {
    setSelectedCount(e.target.checked ? selectedCount + 1 : selectedCount - 1);
  };

  const data = [
    { name: "Kellie Turcotte", id: "ABC001", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹2,500", due: "₹2,500", status: "Paid" },
    { name: "Tatiana Rosser", id: "ABC002", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹1,500", due: "₹1,500", status: "Unpaid" },
    { name: "Esther Williamson", id: "ABC003", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹500", due: "₹500", status: "Paid" },
    { name: "Kaylynn Kenter", id: "ABC004", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹1,000", due: "₹1,000", status: "Paid" },
    { name: "Sabrina Gleason", id: "ABC005", date: "23 Nov 2024", dueDate: "30 Nov 2024", amount: "₹2,000", due: "₹2,000", status: "Unpaid" },
  ];

  return (



    <div className="w-full p-4 bg-white rounded-xl">
      <h2 className="font-Gilroy font-semibold text-xl md:text-2xl mb-4 ml-4 ml-12 sm:ml-4 sm:mt-4">Statements</h2>


      <div className="flex gap-2 md:gap-4 mb-4">
        <button
          onClick={() => setActiveTab("Loan statement")}
          className={`px-2 md:px-4 py-2 border-b-2 ${activeTab === "Loan statement" ? "border-gray-800 text-gray-800" : "border-transparent text-gray-500"}`}
        >
          Loan statement
        </button>
        <button
          onClick={() => setActiveTab("Subscriber statement")}
          className={`px-2 md:px-4 py-2 border-b-2 ${activeTab === "Subscriber statement" ? "border-gray-800 text-gray-800" : "border-transparent text-gray-500"}`}
        >
          Subscriber statement
        </button>
      </div>

      <div className="relative max-h-[300px] overflow-y-scroll">
        <table className="w-full min-w-[800px] bg-[#f4f7ff] shadow-md rounded-xl text-xs md:text-sm">
          <thead className="font-medium text-gray-600 text-left border-b border-gray-300 sticky top-0 bg-[#f4f7ff] z-10">
            <tr>
              <th className="p-2 min-w-[40px]"> </th>
              <th className="p-2 min-w-[120px]">Member Name</th>
              <th className="p-2 min-w-[80px] text-center">Member ID</th>
              <th className="p-2 min-w-[100px] text-center">Date</th>
              <th className="p-2 min-w-[100px] text-center">Amount</th>
              <th className="p-2 min-w-[100px] text-center">Due Date</th>
              <th className="p-2 min-w-[80px] text-center">Due</th>
              <th className="p-2 min-w-[80px] text-center">Status</th>
              <th className="p-2 min-w-[40px] text-center"> </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-2">
                  <input type="checkbox" className="w-4 h-4" onChange={handleCheckboxChange} />
                </td>
                <td className="p-2 flex items-center gap-2 truncate">
                  <img src={ProfileIcon} alt="avatar" className="w-6 h-6 rounded-full" />
                  <span className="truncate">{item.name}</span>
                </td>
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2 text-center">{item.date}</td>
                <td className="p-2 text-center">{item.amount}</td>
                <td className="p-2 text-center">{item.dueDate}</td>
                <td className="p-2 text-center">{item.due}</td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-white ${item.status === "Paid" ? "bg-green-500" : "bg-red-500"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-2 relative">
                  <button onClick={() => toggleMenu(index)} className="text-gray-600 hover:text-gray-800">
                    <FiMoreVertical size={16} />
                  </button>

                  {menuOpen === index && (
                    <div ref={popupRef}
                      className="absolute right-4 top-10 bg-white border-t border-b border-gray-200 rounded-lg shadow-lg z-10 w-[180px]"
                    >  
                    <div>
                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200"
                      >
                        <img src={RecordPayment} alt="Record Payment" className="h-4 w-4" />
                        Record Payment
                      </button>

                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200"
                      >
                        <img src={editIcon} alt="Edit" className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-Gilroy"
                      >
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


  );
};

export default Statement;



