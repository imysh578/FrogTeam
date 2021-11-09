import React from 'react'
import { Link } from 'react-router-dom';

const Coin = ({ coin }) => {
	return (
		<Link to={`/coins/${coin.id}`} className="text-decoration-none ">
			<div className="coinlist-item list-group-item d-flex justify-content-between align-items-center text-light bg-dark">
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

export default Coin
