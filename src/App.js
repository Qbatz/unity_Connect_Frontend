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



function App({state}) {

  const [success, setSuccess] = useState(null)
  const Unity_Connect_Login = localStorage.getItem("unity_connect_login");

  useEffect(() => {
    if (Unity_Connect_Login) {
      const decryptedData = decryptLogin(Unity_Connect_Login);
      setSuccess(decryptedData)
    }

  }, [Unity_Connect_Login])

  return (
    <div>

      <ToastContainer />

      <Router >
        <Routes>
          {success || state.SignIn?.isLoggedIn ? (
            <>
              <Route path="/sidebar" element={<Sidebar />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </>
          ) : (
            <>
              <Route path="/" element={<SignIn />} />
              <Route path="/createaccount" element={<CreateAccount />} />
              <Route path="/sidebar" element={<Sidebar />} />
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
  console.log(stateInfo)
  return {
    state: stateInfo.SignIn
  }
}

export default connect(mapsToProps)(App);
