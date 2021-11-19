import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

// preventDefault 무조건
const News = () => {
  const [키워드, 키워드변경] = useState();

  const [coins, setCoins] = useState([]);
  const [coinsDisplay, setCoinsDisplay] = useState([]);

  const keywordHandler = (e) => {
    e.preventDefault();
    키워드변경(e.target.value);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      // state에 저장한 값을 가져옵니다.

      let body = {
        keyword: 키워드,
      };
      const news = await axios.post("http://localhost:5000/news", body);

      setCoins();
      setCoins(news.data);
      setCoinsDisplay(news.data.slice(0, 10));
    } catch {
      console.log("안댄다 기사 씨발");
    }
  };

  const { data, loading, error } = useAxios({
    method: "GET",
    baseURL: "http://localhost:5000",
    url: "news",
  });

  useEffect(() => {
    if (!loading && data) {
      setCoins(data);
      setCoinsDisplay(data.slice(0, 10));
    }
  }, [data, loading]);

  if (error) {
    return <h1 className="text-danger">{error.message}</h1>;
  }

  return (
    <>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "Column" }}
      >
        <Col md={4} className="my-3 input-box">
          <InputGroup>
            <input
              type="text"
              value={키워드}
              onChange={keywordHandler}
              name="keyword"
              placeholder="뉴스 제목 입력"
              required
            />
            <button type="submit">검색</button>
          </InputGroup>
        </Col>
      </form>

      <table className="table coinlist-table table-striped table-hover text-center">
        <thead className="text-light bg-success ">
          <tr>
            <th>
              <span>No</span>
            </th>
            <th>
              <span>제목</span>
            </th>
            <th>
              <span>내용</span>
            </th>
            <th>
              <span>신문사</span>
            </th>
            <th>
              <span>날짜</span>
            </th>
          </tr>
        </thead>
        <tbody className="table-dark">
          {loading && (
            <tr>
              <td colSpan={5}>
                <h1 className="text-center">Loading...</h1>
              </td>
            </tr>
          )}
          {coinsDisplay.map((coin, index) => (
            <tr>
              <th>
                <span>{index + 1}</span>
              </th>
              <th>
                <a href={coin.url}>
                  <span>{coin.name}</span>
                </a>
              </th>
              <th>
                <span>{coin.description}</span>
              </th>
              <th>
                <span>{coin.provider[0].name}</span>
              </th>
              <th>
                <span>{coin.datePublished}</span>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default News;
