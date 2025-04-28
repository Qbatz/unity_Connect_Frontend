/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import logoutIcon from "../Asset/Icons/logoutIcon.svg";
import PropTypes from 'prop-types';
import { encryptData } from "../Crypto/Utils";
import { useDispatch, connect } from 'react-redux';
import { MdError } from 'react-icons/md';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";


const ProfileDetails = ({ state }) => {

    const profileDetailsUpdateErrorMessage = useSelector(
        (state) => state.SignIn.profileDetailsUpdateErrorMessage
    );


    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("editProfile");
    const [logoutFormShow, setLogoutFormShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        id: 0
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
    });


    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setNewShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [noChangesMessage, setNoChangesMessage] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({
        currentPassword: '',
        newPassword: '',
        bothPassword: '',
    });
    const [mailError, setMailError] = useState("")


    useEffect(() => {
        dispatch({ type: 'PROFILEDETAILS' });
    }, []);

    useEffect(() => {
        setNoChangesMessage("");
        setPasswordErrors("")
    }, [activeTab]);

    useEffect(() => {
        if (profileDetailsUpdateErrorMessage) {
      
          setMailError(profileDetailsUpdateErrorMessage);
          
       
        }
      }, [profileDetailsUpdateErrorMessage, dispatch]);
   

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            firstName: state.First_Name || "",
            lastName: state.Last_Name || "",
            email: state.Email_Id || "",
            mobileNo: state.Mobile_No || "",
        }));

        setSelectedImage(state.Profile || null);
    }, [state]);


    const validate = () => {
        let tempErrors = { ...errors };
        let isValid = true;

        if (!formData.firstName) {
            tempErrors.firstName = 'First name is required';
            isValid = false;
        } else {
            tempErrors.firstName = '';
        }

        if (!formData.lastName) {
            tempErrors.lastName = 'Last name is required';
            isValid = false;
        } else {
            tempErrors.lastName = '';
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            tempErrors.email = 'Please enter a valid email address';
            isValid = false;
        } else {
            tempErrors.email = '';
        }

        const mobileNoPattern = /^[0-9]{10}$/;
        if (!formData.mobileNo || !mobileNoPattern.test(formData.mobileNo)) {
            tempErrors.mobileNo = 'Please enter a valid 10-digit mobile number';
            isValid = false;
        } else {
            tempErrors.mobileNo = '';
        }

        setErrors(tempErrors);
        return isValid;
    };


    const validatePasswords = () => {
        let tempErrors = { ...passwordErrors };
        let isValid = true;

        if (!currentPassword) {
            tempErrors.currentPassword = 'Current password is required';
            isValid = false;
        } else {
            tempErrors.currentPassword = '';
        }

        if (!newPassword) {
            tempErrors.newPassword = 'New password is required';
            isValid = false;
        } else {
            tempErrors.newPassword = '';
        }

        if (newPassword === currentPassword) {
            tempErrors.bothPassword = 'New password cannot be the same as the current password';
            isValid = false;
        } else {
            tempErrors.bothPassword = '';
        }

        setPasswordErrors(tempErrors);
        return isValid;
    };





    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === "firstName" || name === "lastName") && !/^[a-zA-Z\s]*$/.test(value)) {
            return;
        }
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
        setNoChangesMessage('')
        setMailError('')
        dispatch({ type: 'CLEAR_PROFILE_DETAILS_UPDATE_ERROR' });

    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const EditPayload = {
            id: state.Id,
            first_name: formData.firstName || state.First_Name,
            last_name: formData.lastName || state.Last_Name,
            email_id: formData.email || state.Email_Id,
            mobile_no: formData.mobileNo || state.Mobile_No,
            file: selectedImage || state.Profile,
            profile_URL: state.Profile,
        };

        const noFieldChanged =
            EditPayload.first_name === state.First_Name &&
            EditPayload.last_name === state.Last_Name &&
            EditPayload.email_id === state.Email_Id &&
            EditPayload.mobile_no === state.Mobile_No &&

            (
                (state.Profile ? typeof selectedImage !== 'object' : !selectedImage)
            );


        if (noFieldChanged) {
            setNoChangesMessage("No changes detected");
            return;
        }

        dispatch({ type: 'PROFILEDETAILSUPDATE', payload: EditPayload });
        setNoChangesMessage('');


    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    useEffect(() => {
        setSelectedImage(state.Profile || null);
    }, [state]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setNewShowPassword(!showNewPassword);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (validatePasswords()) {
            const PasswordPayload = {
                old_password: currentPassword,
                new_password: newPassword,
            };
            dispatch({ type: 'UPDATEPASSWORD', payload: PasswordPayload });
        }
        setCurrentPassword("")
        setNewPassword("")

    };

    const handleCurrentPasswordChange = (e) => {
        const newCurrentPassword = e.target.value.trim();
        setCurrentPassword(newCurrentPassword);
        setPasswordErrors((prev) => ({ ...prev, currentPassword: "", bothPassword: "" }));

    };

    const handleNewPasswordChange = (e) => {
        const newPasswordValue = e.target.value.trim();
        setNewPassword(newPasswordValue);
        setPasswordErrors((prev) => ({ ...prev, newPassword: "", bothPassword: "" }));

        if (!newPasswordValue) {
            setPasswordErrors((prev) => ({ ...prev, newPassword: 'New password is required.' }));
        }
    };


    const handleUpdateClick = () => {
        document.getElementById('image-upload').click();
        setNoChangesMessage('')
    };

    const handleLogout = () => {
        setLogoutFormShow(true);
    }

    const handleCloseLogout = () => setLogoutFormShow(false);

    const handleConfirmLogout = () => {
        dispatch({ type: 'LOGOUT' });
        dispatch({ type: 'CLEAR_STATUS_CODE_MEMBER_LIST' });

        const encryptDataLogin = encryptData(JSON.stringify(false));
        localStorage.setItem("unity_connect_login", encryptDataLogin.toString());
        setLogoutFormShow(false);


    }


    return (
        <div className=" bg-white p-4 flex flex-col items-start">
            <p className="font-Gilroy font-semibold text-2xl leading-none tracking-normal mb-6 -mt-5 ml-5">Account settings</p>

            <div className="flex items-center gap-6  w-full">

                <div className="w-[120px] h-[120px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">

                    {selectedImage ? (
                        typeof selectedImage === 'object' ? (
                            <img src={URL.createObjectURL(selectedImage)} alt="Profile Preview" />
                        ) : (
                            <img src={selectedImage} alt="Profile Preview" />
                        )
                    ) : (
                        <FaUser className="text-gray-400 w-12 h-12" />
                    )}

                </div>



                <div className="flex flex-col text-start">

                    <p className="font-Gilroy font-semibold text-xl tracking-normal mb-2 whitespace-nowrap">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 w-full max-w-2xl">
                        <div>
                            <label className="block font-Gilroy text-sm mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
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
                                value={formData.lastName}
                                onChange={handleChange}
                                className="font-Gilroy font-medium text-sm border rounded-xl p-3 w-full max-w-md"
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
                                value={formData.email}
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
                                type="tel"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, "");
                                    if (!value.startsWith("91")) {
                                        value = "+ 91" + value;
                                    }
                                    if (value.length <= 12) {
                                        handleChange({ target: { name: "mobileNo", value: `+${value}` } });
                                    }
                                }}
                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-sm"
                            />


                            {errors.mobileNo && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1" />
                                    {errors.mobileNo}
                                </p>
                            )}
                        </div>
                    </div>
                    {noChangesMessage && (
                        <div className="flex items-center text-red-500 text-xs mb-4 font-Gilroy">
                            <MdError className="mr-1" />
                            {noChangesMessage}
                        </div>
                    )}
                    {mailError && (
                        <div className="flex items-center text-red-500 text-xs mb-4 font-Gilroy">
                            <MdError className="mr-1" />
                            {mailError}
                        </div>
                    )}
                    <button className="bg-black text-white font-Gilroy font-medium text-base py-2 px-4 rounded-3xl mb-6"
                        onClick={handleSubmit}
                    >Save changes</button>
                </>
            )}

            {activeTab === "accountSettings" && (
                <>
                    <h3 className="font-Gilroy font-semibold text-lg mb-5">Account Settings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 w-full max-w-2xl">
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
                            {passwordErrors.currentPassword && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1" />
                                    {passwordErrors.currentPassword}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-Gilroy text-sm mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md pr-10"
                                    data-testid="input-password"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={toggleNewPasswordVisibility}
                                >
                                    {showNewPassword ? (
                                        <EyeIcon className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                </span>
                            </div>
                            {passwordErrors.newPassword && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1" />
                                    {passwordErrors.newPassword}
                                </p>
                            )}
                            {passwordErrors.bothPassword && (
                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                    <MdError className="mr-1 text-sm mb-4i]'
                                    " />
                                    {passwordErrors.bothPassword}
                                </p>
                            )}
                        </div>
                    </div>
                    <button className="bg-black text-white font-Gilroy font-medium text-base py-2 px-4 rounded-3xl mb-6"
                        onClick={handlePasswordSubmit}
                    >Save changes</button>
                </>
            )}

            <div className={`relative flex flex-col ${activeTab === "editProfile" ? "top-0" : "top-20"}`}>

                <button onClick={handleLogout} className="absolute top-6 flex items-center text-rose-500 w-5 h-6 gap-2">
                    <img
                        src={logoutIcon}
                        alt="Logout Icon"
                        data-testid="img-logout"
                    />
                    <span className="text-[#EC202A] font-medium text-base font-Gilroy">Logout</span>
                </button>
            </div>

            <div className={`fixed inset-0 flex items-center justify-center ${logoutFormShow ? "visible" : "hidden"} bg-black bg-opacity-50`}>
                <div className="bg-white rounded-lg shadow-lg w-[388px] h-[200px] p-6">
                    <div className="flex justify-center border-b-0">
                        <h2 className="text-[18px] font-semibold text-[#222222] text-center flex-1 font-Gilroy">
                            Logout?
                        </h2>
                    </div>

                    <div className="text-center text-[16px] text-[#646464] font-medium mt-[18px] mb-4 font-Gilroy">
                        Are you sure you want to Logout?
                    </div>

                    <div className="flex justify-center border-t-0 mt-[10px] space-x-4">
                        <button
                            data-testid='button-close-logout'
                            className="w-[160px] h-[52px]font-Gilroy rounded-lg border border-[#7F00FF] text-[#7F00FF] font-semibold text-[16px] bg-white"
                            onClick={handleCloseLogout}
                        >
                            Cancel
                        </button>
                        <button
                            data-testid='button-logout'
                            className="w-[160px] h-[52px] font-Gilroy rounded-lg bg-[#7F00FF] text-white font-semibold text-[16px]"
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



