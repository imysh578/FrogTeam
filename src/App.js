import React from 'react';
import './App.css';


import {BrowserRouter as Router, Routes, Route} from
 'react-router-dom'
 import Home from './pages'
 import SigninPage from './pages/signin';
 import NewsPage from './pages/news';
import CoinsPage from './pages/coins';
import CoinDetail from './components/ChartSection/Coingecko/Coin';


function App() {
  return (
    <Router>

    <Routes>
       <Route path="/" element={<Home />} exact />
       <Route path="/signin" element={<SigninPage />} exact />
       <Route path="/news" element={<NewsPage />} exact />
       <Route path="/coins" element={<CoinsPage />} exact>
        <Route path=":id" element={<CoinDetail/>} />
       </Route>
    </Routes>
        </Router>
  );
}

export default App;
