import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import Coin from "../ChartSection/Coingecko/Coin";

const 코인뉴스 = () => {
  const [coins, setCoins] = useState([]);
  const [coinsDisplay, setCoinsDisplay] = useState([]);

  const { data, loading, error } = useAxios({
    method: "GET",
    baseURL: "http://localhost:5000",
    url: "news",
  });

  console.log(data);
  console.log(coinsDisplay);

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
      <Col md={4} className="my-3 input-box">
        <InputGroup>
          <Form action="http://localhost:5000/auth/join" method="POST">
            <FormInput
              type="text"
              name="keyword"
              placeholder="뉴스 제목 입력"
              required
            />
            <FormButton2 type="submit">Frog 회원가입 완료</FormButton2>
          </Form>
        </InputGroup>
      </Col>

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

export default 코인뉴스;
