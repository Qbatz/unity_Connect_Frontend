/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { MdClose, MdError } from "react-icons/md";
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


function AddMemberModal({ state }) {


    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(true);
    const [memberId, setMemberId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
    const [file, setFile]= useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (state.addMember.statusCodeForAddUser === 200) {
           
            setFile("");
            setMemberId("");
            setUserName("");
            setEmail("");
            setJoiningDate("");
            setMobileNo("");
            setAddress("");
            setErrors("");

            dispatch({ type: 'CLEAR_STATUS_CODES' });
        }
    }, [state.addMember.statusCodeForAddUser]);

    const validate = () => {
        let tempErrors = {};
        if (!memberId) tempErrors.memberId = "Member ID is required";
        if (!userName) tempErrors.userName = "User Name is required";
        if (!email) tempErrors.email = "Email is required";
        if (!joiningDate) tempErrors.joiningDate = "Joining Date is required";
        if (!mobileNo) {
            tempErrors.mobileNo = "Mobile No. is required";
        } else if (!/^\d{10}$/.test(mobileNo)) {
            tempErrors.mobileNo = "Mobile No. must be 10 digits";
        }

        if (!address) tempErrors.address = "Address is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (field, value) => {
        if (field === "memberId") setMemberId(value);
        if (field === "userName") setUserName(value);
        if (field === "email") setEmail(value);
        if (field === "joiningDate") setJoiningDate(value);
        if (field === "mobileNo") setMobileNo(value);
        if (field === "address") setAddress(value);
        if (field === "file") setFile(value);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const files = e.target.files[0];
        if (files) {
            setFile(URL.createObjectURL(files));
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        if (validate()) {
            setFile("");
            setMemberId("");
            setUserName("");
            setEmail("");
            setJoiningDate("");
            setMobileNo("");
            setAddress("");
            setErrors({});

        }
        if (userName && memberId && email && address && file && mobileNo) {
            const payload = {
                user_name: userName,
                email_id: email,
                mobile_no: mobileNo,
                joining_date: joiningDate,
                address: address,
                file:file,
            };
            dispatch({ type: 'MEMBERINFO', payload: payload });
        }

    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-lg relative">
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <h2 className="text-xl font-semibold">Add a Member</h2>
                    <button data-testid='button-close' className="text-gray-600" onClick={() => setIsOpen(false)}>
                        <MdClose size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2 mt-2">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">Member ID</label>
                            <input type="text" className="w-full p-2 h-10 border rounded-lg" value={memberId} onChange={(e) => handleChange("memberId", e.target.value)} />
                            {errors.memberId && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.memberId}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">User Name</label>
                            <input type="text" className="w-full p-2 h-10 border rounded-lg" value={userName} onChange={(e) => handleChange("userName", e.target.value)} />
                            {errors.userName && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.userName}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">Email</label>
                            <input type="email" className="w-full p-2 h-10 border rounded-lg" value={email} onChange={(e) => handleChange("email", e.target.value)} />
                            {errors.email && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.email}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-start text-sm font-medium mb-1">Mobile No.</label>
                            <input type="text" className="w-full p-2 h-10 border rounded-lg" value={mobileNo} onChange={(e) => handleChange("mobileNo", e.target.value)} />
                            {errors.mobileNo && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.mobileNo}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-start text-sm font-medium mb-1">Joining Date</label>
                        <input type="date" className=" w-56 p-2 h-10 border rounded-lg" value={joiningDate} onChange={(e) => handleChange("joiningDate", e.target.value)} />
                        {errors.joiningDate && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.joiningDate}</p>}
                    </div>

                    <div>
                        <label className="block text-start text-sm font-medium mb-1">Address</label>
                        <textarea className="w-full p-2 border rounded-lg h-10" value={address} onChange={(e) => handleChange("address", e.target.value)} />
                        {errors.address && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.address}</p>}
                    </div>
                    <div>
                        <label className="block text-start text-sm font-medium mb-1">Add Documents</label>
                        <div className="border rounded px-2 py-4 flex items-center justify-center relative w-28">
                            <input type="file" className="absolute inset-0 opacity-0 w-full h-full" onChange={handleFileChange} />
                            {file ? <img src={file} alt="Selected" /> : <AiOutlinePlus size={20} />}
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">Add Member</button>
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
  state: PropTypes.object, 
};

export default connect(mapsToProps)(AddMemberModal);

