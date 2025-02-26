/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from "react";
import ExpensesIcon from "../Icons/ExpensesIcon.svg";
import ThreeDotMore from "../Icons/ThreeDotMore.svg";
import CloseCircleIcon from "../Icons/close-circle.svg";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

function ExpensesSetting() {
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  console.log("STateL:,",state);
  
  const[categoryName,setCategoryName]=useState('');
  const[subCategoryName]=useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubCategory, setIsSubCategory] = useState(false);




  const handleSubmit =  (e) => {
    e.preventDefault();
   
        const payload = { 
          category_Name:categoryName,
          sub_Category:subCategoryName,
          id:state.SettingAddExpenses.id
        };

        dispatch({
            type: 'SETTING_ADD_EXPENSES',
            payload: payload
        });
    }
  
    const handlecategoryName = (e) => {
      setCategoryName(e.target.value);
    };

    useEffect(() => {
      if (state.SettingAddExpenses.statusCode === 200) {
  
  
          dispatch({ type: 'SETTING_ADD_EXPENSES' });
  
        const token = state.SettingAddExpenses.JWTtoken
        const cookies = new Cookies()
        cookies.set('token', token, { path: '/' });
        
        setTimeout(() => {
          dispatch({ type: 'CLEAR_STATUSCODE' });
        }, 100);
  
      }
  
    }, [state.SettingAddExpenses.statusCode]);

  return (
    <div className="container mx-auto mt-10">

      <div className="flex items-center justify-between w-full pb-4">
        <div>
          <p className="font-Gilroy font-semibold text-xl text-black">Expenses</p>
          <p className="mt-5 text-gray-500 text-sm font-medium">Set up expenses by creating categories</p>
        </div>
        <button
          className="bg-black text-white w-[155px] rounded-[60px] text-base font-medium pt-[16px] pr-[20px] pb-[16px] pl-[20px]
"
          onClick={() => setIsModalOpen(true)}
        >
          + Add category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white w-464 rounded-40 p-6 shadow-lg transition-all duration-300 ${isSubCategory ? 'h-auto' : 'h-[380px]'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add new category</h2>
              <img alt="" src={CloseCircleIcon} onClick={() => setIsModalOpen(false)} className="w-32 h-32 cursor-pointer" />
            </div>
            <div className="w-full border border-[#E7E7E7] mx-auto"></div>
            <div className="mt-7">
       
              <label className="text-black text-sm font-medium text-lg">Category name</label>
              <input
               onChange={handlecategoryName}
              value={categoryName}
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
  onChange={() => setIsSubCategory(!isSubCategory)} 
/>

                <label
                  htmlFor="makeSubCategory"
                  className="text-black font-medium text-base pl-10 cursor-pointer"
                >
                  Make sub-category
                </label>
              </div>

     
              {isSubCategory && (
                <div className="mt-5">
                  <label className="text-black text-sm font-medium text-lg">Select Category</label>
                  <input
                    type="text"
                    placeholder="Select a category"
                    className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 text-base placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
                  />
                </div>
              )}
            </div>
   
            <button onClick={handleSubmit}
              className="mt-10 pt-[20px] pr-[40px] pb-[20px] pl-[40px] w-full
 h-59 bg-black text-white rounded-60 text-base font-medium"
            >
              Add category
            </button>
          </div>
        </div>
      )}
            <div className="mt-10 w-350 h-170 border border-[#E7E7E7] bg-#F4F7FF flex flex-col rounded-3xl">
        <div className="flex items-center px-4 py-4">
          <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
          <p className="text-darkGray text-base font-semibold leading-[19.09px] ml-2" style={{ fontFamily: "Gilroy", letterSpacing: "0%" }}>
            Category Name
          </p>
          <div className="flex-grow"></div>
          <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="w-310 mx-auto border-t border-[#E7E7E7]"></div>
        <div className="flex justify-between w-310 mx-auto px-2 pt-5">
          <p className="text-grayCustom font-Gilroy font-medium text-sm leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">Name</p>
        </div>
        <div className="flex justify-between w-310 mx-auto px-2 pt-5">
          <p className="text-grayCustom font-Gilroy font-medium text-sm leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">Name</p>
        </div>
      </div>
    </div>
  );
}
export default ExpensesSetting;
