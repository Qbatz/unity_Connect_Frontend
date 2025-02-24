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
  const[subCategoryName,setSubCategoryName]=useState('');
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

    
    const handlesubCategoryName = (e) => {
      setSubCategoryName(e.target.value);
    };


    useEffect(() => {
      if (state.login.statusCode === 200) {
  
  
          dispatch({ type: 'LOGIN-SUCCESS' });
  
        const token = state.login.JWTtoken
        const cookies = new Cookies()
        cookies.set('token', token, { path: '/' });
        const tokenCookies = cookies.get('token');
  
        setTimeout(() => {
          dispatch({ type: 'CLEAR_STATUSCODE' });
        }, 100);
  
      }
  
    }, [state.login.statusCode]);

  return (
    <div className="container mx-auto mt-10">

      <div className="flex items-center justify-between w-full pb-4">
        <div>
          <p className="font-gilroy font-semibold text-[20px] text-black">Expenses</p>
          <p className="mt-5 text-gray-500 text-[14px] font-medium">Set up expenses by creating categories</p>
        </div>
        <button
          className="bg-black text-white w-[155px] h-[51px] rounded-[60px] text-[16px] font-medium"
          onClick={() => setIsModalOpen(true)}
        >
          + Add category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white w-[464px] rounded-[40px] p-6 shadow-lg transition-all duration-300 ${isSubCategory ? 'h-auto' : 'h-[380px]'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-semibold">Add new category</h2>
              <img src={CloseCircleIcon} onClick={() => setIsModalOpen(false)} className="w-[32px] h-[32px] cursor-pointer" />
            </div>
            <div className="w-full border border-[#E7E7E7] mx-auto"></div>
            <div className="mt-7">
       
              <label className="text-black text-sm font-medium text-[18px]">Category name</label>
              <input
               onChange={handlecategoryName}
              value={categoryName}
                type="text"
                placeholder="Enter category name"
                className="w-full h-[60px] border border-[#D9D9D9] rounded-[16px] p-4 mt-3 text-[16px] placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
              />

              <div className="flex items-center mt-7 cursor-pointer">
              <input
  type="checkbox"
  id="makeSubCategory"
  className="w-5 h-5"
  checked={isSubCategory}
  onChange={() => setIsSubCategory(!isSubCategory)} // Corrected
/>

                <label
                  htmlFor="makeSubCategory"
                  className="text-black font-medium text-[16px] pl-[10px] cursor-pointer"
                >
                  Make sub-category
                </label>
              </div>

     
              {isSubCategory && (
                <div className="mt-5">
                  <label className="text-black text-sm font-medium text-[18px]">Select Category</label>
                  <input
                    type="text"
                    placeholder="Select a category"
                    className="w-full h-[60px] border border-[#D9D9D9] rounded-[16px] p-4 mt-3 text-[16px] placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
                  />
                </div>
              )}
            </div>
   
            <button onClick={handleSubmit}
              className="mt-10 w-full h-[59px] bg-black text-white rounded-[60px] text-[16px] font-medium"
            >
              Add category
            </button>
          </div>
        </div>
      )}
            <div className="mt-10 w-[350px] h-[170px] border border-[#E7E7E7] bg-[#F4F7FF] flex flex-col rounded-[24px]">
        <div className="flex items-center px-4 py-4">
          <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
          <p className="text-[#222222] text-[16px] font-semibold leading-[19.09px] ml-2" style={{ fontFamily: "Gilroy", letterSpacing: "0%" }}>
            Category Name
          </p>
          <div className="flex-grow"></div>
          <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="w-[310px] mx-auto border-t border-[#E7E7E7]"></div>
        <div className="flex justify-between w-[310px] mx-auto px-2 pt-5">
          <p className="text-[#939393] font-gilroy font-[500] text-[14px] leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-gilroy font-semibold text-[14px] leading-[16.7px] text-right">Name</p>
        </div>
        <div className="flex justify-between w-[310px] mx-auto px-2 pt-5">
          <p className="text-[#939393] font-gilroy font-medium text-[14px] leading-[16.48px]">Sub-category 1</p>
          <p className="text-black font-gilroy font-semibold text-[14px] leading-[16.7px] text-right">Name</p>
        </div>
      </div>
    </div>
  );
}
export default ExpensesSetting;
