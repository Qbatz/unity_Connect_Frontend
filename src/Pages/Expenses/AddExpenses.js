/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef, useMemo } from "react";
import closecircle from '../../Asset/Icons/close-circle.svg';
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';
import { MdError } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import Select from "react-select";

function ExpenseForm({ onClose, state, expensesdata }) {


    const dispatch = useDispatch();

    const [merchantName, setMerchantName] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const [expenseDate, setExpenseDate] = useState(null)
    const [expenseAmount, setExpenseAmount] = useState("");
    const [description, setDescription] = useState("");
    const [formError, setFormError] = useState("");
    const [subCategory, setSubCategory] = useState("");


    const [subCategoryOptions, setSubCategoryOptions] = useState([]);


    const [errors, setErrors] = useState({});



    const name = state.SettingExpenses.getExpenseData.data



    const paymentOptions = [
        { value: "Credit Card", label: "Credit Card" },
        { value: "Debit Card", label: "Debit Card" },
        { value: "Cash", label: "Cash" },
        { value: "UPI/BHIM", label: "UPI/BHIM" },
        { value: "Net Banking", label: "Net Banking" }
    ];



    const categoryOptions = useMemo(() => (
        (name || []).map((item) => ({
            value: item.category_Id,
            label: item.category_Name,
        }))
    ), [name]);




    useEffect(() => {
        if (expensesdata) {
            setMerchantName(expensesdata.Name || "");

            const foundCategory = categoryOptions.find(
                (option) => option.label === expensesdata.Category_Name
            );
            if (foundCategory) {
                setCategory(foundCategory.value);
            }

            setPaymentMode(expensesdata.Mode_of_Payment || "");
            setExpenseDate(expensesdata.Expense_Date || "");
            setExpenseAmount(expensesdata.Expense_Amount || "");
            setDescription(expensesdata.Description || "");
        }
    }, [expensesdata, categoryOptions]);


    useEffect(() => {
        if (
            expensesdata?.sub_cat?.length &&
            subCategoryOptions.length
        ) {
            const foundSub = subCategoryOptions.find(
                (opt) => opt.label === expensesdata.sub_cat[0].Subcategory_Name
            );
            if (foundSub) {
                setSubCategory(foundSub.value);
            }
        }
    }, [subCategoryOptions, expensesdata]);







    useEffect(() => {

        dispatch({
            type: "SETTING_GET_EXPENSES",

        });

    }, []);



    useEffect(() => {
        if (!category || !Array.isArray(name)) return;

        const selectedCategory = name.find((c) => c.category_Id === category);
        const availableSubCategories = selectedCategory?.subcategory || [];

        const options = availableSubCategories.map((sub) => ({
            value: sub.subcategory_Id,
            label: sub.subcategory,
        }));

        setSubCategoryOptions(options);


        if (expensesdata && expensesdata.sub_cat?.length > 0) {
            const matched = options.find(
                (option) => option.label === expensesdata.sub_cat[0].Subcategory_Name
            );
            if (matched) {
                setSubCategory(matched.value);
            }
        }
    }, [category, name]);

    const validateForm = () => {
        const newErrors = {};

        if (!merchantName.trim()) {
            newErrors.merchantName = "Merchant name is required";
        }

        if (!category) {
            newErrors.category = "Please select a category";
        }


        if (!paymentMode) {
            newErrors.paymentMode = "Please select a payment mode";
        }


        if (!expenseDate) {
            newErrors.expenseDate = "Please select a valid date";
        }



        if (!expenseAmount || isNaN(expenseAmount) || Number(expenseAmount) <= 0) {
            newErrors.expenseAmount = "Enter a valid expense amount";
        }

        if (description.length > 200) {
            newErrors.description = "Description cannot exceed 200 characters";
        }



        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };




    const hasChanges = () => {

        if (!expensesdata) return true;


        const expenseDateFormatted = expenseDate ? new Date(expenseDate).toISOString().split('T')[0] : null;
        const expenseDataDateFormatted = expensesdata.Expense_Date ? new Date(expensesdata.Expense_Date).toISOString().split('T')[0] : null;


        return (
            expensesdata.Name !== merchantName ||
            expensesdata.Category_Name !== category ||


            expensesdata.Mode_of_Payment !== paymentMode ||
            expenseDataDateFormatted !== expenseDateFormatted ||
            expensesdata.Expense_Amount !== expenseAmount ||
            expensesdata.Description !== description
        );
    };



    const handleSubmit = (e) => {
        e.preventDefault();


        if (!hasChanges()) {
            setFormError("No changes detected");

            return;
        }


        const formatDate = (date) => {
            const d = new Date(date);
            if (isNaN(d)) {

                return "";
            }
            return d.toLocaleDateString("en-CA");
        };


        if (validateForm() && hasChanges) {
            const payload = {
                name: merchantName,
                category_id: category,

                mode_of_payment: paymentMode,
                expense_date: formatDate(expenseDate),
                subcategory_id: subCategory,
                expense_amount: expenseAmount,
                description: description,
            };


            const Editpayload = {
                ...payload,
                id: expensesdata?.Id,
            };

            dispatch({
                type: 'ADDEXPENSES',
                payload: expensesdata ? Editpayload : payload,
            });

            setFormError("");
        }
    };




    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="relative w-full">
            <input
                ref={ref}
                type="text"
                className="w-[300px]  p-2 h-10 border border-gray-300 rounded-lg text-sm cursor-pointer pl-4 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="DD-MM-YYYY"
                value={value}
                onClick={onClick}
                readOnly
            />
            <CalendarDays
                size={20}
                className="absolute text-[#292D32] right-3 top-3  cursor-pointer"
                onClick={onClick}
            />
        </div>
    ));
    CustomInput.displayName = "CustomInput";


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] p-4 sm:p-6">
            <div className="bg-white w-full max-w-2xl p-4 sm:p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[95vh]">

                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    <img src={closecircle} alt="Close" className="w-8 h-8" />
                </button>


                <h2 className="text-xl font-semibold text-gray-800 text-left font-Gilroy mt-2 sm:mt-0">
                    {expensesdata ? "Edit an expense" : "Add an expense"}
                </h2>
                <div className="border-b mt-4"></div>


                <div className=" space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block  mb-2 font-Gilroy">
                                Merchant Name <span className="text-red-500 text-[20px]">*</span>
                            </label>
                            <input
                                type="text"
                                value={merchantName}

                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[A-Za-z\s]*$/.test(value)) {
                                        setMerchantName(value);
                                        if (errors.merchantName) {
                                            setErrors((prevErrors) => ({ ...prevErrors, merchantName: "" }));
                                        }
                                    }
                                }}
                                placeholder="Enter name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            {errors.merchantName && (
                                <div className="flex items-center text-red-500 text-sm mt-1">
                                    <MdError className="mr-1 text-base" />
                                    <p >{errors.merchantName}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block  mb-2 font-Gilroy">
                                Category <span className="text-red-500 text-[20px]">*</span>
                            </label>


                            <Select
                                value={categoryOptions?.find((option) => option.value === category) || null}

                                onChange={(selectedOption) => {

                                    setCategory(selectedOption?.value);
                                    if (errors.category) {
                                        setErrors((prevErrors) => ({ ...prevErrors, category: "" }));
                                    }
                                }}
                                options={categoryOptions || []}
                                isSearchable
                                placeholder="Select a category"
                                className="w-full"
                                menuShouldScrollIntoView={false}
                                menuPlacement="auto"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: "#D1D5DB",
                                        borderRadius: "8px",
                                        padding: "4px",
                                        boxShadow: "none",
                                        cursor: "pointer",
                                        "&:hover": { borderColor: "#666" },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        maxHeight: categoryOptions.length > 3 ? "150px" : "auto",
                                        overflowY: categoryOptions.length > 3 ? "auto" : "hidden",
                                    }),
                                    indicatorSeparator: () => ({ display: "none" }),
                                    menuList: (base) => ({
                                        ...base,
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                        scrollbarWidth: "thin",
                                        "&::-webkit-scrollbar": {
                                            width: "6px",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "#888",
                                            borderRadius: "4px",
                                        },
                                        "&::-webkit-scrollbar-thumb:hover": {
                                            backgroundColor: "#555",
                                        },
                                    }),
                                }}
                            />

                            {errors.category && (
                                <div className="flex items-center text-red-500 text-sm mt-1">
                                    <MdError className="mr-1 text-base" />
                                    <p >{errors.category}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block  font-Gilroy">
                                Sub Category <span className="text-red-500 text-[20px]"></span>
                            </label>
                            <Select
                                value={
                                    subCategoryOptions.find((option) => option.value === subCategory) || null
                                }
                                onChange={(selectedOption) => {
                                    setSubCategory(selectedOption?.value);
                                    if (errors.subCategory) {
                                        setErrors((prevErrors) => ({ ...prevErrors, subCategory: "" }));
                                    }
                                }}
                                options={subCategoryOptions}
                                placeholder="Select a subcategory"
                                isSearchable
                                className="w-full"
                                menuShouldScrollIntoView={false}
                                menuPlacement="auto"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: "#D1D5DB",
                                        borderRadius: "8px",
                                        padding: "4px",
                                        boxShadow: "none",
                                        cursor: "pointer",
                                        "&:hover": { borderColor: "#666" },
                                        minHeight: "40px"
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                    }),
                                    menuList: (base) => ({
                                        ...base,
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                        scrollbarWidth: "thin",
                                        "&::-webkit-scrollbar": { width: "6px" },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "#888",
                                            borderRadius: "4px",
                                        },
                                        "&::-webkit-scrollbar-thumb:hover": {
                                            backgroundColor: "#555",
                                        },
                                    }),
                                    indicatorSeparator: () => ({ display: "none" })
                                }}
                            />

                            {errors.subCategory && (
                                <div className="flex items-center text-red-500 text-sm mt-1">
                                    <MdError className="mr-1 text-base" />
                                    <p>{errors.subCategory}</p>
                                </div>
                            )}
                        </div>


                        <div>
                            <label className="block  mb-2 font-Gilroy">
                                Mode of payment <span className="text-red-500 text-[20px]">*</span>
                            </label>


                            <Select
                                value={paymentOptions.find((option) => option.value === paymentMode) || null}
                                onChange={(selectedOption) => {
                                    setPaymentMode(selectedOption?.value);
                                    if (errors.paymentMode) {
                                        setErrors((prevErrors) => ({ ...prevErrors, paymentMode: "" }));
                                    }
                                }}
                                options={paymentOptions}
                                placeholder="Select a payment mode"
                                isSearchable
                                className="w-full cursor-pointer"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: "#D1D5DB",
                                        borderRadius: "8px",
                                        padding: "4px",
                                        boxShadow: "none",
                                        cursor: "pointer",
                                        "&:hover": { borderColor: "#666" },
                                        minHeight: "40px"
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                    }),
                                    menuList: (base) => ({
                                        ...base,
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                        scrollbarWidth: "thin",
                                        "&::-webkit-scrollbar": { width: "6px" },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "#888",
                                            borderRadius: "4px",
                                        },
                                        "&::-webkit-scrollbar-thumb:hover": {
                                            backgroundColor: "#555",
                                        },
                                    }),
                                    indicatorSeparator: () => ({ display: "none" })
                                }}
                            />
                            {errors.paymentMode && (
                                <div className="flex items-center text-red-500 text-sm mt-1">
                                    <MdError className="mr-1 text-base" />
                                    <p >{errors.paymentMode}</p>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block  mb-2 font-Gilroy">
                                Expense date <span className="text-red-500 text-[20px]">*</span>
                            </label>


                            <DatePicker
                                selected={expenseDate}
                                onChange={(date) => {
                                    setExpenseDate(date);
                                    if (errors.expenseDate) {
                                        setErrors((prevErrors) => ({ ...prevErrors, expenseDate: "" }));
                                    }
                                }}
                                dateFormat="dd-MM-yyyy"
                                customInput={<CustomInput />}
                                maxDate={new Date()}
                            />

                            {errors.expenseDate && (
                                <div className="flex items-center text-red-500 text-sm mt-1">
                                    <MdError className="mr-1 text-base" />
                                    <p >{errors.expenseDate}</p>
                                </div>
                            )}
                        </div>



                        <div>
                            <label className="block  mb-2 font-Gilroy">
                                Expense amount <span className="text-red-500 text-[20px]">*</span>
                            </label>
                            <input
                                type="text"
                                value={expenseAmount}
                                onChange={(e) => {
                                    const onlyNumbers = e.target.value.replace(/[^0-9.]/g, "");
                                    setExpenseAmount(onlyNumbers);
                                    if (errors.expenseAmount) {
                                        setErrors((prevErrors) => ({ ...prevErrors, expenseAmount: "" }));
                                    }
                                }}
                                placeholder="Enter expense amount"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                            />


                            {errors.expenseAmount && (
                                <div className="flex items-center text-red-500 text-sm mt-1">
                                    <MdError className="mr-1 text-base" />
                                    <p >{errors.expenseAmount}</p>
                                </div>
                            )}
                        </div>
                    </div>


                    <div>
                        <label className="block  mb-2 font-Gilroy">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>
                    {formError && (
                        <div className="flex items-center justify-center text-red-500 text-sm mt-1">
                            <MdError className="mr-1 text-base" />
                            <p >
                                {formError}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-black text-white rounded-lg py-3 mt-4 hover:bg-gray-800 transition font-Gilroy"
                    >
                        {expensesdata ? "Save Changes" : "Add expense"}
                    </button>


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
    expensesdata: PropTypes.object,
    value: PropTypes.string,
    onClick: PropTypes.func,

};

export default connect(mapsToProps)(ExpenseForm);

