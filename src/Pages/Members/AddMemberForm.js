/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef } from "react";
import { MdError } from "react-icons/md";
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import closecircle from '../../Asset/Icons/close-circle.svg';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";


function MemberModal({ state, memberData, onClose }) {


    const dispatch = useDispatch();
    const [memberId, setMemberId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
    const [file, setFile] = useState("");
    const [showImage, setShowImage] = useState("");
    const [errors, setErrors] = useState({});
    const [noChanges, setNoChanges] = useState("");

    useEffect(() => {
        if (memberData) {
            setMemberId(prev => memberData.Member_Id || prev);
            setUserName(prev => memberData.User_Name || prev);
            setEmail(prev => memberData.Email_Id || prev);
            setMobileNo(prev => memberData.Mobile_No || prev);
            setAddress(prev => memberData.Address || prev);
            setJoiningDate(prev => memberData.Joining_Date || prev);

            if (memberData.Document_Url) {
                setShowImage(memberData.Document_Url);
            }
        }
    }, [memberData]);

    useEffect(() => {
        dispatch({ type: 'GET_MEMBER_ID' });
    }, []);

    useEffect(() => {
        if (state.Member.statusCodeForAddUser === 200) {


            dispatch({ type: 'MEMBERLIST' });
            dispatch({ type: 'CLEAR_PHONE_ERROR' });
            onClose()
            setTimeout(() => {
                dispatch({ type: 'CLEAR_STATUS_CODES' });
            }, 1000);

        }
    }, [state.Member.statusCodeForAddUser]);




    useEffect(() => {
        if (!memberData) {
            setMemberId(state?.Member?.GetMemberId?.memberId || '');
        }
    }, [state?.Member?.GetMemberId, memberData]);

    useEffect(() => {
        setNoChanges("");
    }, [memberId, userName, mobileNo, address, joiningDate, file]);

    const formattedDate = joiningDate ? moment(joiningDate).format("YYYY-MM-DD") : "";

    const validate = () => {
        let tempErrors = {};
        if (!memberId) tempErrors.memberId = "Member Id is Required";
        if (!userName) tempErrors.userName = "User Name is Required";

        if (!joiningDate) tempErrors.joiningDate = "Joining Date is Required";
        if (!mobileNo) {
            tempErrors.mobileNo = "Mobile Number is Required";
        } else if (!/^\d{10}$/.test(mobileNo)) {
            tempErrors.mobileNo = "Mobile Number Must be Exactly 10 Digits";
        }
        if (mobileNo.length > 10) {
            tempErrors.mobileNo = "Mobile Number Cannot Exceed 10 Digits";
        }
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;



        if (email && !emailPattern.test(email)) {
            tempErrors.email = "Invalid Email Address";
        }


        if (!address) tempErrors.address = "Address is Required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (field, value) => {
        if (field === "memberId") setMemberId(value);
        if (field === "userName") setUserName(value);
        if (field === "email") setEmail(value.trim().toLowerCase());
        if (field === "joiningDate") setJoiningDate(value);

        if (field === "address") setAddress(value);
      
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

    const handleMobileChange = (e) => {
        if (state.Member.phoneError) {
            dispatch({ type: 'CLEAR_PHONE_ERROR' });
        }
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobileNo(value);
            setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "" }));
        }
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile)
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setShowImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleClose = () => {
        dispatch({ type: 'CLEAR_PHONE_ERROR' });
        onClose()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setNoChanges("");

        const formatDate = (date) => date ? new Date(date).toISOString().split("T")[0] : "";

        const isFileChanged = file && file.name !== (memberData?.Document_Url || "");

        const isChanged = memberData && (
            (userName?.trim() || "") !== (memberData?.User_Name?.trim() || "") ||
            (email?.trim() || "") !== (memberData?.Email_Id?.trim() || "") ||
            (String(mobileNo)?.trim() || "") !== (String(memberData?.Mobile_No)?.trim() || "") ||
            formatDate(joiningDate) !== formatDate(memberData?.Joining_Date) ||
            (address?.trim() || "") !== (memberData?.Address?.trim() || "") ||
            isFileChanged
        );

        if (memberData && !isChanged) {
            setNoChanges("No Changes Detected");
            return;
        }



        if (!validate()) {
            return;
        }

        const payload = {
            Member_Id: memberId,
            user_name: userName,
            email_id: email || '',
            mobile_no: mobileNo,
            joining_date: formattedDate,
            address: address,
            file: file
        };

        const Editpayload = {
            Member_Id: memberId,
            user_name: userName,
            email_id: email || '',
            mobile_no: mobileNo,
            joining_date: formattedDate,
            address: address,
            id: memberData.Id,
            file: file ? file : undefined,
            document_url: !file ? memberData?.Document_Url : undefined,
        };

        dispatch({
            type: 'MEMBERINFO',
            payload: memberData ? Editpayload : payload,
        });

       
        setNoChanges("");



    };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="relative w-full">
            <input
                ref={ref}
                type="text"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none cursor-pointer font-Gilroy"
                placeholder="DD-MM-YYYY"
                value={value}
                onClick={onClick}
                readOnly
            />
            <CalendarDays
                size={20}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer ml-4"
                onClick={onClick}
            />
        </div>
    ));
    CustomInput.displayName = "CustomInput";

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4 overflow-hidden">
            <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-xl max-h-[92vh] overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between border-b pb-2 mb-2 bg-white z-10 sticky top-0">
                    <p className="font-semibold font-Gilroy text-lg leading-6 tracking-normal">
                        {memberData ? "Edit Member" : "Add a Member"}
                    </p>
                    <button data-testid='button-close' className="text-gray-600" onClick={handleClose}>
                        <img src={closecircle} alt="Close" className="w-8 h-8" />
                    </button>
                </div>

                <div className="space-y-4 mt-2 flex-grow overflow-y-auto pr-2 sm:pr-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Member ID
                                <span className="text-red-500 text-xl"></span>
                            </label>
                            <input
                                data-testid='input-member-id'
                                type="text"
                                className="w-full p-2 h-10 border rounded-lg text-sm mb-3 font-Gilroy"
                                value={memberData ? memberData.Member_Id : memberId}
                                readOnly
                            />
                            {errors.memberId && (
                                <p className="text-red-500 flex items-center gap-1 mt-1 text-xs">
                                    <MdError className="text-xs" /> {errors.memberId}
                                </p>
                            )}
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">User Name
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <input
                                data-testid='input-user-name'
                                type="text"
                                className="w-full p-2 h-10 border rounded-lg text-sm mb-1 font-Gilroy"
                                placeholder="Enter User Name"
                                value={userName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[A-Za-z\s]*$/.test(value)) {
                                        handleChange("userName", value);
                                    }
                                }}
                            />
                            {errors.userName && (
                                <p className="text-red-500 flex items-center gap-1 text-xs">
                                    <MdError /> {errors.userName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Email Address
                                <span className="text-red-500 text-xl"></span>
                            </label>
                            <input
                                data-testid='input-member-email'
                                type="email"
                                className="w-full p-2 h-10 border rounded-lg text-sm mb-1 font-Gilroy"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 flex items-center gap-1 text-xs">
                                    <MdError className="text-xs" /> {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Mobile No
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <input
                                data-testid='input-member-phone'
                                type="text"
                                className="w-full p-2 h-10 border rounded-lg text-sm mb-1 font-Gilroy"
                                placeholder="Enter Mobile No"
                                value={mobileNo}
                                onChange={handleMobileChange}
                            />
                            {state.Member.phoneError && (
                                <div className="flex items-center text-red-500 text-xs mt-1">
                                    <MdError className="mr-1 text-xs" />
                                    <p className="text-red-500 text-xs font-Gilroy">{state.Member.phoneError}</p>
                                </div>
                            )}
                            {errors.mobileNo && (
                                <p className="text-red-500 flex items-center gap-1 text-xs">
                                    <MdError className="text-xs" /> {errors.mobileNo}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium text-sm font-Gilroy tracking-normal mb-1 mt-1">Joining Date
                            <span className="text-red-500 text-xl">*</span>
                        </label>
                        <DatePicker
                            selected={formattedDate ? new Date(formattedDate) : null}
                            onChange={(date) => handleChange("joiningDate", date)}
                            dateFormat="dd-MM-yyyy"
                            customInput={<CustomInput />}
                            wrapperClassName="w-full"
                        />
                        {errors.joiningDate && (
                            <p className="text-red-500 flex items-center gap-1 text-xs">
                                <MdError className="text-xs" /> {errors.joiningDate}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1 mt-2">Address
                            <span className="text-red-500 text-xl">*</span>
                        </label>
                        <textarea
                            data-testid='input-member-address'
                            className="w-full p-2 border rounded-lg h-14 text-sm mb-1 font-Gilroy"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                        {errors.address && (
                            <p className="text-red-500 flex items-center gap-1 text-xs -mt-1">
                                <MdError className="text-xs" /> {errors.address}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Add Documents</label>
                        <div className="border rounded-xl px-2 py-4 flex items-center justify-center relative w-28 h-20 mb-1">
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                onChange={handleFileChange}
                            />



                            {showImage ? (
                                file?.type === "application/pdf" ||
                                    file?.type === "application/vnd.ms-excel" ||
                                    file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                    (!file && (showImage?.includes(".pdf") || showImage?.includes(".xls") || showImage?.includes(".xlsx"))) ? (
                                    <div className="text-xs px-1 text-center w-full h-full overflow-y-auto break-words">
                                        {file?.name || showImage.split("/").pop()}
                                    </div>
                                ) : (
                                    <img src={showImage} alt="Selected" className="w-full h-full object-contain" />
                                )
                            ) : (
                                <AiOutlinePlus size={20} />
                            )}



                        </div>
                        <p className="font-medium text-xs font-Gilroy mb-3">
                            Note: File should be .JPG, .PDF, .PNG (max 2MB)
                        </p>
                    </div>



                    {noChanges && (
                        <div className="flex items-center justify-center mt-8 text-red-500 text-xs font-semibold font-Gilroy">
                            <MdError className="text-sm mr-2" />
                            <p>{noChanges}</p>
                        </div>
                    )}
                </div>

                <div className="sticky bottom-0 bg-white py-2 z-10 mt-4">
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded-3xl font-Gilroy font-semibold text-sm"
                        onClick={handleSubmit}
                    >
                        {memberData ? "Save Changes" : "Add Member"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapsToProps = (stateInfo) => {
    return {
        state: stateInfo
    }
}
MemberModal.propTypes = {
    memberData: PropTypes.object,
    state: PropTypes.object,
    onClose: PropTypes.func,
    value: PropTypes.string,
    onClick: PropTypes.func,
    mobileNo: PropTypes.string,
};

export default connect(mapsToProps)(MemberModal);
