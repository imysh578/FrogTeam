import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";

const baseUrl = "http://localhost:5000";

const Asset = ({ index, asset, editShow }) => {
	const [inputMode, setInputMode] = useState(false);
	const [buyPrice, setBuyPrice] = useState(asset.avg_buy_price);
	const [price, setPrice] = useState(asset.price);
	const [totalBuyPrice, setTotalBuyPrice] = useState(0);
	const [totalAsset, setTotalAsset] = useState(0);
	const [balance, setBalance] = useState(asset.balance);
	const [assetName, setAssetName] = useState(asset.currency);
	const [exchange, setExchange] = useState(asset.exchange);
	const [profit, setProfit] = useState(0);
	const [profitRate, setProfitRate] = useState(0);

	const [inputBuyPrice, setInputBuyPrice] = useState(0);
	const [inputBalance, setInputBalance] = useState(0);

	// 로그인 정보 불러오기
	const signIn = useAxios({
    method: "get",
    baseURL: "http://localhost:5000",
    url: "auth/session",
  });

	// 버튼 핸들러
	const handleEditClick = (e) => {
		e.preventDefault();
		setInputMode(!inputMode);
	};
	const handleSubmitClick = (e) => {
		e.preventDefault();
		if (inputBuyPrice) setBuyPrice(inputBuyPrice);
		if (inputBalance) setBalance(inputBalance);
		setInputMode(!inputMode);
	};
	const handleCancleClick = (e) => {
		e.preventDefault();
		setInputMode(!inputMode);
	};

	// input 값 핸들러
	const handleBuyPriceOnChange = (e) => {
		setInputBuyPrice(e.target.value);
	};
	const handleBalanceOnChange = (e) => {
		setInputBalance(e.target.value);
	};

	useEffect(() => {
		const exchange_temp = exchange.toUpperCase();
		const assetName_temp = assetName.toUpperCase();
		const balance_temp = Number(Number(balance).toFixed(2));
		const price_temp = Number(Number(price).toFixed(2));
		const averageBuyPrice_temp = Number(Number(buyPrice).toFixed(2));
		const totalAsset_temp = Number(
			(Number(price) * Number(balance)).toFixed(0)
		);
		const totalBuyPrice_temp = Number(
			Number(buyPrice * Number(balance)).toFixed(0)
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

	useEffect( async ()=>{
		if(signIn){
			const result = await axios.post(baseUrl + "/assets/edit", {
				email: signIn.data.user.email,
				exchange: exchange,
				coinId: assetName,
				amount: Number(balance),
				buyPrice: Number(buyPrice),
			});
		}
	}, [inputMode])
	
	return (
		<>
			<tr>
				<th> {index} </th>
				<td>
					<span>{assetName}</span>
				</td>
				<td>
					<span>{price.toLocaleString()}원</span>
				</td>
				{(editShow & inputMode) ? (
					<>
						<td>
							<input
								className="w-50"
								type="number"
								placeholder={buyPrice}
								onChange={handleBuyPriceOnChange}
								min="0.01"
							/>
						</td>
						<td>
							<input
								className="w-50"
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
								<Button onClick={handleSubmitClick} variant="primary" size="sm">
									확인
								</Button>
								<Button onClick={handleCancleClick} variant="danger" size="sm">
									취소
								</Button>
							</ButtonGroup>
						) : (
							<Button onClick={handleEditClick} variant="success" size="sm">
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
