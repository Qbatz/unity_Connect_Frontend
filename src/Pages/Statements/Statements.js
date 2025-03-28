/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, connect } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from 'prop-types';
import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
// import editIcon from "../../Asset/Icons/edit_blue.svg";
// import trashRed from "../../Asset/Icons/trashRed.svg";
// import RecordPayment from "../../Asset/Icons/RecordPayment.svg";
import moment from "moment";
import { ClipLoader } from "react-spinners";


function Statement({ state }) {

  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const statementList = state.Statement.StatementList;


  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatement = statementList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch({ type: 'STATEMENTLIST' });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setMenuOpen(null);
    }
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
        <ClipLoader color="#7f00ff" loading={loading} size={30} />
      </div>
    );
  }


  return (
    <div className="p-8">
      <p className="font-Gilroy font-medium text-sm md:text-2xl mb-4 mt-1 ml-12 lg:ml-1 text-gray-700">Statements</p>

      <div className="font-Gilroy font-base px-2 md:px-4 py-2 text-gray-600 mb-3 lg:-ml-2.5">Loan statement</div>

      <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-max overflow-y-auto max-h-[700px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-blue-50 z-10">
                <tr className="bg-blue-50 border-b font-light text-sm font-Gilroy text-neutral-400 text-center">
                  <th className="pl-8 font-Gilroy text-left">Member Name</th>
                  <th className="p-4 font-Gilroy">Loan Id</th>
                  <th className="p-4 font-Gilroy">Loan Date</th>
                  <th className="p-4 font-Gilroy">Loan Amount</th>
                  <th className="p-4 font-Gilroy">Due Date</th>
                  <th className="p-4 font-Gilroy">Due</th>
                  <th className="p-4 font-Gilroy">Status</th>
                </tr>
              </thead>

              <tbody>
                {currentStatement.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-red-500 font-Gilroy py-4">
                      No data available
                    </td>
                  </tr>
                ) : (
                  currentStatement.map((item, index) => (
                    <tr key={index} className="p-3 text-center">
                      <td className="p-2 flex text-start gap-3 pl-6">
                        <img src={ProfileIcon} alt="avatar" className="w-10 h-10 rounded-full" />
                        <span className="truncate mt-2">{item.User_Name}</span>
                      </td>
                      <td className="p-2">
                        <span className="bg-orange-100 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                          {item.Loan_id}
                        </span>
                      </td>
                      <td className="p-2">
                        <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                          {moment(item.loan_date).format("DD MMM YYYY")}
                        </span>
                      </td>
                      <td className="p-2">₹{item.Loan_Amount.toLocaleString('en-IN')}</td>
                     
                      <td className="p-2">
                        <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                          {moment(item.Due_Date).format("DD MMM YYYY")}
                        </span>
                      </td>
                      <td className="p-2">₹{item.Due.toLocaleString('en-IN')}</td>
                      <td className="p-2">
                        <span className={`px-3 py-1.5 rounded-full text-black ${item.Status === "Paid" ? "bg-emerald-100" : "bg-red-100"}`}>
                          {item.Status}
                        </span>
                      </td>
                      <td className="p-3 relative">
                        <button
                          onClick={() => toggleMenu(index)}
                          className={`text-gray-600 rounded-full p-2 shadow ${menuOpen === index ? "bg-blue-200" : "bg-white"
                            }`}
                        >
                          <FiMoreVertical size={16} />
                        </button>

                        {/* {menuOpen === index && (
                          <div  
                            ref={popupRef}
                            className={`absolute right-20 my-auto ${index === 0 ? "top-full" : "bottom-full"} bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[180px]`} >
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
                        )} */}


                      </td>
                    </tr>
                  ))
                )}
              </tbody>


            </table>
          </div>

        </div>
      </div>
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
          className={`px-4 py-2 mx-2 border rounded ${indexOfLastItem >= statementList.length ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= statementList.length}
        >
          &gt;
 
        </button>
      </div>
    </div>


  );
};

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,
  };
};

Statement.propTypes = {
  state: PropTypes.object,
};
export default connect(mapsToProps)(Statement);