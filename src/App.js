import React,{useState, useEffect} from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Component/Sidebar";
import SignIn from "./Pages/AccountManagement/SignIn";
import Crypto from './Crypto/crypto';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decryptLogin } from './Crypto/Utils';





function App() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);

const [success, setSuccess] = useState(null)

  console.log("state",state)

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
              <Route path="/" element={<SignIn />} />
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
