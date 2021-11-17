import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import NewsPage from "./pages/news";
import CoinsPage from "./pages/coins";
import CoinDetail from "./components/ChartSection/Coingecko/CoinDetail";
import DiscoverPage from "./pages/discover";
import QueryPage from "./pages/query";
import PostBoardPage from "./pages/postboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="signin" element={<SigninPage />} exact />
        <Route path="signup" element={<SignupPage />} exact />
        <Route path="news" element={<NewsPage />} exact />
        <Route path="discover" element={<DiscoverPage />} exact />
        <Route path="coins/*" element={<CoinsPage />} exact />
        <Route path="query" element={<QueryPage />} exact />
        <Route path="postboard" element={<PostBoardPage />} exact />
      </Routes>
    </Router>
  );
}

export default App;
