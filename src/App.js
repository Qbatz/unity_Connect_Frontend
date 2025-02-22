import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Component/Sidebar";
import SignIn from "./Pages/AccountManagement/SignIn";
import Crypto from './Crypto/crypto';

function App() {
  return (
    <div>

      <div>
        <ToastContainer />
      </div>
      
      {/* <Sidebar /> */}
      <SignIn />
      <Crypto />

    </div>
  );
}

export default App;
