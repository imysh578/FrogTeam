import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { coingecko, coingeckoUrl } from "../../../apis/configs";
import useAxios from "../../../apis/useAxios";
import Coin from "./Coin";

const CoinList = () => {
	const [coins, setCoins] = useState([]);
	const [coinsDisplay, setCoinsDisplay] = useState([]);

	/* 일반적인 axios 사용 */ 
	useEffect(() => {
		const fetchData = async () => {
			// 코인게코 코인 리스트 및 정보 불러오기
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

	/* useAxios 사용하는 방법 */ 
	// const { data, loading, error } = useAxios({
	// 	method: "GET",
	// 	baseURL: coingeckoUrl,
	// 	url: "/coins/markets",
	// 	params: {
	// 		vs_currency: "usd",
	// 	},
	// });

	// useEffect(() => {
	// 	if (!loading && data) {
	// 		setCoins(data);
	// 		setCoinsDisplay(data.slice(0, 10));
	// 	}
	// }, [data, loading]);

	const handleOnChange = () => (e) => {
		let searchedCoins = [];
		coins.forEach((coin) => {
			if (
				coin.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
				coin.id.includes(e.target.value.toLowerCase()) ||
				coin.symbol.includes(e.target.value.toLowerCase())
			) {
				searchedCoins = [...searchedCoins, coin];
			}
		});
		setCoinsDisplay(searchedCoins.slice(0, 15));
	};

	// if (error) {
	// 	return (
	// 		<h1 className="text-danger">{error.message}</h1>
	// 	)
	// };

	return (
		<>
			<Col md={4} className="my-3 input-box">
				<InputGroup>
					<FormControl
						placeholder="Insert Coin name"
						onChange={handleOnChange()}
					/>
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
				{/* {loading && (<h1>Loading...</h1>)}	 */}
				{coinsDisplay.map((coin) => (
					<Coin key={coin.id} coin={coin} />
				))}
			</ListGroup>
		</>
	);
};

export default CoinList;
