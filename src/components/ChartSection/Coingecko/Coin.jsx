import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ coin, index }) => {
	return (
		<>
			<tr>
				<th> {index} </th>
				<td>
					<img src={coin.image} alt={coin.name} />
				</td>
				<td>
					<Link to={`/coins/${coin.id}`} className="text-decoration-none ">
						<span className="text-light">{coin.name}</span>
					</Link>
				</td>
				<td>
					<span>$ {coin.current_price.toLocaleString()}</span>
				</td>
				<td>
					<span>$ {coin.market_cap.toLocaleString()}</span>
				</td>
				<td
					className={
						coin.price_change_percentage_24h < 0
							? "text-danger mx-2"
							: "text-success mx-2"
					}
				>
					<span>
						{coin.price_change_percentage_24h < 0 ? (
							<i className="fas fa-sort-down align-middle mx-1"></i>
						) : (
							<i className="fas fa-sort-up align-middle mx-1"></i>
						)}
						{coin.price_change_percentage_24h.toFixed(2)} %
					</span>
				</td>
			</tr>
		</>
	);
};

export default Coin;
