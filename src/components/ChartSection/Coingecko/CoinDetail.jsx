import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import coingecko from "../../../apis/coingecko";

const CoinDetail = () => {
	const {id} = useParams();
	const [coinInfo, setCoinInfo] = useState([]);
  const days = [1, 7, 30, 365];

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const [day, week, month, year] = await Promise.all(
  //       days.map(el => (
  //         axios.get(`/coins/${id}/market_chart`, {
  //           params:{
  //             id: id,
  //             vs_currency: "usd",
  //             days: el,
  //           }
  //         })
  //       ))
  //     // [
  //     //   axios.get(`/coins/${id}/market_chart`, {
  //     //     params:{
  //     //       id: id,
  //     //       vs_currency: "usd",
  //     //       days: 1,
  //     //     }
  //     //   })
  //     // ]  
  //     )
  //     console.log(day.data.prices);
  //     console.log(week.data.prices);
	// 	};
  //   fetchData()
	// },[]);
  console.log(1);
	return <div>asdf</div>;
};

export default CoinDetail;
