/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';
import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import editIcon from "../../Asset/Icons/edit_blue.svg";
import deleteIcon from "../../Asset/Icons/Delete.svg";
import ExpenseForm from './AddExpenses';
import moment from "moment";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { ClipLoader } from "react-spinners";
import EmptyState from '../../Asset/Images/Empty-State.jpg'
import { DatePicker } from 'antd';
import 'dayjs/locale/en';


function ExpensesList({ state }) {

    const [openMenu, setOpenMenu] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [deletePopup, setDeletePopup] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const popupRef = useRef(null);

    const ExpensesList = state.Expenses.getexpenses || [];

    const { RangePicker } = DatePicker;
    const [dates, setDates] = useState([]);

    const onChange = (values) => {
        setDates(values);


        if (values && values.length === 2) {
            const payload = {
                startDate: values[0]?.format('YYYY-MM-DD'),
                endDate: values[1]?.format('YYYY-MM-DD'),
            };

            dispatch({
                type: "GETEXPENSES",
                payload: payload
            });
        }
    };


    const totalPages = Math.max(1, Math.ceil(ExpensesList.length / pageSize));

    const paginatedData = useMemo(() => {
        return ExpensesList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [ExpensesList, currentPage, pageSize]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages]);



    useEffect(() => {
        if (state.Expenses.statusCodeAddExpenses === 200) {
            dispatch({ type: 'GETEXPENSES' });
            handleOnClose();
            dispatch({ type: 'CLEAR_STATUS_CODE_ADD_EXPENSES' });
        }
    }, [state.Expenses.statusCodeAddExpenses]);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setOpenMenu(null);

        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setLoading(true);

        dispatch({
            type: "GETEXPENSES",

        });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);





    const handledots = (event, index) => {
        event.stopPropagation();
        setOpenMenu(openMenu === index ? null : index);

        const rect = event.target.getBoundingClientRect();
        setPopupPosition({
            top: rect.top + window.scrollY + rect.height - 25,
            left: rect.left + window.scrollX - 170,
        });
    };

    const handleClickExpenses = () => {
        setShowModal(true);
    };

    const handleOnClose = () => {
        setShowModal(false);
        setSelectedData(null);
    };

    const handleEditclick = (item) => {
        setSelectedData(item);
        setShowModal(true);
        setOpenMenu(null);
    };

    const handleDeleteclick = (index) => {
        setDeletePopup(index);
        setOpenMenu(null);
    };

    const confirmDelete = (id) => {
        const payload = {
            id: id,
        };

        dispatch({ type: "DELETEEXPENSES", payload });
        setDeletePopup(null);
    };

    useEffect(() => {
        if (state.Expenses.deleteExpensesStatusCode === 200) {
            dispatch({ type: 'GETEXPENSES' })
            dispatch({ type: 'CLEAR_DELETE_EXPENSES' })

            setDeletePopup(null)
        }
    }, [state.Expenses.deleteExpensesStatusCode])

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
    };




    if (loading) {
        return (
            <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
                <ClipLoader color="#7f00ff" loading={loading} size={30} />
            </div>
        );
    }


    return (
        <>
            <div className="p-4">


                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold font-Gilroy p-6">Expenses</h2>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <RangePicker
                                value={dates}
                                onChange={onChange}
                                format="DD MMM YYYY"
                                allowClear
                                placeholder={['Start date', 'End date']}
                                className="rounded-full shadow-md px-4 py-2 border border-gray-300 bg-[#F2F4F8] text-black font-Gilroy"
                                suffixIcon={<CalendarDays size={16} className="text-gray-600" />}
                                popupClassName="!z-50"
                            />
                        </div>

                        <button
                            className="bg-black text-white py-3 px-6 rounded-full text-base font-Gilroy font-medium mr-4"
                            onClick={handleClickExpenses}
                        >
                            + Add an expense
                        </button>
                    </div>
                </div>


                <div className="">
                    {paginatedData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">

                            <div className="w-64 h-64">
                                <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
                            </div>

                            <p className="text-violet-600 text-lg text-center font-Gilroy">
                                Loan Data Not Available
                            </p>
                        </div>

                    ) : (
                        <div className="shadow-md rounded-xl overflow-hidden mt-4 mx-6">
                            <div className="overflow-x-auto">
                                <div className="overflow-y-auto max-h-[550px]">
                                    <table className="w-full text-left border-collapse bg-#F4F7FF ">
                                        <thead className="sticky top-0 bg-[#F4F7FF] z-10">
                                            <tr className="bg-[#F4F7FF] border-b font-extralight text-sm font-Gilroy">
                                                <th className="p-4 font-Gilroy text-lightgray font-normal">Merchant</th>
                                                <th className="p-4 font-Gilroy text-lightgray font-normal">Category</th>
                                                <th className="p-4 font-Gilroy text-lightgray font-normal">Sub-Category</th>
                                                <th className="p-4 font-Gilroy text-lightgray font-normal">Expense Date</th>
                                                <th className="p-4 font-Gilroy text-lightgray font-normal">Amount</th>
                                                <th className="p-4 font-Gilroy text-lightgray font-normal">Mode of payment</th>
                                                <th className="p-4 font-Gilroy text-lightgray font-normal"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedData?.map((item, index) => (
                                                <tr key={index}>

                                                    <td className="py-2 px-4 flex items-center gap-2 truncate">
                                                        <img src={ProfileIcon} alt="avatar" className="w-10 h-10 rounded-full" />
                                                        <span className="truncate text-[#222222] p-1 font-Gilroy font-semibold">{item.Name}</span>
                                                    </td>


                                                    <td className="py-2 px-4 ">
                                                        <div className="bg-[#FFEFCF] text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy flex items-center justify-center whitespace-nowrap">
                                                            {item.Category_Name}
                                                        </div>
                                                    </td>

                                                    <td className="p-4 font-Gilroy relative">
                                                        {item.sub_cat?.length > 0 ? (
                                                            <div className="relative">
                                                                <span
                                                                    className="truncate bg-[#FFEFCF] text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy flex items-center justify-center whitespace-nowrap"
                                                                >
                                                                    {item.sub_cat[0]?.Subcategory_Name}
                                                                </span>

                                                            </div>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>







                                                    <td className="py-2 px-4">
                                                        <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                                                            {moment(item.Expense_Date).format("DD-MMM-YYYY")}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-4 font-Gilroy">
                                                        ₹{item.Expense_Amount.toLocaleString("en-IN")}
                                                    </td>



                                                    <td className="py-2 px-4">
                                                        <span className="bg-[#D9E9FF] text-gray-700 px-4 py-2 rounded-full text-sm font-Gilroy min-w-[120px] text-center inline-block">
                                                            {item.Mode_of_Payment}
                                                        </span>
                                                    </td>

                                                    <td className="py-2 px-4 relative">
                                                        <div
                                                            className={`cursor-pointer h-9 w-9 border border-gray-300 rounded-full flex justify-center items-center 
                                                        bg-white ${openMenu === index ? "!bg-blue-100" : ""}`}
                                                            onClick={(event) => handledots(event, index)}
                                                        >
                                                            <PiDotsThreeOutlineVerticalFill />
                                                        </div>

                                                        {openMenu === index && (
                                                            <div
                                                                style={{
                                                                    position: 'fixed',
                                                                    top: `${popupPosition.top}px`,
                                                                    left: `${popupPosition.left}px`,
                                                                    right: '110px',
                                                                    zIndex: 50,

                                                                }}
                                                                className="absolute  top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-[130px]">
                                                                <button
                                                                    onClick={() => handleEditclick(item)}
                                                                    className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy rounded-lg"
                                                                >
                                                                    <img src={editIcon} alt="Edit" className="h-4 w-4" />
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-Gilroy rounded-lg"
                                                                    onClick={() => handleDeleteclick(index)}
                                                                >
                                                                    <img src={deleteIcon} alt="Delete" className="h-4 w-4" />
                                                                    Delete
                                                                </button>
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
                    )}



                </div>





                {ExpensesList.length > 5 && (

                    <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md flex justify-end items-center gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"
                                    }`}
                            >
                                &lt;
                            </button>

                            <span className="px-4 py-2 border rounded">{currentPage}</span>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 mx-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-blue-100 text-black"
                                    }`}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>

                )}

            </div>


            {deletePopup !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
                    <div className="bg-white w-[388px] h-[200px] mx-auto rounded-2xl shadow-lg">
                        <div className="flex justify-center items-center p-4">
                            <h2 className="font-Gilroy text-lg font-semibold">Delete Expense?</h2>
                        </div>


                        <div className="text-center text-[14px] font-medium text-[#646464] font-Gilroy mt-[8px]">
                            Are you sure you want to delete this Member?
                        </div>


                        <div className="flex justify-center mt-4 p-4">
                            <button
                                className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-white text-[#1E45E1] border border-[#1E45E1] font-semibold font-Gilroy text-[14px] mr-2"
                                onClick={() => setDeletePopup(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-[#1E45E1] text-white font-semibold font-Gilroy text-[14px]"
                                onClick={() => confirmDelete(ExpensesList[deletePopup]?.Id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && <ExpenseForm expensesdata={selectedData} onClose={handleOnClose} />}
        </>
    );
}

const mapStateToProps = (stateInfo) => ({ state: stateInfo });
ExpensesList.propTypes = {
    state: PropTypes.object,

};

export default connect(mapStateToProps)(ExpensesList);
