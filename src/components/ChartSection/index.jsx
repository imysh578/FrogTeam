import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import CoingeckoCoinDetail from "./Coingecko/CoinDetail";
import CoingeckoCoinList from "./Coingecko/CoinList";
import "./index.scss";
import UpbitCoinDetail from "./Upbit/CoinDetail";
import UpbitCoinList from "./Upbit/CoinList";

const ChartSection = () => {
	const [tab, setTab] = useState("Coingecko");

	const handleTabClick = () => (e) => {
		console.log(e.target.innerText);
		setTab(e.target.innerText);
	};

	return (
		<div className="coins-container">
			<ButtonGroup className="mt-2 mx-2">
				<Button className="tab" onClick={handleTabClick()} variant="success">
					Coingecko
				</Button>
				<Button className="tab" onClick={handleTabClick()} variant="primary">
					Upbit
				</Button>
			</ButtonGroup>

			<Routes>
				<Route path="/" element={tab ==='Coingecko' ? <CoingeckoCoinList/> : <UpbitCoinList/>} exact />
				<Route path="/:id" element={tab === 'Coingecko' ? <CoingeckoCoinDetail /> : <UpbitCoinDetail/>} exact />
			</Routes>
		</div>
	);
};

export default ChartSection;
