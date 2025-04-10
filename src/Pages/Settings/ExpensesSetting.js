/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import ExpensesIcon from "../../Asset/Icons/ExpensesIcon.svg";
import ThreeDotMore from "../../Asset/Icons/ThreeDotMore.svg";
import CloseCircleIcon from "../../Asset/Icons/close-circle.svg";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";

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



  const handleSubmit = (e) => {
    e.preventDefault();


    if (isSubCategory && subCategoryName.trim()) {
      setSubCategories((prev) => [...prev, subCategoryName.trim()]);
      setSubCategoryName("");
    }



    if (!categoryName && !isSubCategory) {
      setCategoryError("Please add a category name");
      return;
    }

    if (isSubCategory && subCategories.length === 0) {
      setSubCategoryError("Please add at least one sub-category.");
      return;
    }

    const categoryExists = expensesetting.some(
      (category) => category.category_Name.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryExists) {
      setErrorMessage("Category name already exists");
      return;
    }

    setCategoryError("");
    setSubCategoryError("");
    setErrorMessage("");

    const payload = {
      category_Name: categoryName,
      sub_Category: subCategories,
    };

    dispatch({
      type: "SETTING_ADD_EXPENSES",
      payload: payload,
    });

    setCategoryName("");
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
    dispatch({ type: "SETTING_GET_EXPENSES" });
  }, []);

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
      setSubCategoryError("Sub-category name cannot be empty.");
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
    }
  };




  return (
    <div className="container mx-auto mt-5">
      <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between w-full">
        <div className="px-4 sm:px-6 lg:px-0 mt-4 sm:mt-6">
          <p className="font-Gilroy font-semibold text-lg sm:text-xl text-black">Expenses</p>
          <p className="mt-3 sm:mt-5 text-gray-500 text-sm sm:text-base font-Gilroy font-medium">
            Set up expenses by creating categories
          </p>
        </div>

        <div className="px-4 sm:px-0 mt-4 sm:mt-0 w-full sm:w-auto flex justify-center sm:justify-start">
          <button
            className="w-full max-w-[300px] sm:w-[155px] bg-black font-Gilroy text-white text-sm sm:text-base font-medium py-[14px] sm:py-[16px] px-[20px] rounded-[60px]"
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
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50">
          <div className="bg-white w-[464px] rounded-[40px] p-6 shadow-lg transition-all duration-300">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-Gilroy">Add new category</h2>
              <img
                alt=""
                src={CloseCircleIcon}

                onClick={() => {
                  setIsModalOpen(false);
                  setSubCategoryError("")

                }}
                className="w-32 h-32 cursor-pointer"
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
                <p className="text-red-500 flex items-center gap-1 text-sm mt-3">
                  <MdError /> {categoryError}
                </p>
              )}

              {errormsg && (
                <p className="text-red-500 flex items-center gap-1 text-sm mt-3">
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
              <p className="text-red-500 flex items-center gap-1 text-sm mt-3">
                <MdError /> {subcategoryError}
              </p>
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


      <div className="max-h-[400px] overflow-y-auto mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentExpenses.map((category, index) => (
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
              {category.subcategory?.map((sub, subIndex) => (
                <div key={subIndex} className="flex justify-between mx-auto py-2">
                  <p className="text-[#939393] font-Gilroy font-medium text-sm">Sub-category</p>
                  <p className="text-black font-Gilroy font-semibold text-sm text-right">{sub.subcategory}</p>
                </div>
              ))}

              {subCategories[category.category_Id]?.map((sub, subIndex) => (
                <div key={subIndex} className="flex justify-between mx-auto py-2">
                  <p className="text-[#939393] font-Gilroy font-medium text-sm">Sub-category</p>
                  <p className="text-black font-Gilroy font-semibold text-sm text-right">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>






      {expensesetting.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 flex justify-end">


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