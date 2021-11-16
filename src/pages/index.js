import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InfoSection from "../components/InfoSection";
import ChartSection from "../components/ChartSection";
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
  homeObjFour,
  homeObjFive,
} from "../components/InfoSection/Data";
import Scroll from "../components/Scroll";
import Mypage from "../components/Mypage/index.jsx";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree}>
        <ChartSection />
      </InfoSection>
      <InfoSection {...homeObjFour} />
      <InfoSection {...homeObjFive}>
        <Mypage />
      </InfoSection>
      <Scroll showBelow={250} />
      <Footer />
    </>
  );
};

export default Home;
