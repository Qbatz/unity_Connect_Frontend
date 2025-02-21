import './App.css';
import Sidebar from "./Component/Sidebar"
import Crypto from './Crypto/crypto';

function App() {
  return (
      <div data-testid="container">
    
    <Sidebar />
    <Crypto />
    </div>
  );
}

export default App;
