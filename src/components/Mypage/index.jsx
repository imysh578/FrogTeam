import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AssetList from "./AssetList";
import Total from "./Total";

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
      vs_currencies: 'krw',
    }
	});

	useEffect(() => {
		if (
			!upbitData.loading &&
			upbitData.data &&
			!binanceData.loading &&
			binanceData.data
		) {
			let data = [...upbitData.data, ...binanceData.data];
			switch (tab) {
				case "Total":
					setAssets(data);
					break;
				case "Upbit":
					setAssets(upbitData.data);
					break;
				case "Binance":
					setAssets(binanceData.data);
					break;
				default:
					setAssets(data);
					break;
			}
		}
	}, [binanceData.loading, upbitData.loading, tab]);

  useEffect(()=>{
    let coins = []
  
    if(assets){
      assets.forEach((el) => {
        coins = [...coins, el.currency]
      })
    }
    console.log(coins);
  }, [assets])

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
