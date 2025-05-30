/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import ExpensesIcon from "../../Asset/Icons/ExpensesIcon.svg";
import ThreeDotMore from "../../Asset/Icons/ThreeDotMore.svg";
import CloseCircleIcon from "../../Asset/Icons/close-circle.svg";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import EmptyState from '../../Asset/Images/Empty-State.jpg'
import { ClipLoader } from "react-spinners";

function ExpensesSetting({ state }) {

  const dispatch = useDispatch();

  const expensesetting = [...(state.SettingExpenses?.getExpenseData.data || [])].reverse();

  const statusCode = state.SettingExpenses.statusCodeSettingsAddExpenses;

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [errormsg, setErrorMessage] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const [categoryError, setCategoryError] = useState("")
  const [subcategoryError, setSubCategoryError] = useState("")

  const [loading, setLoading] = useState(true);



  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCategoryName = categoryName.trim();
    const trimmedSubCategoryName = subCategoryName.trim();


    let updatedSubCategories = [...subCategories];


    if (isSubCategory && trimmedSubCategoryName) {
      updatedSubCategories.push(trimmedSubCategoryName);
    }


    if (!trimmedCategoryName) {
      setCategoryError("Please add a category name");
    } else {
      setCategoryError("");
    }


    if (isSubCategory && updatedSubCategories.length === 0) {
      setSubCategoryError("Please add at least one sub-category");
    } else {
      setSubCategoryError("");
    }


    if (!trimmedCategoryName || (isSubCategory && updatedSubCategories.length === 0)) {
      return;
    }


    const categoryExists = expensesetting.some(
      (category) =>
        category.category_Name.toLowerCase() === trimmedCategoryName.toLowerCase()
    );

    if (categoryExists) {
      setErrorMessage("Category name already exists");
      return;
    } else {
      setErrorMessage("");
    }


    const payload = {
      category_Name: trimmedCategoryName,
      sub_Category: updatedSubCategories,
    };


    dispatch({
      type: "SETTING_ADD_EXPENSES",
      payload: payload,
    });

    setCategoryName("");
    setSubCategoryName("");
    setSubCategories([]);
    setIsSubCategory(false);
  };

  useEffect(() => {
    if (statusCode === 200) {
      dispatch({ type: "CLEARSETTINGADDEXPENSES" });
      setCategoryName("");
      setSubCategoryName("");
      setIsModalOpen(false);
    }
  }, [statusCode]);




  const handlecategoryName = (e) => setCategoryName(e.target.value);


  useEffect(() => {
    setLoading(true)
    dispatch({ type: "SETTING_GET_EXPENSES" });
  }, []);


  useEffect(() => {
    if (state.SettingExpenses.statusCodeSettingsAddExpenses === 200) {
      setLoading(false);
      dispatch({ type: "CLEARSETTINGADDEXPENSES" });
      setCategoryName("");
      setSubCategoryName("");
      setIsModalOpen(false);
      setIsSubCategory(false);
      setSubCategories([]);
      dispatch({ type: 'CLEAR_CATEGORY_ERROR' });
    } else if (state.SettingExpenses.statusCodeSettingsAddExpenses === 201) {
      setIsSubCategory(true);
    }
  }, [state.SettingExpenses.statusCodeSettingsAddExpenses]);

  useEffect(() => {
    if (isSubCategory && subCategories.length > 0) {
      setSubCategoryError("");
    }
  }, [subCategories, isSubCategory]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expensesetting.slice(indexOfFirstItem, indexOfLastItem);




  const handleNewAddSubCategory = () => {
    if (!subCategoryName.trim()) {
      setSubCategoryError("Sub-category name cannot be empty");
      return;
    }

    setSubCategories((prev) => {
      const updatedSubCategories = [...prev, subCategoryName.trim()];

      return updatedSubCategories;
    });

    setSubCategoryName("");
    setSubCategoryError("");
  };




  const handleCheckboxChange = (e) => {
    setIsSubCategory(e.target.checked);
    if (!e.target.checked) {
      setSubCategories([]);
      setSubCategoryError("");
      dispatch({ type: 'CLEAR_CATEGORY_ERROR' });
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
        <ClipLoader color="#7f00ff" loading={loading} size={30} />
      </div>
    );
  }


  return (
    <div className="container mx-auto mt-5">
      <div className="flex flex-row items-center justify-between w-full flex-wrap">
        <div className="px-4 sm:px-6 lg:px-0">
          <p className="font-Gilroy font-semibold text-lg sm:text-xl text-black">Expenses</p>
          <p className="mt-3 sm:mt-5 text-gray-500 text-xs sm:text-base font-Gilroy font-medium">
            Set up expenses by creating categories
          </p>
        </div>

        <div className=" mt-2 ">
          <button
            className="bg-black font-Gilroy text-white w-[155px] rounded-[60px] text-xs sm:text-sm md:text-base lg:text-base font-medium  pt-[10px] pb-[10px] px-[16px] sm:pt-[14px] sm:pb-[14px] sm:px-[18px] md:pt-[16px] md:pb-[16px] md:px-[20px]"
            onClick={() => {
              setIsModalOpen(true);
              setCategoryName("");
              setSubCategoryName("");
              setSubCategories([]);
              setIsSubCategory(false);
              setErrorMessage("");
            }}
          >
            + Add category
          </button>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50 p-2">
          <div className="bg-white w-[464px] rounded-[40px] p-6 shadow-lg transition-all duration-300">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-Gilroy">Add new category</h2>
              <img
                alt=""
                src={CloseCircleIcon}

                onClick={() => {
                  setIsModalOpen(false);
                  setErrorMessage("");
                  setSubCategoryError("");
                  setCategoryError("");
                  dispatch({ type: 'CLEAR_CATEGORY_ERROR' })
                }}
                className="w-8 h-8 cursor-pointer"
              />
            </div>
            <div className="w-full border border-[#E7E7E7] mx-auto"></div>
            <div className="mt-7 overflow-y-auto max-h-[350px]">
              <label className="text-black text-sm font-medium font-Gilroy text-lg">Category name <span className="text-red-500 text-[20px]">*</span></label>
              <input
                onChange={(e) => {
                  handlecategoryName(e);
                  setErrorMessage("");
                  setCategoryError("")
                }} value={categoryName}
                type="text"
                placeholder="Enter category name"
                className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 text-base placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
              />

              {categoryError && (
                <p className="text-red-500 flex items-center gap-1 text-xs mt-3">
                  <MdError /> {categoryError}
                </p>
              )}

              {errormsg && (
                <p className="text-red-500 flex items-center gap-1 text-xs mt-3">
                  <MdError /> {errormsg}
                </p>
              )}

              <div className="flex items-center mt-7 cursor-pointer">
                <input
                  type="checkbox"
                  id="makeSubCategory"
                  className="w-5 h-5"
                  checked={isSubCategory}

                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="makeSubCategory"
                  className="text-black font-medium font-Gilroy text-base pl-10 cursor-pointer"
                >
                  Make sub-category
                </label>

              </div>


              {isSubCategory && (
                <div className="mt-2">
                  <label className="text-black text-sm font-medium font-Gilroy text-lg">
                    Sub Category <span className="text-red-500 text-[20px]">*</span>
                  </label>


                  <input
                    type="text"
                    placeholder="Enter sub-category name"
                    value={subCategoryName}
                    onChange={(e) => {

                      setSubCategoryName(e.target.value);
                      setSubCategoryError("")
                      dispatch({ type: 'CLEAR_CATEGORY_ERROR' })
                    }}
                    className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 text-base placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
                  />





                  <div
                    className="flex justify-between w-310 mx-auto px-2 pb-5 pt-1 font-Gilroy font-medium text-sm text-[#222222] cursor-pointer"
                    onClick={handleNewAddSubCategory}

                  >
                    + Add Sub-category
                  </div>


                  {subCategories?.map((sub, subIndex) => (
                    <div key={subIndex} className="flex justify-between w-310 mx-auto px-2 pt-2">
                      <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">
                        {sub}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
            {subcategoryError && (
              <p className="text-red-500 flex items-center gap-1 text-xs mt-3">
                <MdError /> {subcategoryError}
              </p>
            )}
            {state.SettingExpenses.CategoryError && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <MdError className="mr-1 text-xs" />
                <p className="text-red-500 text-xs font-Gilroy">{state.SettingExpenses.CategoryError}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="mt-10 pt-[20px] pr-[40px] pb-[20px] pl-[40px] w-full h-59 bg-black text-white
               rounded-60 text-base font-Gilroy font-medium"
            >
              Add category
            </button>
          </div>
        </div>
      )}


      <div className="max-h-[500px] overflow-y-auto pt-5 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentExpenses && currentExpenses.length > 0 ? (
          currentExpenses.map((category, index) => (
            <div
              key={index}
              className="w-full max-w-[330px] h-[180px] bg-[#F4F7FF] flex flex-col rounded-3xl mx-auto"
            >
              <div className="flex items-center px-4 py-4">
                <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
                <p className="text-darkGray text-base font-semibold leading-[19.09px] ml-2 font-Gilroy">
                  {category.category_Name}
                </p>
                <div className="flex-grow"></div>
                <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
              </div>

              <div className="w-[90%] mx-auto border-t border-[#E7E7E7]"></div>

              <div className="overflow-y-auto max-h-[98px] px-2">
                {category?.subcategory.length > 0 && Array.isArray(category?.subcategory) &&
                  category.subcategory?.map((sub, subIndex) => (
                    <div key={subIndex} className="flex justify-between mx-auto py-2">
                      <p className="text-[#939393] font-Gilroy font-medium text-sm">Sub-category</p>
                      <p className="text-black font-Gilroy font-semibold text-sm text-right">{sub.subcategory}</p>
                    </div>
                  ))}
                {Array.isArray(subCategories?.[category?.category_Id]) &&
                  subCategories[category.category_Id]?.map((sub, subIndex) => (
                    <div key={subIndex} className="flex justify-between mx-auto py-2">
                      <p className="text-[#939393] font-Gilroy font-medium text-sm">Sub-category</p>
                      <p className="text-black font-Gilroy font-semibold text-sm text-right">{sub}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-[290px]">

            <div className="w-64 h-64">
              <img src={EmptyState} alt="EmptyState" className="w-full h-full object-contain mb-2" />
            </div>

            <p className="text-violet-600 text-lg font-medium text-center font-Gilroy">
              No Data Found
            </p>
          </div>
        )}
      </div>






      {expensesetting.length > itemsPerPage && (
        <div className="fixed bottom-0 right-0 w-full p-2 bg-white  flex justify-end z[1000]">


          <button
            className={`px-4 py-2 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"
              }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          <span className="px-4 py-2 border rounded">{currentPage}</span>

          <button
            className={`px-4 py-2 mx-2 border rounded ${indexOfLastItem >= expensesetting.length ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"
              }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= expensesetting.length}
          >
            &gt;
          </button>
        </div>
      )}

    </div>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo
  }
}
ExpensesSetting.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(ExpensesSetting);