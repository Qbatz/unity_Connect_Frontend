import './App.css';
import Sidebar from "./Component/Sidebar";
import SignIn from "./Account management/SignIn";
import Crypto from './Crypto/crypto';

function App() {
  return (
      <div data-testid='container'>
    {/* <Sidebar /> */}
    <SignIn />
    <Crypto />
    </div>
  );
}

export default App;
