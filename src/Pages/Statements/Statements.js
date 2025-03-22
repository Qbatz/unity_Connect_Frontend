// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, connect } from "react-redux";
// import { FiMoreVertical } from "react-icons/fi";
// import PropTypes from 'prop-types';
// import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
// import editIcon from "../../Asset/Icons/edit_blue.svg";
// import trashRed from "../../Asset/Icons/trashRed.svg";
// import RecordPayment from "../../Asset/Icons/RecordPayment.svg";
// import moment from "moment";
// import { ClipLoader } from "react-spinners";  


// function Statement({ state }) {
  
//   const dispatch = useDispatch();
//   const popupRef = useRef(null);

//   const statementList = state.Statement.StatementList;
//   const formattingDate = moment(statementList?.loan_date).format("DD-MM-YYYY");
//   const formattingDueDate = moment(statementList?.Due_Date).format("DD-MM-YYYY");

//   const [loading, setLoading] = useState(true);  
//   const [menuOpen, setMenuOpen] = useState(null);

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     setLoading(true); 
//     dispatch({ type: 'STATEMENTLIST' });
//     setTimeout(() => {
//       setLoading(false);  
//     }, 1000); 
//   }, [dispatch]);

//   const handleClickOutside = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       setMenuOpen(null);
//     }
//   };

//   const toggleMenu = (index) => {
//     setMenuOpen(menuOpen === index ? null : index);
//   };

//   if (loading) {
//     return (
//       <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
//         <ClipLoader color="#7f00ff" loading={loading} size={30} />
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="font-Gilroy font-semibold text-xl md:text-2xl mb-4 mt-1 ml-12 lg:ml-3">Statements</h2>

//       <div className="flex gap-2 md:gap-4 mb-4">
//         <button
//           className="font-Gilroy font-semibold px-2 md:px-4 py-2 text-gray-800"
//         >
//           Loan statement
//         </button>
//       </div>

//       <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">
//         <div className="overflow-x-auto">
//         <div className="min-w-max overflow-auto max-h-[400px]">
//           <table className="w-full text-left border-collapse">
//           <thead className="sticky top-0 bg-blue-50 z-10">
//               <tr style={{ color: "#939393" }} className="bg-blue-50 border-b font-light text-sm font-Gilroy">
//                 <th className="p-4 font-Gilroy">Member Name</th>
//                 <th className="p-4 font-Gilroy">Loan Id</th>
//                 <th className="p-4 font-Gilroy">Loan Date</th>
//                 <th className="p-4 font-Gilroy">Loan Amount</th>
//                 <th className="p-4 font-Gilroy">DueDate</th>
//                 <th className="p-4 font-Gilroy">Due</th>
//                 <th className="p-4 font-Gilroy">Status</th>
//               </tr>
//             </thead>

//              <tbody>
//   {statementList.length === 0 ? (
//     <tr>
//       <td colSpan="8" className="text-center text-red-500 font-Gilroy py-4">
//         No data available
//       </td>
//     </tr>
//   ) : (
//     statementList.map((item, index) => (
//       <tr key={index} className="p-3 hover:bg-gray-100 font-Gilroy">
//         <td className="p-3 flex items-center gap-2 truncate">
//           <img src={ProfileIcon} alt="avatar" className="w-6 h-6 rounded-full" />
//           <span className="truncate">{item.User_Name}</span>
//         </td>
//         <td className="p-4">
//           <span className="bg-orange-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
//             {item.Loan_id}
//           </span>
//         </td>
//         <td className="p-4">
//           <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
//             {formattingDate}
//           </span>
//         </td>
//         <td className="p-2">{item.Loan_Amount}</td>
//         <td className="p-4">
//           <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
//             {formattingDueDate}
//           </span>
//         </td>
//         <td className="p-2 text-center">{item.Due}</td>
//         <td className="p-2 text-center">
//           <span className={`px-3 py-2 rounded-full text-black ${item.Status === "Paid" ? "bg-green-200" : "bg-red-200"}`}>
//             {item.Status}
//           </span>
//         </td>
//         <td className="p-2 relative">
//           <button onClick={() => toggleMenu(index)} className="text-gray-600 bg-white rounded-full p-2 shadow">
//             <FiMoreVertical size={16} />
//           </button>
//           {menuOpen === index && (
//             <div
//               ref={popupRef}
//               className="absolute right-4 top-10 bg-white border-t border-b border-gray-200 rounded-lg shadow-lg z-10 w-[180px]"
//             >
//               <div>
//                 <button className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200">
//                   <img src={RecordPayment} alt="Record Payment" className="h-4 w-4" />
//                   Record Payment
//                 </button>
//                 <button className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200">
//                   <img src={editIcon} alt="Edit" className="h-4 w-4" />
//                   Edit
//                 </button>
//                 <button className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-Gilroy">
//                   <img src={trashRed} alt="Delete" className="h-4 w-4" />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           )}
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//     </div>   


//   );
// };

// const mapsToProps = (stateInfo) => {
//   return {
//     state: stateInfo,
//   };
// };

// Statement.propTypes = {
//   state: PropTypes.object,
// };
// export default connect(mapsToProps)(Statement);


/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, connect } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import PropTypes from 'prop-types';
import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
import editIcon from "../../Asset/Icons/edit_blue.svg";
import trashRed from "../../Asset/Icons/trashRed.svg";
import RecordPayment from "../../Asset/Icons/RecordPayment.svg";
import moment from "moment";
import { ClipLoader } from "react-spinners";


function Statement({ state }) {

  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const statementList = state.Statement.StatementList;
  const formattingDate = moment(statementList?.loan_date).format("DD-MM-YYYY");
  const formattingDueDate = moment(statementList?.Due_Date).format("DD-MM-YYYY");


  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

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
  const totalPages = Math.ceil(statementList.length / itemsPerPage);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <p className="font-Gilroy font-semibold text-base md:text-2xl mb-4 mt-1 ml-12 lg:ml-3 text-gray-700">Statements</p>
        
      <div className="font-Gilroy font-base px-2 md:px-4 py-2 text-gray-600 mb-3">

        Loan statement

      </div>

      <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-max overflow-auto max-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-blue-50 z-10">
                <tr style={{ color: "#939393" }} className="bg-blue-50 border-b font-light text-sm font-Gilroy">
                  <th className="p-4 font-Gilroy">Member Name</th>
                  <th className="p-4 font-Gilroy">Loan Id</th>
                  <th className="p-4 font-Gilroy">Loan Date</th>
                  <th className="p-4 font-Gilroy">Loan Amount</th>
                  <th className="p-4  font-Gilroy">Due Date</th>
                  <th className="p-4 font-Gilroy">Due</th>
                  <th className="p-4 font-Gilroy">Status</th>
                </tr>
              </thead>

              <tbody>
                {statementList.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-red-500 font-Gilroy py-4">
                      No data available
                    </td>
                  </tr>
                ) : (
                  statementList.map((item, index) => (
                    <tr key={index} className="p-3 hover:bg-gray-100 font-Gilroy">
                      <td className="p-3 flex items-center gap-2 truncate">
                        <img src={ProfileIcon} alt="avatar" className="w-6 h-6 rounded-full" />
                        <span className="truncate">{item.User_Name}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-orange-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                          {item.Loan_id}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                          {formattingDate}
                        </span>
                      </td>
                      <td className="p-4">{item.Loan_Amount}</td>
                      <td className="p-4">
                        <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                          {formattingDueDate}
                        </span>
                      </td>
                      <td className="p-2 text-center">{item.Due}</td>
                      <td className="p-2 text-center">
                        <span className={`px-3 py-2 rounded-full text-black ${item.Status === "Paid" ? "bg-green-200" : "bg-red-200"}`}>
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

                        {menuOpen === index && (
                          <div
                            ref={popupRef}
                            className="fixed right-28 top-48 bg-white border-t border-b border-gray-200 rounded-lg shadow-lg z-10 w-[180px]"
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
                  ))
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
   
      <nav className="absolute bottom-0 left-0 w-full flex justify-end items-center gap-4 bg-white p-4">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-1 py-1  border border-[#205DA8] rounded-md text-[#205DA8] font-bold cursor-pointer outline-none shadow-none"
        >
          <option value={4}>4</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <ul className="flex items-center list-none m-0 p-0 gap-4">
          <li>
            <button
              className={`px-2 py-1 rounded-full min-w-[30px] text-center border-none bg-transparent ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#1E45E1] cursor-pointer"
                }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#205DA8"} />
            </button>
          </li>

          <li className="text-sm font-bold">
            {currentPage} of {totalPages}
          </li>

          <li>
            <button
              className={`px-2 py-1 rounded-full min-w-[30px] text-center border-none bg-transparent ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#1E45E1] cursor-pointer"
                }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowRight2 size="16" color={currentPage === totalPages ? "#ccc" : "#1E45E1"} />
            </button>
          </li>
        </ul>
      </nav>


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
