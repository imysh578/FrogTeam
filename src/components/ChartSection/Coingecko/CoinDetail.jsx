import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {coingecko} from "../../../apis/configs";
import Chart from "./Chart";

const CoinDetail = () => {
	const { id } = useParams();
	const [chartData, setChartData] = useState([]);
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

			const [day, week, twoWeeks, month, threeMonths, halfYear, year, details] =
				response.map((el) => {
					if (el.data.prices) {
						return xyFormat(el.data.prices);
					} else return el.data[0];
				});

			setChartData([day, week, twoWeeks, month, threeMonths, halfYear, year]);
			setCoinInfo(details);
		};
		fetchData();
	}, []);

	console.log(coinInfo);
	console.log(chartData);

	return (
		<>
			<div>{id}</div>
			<div><Chart /></div>
		</>
	);
};

export default CoinDetail;
