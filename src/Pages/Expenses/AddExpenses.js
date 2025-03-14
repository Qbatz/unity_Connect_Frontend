/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';

function ExpenseForm({ onClose, state, expensesdata }) {

    const dispatch = useDispatch();



    const [merchantName, setMerchantName] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [description, setDescription] = useState("");
    const [formError, setFormError] = useState("");

    const [errors, setErrors] = useState({});

    const name = state.SettingExpenses.getExpenseData.data

    const categoryId = name?.[0]?.category_Id || null;




    useEffect(() => {
        if (expensesdata) {
            setMerchantName(prev => expensesdata.Name || prev);
            setCategory(prev => expensesdata.Category_Name || prev);
            setPaymentMode(prev => expensesdata.Mode_of_Payment || prev);
            setExpenseDate(prev => expensesdata.Expense_Date || prev);
            setExpenseAmount(prev => expensesdata.Expense_Amount || prev);
            setDescription(prev => expensesdata.Description || prev);

        }
    }, [expensesdata]);

    useEffect(() => {

        dispatch({
            type: "SETTING_GET_EXPENSES",

        });

    }, []);





    const validateForm = () => {
        const newErrors = {};

        if (!merchantName.trim() || merchantName.length < 3) {
            newErrors.merchantName = "Merchant name must be at least 3 characters.";
        }

        if (!category) {
            newErrors.category = "Please select a category.";
        }

        if (!paymentMode) {
            newErrors.paymentMode = "Please select a payment mode.";
        }


        if (!expenseDate) {
            newErrors.expenseDate = "Please select a valid date.";
        }



        if (!expenseAmount || isNaN(expenseAmount) || Number(expenseAmount) <= 0) {
            newErrors.expenseAmount = "Enter a valid expense amount.";
        }

        if (description.length > 200) {
            newErrors.description = "Description cannot exceed 200 characters.";
        }



        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handlePaymentChange = (e) => {
        const { value } = e.target;
        setCategory(value);


    };

    const hasChanges = () => {
        if (!expensesdata) return true;

        return (
            merchantName !== expensesdata.Name ||
            category !== expensesdata.Category_Name ||
            paymentMode !== expensesdata.Mode_of_Payment ||
            expenseDate !== expensesdata.Expense_Date ||
            expenseAmount !== expensesdata.Expense_Amount ||
            description !== expensesdata.Description
        );
    };



    const handleSubmit = (e) => {


        e.preventDefault();

        if (!hasChanges()) {
            setFormError("No changes detected");
            return;
        }

        if (validateForm()) {


            const payload = {
                name: merchantName,
                category_id: categoryId,
                mode_of_payment: paymentMode,
                expense_date: expenseDate,
                expense_amount: expenseAmount,
                description: description,
            };


            const Editpayload =
            {
                name: merchantName,
                category_id: categoryId,
                mode_of_payment: paymentMode,
                expense_date: expenseDate,
                expense_amount: expenseAmount,
                description: description,
                id: expensesdata?.Id,
            }


            dispatch({
                type: 'ADDEXPENSES',
                payload: expensesdata ? Editpayload : payload,
            });
        }

    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg relative">

                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    <AiOutlineClose size={24} />
                </button>


                <h2 className="text-xl font-semibold text-gray-800 text-left font-Gilroy">
                    {expensesdata ? "Edit an expense" : "Add an expense"}
                </h2>
                <div className="border-b mt-6"></div>


                <div className="mt-4 space-y-4">

                    <div>
                        <label className="block text-gray-600 mb-3 font-Gilroy">
                            Merchant Name
                        </label>
                        <input
                            type="text"
                            value={merchantName}
                            onChange={(e) => setMerchantName(e.target.value)}
                            placeholder="Enter name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.merchantName && (
                            <p className="text-red-500 text-sm mt-1">{errors.merchantName}</p>
                        )}
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 mb-3 font-Gilroy">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={handlePaymentChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <option value="">Select a category</option>
                                {name &&
                                    name?.map((item) => (
                                        <option key={item.Id} value={item.category_Name}>
                                            {item.category_Name}
                                        </option>
                                    ))}

                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-3 font-Gilroy">
                                Mode of payment
                            </label>
                            <select
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <option value="">Select a payment mode</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                                <option value="Banking">Banking</option>
                            </select>
                            {errors.paymentMode && (
                                <p className="text-red-500 text-sm mt-1">{errors.paymentMode}</p>
                            )}
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 mb-3 font-Gilroy">
                                Expense date
                            </label>
                            <input
                                type="date"
                                className="w-full p-2 h-10 border rounded-lg text-sm"
                                value={expenseDate}
                                onChange={(e) => setExpenseDate(e.target.value)}
                            />
                            {errors.expenseDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.expenseDate}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-3 font-Gilroy">
                                Expense amount
                            </label>
                            <input
                                type="number"
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                placeholder="Enter expense amount"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            {errors.expenseAmount && (
                                <p className="text-red-500 text-sm mt-1">{errors.expenseAmount}</p>
                            )}
                        </div>
                    </div>


                    <div>
                        <label className="block text-gray-600 mb-3 font-Gilroy">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>


                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-black text-white rounded-lg py-3 mt-4 hover:bg-gray-800 transition font-Gilroy"
                    >
                        {expensesdata ? "Save Changes" : "Add expense"}
                    </button>

                    {formError && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            {formError}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapsToProps = (stateInfo) => {
    return { state: stateInfo };
};

ExpenseForm.propTypes = {
    state: PropTypes.object,
    onClose: PropTypes.func,
    expensesdata: PropTypes.object

};

export default connect(mapsToProps)(ExpenseForm);
