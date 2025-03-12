/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Logout from "../Asset/Icons/turn-off.png";
import PropTypes from 'prop-types';
import { encryptData } from "../Crypto/Utils";
import { useDispatch, connect } from 'react-redux';
import { MdError } from 'react-icons/md';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";



const ProfileDetails = ({ state }) => {


    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("editProfile");
    const [logoutFormShow, setLogoutFormShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        firstName: 'Vikram',
        lastName: 'Kumar',
        email: 'vikramkumar@gmail.com',
        mobile: '+91 9876543210',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    useEffect(() => {
        dispatch({ type: 'PROFILEDETAILS' });
    }, []);

    const validate = () => {
        let tempErrors = { ...errors };
        let isValid = true;

        if (!formData.firstName) {
            tempErrors.firstName = 'First name is required.';
            isValid = false;
        } else {
            tempErrors.firstName = '';
        }

        if (!formData.lastName) {
            tempErrors.lastName = 'Last name is required.';
            isValid = false;
        } else {
            tempErrors.lastName = '';
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            tempErrors.email = 'Please enter a valid email address.';
            isValid = false;
        } else {
            tempErrors.email = '';
        }

        const mobilePattern = /^[+]{1}[0-9]{1,3}[ ]{1}[0-9]{10}$/;
        if (!formData.mobile || !mobilePattern.test(formData.mobile)) {
            tempErrors.mobile = 'Please enter a valid mobile number.';
            isValid = false;
        } else {
            tempErrors.mobile = '';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch({ type: 'PROFILE_DETAILS_LIST' });

        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleUpdateClick = () => {
        document.getElementById('image-upload').click();
    };

    const handleLogout = () => {
        setLogoutFormShow(true);
    }

    const handleCloseLogout = () => setLogoutFormShow(false);

    const handleConfirmLogout = () => {
        dispatch({ type: 'LOGOUT' });
        const encryptDataLogin = encryptData(JSON.stringify(false));
        localStorage.setItem("unity_connect_login", encryptDataLogin.toString());
        setLogoutFormShow(false);
    }

    return (
        <div className="min-h-screen bg-white p-4 flex flex-col items-start">
            <p className="font-Gilroy font-semibold text-2xl leading-none tracking-normal mb-6">Account settings</p>

            <div className="flex items-center gap-6">
                <img
                    src={selectedImage || state.Profile}
                    alt="Profile"
                    className="w-[120px] h-[120px] rounded-full"
                />

                <div className="flex flex-col text-start">
                    <p className="font-Gilroy font-semibold text-xl tracking-normal mb-2">
                        {state.First_Name + " " + state.Last_Name}
                    </p>
                    <p className="font-Gilroy font-medium text-xs tracking-normal text-gray-500">
                        JPG or PNG up to 5MB
                    </p>
                    <button
                        className="text-purple-600 mt-2 text-start font-Gilroy font-semibold text-base"
                        onClick={handleUpdateClick}
                    >
                        Update image
                    </button>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className="border-b mb-4 mt-4 w-full mb-4">
                <button
                    className={`font-Gilroy font-semibold text-base pb-2 mr-6 ${activeTab === "editProfile"
                        ? "text-purple-600 border-b-2 border-purple-600 px-4"
                        : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("editProfile")}
                >
                    Edit Profile
                </button>
                <button
                    className={`font-Gilroy font-semibold text-base pb-2 ${activeTab === "accountSettings"
                        ? "text-purple-600 border-b-2 border-purple-600 px-4"
                        : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("accountSettings")}
                >
                    Account Settings
                </button>
            </div>

            {activeTab === "editProfile" && (
                <>
                    <h3 className="font-Gilroy font-semibold text-lg mb-4">Profile details</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6 w-full max-w-2xl">
                        <div>
                            <label className="block font-Gilroy text-sm mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={state.First_Name}

                                onChange={handleChange}
                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1" />
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-Gilroy text-sm mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={state.Last_Name}
                                onChange={handleChange}
                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1" />
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-Gilroy text-sm mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={state.
                                    Email_Id
                                }
                                onChange={handleChange}
                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1" />
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-Gilroy text-sm mb-2">Mobile number</label>
                            <input
                                type="text"
                                name="mobile"
                                value={state.Mobile_No}
                                onChange={handleChange}
                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-sm"
                            />
                            {errors.mobile && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1" />
                                    {errors.mobile}
                                </p>
                            )}
                        </div>
                    </form>
                    <button className="bg-black text-white font-Gilroy font-medium text-base py-2 px-4 rounded-3xl mb-6"
                        onClick={handleSubmit}
                    >Save changes</button>
                </>
            )}

            {activeTab === "accountSettings" && (
                <>
                    <h3 className="font-Gilroy font-semibold text-lg mb-5">Account Settings</h3>
                    <form className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6 w-full max-w-2xl">
                        <div>
                            <label className="block font-Gilroy text-sm mb-2">Current Password</label>
                            <div className="relative">
                                <input
                                    className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md pr-10"
                                    data-testid="input-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={currentPassword}
                                    onChange={handleCurrentPasswordChange}
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeIcon className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block font-Gilroy text-sm mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md pr-10"
                                    data-testid="input-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeIcon className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                </span>
                            </div>
                        </div>
                    </form>
                    <button className="bg-black text-white font-Gilroy font-medium text-base py-2 px-4 rounded-3xl mb-6"
                        onClick={handleSubmit}
                    >Save changes</button>
                </>
            )}

            <button onClick={handleLogout} className="flex items-center text-rose-500 w-5 h-6 gap-2">
                <img
                    src={Logout}
                    alt="Logout Icon"
                    data-testid="img-logout"
                    className="text-rose-500"
                    style={{
                        filter: 'invert(10%) sepia(100%) saturate(500%) hue-rotate(-50deg)',
                    }}
                />
                <span className="text-rose-500">Logout</span>
            </button>

            {/* Logout confirmation modal */}
            <div className={`fixed inset-0 flex items-center justify-center ${logoutFormShow ? "visible" : "hidden"} bg-black bg-opacity-50`}>
                <div className="bg-white rounded-lg shadow-lg w-[388px] h-[200px] p-6">
                    <div className="flex justify-center border-b-0">
                        <h2 className="text-[18px] font-semibold text-[#222222] text-center flex-1">
                            Logout?
                        </h2>
                    </div>

                    <div className="text-center text-[14px] text-[#646464] font-medium mt-[20px]">
                        Are you sure you want to Logout?
                    </div>

                    <div className="flex justify-center border-t-0 mt-[10px] space-x-4">
                        <button
                            data-testid='button-close-logout'
                            className="w-[160px] h-[52px] rounded-lg border border-[#7F00FF] text-[#7F00FF] font-semibold text-[14px] bg-white"
                            onClick={handleCloseLogout}
                        >
                            Cancel
                        </button>
                        <button
                            data-testid='button-logout'
                            className="w-[160px] h-[52px] rounded-lg bg-[#7F00FF] text-white font-semibold text-[14px]"
                            onClick={handleConfirmLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapsToProps = (stateInfo) => {
    return {
        state: stateInfo.SignIn.profileDetailsList

    }
}
ProfileDetails.propTypes = {
    state: PropTypes.object,
};
export default connect(mapsToProps)(ProfileDetails)


// export default ProfileDetails;

