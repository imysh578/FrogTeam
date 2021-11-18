import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AssetList from "./AssetList";
import Total from "./Total";

function sorting (arr, key) {
	arr.sort((a,b)=>{
    if(typeof a[key] == 'string'){
      let A = a[key].toUpperCase();
      let B = b[key].toUpperCase();
      return A.localeCompare(B)
    } else {
      let A = a[key];
      let B = b[key];
      return A-B
    }
  });
}

function removeDuplicates (arr) {
  for (let i = 0; i < arr.length; i++) {
    if(i<arr.length-1){
      if(arr[i].currency === arr[i+1].currency){
        arr[i].balance = Number(arr[i].balance) + Number(arr[i+1].balance);
        arr.splice(i+1,1)
        i-=1;
      } else arr[i].balance = Number(arr[i].balance)
    }
  }
}

function addExchange (arr, exchange) {
	return arr.map(el => (
		el = {...el, exchange: exchange}
	))
}

function getDetails (arr) {
  let coins = [];
  let amount = [];
  let length = arr.length;
  arr.forEach(el => {
    coins = [...coins, el.currency]
    amount = [...amount, el.balance]
  })
  return {coins, amount, length}
}

const Mypage = () => {
	const [tab, setTab] = useState("Total");
	const [assets, setAssets] = useState([]);
	const [totalAssets, setTotalAssets] = useState([]);
	const [prices, setPrices] = useState([]);

	const baseUrl = "http://localhost:5000";
	const upbitData = useAxios({
		method: "GET",
		baseURL: baseUrl,
		url: "upbit/account",
	});
	const binanceData = useAxios({
		method: "GET",
		baseURL: baseUrl,
		url: "binance/account",
	});
	
	useEffect(()=>{
		const fetchPrice = async() => {
			let {coins} = getDetails(totalAssets)
			console.log(coins);
			const coingeckoData = await axios.post(baseUrl+"/coingecko/price", {
				ids: coins,
			});
			let priceList = coingeckoData.data
			setPrices(priceList)
			const temp = [...totalAssets]
			temp.map(el=>{
				if(priceList[el.currency.toLowerCase()]){
					return el = {...el, price : priceList[el.currency.toLowerCase()]}
				} else return el
			})
			console.log(temp);
			setTotalAssets(temp)
		}
		if(totalAssets){
			fetchPrice();
		}
	}, [assets])

	useEffect(() => {
		if (
			!upbitData.loading &&
			upbitData.data &&
			!binanceData.loading &&
			binanceData.data
		) {
			let upbitAssets = addExchange(upbitData.data, 'upbit')
			let binanceAssets = addExchange(binanceData.data, 'binance')
			let totalData= [...upbitAssets, ...binanceAssets]
      let data = [];
			switch (tab) {
				case "Total":
          data = [...totalData];
					break;
				case "Upbit":
          data = [...upbitAssets];
					break;
				case "Binance":
          data = [...binanceAssets];
					break;
				default:
					data = [...totalData];
					break;
        }
				sorting(data, 'currency')
        removeDuplicates(data);
        setAssets(data);
				sorting(totalData, 'exchange')
				setTotalAssets(totalData)
				console.log(data);
				console.log(totalData);
		}
	}, [binanceData.loading, upbitData.loading, tab]);

	const handleAddOnclick = () => {
		console.log("자산 추가!");
	};
	const handleTabClick = () => (e) => {
		console.log(e.target.innerText);
		setTab(e.target.innerText);
	};

	return (
		<div className="Mypage-Container">
			<Total loading={upbitData.loading || binanceData.loading} assets={totalAssets}/>
			<div class="d-flex justify-content-between">
				<ButtonGroup className="mb-2">
					<Button className="tab" onClick={handleTabClick()} variant="success">
						Total
					</Button>
					<Button className="tab" onClick={handleTabClick()} variant="primary">
						Upbit
					</Button>
					<Button className="tab" onClick={handleTabClick()} variant="warning">
						Binance
					</Button>
				</ButtonGroup>
				<ButtonGroup className="mb-2 float-right">
					<Button onClick={handleAddOnclick} variant="danger">
						자산 추가
					</Button>
				</ButtonGroup>
			</div>
			<div className="total">
				<AssetList
					loading={upbitData.loading || binanceData.loading}
					assets={assets}
				/>
			</div>
		</div>
	);
};

export default Mypage;
