import React from "react";
import TopBar from "./TopBar";
import MeetUnityConnect from "./MeetUnityConnect";
import WelcomeImage from "./WelcomeImage";
import CountNumbers from "./CountNumbers";
import HowItWorks from "./HowItWorks";
import WhyUnityConnect from "./WhyUnityConnect";
import FAQSection from "./FAQSection";
import GetStarted from "./GetStarted";
import Footer from "./Footer";
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
