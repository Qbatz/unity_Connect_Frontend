import './App.css';
import Sidebar from "./Component/Sidebar";
import SignIn from "./Account management/SignIn";
import Crypto from './Crypto/crypto';

function App() {
  return (
      <div>
    {/* <Sidebar /> */}
    <SignIn />
    <Crypto />
    </div>
  );
}

export default App;
