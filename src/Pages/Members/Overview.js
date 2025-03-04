/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect , useRef} from "react";
import { BsThreeDots } from "react-icons/bs";
import doublecoin from '../../Asset/Images/doubleicon.svg';
import rupeecoin from '../../Asset/Images/ruppeeicon.svg';
import scoin from '../../Asset/Images/Scoin.svg';
import call from "../../Asset/Icons/call.svg";
import sms from "../../Asset/Icons/sms.svg";
import building from "../../Asset/Icons/buildings.svg";
import calender from '../../Asset/Icons/calendar-tick.svg';
import profile from '../../Asset/Icons/profile.svg';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

function Overview({ member }) {
    const dispatch = useDispatch();
   
    
    const isApiCalled = useRef(false); 

    useEffect(() => {
        if (member?.Id && !isApiCalled.current) {
            dispatch({
                type: "MEMBEROVERVIEW",
                payload: { id: member.Id },
            });
            isApiCalled.current = true; 
        }
    }, [member?.Id]); 

    return (
        <div className="mt-6 px-4 md:px-0">
        
            <div className="flex flex-col gap-6 md:flex-row">
                
              
                <div className="member-card bg-blue-50 p-4 md:p-6 rounded-2xl w-full md:w-1/2 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>
                        <BsThreeDots className="text-gray-500 cursor-pointer" />
                    </div>

                   
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium mb-2">Subscription</span>
                            <div className="flex items-center gap-2">
                                <img src={calender} alt="calender" className="w-5 h-5" />
                                <span className="text-gray-800 text-sm font-semibold">Since April 2024</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium mb-2">Status</span>
                            <div className="flex items-center gap-2">
                                <img src={profile} alt="profile" className="w-5 h-5" />
                                <span className="text-green-800 text-sm font-Gilroy font-semibold">{member.Status}</span>

                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium mb-2">Email</span>
                            <div className="flex items-center gap-2">
                                <img src={sms} alt="sms" className="w-5 h-5" />
                                <span className="text-gray-800 text-sm font-semibold truncate">{member.Email_Id}</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs font-medium mb-2">Mobile No</span>
                            <div className="flex items-center gap-2">
                                <img src={call} alt="call" className="w-5 h-5" />
                                <span className="text-gray-800 text-sm font-semibold">{member.Mobile_No}</span>
                            </div>
                        </div>
                    </div>

                   
                    <div className="mt-4">
                        <span className="text-gray-500 text-xs font-medium mb-2">Address</span>
                        <div className="flex items-center gap-2">
                            <img src={building} alt="building" className="w-5 h-5" />
                            <span className="text-gray-800 text-sm font-semibold truncate">
                                {member.Address}
                            </span>
                        </div>
                    </div>
                </div>

              
                <div className="member-card bg-blue-50 p-4 rounded-2xl shadow-lg w-full md:w-1/2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Documents</h3>
                        <BsThreeDots className="text-gray-500 cursor-pointer" />
                    </div>

                    <div className="flex justify-center md:justify-start gap-3 flex-wrap">
                        <img src={doublecoin} alt="Document 1" className="lg:w-[150px] lg:h-[150px] md:w-20 md:h-20 rounded-lg object-cover" />
                        <img src={rupeecoin} alt="Document 2" className="lg:w-[150px] lg:h-[150px] md:w-20 md:h-20 rounded-lg  object-cover" />
                        <img src={scoin} alt="Document 3" className=" lg:w-[150px] lg:h-[150px] md:w-20 md:h-20  rounded-lg  object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}



Overview.propTypes = {
    member: PropTypes.object,
};

export default Overview;
