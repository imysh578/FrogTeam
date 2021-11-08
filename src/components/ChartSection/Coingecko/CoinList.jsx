import React, { useEffect, useState } from "react";
import { Col, Dropdown, DropdownButton, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import coingecko from "../../../apis/coingecko";

const CoingeckoCoinList = () => {
	const [coins, setCoins] = useState([]);
	const [coinsDisplay, setCoinsDisplay] = useState([]);

	// 첫 랜더링 시 코인 리스트 불러오기
	useEffect(() => {
		const fetchData = async () => {
			const response = await coingecko.get("coins/markets", {
				params: {
					vs_currency: "usd",
				},
			});
			setCoins(response.data);
			setCoinsDisplay(response.data.slice(0, 10));
		};
		fetchData();
	}, []);

	const handleOnChange = () => (e) => {
		let searchedCoins = [];
		coins.forEach((coin) => {
			if (
				coin.name.includes(e.target.value) ||
				coin.id.includes(e.target.value) ||
        coin.symbol.includes(e.target.value)
			) {
				searchedCoins = [...searchedCoins, coin];
			}
		});
		setCoinsDisplay(searchedCoins.slice(0, 10));
	};

	return (
		<>
			<Col md={4} className="my-3 input-box">
				<InputGroup>
					<FormControl placeholder="Insert Coin name" onChange={handleOnChange()} />
				</InputGroup>
			</Col>
			<ListGroup className="coinlist-box">
        <div className="col-title list-group-item list-group-item-acion d-flex justify-content-between align-items-center text-light bg-success">
					<span className="item0">#</span>
          <span className="item1">Coin</span>
          <span className="item2">Current Price($)</span>
          <span className="item3">Market Cap($)</span>
          <span className="item4">24h(%)</span>
        </div>
				{coinsDisplay.map((coin) => (
					<Coin key={coin.id} coin={coin} />
				))}
			</ListGroup>
		</>
	);
};


const Coin = ({ coin }) => {
	return (
		<Link to={`/coins/${coin.id}`} className="coin text-decoration-none ">
			<div className="coinlist-item list-group-item list-group-item-acion d-flex justify-content-between align-items-center text-light bg-dark">
				<img className="item0 coinlist-image" src={coin.image} alt={coin.name} />
				<span className="item1"> {coin.name}</span>
				<span className="item2"> $ {coin.current_price.toLocaleString()}</span>
				<span className="item3"> $ {coin.market_cap.toLocaleString()} </span>
				<span
					className={
						coin.price_change_percentage_24h < 0
							? "text-danger mx-2 item4"
							: "text-success mx-2 item4"
					}
				>
					{" "}
					{coin.price_change_percentage_24h < 0 ? (
						<i className="fas fa-sort-down align-middle mx-1"></i>
					) : (
						<i className="fas fa-sort-up align-middle mx-1"></i>
					)}
					{coin.price_change_percentage_24h.toFixed(2)} %
				</span>
			</div>
		</Link>
	);
};

export default CoingeckoCoinList;
