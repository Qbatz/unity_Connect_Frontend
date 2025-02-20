import './App.css';
import Sidebar from "./Component/Sidebar"

function App() {
  return (
      <div data-testid="container">
    {/* <h1 className="text-3xl font-bold bg-pink-500 text-green-400 text-center">
      Hello world!
    </h1> */}
    <Sidebar />
    </div>
  );
}

export default App;
