import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AssetList from "./AssetList";
import Total from "./Total";

function removeDuplicates (arr) {
  arr.sort((a,b)=>{
    let currencyA = a.currency.toUpperCase(); // ignore upper and lowercase
    let currencyB = b.currency.toUpperCase(); // ignore upper and lowercase
    return currencyA.localeCompare(currencyB)
  });

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

const Mypage = () => {
	const [tab, setTab] = useState("Total");
	const [assets, setAssets] = useState([]);
	const [assetList, setAssetList] = useState([]);

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
	const coingeckoData = useAxios({
		method: "GET",
		baseURL: baseUrl,
		url: "coingecko/price",
		params: {
			assets,
			vs_currencies: "krw",
		},
	});

	useEffect(() => {
		if (
			!upbitData.loading &&
			upbitData.data &&
			!binanceData.loading &&
			binanceData.data
		) {
      let data = [];
			switch (tab) {
				case "Total":
          data = [...upbitData.data, ...binanceData.data,];
					break;
				case "Upbit":
          data = [...upbitData.data,];
					break;
				case "Binance":
          data = [...binanceData.data,];
					break;
				default:
					data = [...upbitData.data, ...binanceData.data,];
					break;
        }
        removeDuplicates(data);
        setAssets(data);
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
			<Total loading={upbitData.loading || binanceData.loading} />
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
