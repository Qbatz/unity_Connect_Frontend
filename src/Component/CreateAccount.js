import React, { useState, useEffect } from "react";
import Create1 from '../Images/Createtleft.svg';
import Create2 from '../Images/Createright.svg';
import Unityicon from '../Icons/Unityicon.svg'
import { Eye, EyeSlash } from "iconsax-react";

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, mobileNumber, password, confirmPassword]);

  const isFormValid = firstName && lastName && email && mobileNumber && password && confirmPassword && Object.keys(errors).length === 0;

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setErrors((prev) => ({ ...prev, firstName: "" }));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setErrors((prev) => ({ ...prev, lastName: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      console.log("Form Submitted", { firstName, lastName, email, mobileNumber, password });
    }
  };




  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
    setErrors((prev) => ({ ...prev, mobileNumber: "" }));
  };
  const handleEmailChange = (e) => {
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
              {isSubmitted && errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input type="text" data-testid='input-lname' placeholder="Last name" className="w-full p-3 border border-gray-300 rounded-xl"
                value={lastName} onChange={handleLastNameChange}
              />
              {isSubmitted && errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Email ID</label>
              <input data-testid='input-email' type="email" placeholder="Email address" className="w-full p-3 border border-gray-300 rounded-xl"
                value={email} onChange={handleEmailChange}
              />
              {isSubmitted && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                  disabled={false} // Ensure this is not true
                />
              </div>
              {isSubmitted && errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
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
              {isSubmitted && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
              {isSubmitted && errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
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
            <label className="font-Gilroy text-base font-normal " >Already have an account?<span className="ms-2 create-account-hover font-Gilroy text-base font-semibold" style={{ color: "rgba(30, 69, 225, 1)", cursor: "pointer" }}>Sign in</span> </label>
          </div>
        </div>

        {/* Right Section - Images */}
        <div className="flex flex-col items-center  gap-0">
          <img src={Create1} className="w-96 h-[330px] block" alt="Illustration 1" />
          <img
            src={Create2}
            className="w-96 h-[300px] block ml-[210px] -mt-[25px]"
            alt="Illustration 2"
          />
        </div>


      </div>
    </div>
  );
}

export default CreateAccount;
