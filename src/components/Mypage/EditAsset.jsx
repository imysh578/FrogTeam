import React from "react";

const EditAsset = ({ index, asset }) => {
  return(
    <div>
      <h1>EditAsset</h1>
    </div>
  )
	// return (
	// 	<>
	// 		<tr>
	// 			<th> {index} </th>
	// 			<td>
	// 				{/* <span>보유코인</span> */}
	// 				<span>{asset.currency}</span>
	// 			</td>
	// 			<td>
	// 				{/* <span> 매수 평균가 </span> */}
	// 				<input
	// 					type="number"
	// 					name=""
	// 					value={
	// 						asset.avg_buy_price
	// 							? Number(
	// 									Number(asset.avg_buy_price).toFixed(0)
	// 							).toLocaleString()
	// 							: 0
	// 					}
	// 				/>
	// 			</td>
	// 			<td>
	// 				{/* <span> 보유 수량 </span> */}
	// 				<input
	// 					type="number"
	// 					name=""
	// 					value={Number(Number(asset.balance).toFixed(2)).toLocaleString()}
	// 				/>
	// 			</td>
	// 			<td>
	// 				{/* <span> 평가 금액 </span> */}
	// 				<input type="number" name="" />
	// 			</td>
	// 			<td>
	// 				{/* <span> 매수 금액 </span> */}
	// 				<input
	// 					type="number"
	// 					value={
	// 						asset.avg_buy_price
	// 							? Number(
	// 									(
	// 										Number(asset.avg_buy_price) * Number(asset.balance)
	// 									).toFixed(0)
	// 							).toLocaleString()
	// 							: 0
	// 					}
	// 				/>
	// 			</td>
	// 			<td>
	// 				{/* <span> 평가 수익 </span> */}
	// 				<input type="number" name="" />
	// 			</td>
	// 			<td>
	// 				{/* <span>수익률</span> */}
	// 				<input type="number" name="" />
	// 			</td>
	// 		</tr>
	// 	</>
	// );
};

export default EditAsset;
