import React from "react";
import paymenticon from '../../Asset/Icons/PaymentIcon.svg';
import Tick from '../../Asset/Icons/tick.svg';

const Payment = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">

      <div>
        <h2 className="text-[20px] font-semibold font-Gilroy text-black">Payment</h2>
        <p className="text-lightgray mt-4 font-Gilroy font-medium text-sm">
          Set up your preferred payment method
        </p>
      </div>


      <div>

        <div className="border border-purple-600 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md mt-4">
          <div className="flex items-start sm:items-center gap-4 w-full">
            <img src={paymenticon} className="mt-1 w-10 h-10" alt="Payment Icon" />
            <div>
              <p className="text-black font-semibold font-Gilroy text-base">
                Bank account ending in 2456
              </p>
              <p className="text-gray-500 text-sm font-Gilroy font-medium mt-1">
                IFSC code: SBIN004578945
              </p>
              <div className="flex flex-wrap gap-4 text-purple-600 text-sm mt-4">
                <span className="cursor-pointer font-Gilroy font-semibold hover:underline">
                  Set as default
                </span>
                <span className="cursor-pointer font-Gilroy font-semibold hover:underline">
                  Edit
                </span>
                <span className="cursor-pointer font-Gilroy font-semibold hover:underline text-red-500">
                  Remove
                </span>
              </div>

            </div>
          </div>

          <div className="flex items-center space-x-1 mt-4 sm:mt-0">
            <img src={Tick} alt="tick" className="w-4 h-4" />
            <span className="text-green-600 font-semibold font-Gilroy text-base">
              Primary account
            </span>
          </div>

        </div>


        <div className="border border-gray-300 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md mt-8">
          <div className="flex items-start sm:items-center gap-4 w-full">
            <img src={paymenticon} className="mt-1 w-10 h-10" alt="Payment Icon" />
            <div>
              <p className="text-black font-semibold font-Gilroy text-base">
                Bank account ending in 4566
              </p>
              <p className="text-gray-500 text-sm font-Gilroy font-medium mt-1">
                IFSC code: SBIN004578748
              </p>
              <div className="flex flex-wrap gap-4 text-purple-600 text-sm mt-4">
                <span className="cursor-pointer font-Gilroy font-semibold hover:underline">
                  Set as default
                </span>
                <span className="cursor-pointer font-Gilroy font-semibold hover:underline">
                  Edit
                </span>
                <span className="cursor-pointer font-Gilroy font-semibold hover:underline text-red-500">
                  Remove
                </span>
              </div>

            </div>
          </div>
        </div>


        <p className="text-black font-semibold text-base font-Gilroy cursor-pointer mt-8">
          + Add new payment
        </p>


        <div className="mt-6 flex justify-end">
          <button className="bg-lightgray text-white py-3 px-6 rounded-full text-base font-Gilroy font-medium w-full sm:w-auto">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
