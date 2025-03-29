/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import ExpensesIcon from "../../Asset/Icons/ExpensesIcon.svg";
import ThreeDotMore from "../../Asset/Icons/ThreeDotMore.svg";
import CloseCircleIcon from "../../Asset/Icons/close-circle.svg";
import PropTypes from "prop-types";

function ExpensesSetting({ state }) {

  const dispatch = useDispatch();

  const expensesetting = [...(state.SettingExpenses?.getExpenseData.data || [])].reverse();

  const statusCode = state.SettingExpenses.statusCodeSettingsAddExpenses;

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName && !isSubCategory) {
      setErrorMessage("Please add a category name");
      return;
    }

    if (isSubCategory && !subCategoryName) {
      setErrorMessage("Please add a sub-category name");
      return;
    }

    const categoryExists = expensesetting.some(
      (category) => category.category_Name.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryExists) {
      setErrorMessage("Sub Category Name Already Exist");
      return;
    }

    setErrorMessage("");

    const payload = {
      category_Name: categoryName,
      sub_Category: subCategories,
    };

    dispatch({
      type: "SETTING_ADD_EXPENSES",
      payload: payload,
    });
  };

  useEffect(() => {
    if (statusCode === 200) {
      dispatch({ type: "CLEARSETTINGADDEXPENSES" });
      setCategoryName("");
      setSubCategoryName("");
      setIsModalOpen(false);
    }
  }, [statusCode, dispatch]);

  const handlecategoryName = (e) => setCategoryName(e.target.value);
  const handleSubCategoryName = (e) => setSubCategoryName(e.target.value);

  useEffect(() => {
    dispatch({ type: "SETTING_GET_EXPENSES" });
  }, [dispatch]);



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expensesetting.slice(indexOfFirstItem, indexOfLastItem);
  const [subCategories, setSubCategories] = useState([]);




  const handleNewAddSubCategory = (categoryName) => {
    setSubCategories([...subCategories, categoryName])
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="flex items-center justify-between w-full ">
        <div>
          <p className="font-Gilroy font-semibold text-xl text-black">Expenses</p>
          <p className="mt-5 text-gray-500 text-sm font-medium">
            Set up expenses by creating categories
          </p>
        </div>
        <button
          className="bg-black text-white w-[155px] rounded-[60px] font-Gilroy text-base font-medium pt-[16px] pr-[20px] pb-[16px] pl-[20px]"
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50">
          <div className={`bg-white w-464 rounded-40 p-6 shadow-lg transition-all duration-300 `}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-Gilroy">Add new category</h2>
              <img
                alt=""
                src={CloseCircleIcon}
                onClick={() => setIsModalOpen(false)}
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
                }} value={categoryName}
                type="text"
                placeholder="Enter category name"
                className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 text-base placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
              />

              <div className="flex items-center mt-7 cursor-pointer">
                <input
                  type="checkbox"
                  id="makeSubCategory"
                  className="w-5 h-5"
                  checked={isSubCategory}
                  onChange={() => {
                    setIsSubCategory(!isSubCategory);
                    setErrorMessage("");
                  }}
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
                  <div
                    className="flex justify-between w-310 mx-auto px-2 pb-5 pt-1 font-Gilroy font-medium text-sm text-[#222222] cursor-pointer"
                    onClick={() =>
                      handleNewAddSubCategory(subCategoryName)
                    }
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
                  <label className="text-black text-sm font-medium font-Gilroy text-lg">Sub Category <span className="text-red-500 text-[20px]">*</span></label>
                  <input
                    type="text"
                    placeholder="Select a category"
                    onChange={(e) => {
                      handleSubCategoryName(e);
                      setErrorMessage("");
                    }}
                    className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 text-base placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
                  />
                </div>
              )}
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm font-medium mt-2">{errorMessage}</p>
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


      <div className="max-h-[400px] overflow-y-auto mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentExpenses.map((category, index) => (
          <div key={index} className="w-300 h-300 border border-[#E7E7E7] bg-[#F4F7FF] flex flex-col rounded-3xl">
            <div className="flex items-center px-4 py-4">
              <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
              <p className="text-darkGray text-base font-semibold leading-[19.09px] ml-2 font-Gilroy">
                {category.category_Name}
              </p>
              <div className="flex-grow"></div>
              <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
            </div>
            <div className="w-310 mx-auto border-t border-[#E7E7E7]"></div>

            {category.subcategory?.map((sub, subIndex) => (

              <div key={subIndex} className="flex justify-between w-310 mx-auto px-2 pb-5 pt-5">
                <p className="text-[#939393] font-Gilroy font-medium text-sm leading-[16.48px]">Sub-category </p>
                <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">{sub.subcategory}</p>
              </div>
            ))}

            {subCategories[category.category_Id]?.map((sub, subIndex) => (
              <div key={subIndex} className="flex justify-between w-310 mx-auto px-2 pt-5">
                <p className="text-[#939393] font-Gilroy font-medium text-sm leading-[16.48px]">
                  Sub-category
                </p>
                <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">
                  {sub}
                </p>
              </div>
            ))}

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