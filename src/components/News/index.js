
import { NewsContainer, Icon } from './newsElements'
import React, { useContext } from "react";
import { NewsContext } from "../News/NewsContext";
import NewsArticle from "./NewsArticle";

function NewS(props) {
  const { data } = useContext(NewsContext);
  console.log(data);

  return (
    <div>
      <NewsContainer>
        <h1 className="head__text">NEWS</h1>

        <div className="all__news">
          {data ? data.articles.map((news) => (
            <NewsArticle data={news} key={news.url} />
          ))
            : "Loading"}
        </div>
        
      </NewsContainer>
    </div>
  );
}

export default NewS;