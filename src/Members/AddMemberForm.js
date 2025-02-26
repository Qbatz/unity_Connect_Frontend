/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { MdClose, MdError } from "react-icons/md";
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


function AddMemberModal({ state, memberData }) {



    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(true);
    const [memberId, setMemberId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
    const [file, setFile] = useState("");
    const [errors, setErrors] = useState({});
    const [noChanges, setNoChanges] = useState(false)


    const [formData, setFormData] = useState({
       
        address: "",
        email: "",
        userName: "",
        mobileNo: "",
        memberId:"",
    });

    useEffect(() => {
        if (memberData) {
            setFormData({
                memberId: memberData.Member_Id || "", 
                address: memberData.Address || "",
                mobileNo: memberData.Mobile_No || "", 
                email: memberData.Email_Id || "",
                userName: memberData.User_Name || "",
                joiningDate: memberData.Joining_Date || "", 
                status: memberData.Status || "",
            });
        }
    }, [memberData]);


    useEffect(() => {
        if (state.addMember.statusCodeForAddUser === 200) {

            setMemberId("");
            setUserName("");
            setEmail("");
            setJoiningDate("");
            setMobileNo("");
            setAddress("");
            setFile("");
            setErrors("");
            setFormData({
                memberId:"",
                address: "",
                email: "",
                userName: "",
                mobileNo:"",
                status: "",
            });
            dispatch({ type: 'CLEAR_STATUS_CODES' });
        }
    }, [state.addMember.statusCodeForAddUser]);

    const validate = () => {
        // let tempErrors = {};
        // if (!memberId) tempErrors.memberId = "Member ID is required";
        // if (!userName) tempErrors.userName = "User Name is required";
        // if (!email) tempErrors.email = "Email is required";
        // if (!joiningDate) tempErrors.joiningDate = "Joining Date is required";
        // if (!mobileNo.trim()) {
        //     tempErrors.mobileNo = "Mobile number is required";
        //   } else if (!/^\d{10}$/.test(mobileNo)) {
        //     tempErrors.mobileNo = "Mobile number must be exactly 10 digits";
        //   }

        // if (!address) tempErrors.address = "Address is required";
        // setErrors(tempErrors);
        // return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (field, value) => {
        if (field === "memberId") setMemberId(value);
        if (field === "userName") setUserName(value);
        if (field === "email") setEmail(value);
        if (field === "joiningDate") setJoiningDate(value);
        if (field === "mobileNo") setMobileNo(value);
        if (field === "address") setAddress(value);
        if (field === "file") setFile(value);
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (memberData) {
            const isUnchanged =
                memberId === memberData.Member_Id &&
                userName === memberData.User_Name &&
                email === memberData.Email_Id &&
                mobileNo === memberData.Mobile_No &&
                address === memberData.Address &&
                joiningDate === memberData.Joining_Date &&
                file === memberData.file;

            if (isUnchanged) {
                setNoChanges(true);
                return;
            } else {
                setNoChanges(false);
            }
        }

        if (validate()) {

            setMemberId("");
            setUserName("");
            setEmail("");
            setJoiningDate("");
            setMobileNo("");
            setAddress("");
            setFile("");
            setErrors({});
        }

        if (userName && memberId && email && address && file && mobileNo) {
            const payload = {
                user_name: userName,
                email_id: email,
                mobile_no: mobileNo,
                joining_date: joiningDate,
                address: address,
                file: file
            };
            dispatch({
                type: 'MEMBERINFO',
                payload: payload
            });
            setIsOpen(false);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-lg relative">
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <h2 className="text-xl font-semibold">
                        {memberData ? "Edit Member" : "Add a Member"}
                    </h2>
                    <button className="text-gray-600" onClick={() => setIsOpen(false)}>
                        <MdClose size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2 mt-2">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">Member ID</label>
                            <input data-testid='input-member-id' type="text" className="w-full p-2 h-10 border rounded-lg" value={formData.memberId} onChange={(e) => handleChange("memberId", e.target.value)} />
                            {errors.memberId && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.memberId}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">User Name</label>
                            <input data-testid='input-user-name' type="text" className="w-full p-2 h-10 border rounded-lg"
                                value={formData.userName}
                                onChange={(e) => handleChange("userName", e.target.value)} />
                            {errors.userName && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.userName}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">Email</label>
                            <input data-testid='input-member-email' type="email" className="w-full p-2 h-10 border rounded-lg"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)} />
                            {errors.email && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.email}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">Mobile No.</label>
                            <input data-testid='input-member-phone' type="text" className="w-full p-2 h-10 border rounded-lg"  value={formData.mobileNo}onChange={(e) => handleChange("mobileNo", e.target.value)} />
                            {errors.mobileNo && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.mobileNo}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-start text-sm font-medium mb-1">Joining Date</label>
                        <input data-testid='input-joining-data' type="date" className=" w-56 p-2 h-10 border rounded-lg" value={joiningDate} onChange={(e) => handleChange("joiningDate", e.target.value)} />
                        {errors.joiningDate && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.joiningDate}</p>}
                    </div>

                    <div>
                        <label className="block text-start text-sm font-medium mb-1">Address</label>
                        <textarea data-testid='input-member-address' className="w-full p-2 border rounded-lg h-10"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)} />
                        {errors.address && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.address}</p>}
                    </div>
                    <div>
                        <label className="block text-start text-sm font-medium mb-1">Add Documents</label>
                        <div className="border rounded px-2 py-4 flex items-center justify-center relative w-28">
                            <input type="file" className="absolute inset-0 opacity-0 w-full h-full" onChange={handleFileChange} />
                            {file ? <img src={file} alt="Selected" /> : <AiOutlinePlus size={20} />}
                        </div>
                    </div>
                    {noChanges && <p className="text-red-500 text-sm text-center">No changes detected</p>}

                    <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">  {memberData ? "Save Changes" : "Add Member"}</button>
                </form>
            </div>
        </div>
    );
}

const mapsToProps = (stateInfo) => {
    return {
        state: stateInfo
    }
}
AddMemberModal.propTypes = {
      memberData: PropTypes.object, state :PropTypes.object
    };

export default connect(mapsToProps)(AddMemberModal);
