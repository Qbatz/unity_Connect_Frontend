import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Component/Sidebar";
import SignIn from "./Pages/AccountManagement/SignIn";
import Crypto from './Crypto/crypto';
import CreateAccount from './Pages/AccountManagement/CreateAccount';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decryptLogin } from './Crypto/Utils';
import LandingPage from './Component/LandingPage';
import Settings from '../src/Settings/Settings';
import Cookies from 'universal-cookie';


function App() {


  const state = useSelector(state => state);

  const [success, setSuccess] = useState(null)

  console.log("state", state)

  const Unity_Connect_Login = localStorage.getItem("unity_connect_login");



  useEffect(() => {
    if (Unity_Connect_Login) {
      const decryptedData = decryptLogin(Unity_Connect_Login);
      console.log("Decrypted Data:", decryptedData);
      setSuccess(decryptedData)
    }

  }, [Unity_Connect_Login])

  return (
    <div>
      {/* <Settings/> */}

      <ToastContainer />

      <Router >
      
        <Routes>
          {success || state.SignIn?.isLoggedIn ? (
            <>
              <Route path="/" element={<Sidebar />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </>
          ) : (
            <>
              {/* <Route path="/" element={<CreateAccount />} /> */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignIn />} />
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

export default App;
