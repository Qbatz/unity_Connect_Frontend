import React from "react";
import ExpensesIcon from '../Icons/ExpensesIcon.svg';
import ThreeDotMore from '../Icons/ThreeDotMore.svg';
function LoanSetting() {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-between w-full  pb-4">
        <div>
          <p className="font-gilroy font-semibold text-[20px] leading-[23.86px] text-black">Loan</p>
          <p className="mt-5 text-gray-500 text-[14px] font-medium leading-[16.48px]" style={{ fontFamily: 'Gilroy', letterSpacing: '0%' }}>
          Set up the loan type and manage them
</p>

        </div>
        <button 
  className="bg-black text-white w-[155px] h-[51px] rounded-[60px] text-[16px] font-medium leading-[18.83px] px-[20px] py-[16px]"
  style={{ fontFamily: 'Gilroy', letterSpacing: '0%' }}
>
+ Loan type
</button>


      </div>
      <div className="mt-10 w-[350px] h-[170px] border border-[#E7E7E7] bg-[#F4F7FF] flex flex-col rounded-[24px]">
    
      <div className="flex items-center px-4 py-4">
  <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
  <p 
  className="text-[#222222] text-[16px] font-semibold leading-[19.09px] ml-2" 
  style={{ fontFamily: 'Gilroy', letterSpacing: '0%' }}
>
  Loan Name
</p>

  <div className="flex-grow"></div>
  <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
</div>

      <div className="w-[310px] mx-auto border-t border-[#E7E7E7]"></div>
      <div className="flex justify-between w-[310px] mx-auto px-2 pt-5">
        <p className="text-[#939393] font-gilroy font-[500] text-[14px] leading-[16.48px]">
        Due
        </p>
        <p className="text-black font-gilroy font-semibold text-[14px] leading-[16.7px] text-right">
    Weekly
        </p>
      </div>
      <div className="flex justify-between w-[310px] mx-auto px-2 pt-5">
        <p className="text-[#939393] font-gilroy font-medium text-[14px] leading-[16.48px]">
        Due Count
        </p>
        <p className="text-black font-gilroy font-semibold text-[14px] leading-[16.7px] text-right">
         2
        </p>
      </div>
    </div>

    
    </div>
  );
}

export default LoanSetting;
