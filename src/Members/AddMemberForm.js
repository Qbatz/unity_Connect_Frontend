import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

function AddMemberForm() {
    const [isOpen, setIsOpen] = useState(true);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);

    const validateForm = (data) => {
        let newErrors = {};
        if (!data.memberId) newErrors.memberId = "Member ID is required";
        if (!data.userName) newErrors.userName = "User Name is required";
        if (!data.email) newErrors.email = "Email Address is required";
        if (!data.joiningDate) newErrors.joiningDate = "Joining Date is required";
        if (!data.mobile) newErrors.mobile = "Mobile No. is required";
        if (!data.subscriber) newErrors.subscriber = "Subscriber status is required";
        if (!data.address) newErrors.address = "Address is required";
        if (!file) newErrors.file = "Document upload is required";
        return newErrors;
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            memberId: event.target.memberId.value,
            userName: event.target.userName.value,
            email: event.target.email.value,
            joiningDate: event.target.joiningDate.value,
            mobile: event.target.mobile.value,
            subscriber: event.target.subscriber.value,
            address: event.target.address.value,
        };
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Member added successfully");
            setErrors({});
        }
    };

    if (!isOpen) return null;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 overflow-hidden">
            <div className="relative bg-white rounded-3xl shadow-lg p-5 w-full max-w-sm md:max-w-md lg:max-w-lg h-auto">
                <div className="flex justify-between items-center mb-5 border-b border-gray-300 pb-2">
                    <h2 className="text-lg font-semibold text-start mt-0">Add a member</h2>
                    <button className="text-gray-500 hover:text-black text-2xl ml-2" onClick={() => setIsOpen(false)}>
                        <IoCloseCircle className="w-6 h-6" />
                    </button>
                </div>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-start mb-2">Member ID <span className="text-red-500">*</span></label>
                            <input name="memberId" type="text" placeholder="Enter member ID" className="border p-2 rounded-lg w-full text-sm" />
                            {errors.memberId && <p className="text-red-500 text-xs flex items-center mt-1"><MdError className="mr-1" />{errors.memberId}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-start mb-2">User Name <span className="text-red-500">*</span></label>
                            <input name="userName" type="text" placeholder="Enter user name" className="border p-2 rounded-lg w-full text-sm" />
                            {errors.userName && <p className="text-red-500 text-xs flex items-center mt-1"><MdError className="mr-1" />{errors.userName}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-start mb-2">Email Address <span className="text-red-500">*</span></label>
                            <input name="email" type="email" placeholder="email@gmail.com" className="border p-2 rounded-lg w-full text-sm" />
                            {errors.email && <p className="text-red-500 text-xs flex items-center mt-1"><MdError className="mr-1" />{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-start mb-2">Joining Date <span className="text-red-500">*</span></label>
                            <input name="joiningDate" type="date" className="border p-2 rounded-lg w-full text-sm" />
                            {errors.joiningDate && <p className="text-red-500 text-xs flex items-center mt-1"><MdError className="mr-1" />{errors.joiningDate}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-start mb-2">Mobile No. <span className="text-red-500">*</span></label>
                            <input name="mobile" type="text" placeholder="Mobile No." className="border p-2 rounded-lg w-full text-sm" />
                            {errors.mobile && <p className="text-red-500 text-xs flex items-center mt-1"><MdError className="mr-1" />{errors.mobile}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-start mb-2">Subscriber <span className="text-red-500">*</span></label>
                            <select name="subscriber" className="border p-2 rounded-lg w-full text-sm">
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.subscriber && <p className="text-red-500 text-xs flex items-center mt-1"><MdError className="mr-1" />{errors.subscriber}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-start mb-2">Address <span className="text-red-500">*</span></label>
                        <input name="address" type="text" placeholder="Enter address" className="border p-2 rounded-lg w-full text-sm" />
                        {errors.address && <p className="text-red-500 text-xs flex items-center mt-1"><MdError className="mr-1" />{errors.address}</p>}
                    </div>
                  
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-start mb-2">
                            Document Upload <span className="text-red-500">*</span>
                        </label>
                        <div className="border p-2 rounded-lg w-16 h-16 flex justify-center items-center cursor-pointer">
                            <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
                            <label htmlFor="fileUpload" className="w-full h-full flex justify-center items-center cursor-pointer">
                                <FiPlus className="text-gray-500 w-7 h-7" />
                            </label>
                        </div>
                        <p className="text-gray-500 text-xs text-start mt-1 mb-4">
                            Note: File should be .JPG, .PDF, .PNG (max 2MB)
                        </p>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-2 rounded-3xl mt-3">Add member</button>
                </form>
            </div>
        </div>
    );
}

export default AddMemberForm;

