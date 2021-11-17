import { NewsContainer2, Icon } from './newsElements'
import React, { useContext } from "react";
import { NewsContext } from "../News/NewsContext";
import NewsArticle from "./NewsArticle";
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function NewS2(props) {
    const { data } = useContext(NewsContext);
    console.log(data);
    const handleAddOnclick = () => {
        console.log('뉴스 자세히');
      }

    return (
        <div>
            <NewsContainer2>
                
                <div className="all__news">
                    {data ? data.articles.slice(0, 3).map((news) => (
                        <NewsArticle data={news} key={news.url} />
                    ))
                        : "Loading"}
                </div>

               <Link to='news'>
                <Button onClick={handleAddOnclick}>
                최근 뉴스 자세히 
                </Button>
                </Link>
            </NewsContainer2>
        </div>
    );
}

export default NewS2;