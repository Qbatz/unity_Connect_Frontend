import './App.css';
// import Sidebar from "./Component/Sidebar"
import Crypto from './Crypto/crypto';
import CreateAccount from './Component/CreateAccount';

function App() {
  return (
      <div data-testid="container">
    <CreateAccount/>
    {/* <Sidebar /> */}
    <Crypto />
    </div>
  );
}

export default App;
