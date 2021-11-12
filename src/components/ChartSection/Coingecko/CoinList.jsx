import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup } from "react-bootstrap";
import { coingecko, coingeckoUrl } from "../../../apis/configs";
import useAxios from "../../../hooks/useAxios";
import Coin from "./Coin";

const CoinList = () => {
	const [coins, setCoins] = useState([]);
	const [coinsDisplay, setCoinsDisplay] = useState([]);

	/* 일반적인 axios 사용 */
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		// 코인게코 코인 리스트 및 정보 불러오기
	// 		const response = await coingecko.get("coins/markets", {
	// 			params: {
	// 				vs_currency: "usd",
	// 			},
	// 		});
	// 		setCoins(response.data);
	// 		setCoinsDisplay(response.data.slice(0, 10));
	// 	};
	// 	fetchData();
	// }, []);

	/* useAxios 사용하는 방법 */
	
	const { data, loading, error } = useAxios({
		method: "GET",
		baseURL: coingeckoUrl,
		url: "/coins/markets",
		params: {
			vs_currency: "usd",
			per_page: 250,
		},
	});

	useEffect(() => {
		if (!loading && data) {
			setCoins(data);
			setCoinsDisplay(data.slice(0, 10));
		}
	}, [data, loading]);

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

	if (error) {
		return <h1 className="text-danger">{error.message}</h1>;
	}

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

			<table className="table coinlist-table table-striped table-hover text-center">
				<thead className="text-light bg-success ">
					<tr>
						<th>
							<span>#</span>
						</th>
						<th>
							<span></span>
						</th>
						<th>
							<span>Coin</span>
						</th>
						<th>
							<span>Current Price($)</span>
						</th>
						<th>
							<span>Market Cap($)</span>
						</th>
						<th>
							<span>24h(%)</span>
						</th>
					</tr>
				</thead>
				<tbody className="table-dark">
					{loading && <tr><td colSpan={6}><h1 className="text-center">Loading...</h1></td></tr>}
					{coinsDisplay.map((coin, index) => (
						<Coin key={coin.id} coin={coin} index={index + 1} />
					))}
				</tbody>
			</table>
		</>
	);
};

export default CoinList;
