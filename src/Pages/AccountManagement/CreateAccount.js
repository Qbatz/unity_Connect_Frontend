/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Create1 from '../../Asset/Images/Createtleft.svg';
import Create2 from '../../Asset/Images/Createright.svg';
import Unityicon from '../../Asset/Icons/Unityicon.svg';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi2";
import { RiEyeOffLine } from "react-icons/ri";
import { MdError } from "react-icons/md";

function CreateAccount({ state }) {




  const dispatch = useDispatch()
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('')
  const [passwordErrors, setPasswordErrors] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [bothPasswordError, setBothPasswordError] = useState('')


  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bothPassword: '',
    all: ''
  });



  useEffect(() => {
    validateForm();
  }, [firstName, email, mobileNumber, password, confirmPassword]);

  useEffect(() => {
    if (state.CreateAccount.statusCodeCreateAccount === 200) {

      setFirstName('');
      setLastName('');
      setMobileNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setErrors("");


      dispatch({ type: 'CLEAR_STATUS_CODE_CREATE_ACCOUNT' });
      dispatch({ type: 'CLEAR_EMAIL_ERROR' })
      navigate('/sign-in');
    }
  }, [state.CreateAccount.statusCodeCreateAccount]);

  const handleLoginPage = () => {
    navigate('/sign-in')
  }


  const isFormValid = firstName && email && mobileNumber && password && confirmPassword && Object.keys(errors).length === 0;

  ;
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFirstName(value.trim());
      setErrors((prev) => ({ ...prev, firstName: "" }));
      setFirstNameError('');
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setLastName(value.trim());
      setErrors((prev) => ({ ...prev, lastName: "" }));
      setLastNameError('');
    }
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value.trim();
    setPassword(newPassword);
    setErrors((prev) => ({ ...prev, password: "" }));
    setPasswordErrors('')
    if (newPassword.length > 0) {
      const errors = validatePassword(newPassword);
      if (errors.length > 0) {
        setPasswordErrors(errors.join(', '));
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value.trim();
    setConfirmPassword(newConfirmPassword);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));

    setConfirmPasswordError('');
    setBothPasswordError('');

    if (isSubmitted && !newConfirmPassword) {
      setConfirmPasswordError('Please enter confirm password');
    }

    if (password && newConfirmPassword && password !== newConfirmPassword) {
      setBothPasswordError('Passwords do not match');
    }

    dispatch({ type: 'CLEAR_PASSWORD_DOESNT_ERROR' });
  };

  const validatePassword = (password) => {
    let errorMessages = [];

    if (/\s/.test(password)) {
      errorMessages.push('Password cannot contain spaces.');
    }
    if (password.length < 8) {
      errorMessages.push('8 characters minimum');
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errorMessages.push('One uppercase and lowercase letter required');
    }
    if (!/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
      errorMessages.push('At least one numeric and one special symbol required');
    }

    return errorMessages;
  };


  const validateForm = () => {
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/i;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password do not match";
    }

    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  
   
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordErrors('');
    setConfirmPasswordError('');
    setBothPasswordError('');
  
    let isValid = true; 
  
   
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
  
    const phonePattern = /^\d{10}$/;
    const isValidMobileNo = phonePattern.test(mobileNumber);
  
    if (!mobileNumber) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!isValidMobileNo) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    }
  
    const passwordValidationErrors = validatePassword(password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors.join(', '));
      isValid = false;
    }
  
    if (!password) {
      setPasswordErrors('Password is required');
      isValid = false;
    }
  
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (password !== confirmPassword) {
      setBothPasswordError('Passwords do not match');
      isValid = false;
    }
  
    if (!firstName) {
      setFirstNameError('First name is required');
      isValid = false;
    }
  
    
    if (!isValid) {
      return;
    }
  
    
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone: mobileNumber,
      email_id: email,
      password: password
    };
  
    dispatch({
      type: 'CREATE_ACCOUNT',
      payload: payload
    });
  };
  
  const handleMobileNumberChange = (e) => {
    dispatch({ type: 'CLEAR_MOBILE_ERROR' });
    dispatch({ type: 'CLEAR_EMAIL_MOBILE_ERROR' });
    setPhoneError('');
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
    setErrors((prev) => ({ ...prev, mobileNumber: "" }));
  };

  const handleEmailChange = (e) => {

    dispatch({ type: 'CLEAR_EMAIL_ERROR' });
    dispatch({ type: 'CLEAR_MOBILE_ERROR' });
    setEmailError('');
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Enter a valid email address." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  return (
    <div data-testid='create-account' className="w-full font-gilroy bg-white px-4 py-2 lg:px-14 md:px-16 mt-4 overflow-hidden h-auto">
      <div className="grid grid-cols-1 md:grid-cols-2  w-full">

        <div className="space-y-5 w-full">
          <img src={Unityicon} alt="Unity Icon" />
          <h1 className="text-3xl font-semibold text-gray-900 font-Gilroy">Create your free account</h1>
          <p className="text-gray-600 text-base font-Gilroy">Enter your details below and step into a world where growth is limitless.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block font-Gilroy text-sm font-medium mb-2">First Name  <span className="text-red-500 text-xl"></span></label>
              <input type="text" data-testid='input-fname' placeholder="First name" className="w-full p-3 border border-gray-300 rounded-xl font-Gilroy"
                value={firstName}
                onChange={handleFirstNameChange}
              />

              {isSubmitted && firstNameError &&

                <div className="flex items-center text-red-500 text-xs mt-1">
                  <MdError className="mr-1 text-base text-xs" />
                  <span data-testid='fname-error' className="font-Gilroy text-xs">{firstNameError}</span>
                </div>
              }
            </div>

            <div className="w-full">
              <label className="block font-Gilroy text-sm font-medium mb-2">Last Name <span className="text-red-500 text-xl"></span></label>
              <input type="text" data-testid='input-lname' placeholder="Last name" className="w-full p-3 border border-gray-300 rounded-xl font-Gilroy"
                value={lastName} onChange={handleLastNameChange}
              />
              {isSubmitted && lastNameError &&
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <MdError className="mr-1 text-sm" />
                  <span className="font-Gilroy" >{lastNameError}</span>
                </div>
              }
            </div>

            <div className="w-full">
              <label className="block font-Gilroy text-sm font-medium mb-2">Email ID  <span className="text-red-500 text-xl"></span></label>
              <input data-testid='input-email'
                autoComplete='new-email'
                autoCorrect='off'
                type="email" placeholder="Email address" className="w-full p-3 border border-gray-300 rounded-xl font-Gilroy"
                value={email} onChange={handleEmailChange}
              />
              {state.CreateAccount.emailError === "Email Id Already Exists" && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <MdError className="mr-1 text-xs" />
                  <p data-testid='mobile-error' className="text-red-500 text-xs mt-1 font-Gilroy">{state.CreateAccount.emailError}</p>
                </div>
              )}
              {isSubmitted && emailError &&
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <MdError className="mr-1 text-xs" />
                  <p data-testid='email-error' className="text-red-500 text-xs font-Gilroy">
                    {emailError}</p>
                </div>
              }
            </div>

            <div className="w-full">
              <label className="block font-Gilroy text-sm font-medium mb-2">Mobile number  <span className="text-red-500 text-xl"></span></label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-white p-3 w-full">
                <select className="outline-none bg-transparent mr-2">
                  <option>+91</option>
                </select>
                <input
                  type="text"
                  data-testid='input-mobile'
                  className="flex-1 outline-none bg-transparent font-Gilroy"
                  placeholder="9876543210"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  disabled={false}
                />
              </div>
              {state.CreateAccount.emailError === "Mobile Number Already Exists" && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <MdError className="mr-1 text-xs" />
                  <p data-testid='mobile_error' className="text-red-500 text-xs mt-1 font-Gilroy">{state.CreateAccount.emailError}</p>
                </div>
              )}
              {isSubmitted && phoneError &&
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <MdError className="mr-1 text-xs" />
                  <p className="text-red-500 text-xs font-Gilroy">
                    {phoneError}</p>
                </div>
              }
            </div>


            <div>
              <label className="font-Gilroy font-medium text-sm leading-4 mt-2">
                Password  <span className="text-red-500 text-xl"></span>
              </label>
              <div className="relative">
                <input
                  data-testid='input-password'
                  autoComplete='new-password'
                  autoCorrect='off'
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border py-3 px-3 w-full mt-1  border-gray-300 rounded-xl  font-Gilroy font-medium text-base leading-6 tracking-normal pr-10"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  data-testid='button-show-password'
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >

                  {showPassword ? (
                    <HiOutlineEye size="20" color="#292D32" />
                  ) : (
                    <RiEyeOffLine size="20" color="#292D32" />
                  )}
                </button>
              </div>
              <div >
                {isSubmitted && passwordErrors &&
                  <div className="flex items-center text-red-500 text-xs mt-1">
                    <MdError className="mr-1 text-xs" />
                    <p className="text-red-500 text-xs font-Gilroy">
                      {passwordErrors}</p>
                  </div>
                }
              </div>
              <div>

              </div>

            </div>

            <div className="w-full">
              <label className="block font-Gilroy text-sm font-medium mb-2">Confirm Password  <span className="text-red-500 text-xl"></span></label>
              <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-white">
                <input data-testid='con-password' type={showConfirmPassword ? "text" : "password"} className="flex-1 w-full pr-1  outline-none bg-transparent text-gray-900 font-Gilroy"
                  placeholder="Confirm your password" value={confirmPassword} onChange={handleConfirmPasswordChange}
                />
                <button data-testid='show-confirm-password' type="button" className="ml-2 focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <HiOutlineEye size="20" color="#292D32" /> : <RiEyeOffLine size="20" color="#292D32" />}
                </button>
              </div>
              {isSubmitted && confirmPasswordError &&
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <MdError className="mr-1 text-xs" />
                  <p className="text-red-500 text-xs font-Gilroy">{confirmPasswordError}</p>
                </div>
              }
              {isSubmitted && bothPasswordError &&
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <MdError className="mr-1 text-xs" />
                  <p className="text-red-500 text-xs font-Gilroy">{bothPasswordError}</p>
                </div>
              }

            </div>
          </div>

          <button
            data-testid='button-submit'
            className={`w-full font-Gilroy text-white text-lg py-3 rounded-full transition-all duration-300 ${isFormValid ? 'bg-black' : 'bg-gray-400'}`}
            onClick={handleSubmit}
          >
            Create account
          </button>

          <div className="mt-1">
            <label className="font-Gilroy text-base font-normal " >Already have an account?<span data-testid='login-page' onClick={handleLoginPage} className="ms-2 create-account-hover font-Gilroy text-base font-semibold" style={{ color: "rgba(30, 69, 225, 1)", cursor: "pointer" }}>Sign in</span> </label>
          </div>
        </div>


        <div className="flex flex-col items-center  gap-0">
          <img src={Create1} className="w-full h-[330px] block" alt="Illustration 1" />
          <img
            src={Create2}
            className="w-full h-[300px] block ml-[206px] -mt-[25px]"
            alt="Illustration 2"
          />
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

CreateAccount.propTypes = {
  state: PropTypes.object,
};
export default connect(mapsToProps)(CreateAccount)