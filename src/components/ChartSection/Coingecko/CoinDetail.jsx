import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import coingecko from "../../../apis/coingecko";

const CoinDetail = () => {
	const {id} = useParams();
	const [coinInfo, setCoinInfo] = useState([]);
  const days = [1, 7, 30, 365];

	useEffect(() => {
		const fetchData = async () => {
			const [day] = await Promise.all(
        // days.map((e)=>())
        [
        coingecko.get(`/coins/${id}/market_chart`, {
          params: {
            vs_currency: "usd",
            days: 1,
          },
        }),
      ])
      console.log(day.data.prices);
		};
    fetchData()
	},[]);

	return <div></div>;
};

export default CoinDetail;
