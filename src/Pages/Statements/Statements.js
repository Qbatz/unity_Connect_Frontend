/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, connect } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from 'prop-types';
import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
import moment from "moment";
import { ClipLoader } from "react-spinners";
import { MdSort } from "react-icons/md";

import EmptyState from '../../Asset/Images/Empty-State.jpg'

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

  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch({ type: 'STATEMENTLIST' });

  }, [dispatch]);

  useEffect(() => {
    if (state.Statement.statusCodeForStatement === 200) {
      setLoading(false);

      dispatch({ type: 'CLEAR_STATEMENT_ERROR' });
    }

  }, [state.Statement.statusCodeForStatement])


  const filteredList = filterStatus === "All"
    ? statementList
    : statementList.filter(item =>
      filterStatus === "Paid" ? item.Status === "Paid" : item.Status !== "Paid"
    );

  const currentStatement = filteredList.slice(indexOfFirstItem, indexOfLastItem);


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowFilterDropdown(null);
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
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <p className="font-Gilroy font-medium text-sm md:text-2xl mb-4 mt-1 ml-12 lg:ml-1 text-gray-700">Statements</p>


        <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
          <div className="font-Gilroy text-base px-2 md:px-4  text-gray-900 mb-3 lg:-ml-2.5">Loan statement</div>
          {statementList.length > 0 && (
            <div className="relative " ref={popupRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className=" p-1 font-Gilroy rounded-full border border-gray-300 bg-[#F2F4F8]"
              >

                <MdSort size={30} />


              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-md z-50">
                  {["All", "Paid", "Unpaid"].map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterStatus(option);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-Gilroy ${filterStatus === option ? "bg-blue-100 font-semibold" : ""
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        {currentStatement.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-64 h-64">
              <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
            </div>
            <p className="text-violet-600 text-lg font-medium text-center font-Gilroy"> No Data Found</p>
          </div>
        ) : (
          <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">

            <div className="overflow-y-auto max-h-[300px] lg:max-h-[400px] xs:max-h-[350px]   md:max-h-[340px] sm:max-h-[350px]">
              <table className="w-full text-left border-collapse min-w-max">
                <thead className="sticky top-0 bg-blue-50 z-10">

                  <tr className="bg-blue-50 border-b text-center font-Gilroy">
                    <th className="pl-8 text-left" style={{ fontWeight: "inherit", color: "#939393", fontSize: 15 }} >Member Name</th>
                    <th className="p-3" style={{ fontWeight: "inherit", color: "#939393", fontSize: 15 }}>Loan ID</th>
                    <th className="p-3" style={{ fontWeight: "inherit", color: "#939393", fontSize: 15 }}>Loan Date</th>
                    <th className="p-3" style={{ fontWeight: "inherit", color: "#939393", fontSize: 15 }}>Loan Amount</th>
                    <th className="p-3" style={{ fontWeight: "inherit", color: "#939393", fontSize: 15 }}>Due Date</th>
                    <th className="p-3" style={{ fontWeight: "inherit", color: "#939393", fontSize: 15 }}>Pending Amount</th>
                    <th className="p-3" style={{ fontWeight: "inherit", color: "#939393", fontSize: 15 }}>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {currentStatement.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="p-2 flex text-start gap-3 pl-6">
                        <img src={ProfileIcon} alt="avatar" className="w-10 h-10 rounded-full" />
                        <span className="truncate mt-2 text-[#222222] font-Gilroy font-semibold">{item.User_Name}</span>
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
                      <td className="p-2 font-Gilroy">₹{item.Loan_Amount.toLocaleString('en-IN')}</td>

                      <td className="p-2">
                        <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                          {moment(item.Due_Date).format("DD MMM YYYY")}
                        </span>
                      </td>
                      <td className="p-2 font-Gilroy">₹{item.Due.toLocaleString('en-IN')}</td>
                      <td className="p-2">
                        <span className={`px-3 py-1.5 rounded-full text-black font-Gilroy ${item.Status === "Paid" ? "bg-emerald-100 px-6" : "bg-red-100"}`}>
                          {item.Status}
                        </span>
                      </td>
                      <td className="p-2 relative">
                        <button
                          onClick={() => toggleMenu(index)}
                          className={`text-gray-600 rounded-full p-2 shadow ${menuOpen === index ? "bg-blue-200" : "bg-white"
                            }`}
                        >
                          <FiMoreVertical size={16} />
                        </button>


                      </td>
                    </tr>
                  )
                  )}
                </tbody>


              </table>
            </div>


          </div>
        )}
      </div>



      {filteredList.length > itemsPerPage && (
       <div className="fixed bottom-0 left-0 w-full p-2 flex justify-end">

          <button
            className={`px-4 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;

          </button>
          <span className="px-4 py-2 border rounded">{currentPage}</span>
          <button
            className={`px-4 mx-2 border rounded ${indexOfLastItem >= statementList.length ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= statementList.length}
          >
            &gt;

          </button>
        </div>
      )}
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