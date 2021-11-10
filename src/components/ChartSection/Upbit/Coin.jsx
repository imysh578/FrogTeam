import React from 'react'
import { Link } from 'react-router-dom';

const Coin = ({coin, index}) => {
  
  return (
		<>
			<tr>
				<th scope="row"> {index} </th>
				<td>
					<Link to={`/coins/${coin.id}`} className="text-decoration-none ">
					<span>{coin.korean_name}</span>
					</Link>
				</td>
				<td>
					<span className="item2"> {coin.trade_price.toLocaleString()} 원</span>
				</td>
				<td>
				<span
						className={
							coin.signed_change_rate < 0
								? "text-danger mx-2 item3"
								: "text-success mx-2 item3"
						}
					>
						{" "}
						{coin.signed_change_rate < 0 ? (
							<i className="fas fa-sort-down align-middle mx-1"></i>
						) : (
							<i className="fas fa-sort-up align-middle mx-1"></i>
						)}
						{(coin.signed_change_rate*100).toFixed(2)} %
					</span>
				</td>
				<td
					className={
						coin.price_change_percentage_24h < 0
							? "text-danger mx-2"
							: "text-success mx-2"
					}
				>
					<span className="item4"> {Math.floor(coin.acc_trade_price_24h/1000000)}백만 </span>
				</td>
			</tr>
			{/* <Link to={`/coins/${coin.english_name}`} className="text-decoration-none ">
				<div className="coinlist-item list-group-item d-flex justify-content-between align-items-center text-light bg-dark">
					<div className="item0" />
					<span className="item1"> {coin.korean_name}</span>
					<span className="item2"> {coin.trade_price.toLocaleString()} 원</span>
					<span
						className={
							coin.signed_change_rate < 0
								? "text-danger mx-2 item3"
								: "text-success mx-2 item3"
						}
					>
						{" "}
						{coin.signed_change_rate < 0 ? (
							<i className="fas fa-sort-down align-middle mx-1"></i>
						) : (
							<i className="fas fa-sort-up align-middle mx-1"></i>
						)}
						{(coin.signed_change_rate*100).toFixed(2)} %
					</span>
					<span className="item4"> {Math.floor(coin.acc_trade_price_24h/1000000)}백만 </span>
				</div>
			</Link> */}
		</>
	);
}

export default Coin
