import React, { useState, useEffect } from "react";
import Create1 from '../../Images/Createtleft.svg';
import Create2 from '../../Images/Createright.svg';
import Unityicon from '../../Icons/Unityicon.svg'
import { Eye, EyeSlash } from "iconsax-react";

import { useDispatch, connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

function CreateAccount({state}) {


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
  const [lastNameError,setLastNameError] = useState();
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('')
  const [passwordErrors, setPasswordErrors] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [bothPasswordError, setBothPasswordError] = useState('')


  const [errors, setErrors] = useState({
    firstName: '',
    lastName :'',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bothPassword: '',
    all: ''
});



  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, mobileNumber, password, confirmPassword]);

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
        dispatch({type: 'CLEAR_EMAIL_ERROR'})
    }
}, [state.CreateAccount.statusCodeCreateAccount]);

const handleLoginPage = () => {
  navigate('/sign-in')
}
  

  const isFormValid = firstName && lastName && email && mobileNumber && password && confirmPassword && Object.keys(errors).length === 0;

 ;
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value.trim());
    setErrors((prev) => ({ ...prev, firstName: "" }));
    setFirstNameError('');
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value.trim());
    setErrors((prev) => ({ ...prev, lastName: "" }));
    setLastNameError('');
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


  const validateForm = () => {
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
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
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
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


const handleSubmit =  (e) => {
  e.preventDefault();
  setIsSubmitted(true);
  setFirstNameError('');
  setLastNameError('')
  setEmailError('');
  setPhoneError('');
  setPasswordErrors('');
  setConfirmPasswordError('');
  setBothPasswordError('');
  


  if (!firstName) {
      setFirstNameError('Please enter first name');
  }
  if (!lastName) {
    setLastNameError('Please enter last name');
}

  if (!email) {
    setEmailError('Please enter email id');
  } else if (!validateEmail(email)) {
    setEmailError('Please enter a valid email address');
  }

  if (!mobileNumber) {
      setPhoneError('Please enter mobile no.');
  }

  const phonePattern = /^\d{10}$/;
  const isValidMobileNo = phonePattern.test(mobileNumber);

  if (!isValidMobileNo) {
      setPhoneError('Please enter a valid 10-digit mobile number');
  }
  if (!password) {
    setPasswordErrors('Please enter a password');
    return;
}
  
  const passwordValidationErrors = validatePassword(password);
  if (passwordValidationErrors.length > 0) {
    setPasswordErrors(passwordValidationErrors.join(', '));
    return; 
  }

  if (!confirmPassword) {
    setConfirmPasswordError('Please enter confirm password');
    return;
}


  if (password !== confirmPassword) {
      setBothPasswordError('Passwords do not match');
      return;  
  }

  if (firstName && mobileNumber && lastName && email && password) {
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
  }


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
    <div data-testid='create-account' className="w-full font-gilroy bg-white px-4 md:px-16 mt-4 overflow-hidden h-auto">
      <div className="grid grid-cols-1 md:grid-cols-2  w-full">
        {/* Left Section - Form */}
        <div className="space-y-5 w-full">
          <img src={Unityicon} alt="Unity Icon" />
          <h1 className="text-3xl font-semibold text-gray-900 font-Gilroy">Create your free account</h1>
          <p className="text-gray-600 text-base font-Gilroy">Enter your details below and step into a world where growth is limitless.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input type="text" data-testid='input-fname' placeholder="First name" className="w-full p-3 border border-gray-300 rounded-xl"
                value={firstName} onChange={handleFirstNameChange}
              />
   
              {isSubmitted && firstNameError && <p data-testid='fname-error' className="text-red-500 text-sm">{firstNameError}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input type="text" data-testid='input-lname' placeholder="Last name" className="w-full p-3 border border-gray-300 rounded-xl"
                value={lastName} onChange={handleLastNameChange}
              />
              {isSubmitted && lastNameError && <p className="text-red-500 text-sm">{lastNameError}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Email ID</label>
              <input data-testid='input-email' type="email" placeholder="Email address" className="w-full p-3 border border-gray-300 rounded-xl"
                value={email} onChange={handleEmailChange}
              />
                         {state.CreateAccount.mobileError === "Email Id Already Exists" && (
    <p data-testid='mobile-error' className="text-red-500 text-sm mt-1">{state.CreateAccount.mobileError}</p>
  )}
              {isSubmitted && emailError && <p data-testid='email-error' className="text-red-500 text-sm">{emailError}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Mobile number</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-white p-3 w-full">
                <select className="outline-none bg-transparent mr-2">
                  <option>+91</option>
                </select>
                <input
                  type="text"
                  data-testid='input-mobile'
                  className="flex-1 outline-none bg-transparent"
                  placeholder="9876543210"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  disabled={false} 
                />
              </div>
                        {state.CreateAccount.email_mobile_Error === "Mobile Number Already Exists" && (
    <p data-testid='mobile_error' className="text-red-500 text-sm mt-1">{state.CreateAccount.email_mobile_Error}</p>
  )}
              {isSubmitted && phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-white p-3 w-full">
                <input data-testid='input-password' type={showPassword ? "text" : "password"} className="flex-1 outline-none bg-transparent text-gray-900"
                  placeholder="Enter your password" value={password} onChange={handlePasswordChange}
                />
                <button data-testid='button-show-password' type="button" className="ml-2 focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size="20" color="#292D32" /> : <EyeSlash size="20" color="#292D32" />}
                </button>
              </div>
              {isSubmitted && passwordErrors && <p className="text-red-500 text-sm">{passwordErrors}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-white">
                <input data-testid='con-password' type={showConfirmPassword ? "text" : "password"} className="flex-1 outline-none bg-transparent text-gray-900"
                  placeholder="Confirm your password" value={confirmPassword} onChange={handleConfirmPasswordChange}
                />
                <button data-testid='show-confirm-password' type="button" className="ml-2 focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <Eye size="20" color="#292D32" /> : <EyeSlash size="20" color="#292D32" />}
                </button>
              </div>
              {isSubmitted && confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
              {isSubmitted && bothPasswordError && <p className="text-red-500 text-sm">{bothPasswordError}</p>}
            </div>
          </div>

          <button
          data-testid='button-submit'
            className={`w-full text-white text-lg py-3 rounded-full transition-all duration-300 ${isFormValid ? 'bg-black' : 'bg-gray-400'}`}
            onClick={handleSubmit}
          >
            Create account
          </button>

          <div className="mt-1">
            <label className="font-Gilroy text-base font-normal " >Already have an account?<span data-testid='login-page' onClick={handleLoginPage} className="ms-2 create-account-hover font-Gilroy text-base font-semibold" style={{ color: "rgba(30, 69, 225, 1)", cursor: "pointer" }}>Sign in</span> </label>
          </div>
        </div>

        {/* Right Section - Images */}
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
export default connect(mapsToProps)(CreateAccount)
