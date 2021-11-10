import { Chart, registerables } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import "chartjs-adapter-moment";
import { chartCofig1 } from "../chartConifgs";

// Registration chart format
Chart.register(...registerables);

const StaticChart = ({ coinInfo, chartData }) => {
	const [day, week, twoWeeks, month, threeMonths, halfYear, year] = chartData;
	// const [day1, week1, twoWeeks1, month1, threeMonths1, halfYear1, year1] = bitcoinChartData;
	const [timeFormat, setTimeFormat] = useState("24h");
	const timeFormatList = ["24h", "7d", "14d", "30d", "90d", "180d", "1y"];

	const determinTimeFormat = () => {
		switch (timeFormat) {
			case "24h":
				return day;
			case "7d":
				return week;
			case "14d":
				return twoWeeks;
			case "30d":
				return month;
			case "90d":
				return threeMonths;
			case "180d":
				return halfYear;
			case "1y":
				return year;

			default:
				return day;
		}
	};

	useEffect(() => {
		const ctx = document.getElementById("staticChart");
		const staticChart = new Chart(ctx, {
			data: {
				datasets: [
					{
						label: `${coinInfo.name} Price`,
						data: determinTimeFormat(),
						backgroundColor: "green",
						borderColor: "green",
						pointRadius: 0,
					},
					// {
					// 	label: `${coinInfo.name} Price`,
					// 	data: determinTimeFormat(),
					// 	backgroundColor: "red",
					// 	borderColor: "red",
					// 	pointRadius: 0,
					// },
				],
			},
			...chartCofig1, 
		});
		return () => {
			// unmount될 때 canvas 삭제
			staticChart.destroy();
		};
	}, [coinInfo, chartData, timeFormat]);

	const renderPrice = () => {
		if (coinInfo) {
			return (
				<>
					<p className="my-0">$ {coinInfo.current_price}</p>
					<p
						className={
							coinInfo.price_change_24 < 0
								? "text-danger my-0"
								: "text-success my-0"
						}
					>
						{coinInfo.price_change_percentage_24h}%
					</p>
				</>
			);
		}
	};

	return (
		<div className="bg-white border mt-2 rounded p-3">
			<div>{renderPrice()}</div>
			<div>
				<canvas id="staticChart" width={250} height={250}></canvas>
			</div>
			<div className="chart-buttons mt-1">
				<Buttons setTimeFormat={setTimeFormat} timeFormatList={timeFormatList}/>
			</div>
		</div>
	);
};

function Buttons({ setTimeFormat, timeFormatList }) {

	return	(
		timeFormatList.map((timeFormat,index) => (
			<button
				key={index}
				onClick={() => setTimeFormat(timeFormat)}
				className="btn btn-outline-secondary btn-sm mx-1"
			>
				{timeFormat}
			</button>
		))
	)
}

export default StaticChart;
