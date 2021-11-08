import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import Coingecko from "./Coingecko";
import './index.scss'

const Chart = ({ chartTab }) => {
	switch (chartTab) {
		case "Coingecko":
			return <Coingecko />;
		case "Upbit":
			return <div>Upbit Chart</div>;

		default:
			break;
	}
};

const ChartSection = () => {
	const [chartTab, setChartTab] = useState("Coingecko");

	const handleTabClick = () => (e) => {
		console.log(e.target.innerText);
		setChartTab(e.target.innerText);
	};

	return (
		<div className="chart-container">
			<ButtonGroup className="mt-2 mx-2">
				<Button onClick={handleTabClick()} variant="success">
					Coingecko
				</Button>
				<Button onClick={handleTabClick()} variant="primary">
					Upbit
				</Button>
			</ButtonGroup>
			<Chart chartTab={chartTab} />
		</div>
	);
};

export default ChartSection;
