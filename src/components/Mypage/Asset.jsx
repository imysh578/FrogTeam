import React from "react";

const Asset = ({ index, asset }) => {
	return (
		<>
			<tr>
				<th> {index} </th>
				<td>
					{/* <span>보유코인</span> */}
					<span>{asset.currency}</span>
				</td>
				<td>
					{/* <span> 매수 평균가 </span> */}
					<span > {asset.avg_buy_price ?
					Number(Number(asset.avg_buy_price).toFixed(0)).toLocaleString() : 0} 원</span>
				</td>
				<td>
					{/* <span> 보유 수량 </span> */}
					<span > {Number(Number(asset.balance).toFixed(2)).toLocaleString()}</span>
				</td>
				<td>
					<span> 평가 금액 </span>
					{/* <span > {asset.avg_buy_price ?
					Number(asset.avg_buy_price) * Number(asset.balance) : 0} 원</span> */}
				</td>
				<td>
					{/* <span> 매수 금액 </span> */}
					<span > {asset.avg_buy_price ?
					Number((Number(asset.avg_buy_price) * Number(asset.balance)).toFixed(0)).toLocaleString() : 0} 원</span>
				</td>
				<td
				// className={
				// 	asset.price_change_percentage_24h < 0
				// 		? "text-danger mx-2"
				// 		: "text-success mx-2"
				// }
				>
					<span> 평가 수익 </span>
					{/* <span > {Math.floor(asset.acc_trade_price_24h/1000000)}백만 </span> */}
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
			</tr>
		</>
	);
};

export default Asset;
