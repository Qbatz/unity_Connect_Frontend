import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Component/Sidebar";
import SignIn from "./Pages/AccountManagement/SignIn";
import Crypto from './Crypto/crypto';
import CreateAccount from './Pages/AccountManagement/CreateAccount';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { decryptLogin } from './Crypto/Utils';
import Cookies from 'universal-cookie';
import { useDispatch} from 'react-redux';
import LandingPage from './Component/LandingPage';
import Settings from '../src/Settings/Settings';
import Cookies from 'universal-cookie';

function App({ state ,isLogged_In}) {


  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [success, setSuccess] = useState(null)
  const Unity_Connect_Login = localStorage.getItem("unity_connect_login");

  useEffect(() => {
    if (Unity_Connect_Login) {
      const decryptedData = decryptLogin(Unity_Connect_Login);

      console.log("Decrypted Data:", decryptedData);

      setSuccess(decryptedData); 
    } 
  }, [Unity_Connect_Login]);



  console.log("state", state)
  console.log("isLogged_In",isLogged_In)
  console.log("success",success)

  

  const [tokenAccessDenied, setTokenAccessDenied] = useState(Number(cookies.get('Unity_ConnectToken_Access-Denied')));

  useEffect(() => {
    if (tokenAccessDenied == 206) {
      dispatch({ type: 'LOGOUT' });
      setSuccess(false);
      cookies.set('Unity_ConnectToken_Access-Denied', null, { path: '/', expires: new Date(0) });
      localStorage.clear();

    }
  }, [tokenAccessDenied]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTokenAccessDenied(Number(cookies.get('Unity_ConnectToken_Access-Denied')));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (!isLogged_In && !success) {
                cookies.set('Unity_ConnectToken_Access-Denied', null, { path: '/', expires: new Date(0) });
    }
  }, [state.login?.isLoggedIn]);


 
  return (
    <div>

      <ToastContainer />

      <Router >
      
        <Routes>
          {Boolean(success === true) || Boolean(isLogged_In === true) ? (
            <>
              <Route path="/" element={<Sidebar />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </>
          ) :  (
            <>
              {/* <Route path="/" element={<CreateAccount />} /> */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sidebar" element={<Sidebar />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </>
          )}
        </Routes>
      </Router>

      <Crypto /> 


    </div>
  );
}

const mapsToProps = (stateInfo) => {
  console.log("stateInfo", stateInfo)
  return {
    state: stateInfo.SignIn,
    isLogged_In: stateInfo.SignIn.isLoggedIn
  }
}

export default connect(mapsToProps)(App);
