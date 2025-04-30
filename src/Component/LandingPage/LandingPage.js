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

function LandingPage() {
    return (
        <>
           
           <div className="min-h-screen w-full overflow-x-hidden overflow-y: auto  bg-white">

                <TopBar />
                <MeetUnityConnect />
                <WelcomeImage />
                <CountNumbers />

                <div id="how-it-works">
                    <HowItWorks />
                </div>
                <div id="why-us">
                    <WhyUnityConnect />
                </div>
                <div id="faq-section">
                    <FAQSection />
                </div>

                <div id="get-started">
                    <GetStarted />
                </div>
                <Footer />
            </div>
        </>
    )
}
export default LandingPage;
