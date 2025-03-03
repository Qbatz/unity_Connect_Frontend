import React from "react";
import TopBar from "./TopBar";
import MeetUnityConnect from "../LandingPage/MeetUnityConnect";
import WelcomeImage from "../LandingPage/WelcomeImage";
import CountNumbers from "../LandingPage/CountNumbers";
import HowItWorks from "../LandingPage/HowItWorks";
import WhyUnityConnect from "../LandingPage/WhyUnityConnect";
import FAQSection from "../LandingPage/FAQSection";
import GetStarted from "../LandingPage/GetStarted";
import Footer from "../LandingPage/Footer";

function LandingPage(){
    return(
        <>
        <div>
<TopBar/>
<MeetUnityConnect/>
<WelcomeImage/>
<CountNumbers/>
<HowItWorks/>
<WhyUnityConnect/>
<FAQSection/>
<GetStarted/>
<Footer/>
        </div>
        </>
    )
}
export default LandingPage;
