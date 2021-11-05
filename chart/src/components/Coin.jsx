import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ coin, deleteCoin }) => {
	return (
		<Link to={`/coins/${coin.id}`} className="coin text-decoration-none my-1">
			<li className="coinlist-item list-group-item list-group-item-acion d-flex justify-content-between align-items-center text-dark">
				<img className="coinlist-image" src={coin.image} alt={coin.name} />
				<span className="text-decoration-none">$ {coin.current_price}</span>
				<span
					className={
						coin.price_change_percentage_24h < 0
							? "text-danger mx-2"
							: "text-success mx-2"
					}
				>
					{" "}
					{coin.price_change_percentage_24h < 0 ? (
						<i className="fas fa-sort-down align-middle mx-1"></i>
					) : (
						<i className="fas fa-sort-up align-middle mx-1"></i>
					)}
					{coin.price_change_percentage_24h}
				</span>
				<i
					onClick={(e) => {
						e.preventDefault();
						deleteCoin(coin.id);
					}}
					className="delete-icon far fa-times-circle text-danger"
				></i>
			</li>
		</Link>
	);
};

export default Coin;
