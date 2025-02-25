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
import { decryptData } from './Crypto/Utils';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import LandingPage from './Component/LandingPage';
import Settings from '../src/Settings/Settings';
import PropTypes from 'prop-types';



function App({ isLogged_In }) {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [success, setSuccess] = useState(null)
  const [unityLogin, setUnityLogin] = useState(localStorage.getItem("unity_connect_login"));

  useEffect(() => {
    const interval = setInterval(() => {
      const newLoginValue = localStorage.getItem("unity_connect_login");
      setUnityLogin(newLoginValue);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (unityLogin) {
      const decryptedData = decryptData(unityLogin);

      setSuccess(decryptedData === 'true');
    }
  }, [unityLogin]);


  const [tokenAccessDenied, setTokenAccessDenied] = useState(Number(cookies.get('Unity_ConnectToken_Access-Denied')));

  useEffect(() => {
    if (tokenAccessDenied == 206) {
      dispatch({ type: 'LOGOUT' });
      setSuccess(false);
      cookies.set('Unity_ConnectToken_Access-Denied', null, { path: '/', expires: new Date(0) });
    }
  }, [tokenAccessDenied]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTokenAccessDenied(Number(cookies.get('Unity_ConnectToken_Access-Denied')));
    }, 1000);

    return () => clearInterval(interval);
  }, []);






  return (
    <div data-testid="parent">

      <ToastContainer />

      <Router >

        <Routes>
          {success === true || isLogged_In === true ? (
            <>
              <Route path="/" element={<Sidebar />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/create-account" element={<CreateAccount />} />
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
  return {
    isLogged_In: stateInfo.SignIn.isLoggedIn
  }
}

App.propTypes = {
  isLogged_In: PropTypes.bool.isRequired, 
};

export default connect(mapsToProps)(App);
