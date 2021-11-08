import React, { useEffect, useState } from "react";
import { Col, Dropdown, DropdownButton, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import coingecko from "../../../apis/coingecko";

const CoingeckoCoinList = () => {
	const [coins, setCoins] = useState([]);
	const [coinsDisplay, setCoinsDisplay] = useState([]);
  const [favoriteList, setFavoriteList] = useState([
    'Bitcoin',
    'Ethereum',
    'Cardano',
    'EOS',
  ])

	// 첫 랜더링 시 코인 리스트 불러오기
	useEffect(() => {
		const fetchData = async () => {
			const response = await coingecko.get("coins/markets", {
				params: {
					vs_currency: "usd",
				},
			});
			setCoins(response.data);
			setCoinsDisplay(response.data.slice(0, 10));
		};
		fetchData();
	}, []);

  const handleDropdownClick = () => (e) => {
    console.log(e.target.parentNode);
    console.log(1);
  }

	const handleOnChange = () => (e) => {
		let searchedCoins = [];
		coins.forEach((coin) => {
			if (
				coin.name.includes(e.target.value) ||
				coin.id.includes(e.target.value) ||
        coin.symbol.includes(e.target.value)
			) {
				searchedCoins = [...searchedCoins, coin];
			}
		});
		setCoinsDisplay(searchedCoins.slice(0, 10));
	};

	return (
		<>
			<div className="input-box">
				<Col md={4}>
					<InputGroup className="mb-3">
						<DropdownButton
							variant="outline-secondary"
							title="Favorite"
							id="input-group-dropdown-1"
						>
              {
                favoriteList.map((coin,index) => (
                  <Dropdown.Item key={index} onClick = {handleDropdownClick()}>{coin}</Dropdown.Item>
                ))
              }
							<Dropdown.Divider />
							<Dropdown.Item >Edit favorite list</Dropdown.Item>
						</DropdownButton>
						<FormControl placeholder="Insert Coin name" onChange={handleOnChange()} />
					</InputGroup>
				</Col>
			</div>
			<ListGroup>
        <ListGroup.Item>
          <span></span>
          <span>Coin</span>
          <span>Current Price($)</span>
          <span>Market Cap($)</span>
          <span>24h(%)</span>
        </ListGroup.Item>
				{coinsDisplay.map((coin) => (
					<Coin key={coin.id} coin={coin} />
				))}
			</ListGroup>
		</>
	);
};


const Coin = ({ coin }) => {
	return (
		<Link to={`/coin/${coin.id}`} className="text-decoration-none">
      <ListGroup.Item className="coin-item" action variant="light">
        <img src={coin.image} alt={coin.name} />
        <h4>{coin.name}</h4>
        <span>$ {coin.current_price.toLocaleString()}</span>
        <span>$ {coin.market_cap.toLocaleString()}</span>
        {/* 변동률에 따라 색상 설정 */}
        <span
          className={
            coin.price_change_percentage_24h < 0 ? "text-danger" : "text-success"
          }
        >
          {/* 변동률에 따라 화살표 방향 설정 */}
          {coin.price_change_percentage_24h < 0 ? (
            <i className="fas fa-sort-down align-middle mx-1"></i>
          ) : (
            <i className="fas fa-sort-up align-middle mx-1"></i>
          )}

          {coin.price_change_percentage_24h}
        </span>
      </ListGroup.Item>
		</Link>
	);
};

export default CoingeckoCoinList;
