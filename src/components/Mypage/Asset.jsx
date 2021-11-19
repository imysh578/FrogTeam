import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const Asset = ({ index, asset, editShow }) => {
	const [inputMode, setInputMode] = useState(false);
	const [buyPrice, setBuyPrice] = useState(0);
	const [totalAsset, setTotalAsset] = useState(0);
	const [balance, setBalance] = useState(0);
	const [assetName, setAssetName] = useState(0);
	const [exchange, setExchange] = useState(0);
	const [profit, setProfit] = useState(0);

	const handleEditClick = (e) => {
		e.preventDefault();
		setInputMode(!inputMode);
	};
	const handleSubmitClick = (e) => {
		setInputMode(!inputMode);
	};
	const handleCancleClick = (e) => {
		e.preventDefault();
		setInputMode(!inputMode);
	};

	useEffect(() => {
		const exchange_temp = asset.exchange.toUpperCase();
		const assetName_temp = asset.currency.toUpperCase();
		const balance_temp = Number(Number(asset.balance).toFixed(2)).toLocaleString();
		const totalAsset_temp = Number((Number(asset.price) * Number(asset.balance)).toFixed(0)).toLocaleString();
		const buyPrice_temp = Number(Number(asset.avg_buy_price * Number(asset.balance)).toFixed(0)).toLocaleString();
		console.log(totalAsset_temp-buyPrice_temp);
		const profit_temp = Number(Number(totalAsset_temp) - Number(buyPrice_temp)).toLocaleString();

		setBuyPrice(buyPrice_temp);
		setTotalAsset(totalAsset_temp);
		setBalance(balance_temp);
		setAssetName(assetName_temp);
		setExchange(exchange_temp);
		setProfit(profit_temp);
	}, [asset]);

	return (
		<>
			<tr>
				<th> {index} </th>
				<td>
					{/* <span>거래소</span> */}
					<span>{exchange}</span>
				</td>
				<td>
					{/* <span>보유코인</span> */}
					<span>{assetName}</span>
				</td>
				<td>
					{/* <span> 매수 평균가 </span> */}
					<span>{totalAsset}원</span>
				</td>
				<td>
					{/* <span> 보유 수량 </span> */}
					<span>{balance}</span>
				</td>
				<td>
					{/* <span> 평가 금액 </span> */}
					<span> {totalAsset} 원</span>
				</td>
				<td>
					{/* <span> 매수 금액 </span> */}
					<span>{buyPrice} 원</span>
				</td>
				<td
				// className={
				// 	asset.price_change_percentage_24h < 0
				// 		? "text-danger mx-2"
				// 		: "text-success mx-2"
				// }
				>
					{profit}
				</td>
				<td>
					<span>수익률</span>
					<span
					// className={
					// 	asset.signed_change_rate < 0
					// 		? "text-danger mx-2 "
					// 		: "text-success mx-2 "
					// }
					>
						{/* {" "}
						{asset.signed_change_rate <i 0 ? (
							<i className="fas fa-sort-down align-middle mx-1"></i>
						) : (
							<i className="fas fa-sort-up align-middle mx-1"></i>
						)}
						{(asset.signed_change_rate*100).toFixed(2)} % */}
					</span>
				</td>
				<td>
					{editShow ? (
						inputMode ? (
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
						)
					) : null}
				</td>
			</tr>
		</>
	);
};

export default Asset;
