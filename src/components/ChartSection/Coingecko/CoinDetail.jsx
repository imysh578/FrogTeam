import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {coingecko} from "../../../apis/configs";
import StaticChart from "./StaticChart";

const CoinDetail = () => {
	const { id } = useParams();
	const [chartData, setChartData] = useState([]);
	const [coinInfo, setCoinInfo] = useState([]);
	const [bitcoinChart, setBitcoinChart] = useState([]);
	const [timeFormat, setTimeFormat] = useState(1);
	
	const xyFormat = (array) => {
		return array.map((el) => ({
			x: el[0],
			y: el[1],
		}));
	};
	
	const fetchData = async () => {
		const result = await Promise.all([
			coingecko.get(`/coins/${id}/market_chart`, {
				params: {
					vs_currency: "usd",
					days: timeFormat,
				},
			}),
			coingecko.get(`/coins/bitcoin/market_chart`, {
				params: {
					vs_currency: "usd",
					days: timeFormat,
				},
			}),
			coingecko.get("/coins/markets", {
				params: {
					vs_currency: "usd",
					ids: id,
				},
			}),
		]);

		setChartData(xyFormat(result[0].data.prices));
		setBitcoinChart(xyFormat(result[1].data.prices));
		setCoinInfo(result[2].data[0]);
	};
	useEffect(() => {
		fetchData();
	}, [timeFormat]);


	return (
		<>
			
			<div className="chart-buttons mt-1">
				<Buttons setTimeFormat={setTimeFormat}/>
			</div>
			<div><StaticChart coinInfo = {coinInfo} chartData ={chartData} bitcoinChart={bitcoinChart}  /></div>
		</>
	);
};

function Buttons({ setTimeFormat }) {
	const timeFormatList = ["24h", "7d", "14d", "30d", "90d", "180d", "1y"];
	const days = [1, 7, 14, 30, 90, 180, 365];
	return	(
		timeFormatList.map((timeFormat,index) => (
			<button
				key={index}
				onClick={() => setTimeFormat(days[index])}
				className="btn btn-outline-secondary btn-sm mx-1"
			>
				{timeFormat}
			</button>
		))
	)
}



export default CoinDetail;
