import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import img1 from "../Images/Memberone.svg";
import call from "../Icons/call.svg";
import sms from "../Icons/sms.svg";
import building from "../Icons/buildings.svg";
import editIcon from "../Icons/edit_blue.svg"; 
import deleteIcon from "../Icons/Delete.svg";
import { useDispatch,connect } from "react-redux"; 
import PropTypes from 'prop-types';

function ActiveMember({state}) {
  
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);

  const popupRef = useRef(null);
  const members = state.Member.Memberdata;
  
  useEffect(()=> {
    if(state.Member.statusCodeMemberList === 200){
      dispatch({ type: 'CLEAR_STATUS_CODE_MEMBER_LIST' });
    }
  })

  useEffect(() => {
    dispatch({ type: 'MEMBERLIST' });
  }, [dispatch]);


const toggleMenu = (event, index) => {
    event.stopPropagation();
    setOpenMenu(openMenu === index ? null : index);
  };
  
  
  
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

 

 
  return (
    <>
     <div data-testid='inactive-member-div' className="flex justify-end">
        <button
          data-testid="button-add-member"
          className="bg-black text-white py-4 px-8 rounded-full text-base font-Gilroy font-medium mt-[-60px]"
        >
         + Add Member
        </button>
      </div>
    <div className=" max-h-[400px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {members.map((member, index) => (
        <div key={index} className="member-card bg-blue-50 p-4 rounded-3xl shadow-sm relative">
        
         
          <div className="absolute top-4 right-4">
            <FaEllipsisH
            data-testid={`button-toggle-menu${index}`}
              className="text-gray-500 cursor-pointer"
              onClick={(event) => toggleMenu(event, index)}
            />
          </div>

         
          {openMenu === index && (
        <div
        ref={popupRef}
        data-testid='edit-container'
        className="absolute right-4 top-10 bg-white w-40 border border-gray-200 rounded-lg shadow-lg z-10 w-[160px]"
      >
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-blue-600 rounded-lg"
               
              >
                <img src={editIcon} alt="Edit" className="h-4 w-4" />
                Edit
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-red-600  rounded-lg"
               
              >
                <img src={deleteIcon} alt="Delete" className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}


          <div className="flex items-center gap-4">
            <img src={img1} alt='Member' className="rounded-full" />
            <div>
              <h3 className="font-semibold text-base font-Gilroy">{member.User_Name}</h3>
              <div className="flex gap-2 text-sm mt-1">
                <span className="bg-blue-100 text-sm font-medium font-Gilroy  px-2 py-1 rounded-xl">
                  {member.Member_Id
                  }
                </span>
                <span className="px-2 py-1 rounded-xl text-sm font-medium font-Gilroy bg-yellow-200 ">
                  {member.subscription}
                </span>
                <span className={`px-2 py-1 rounded-xl text-sm font-medium font-Gilroy ${
  member.Status === "Active" ? "bg-green-200" : "bg-pink-200"
}`}>
  {member.Status}
</span>
              </div>
            </div>
          </div>

        
          <div className="mt-3 text-sm text-gray-700">
            <div className="flex justify-stretch items-center">
              <p className="flex items-center gap-2 font-Gilroy">
                <img src={sms} className="text-gray-500" alt="sms" />
                {member.Email_Id}
              </p>
              <p className="flex items-center gap-2 font-Gilroy">
                <img src={call} className="text-gray-500" alt="call" />
                {member.Mobile_No
                }
              </p>
            </div>
            <p className="flex items-center gap-2 mt-2 font-Gilroy">
              <img src={building} className="text-gray-500" alt="building" />
              {member.Address}
            </p>
          </div>

         
          <div className="flex justify-between items-center mt-3">
            <p className="text-purple-600 font-medium text-sm font-Gilroy">
              View attached documents
            </p>
            <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-xl font-Gilroy">
              {member.Joining_Date}
            </span>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo
  }
}
ActiveMember.propTypes = {
  state: PropTypes.object, 
};
export default connect(mapsToProps)(ActiveMember)
