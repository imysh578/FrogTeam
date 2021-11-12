import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InfoSection from "../components/InfoSection";
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
  homeObjFour,
  homeObjFive,
} from "../components/InfoSection/Data";
import Scroll from "../components/Scroll";
import { QueryClientProvider, QueryClient } from "react-query";
import Posts from "../components/ReactQuery/Posts";
import Post from "../components/ReactQuery/Post";
import Rest from "../components/ReactQuery/Rest";

const queryClient = new QueryClient();

const Home = () => {
  const [postId, setPostId] = useState(-1);
  const [업비트, 업비트변경] = useState(-1);
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
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjFour} />
      <InfoSection {...homeObjFive} />
      <Scroll showBelow={250} />
      <Footer />
      {/* react-query 쓰려면 이거 주석 해제 해주세요 너무 더러워서 없애놈 ㅈㅅ */}
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <div> */}
      {/* react-query */}
      {/* <Rest /> */}
      {/* {postId > -1 ? ( */}
      {/* // <Post postId={postId} setPostId={setPostId} /> */}
      {/* // ) : ( // <Posts setPostId={setPostId} /> */}
      {/* // )} */}
      {/* </div> */}
      {/* </QueryClientProvider> */}
    </>
  );
};

export default Home;
