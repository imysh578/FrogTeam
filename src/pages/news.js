import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import NewS from '../components/News/index'
import { NewsContextProvider } from "../components/News/NewsContext";
import './news.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Scroll from '../components/Scroll'

const NewsPage = () => {
    return (
<>
<Navbar />  
    <NewsContextProvider>
      <NewS />
    </NewsContextProvider>
    <Scroll showBelow={250} />
    <Footer />
</>
    )
}

export default NewsPage
