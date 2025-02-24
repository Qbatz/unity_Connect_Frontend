import React, { useState, useEffect } from "react";
import UnityConnectImg from '../../Icons/UnityConnectImg.svg';
import SignInTop from "../../Icons/SignInTop.svg";
import SignInBottom from "../../Icons/SignInBottom.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { MdError } from "react-icons/md";
import { useDispatch, connect } from 'react-redux';
import { encryptLogin } from "../../Crypto/Utils";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';



const SignIn = ({ state }) => {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();


  useEffect(() => {
    if (state.SignIn.signinsuccessstatuscode === 200) {

      dispatch({ type: "SIGNIN-SUCCESS" });

      const token = state.SignIn.JWTtoken
      const cookies = new Cookies()
      cookies.set('UnityTokenToken', token, { path: '/' });
      const encryptData = encryptLogin(JSON.stringify(true));
      localStorage.setItem("unity_connect_login", encryptData.toString());

      setTimeout(() => {
        dispatch({ type: 'REMOVE_LOGIN_STATUS_CODE' })
      }, 1000)
    }
  }, [state.SignIn.signinsuccessstatuscode]);


  useEffect(() => {
    if (email || password) {
      setTimeout(() => {
        if (email) {
          dispatch({ type: "CLEAR_ERROR_EMAIL" });
        }
        if (password) {
          dispatch({ type: "CLEAR_ERROR_PASSWORD" });
        }
      }, 100);
    }
  }, [email, password, dispatch]);

  const validateForm = () => {

    dispatch({ type: 'SIGNININFO', payload: { email_Id: email, password: password } });
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;

  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/sidebar");
    }
  };

  const LandingNavigates = useNavigate();
  const handleLogoClicks = () => {
    LandingNavigates("/LandingPage");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen sm:overflow-auto md:overflow-hidden">
      <div className="flex flex-col justify-center md:w-1/2 p-6 md:p-16 container mx-auto">
        <div className="mb-3">
          <img src={UnityConnectImg}
             onClick={handleLogoClicks}
            alt="Illustration" />
        </div>
        <h1 className="text-black font-Gilroy text-2xl font-semibold leading-normal mb-2">Welcome back!</h1>
        <p className="font-Gilroy font-normal text-base leading-4 tracking-normal mb-8">
          Enter your details below to get onto your Unity Connect account.
        </p>

        <div>
          <label className="font-Gilroy font-medium text-sm leading-4">
            Email ID <span className="text-red-500 align-super">*</span>
          </label>
          <input
            data-testid="input-email"
            type="email"
            placeholder="Email address"
            className="border rounded-lg p-3 w-full mt-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400 font-Gilroy font-medium text-base leading-5 tracking-normal"
            value={email}
            onChange={handleEmailChange}
          />
          <div data-testid='error-email' className="">
            {errors.email && (
              <p data-testid='label-error-email' className="text-red-500 text-sm font-medium mb-4 flex items-center">
                <MdError className="mr-1 text-sm" /> {errors.email}
              </p>
            )}
          </div>
          <div>
            {state.SignIn.errorEmail && (
              <label className="text-red-500 text-xs font-bold font-gilroy ml-1 -mt-1/2 mb-2 block">
                {state.SignIn.errorEmail}
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="font-Gilroy font-medium text-sm leading-4 mt-2">
            Password <span className="text-red-500 align-super">*</span>
          </label>
          <div className="relative">
            <input
              data-testid='input-password'
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="border rounded-lg py-2.5 px-3 w-full mt-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400 font-Gilroy font-medium text-base leading-6 tracking-normal pr-10"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              data-testid='button-show-password'
              type="button"
              className="absolute right-3 top-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="">
            {errors.password && (
              <p data-testid='input-error-password' className="text-red-500 text-sm font-medium mb-4 flex items-center">
                <MdError className="mr-1 text-sm" /> {errors.password}
              </p>
            )}
          </div>
          <div>
            {state.SignIn.errorPassword && (
              <label className="text-red-500 text-xs font-bold font-gilroy ml-1 -mt-1/2 mb-2 block">
                {state.SignIn.errorPassword}
              </label>
            )}
          </div>

        </div>

        <div>
          <button
            data-testid="button-submit"
            type="submit"
            className={`w-full py-3 rounded-3xl text-white text-lg font-Gilroy leading-6 tracking-normal font-medium hover:bg-gray-600 transition mt-8 mb-2 ${email.trim() && password.trim() ? "bg-black" : "bg-gray-500"
              }`}
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </div>

        <p className="mt-3 font-Gilroy font-normal text-base leading-5 tracking-normal ml-1">
          Don’t have an account?{" "}
          <a href="#" onClick={() => navigate("/createaccount")} className="font-Gilroy font-normal text-base text-violet-700 leading-5 tracking-normal hover:underline font-semibold text-base leading-5 tracking-normal">
            Create an account
          </a>
        </p>
      </div>

      <div className="md:w-1/2 flex flex-col sm:flex-row md:flex-col justify-center items-center h-full p-6 md:p-16">
        <img src={SignInTop} alt="Illustration" className="w-auto h-48 md:h-56 mb-6" />
        <img src={SignInBottom} alt="Illustration" className="w-full h-48 md:h-56 mx-auto sm:-mt-10 lg:mt-1 md:mx-0 md:translate-x-20" />
      </div>
    </div>
  );
};

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo
  }
}

export default connect(mapsToProps)(SignIn);

