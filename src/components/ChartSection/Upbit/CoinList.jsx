import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { upbit} from "../../../apis/configs";
import Coin from "./Coin";

const CoinList = () => {
	const [coins, setCoins] = useState([]);
	const [coinsDisplay, setCoinsDisplay] = useState([]);

	// 첫 랜더링 시 코인 리스트 불러오기
	useEffect(() => {
		const fetchData = async () => {
      // 업비트 코인 리스트 불러오기
			const response = await upbit.get('/market/all')

      // BTC 마켓 제외하고 찾기
      const coinList = response.data.filter((el)=>el.market.includes('KRW'))
      const markets = coinList.map((el) => el.market).toString()
			
			// 업비트 가격 데이터 불러오기
			const tickerData = await upbit.get('ticker', {
				params: {
					markets : markets
				}
			})

      // 불러온 두 데이터 합치기
      const mergedData = coinList.map((el, index)=>{
        return {...el, ...tickerData.data[index]}
      })
      
			setCoins(mergedData);
			setCoinsDisplay(mergedData.slice(0, 10));
		};
		fetchData();
	}, []);

	const handleOnChange = () => (e) => {
		let searchedCoins = [];
		coins.forEach((coin) => {
			if (
				coin.english_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
				coin.korean_name.includes(e.target.value) ||
        coin.market.slice(4,).includes(e.target.value.toUpperCase())
			) {
				searchedCoins = [...searchedCoins, coin];
			}
		});
		setCoinsDisplay(searchedCoins.slice(0, 10));
	};

	return (
		<>
			<Col md={4} className="my-3 input-box">
				<InputGroup>
					<FormControl placeholder="Insert Coin name" onChange={handleOnChange()} />
				</InputGroup>
			</Col>
			<ListGroup className="coinlist-box">
        <div className="col-title list-group-item list-group-item-acion d-flex justify-content-between align-items-center text-light bg-primary">
					<span className="item0"></span>
          <span className="item1">한글명</span>
          <span className="item2">현재가</span>
					<span></span>
          <span className="item3">전일대비(%)</span>
          <span className="item4">거래대금(₩)</span>
        </div>
				{coinsDisplay.map((coin) => (
					<Coin key={coin.market} coin={coin} />
				))}
			</ListGroup>
		</>
	);
};




export default CoinList;
