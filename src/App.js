import './App.css';
import Sidebar from "./Component/Sidebar"
import TopBar from './Component/TopBar';
import MeetUnityConnect from './Component/MeetUnityConnect';
import WelcomeImage from './Component/WelcomeImage';
import CountNumbers from './Component/CountNumbers';
import Footer from './Component/Footer';
import WhyUnityConnect from './Component/WhyUnityConnect';
import FAQSection from './Component/FAQSection';
import GetStarted from './Component/GetStarted';
import HowItWorks from './Component/HowItWorks';
import Settings from './Settings/Settings';
import ExpensesSetting from './Settings/ExpensesSetting';
function App() {
  return (
      <div data-testid="container">
    {/* <TopBar/>
    <MeetUnityConnect/>
    <WelcomeImage/>
    <CountNumbers/>
    <HowItWorks/>
    <WhyUnityConnect/>
    <FAQSection/>
<GetStarted/>  
    <Footer/> */}
    <Settings/>
    </div>
  );
}

export default App;
