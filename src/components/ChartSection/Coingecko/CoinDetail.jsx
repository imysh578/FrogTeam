import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {coingecko} from "../../../apis/configs";
import StaticChart from "./StaticChart";

const CoinDetail = () => {
	const { id } = useParams();
	const [chartData, setChartData] = useState([]);
	const [bitcoinChartData, setBitcoinChartData] = useState([]);
	const [coinInfo, setCoinInfo] = useState([]);
	const days = [1, 7, 14, 30, 90, 180, 365];
	const xyFormat = (array) => {
		return array.map((el) => ({
			x: el[0],
			y: el[1],
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await Promise.all([
				...days.map((el) =>
					coingecko.get(`/coins/${id}/market_chart`, {
						params: {
							vs_currency: "usd",
							days: el,
						},
					})
				),
				coingecko.get("/coins/markets", {
					params: {
						vs_currency: "usd",
						ids: id,
					},
				}),
			]);

			const responseData =
				response.map((el) => {
					if (el.data.prices) {
						return xyFormat(el.data.prices);
					} else return el.data[0];
				});
			setChartData(responseData.slice(0,-1));
			setCoinInfo(responseData.slice(-1,));
		};
		fetchData();
	}, []);

	// 비트코인 데이터
	useEffect(() => {
		const fetchData = async () => {
			const response = await Promise.all([
				...days.map((el) =>
					coingecko.get(`/coins/bitcoin/market_chart`, {
						params: {
							vs_currency: "usd",
							days: el,
						},
					})
				)
			]);

			const responseData =
				response.map((el) => {
					if (el.data.prices) {
						return xyFormat(el.data.prices);
					} else return el.data[0];
				});
			setBitcoinChartData(responseData);

		};
		fetchData();
	}, []);

	console.log(coinInfo);
	console.log(chartData);

	return (
		<>
			<div>{id}</div>
			<div><StaticChart coinInfo = {coinInfo} chartData ={chartData} bitcoinChartData={bitcoinChartData}/></div>
		</>
	);
};

export default CoinDetail;
