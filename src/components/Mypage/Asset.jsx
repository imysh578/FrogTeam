import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const baseUrl = "http://localhost:5000";

const Asset = ({ index, asset, editShow }) => {
	const [inputMode, setInputMode] = useState(false);
	const [buyPrice, setBuyPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [totalBuyPrice, setTotalBuyPrice] = useState(0);
	const [totalAsset, setTotalAsset] = useState(0);
	const [balance, setBalance] = useState(0);
	const [assetName, setAssetName] = useState(0);
	const [exchange, setExchange] = useState(0);
	const [profit, setProfit] = useState(0);
	const [profitRate, setProfitRate] = useState(0);

	const [inputBuyPrice, setInputBuyPrice] = useState(asset.avg_buy_price);
	const [inputBalance, setInputBalance] = useState(asset.balance);

	// 버튼 핸들러
	const handleEditClick = (e) => {
		e.preventDefault();
		setInputMode(!inputMode);
	};
	const handleSubmitClick = async (e) => {
		e.preventDefault();
		console.log(buyPrice);
		console.log(balance);
		const result = await axios.post(baseUrl + "/assets/edit", {
			email: "asdf@asdf",
			exchange: exchange,
			coinId: assetName,
			amount: Number(balance),
			buyPrice: Number(buyPrice),
		});
		setInputMode(!inputMode);
		if (inputBuyPrice) setBuyPrice(inputBuyPrice);
		if (inputBalance) setBalance(inputBalance);
	};
	const handleCancleClick = (e) => {
		e.preventDefault();
		setInputMode(!inputMode);
	};

	// input 값 핸들러
	const handleBuyPriceOnChange = (e) => {
		console.log(e.target.value);
		setInputBuyPrice(e.target.value);
		setBuyPrice(e.target.value);
	};
	const handleBalanceOnChange = (e) => {
		console.log(e.target.value);
		setInputBalance(e.target.value);
		setBalance(e.target.value);
	};

	useEffect(() => {
		const exchange_temp = asset.exchange.toUpperCase();
		const assetName_temp = asset.currency.toUpperCase();
		const balance_temp = Number(Number(inputBalance).toFixed(2));
		const price_temp = Number(Number(asset.price).toFixed(2));
		const averageBuyPrice_temp = Number(Number(inputBuyPrice).toFixed(2));
		const totalAsset_temp = Number(
			(Number(asset.price) * Number(inputBalance)).toFixed(0)
		);
		const totalBuyPrice_temp = Number(
			Number(inputBuyPrice * Number(inputBalance)).toFixed(0)
		);
		const profit_temp = Number(
			Number(totalAsset_temp) - Number(totalBuyPrice_temp)
		);
		let profitRate_temp = 0;
		if (totalBuyPrice_temp) {
			profitRate_temp = Number(
				((profit_temp / totalBuyPrice_temp) * 100).toFixed(2)
			);
		}

		setPrice(price_temp);
		setBuyPrice(averageBuyPrice_temp);
		setTotalBuyPrice(totalBuyPrice_temp);
		setTotalAsset(totalAsset_temp);
		setBalance(balance_temp);
		setAssetName(assetName_temp);
		setExchange(exchange_temp);
		setProfit(profit_temp);
		setProfitRate(profitRate_temp);
	}, [asset, inputMode]);

	useEffect(() => {}, [inputMode]);

	return (
		<>
			<tr>
				<th> {index} </th>
				{/* <td>
					<span>{exchange}</span>
				</td> */}
				<td>
					<span>{assetName}</span>
				</td>
				<td>
					<span>{price.toLocaleString()}원</span>
				</td>
				{inputMode ? (
					<>
						<td>
							<input
								type="number"
								placeholder={buyPrice}
								onChange={handleBuyPriceOnChange}
								min="0.01"
							/>
						</td>
						<td>
							<input
								type="number"
								placeholder={balance}
								onChange={handleBalanceOnChange}
								min="0.01"
							/>
						</td>
					</>
				) : (
					<>
						<td>
							<span>{buyPrice.toLocaleString()}원</span>
						</td>
						<td>
							<span>{balance.toLocaleString()}</span>
						</td>
					</>
				)}
				<td>
					<span> {totalAsset.toLocaleString()} 원</span>
				</td>
				<td>
					<span>{totalBuyPrice.toLocaleString()} 원</span>
				</td>
				{editShow ? (
					<td>
						{inputMode ? (
							<ButtonGroup>
								<Button onClick={handleSubmitClick} variant="primary">
									확인
								</Button>
								<Button onClick={handleCancleClick} variant="danger">
									취소
								</Button>
							</ButtonGroup>
						) : (
							<Button onClick={handleEditClick} variant="success">
								수정
							</Button>
						)}
					</td>
				) : (
					<>
						<td className={profit < 0 ? "text-danger" : "text-success"}>
							<div className="d-flex justify-content-between">
								<span>{profit.toLocaleString()} 원</span>
								<span
									className={
										profitRate < 0 ? "text-danger mx-2 " : "text-success mx-2 "
									}
								>
									{profitRate < 0 ? (
										<i className="fas fa-sort-down align-middle mx-1"></i>
									) : (
										<i className="fas fa-sort-up align-middle mx-1"></i>
									)}
									{profitRate} %
								</span>
							</div>
						</td>
					</>
				)}
			</tr>
		</>
	);
};

export default Asset;
