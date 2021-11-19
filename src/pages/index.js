import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InfoSection from "../components/InfoSection";
import ChartSection from "../components/ChartSection";
import { NewsContextProvider } from "../components/News/NewsContext";
import NewS2 from '../components/News/index2';
// import PostBoards from "../components/PostBoard/PostBoard";

import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
  homeObjFour,
  homeObjFive,
} from "../components/InfoSection/Data";
import Scroll from "../components/Scroll";
import Mypage from "../components/Mypage/index.jsx";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { data, loading, error } = useAxios({
		method: "get",
		baseURL: "http://localhost:5000",
		url: "auth/session",
	});

  return (
		<>
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />
			<HeroSection />
			<InfoSection {...homeObjOne} />
			<InfoSection {...homeObjTwo}>{/* <PostBoards />     */}</InfoSection>
			<InfoSection {...homeObjThree}>
				<ChartSection />
			</InfoSection>
			<InfoSection {...homeObjFour}>
				<NewsContextProvider>
					<NewS2 />
				</NewsContextProvider>{" "}
			</InfoSection>
			{data ? (
				<InfoSection {...homeObjFive}>
					<Mypage />
				</InfoSection>
			) : null}
			<Scroll showBelow={250} />
			<Footer />
		</>
	);
};

export default Home;
