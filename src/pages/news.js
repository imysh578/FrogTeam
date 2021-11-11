import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import NewS from '../components/News'
import { NewsContextProvider } from "../components/News/NewsContext";
import './news.css';


const NewsPage = () => {
    return (
<>
    <NewsContextProvider>
      <NewS />
    </NewsContextProvider>
</>
    )
}

export default NewsPage
