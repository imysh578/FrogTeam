import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Details from "./Details";
import Total from "./Total";

/* 컴포넌트에서 사용하는 함수들 */
function sorting(arr, key) {
	arr.sort((a, b) => {
		if (typeof a[key] == "string") {
			let A = a[key].toUpperCase();
			let B = b[key].toUpperCase();
			return A.localeCompare(B);
		} else {
			let A = a[key];
			let B = b[key];
			return A - B;
		}
	});
}

function removeDuplicates(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (i < arr.length - 1) {
			if (arr[i].currency === arr[i + 1].currency) {
				arr[i].balance = Number(arr[i].balance) + Number(arr[i + 1].balance);
				arr.splice(i + 1, 1);
				i -= 1;
			} else arr[i].balance = Number(arr[i].balance);
		}
	}
}


function getDetails(arr) {
	let currencyList = [];
	let balanceList = [];
	let length = arr.length;
	arr.forEach((el) => {
		currencyList = [...currencyList, el.currency];
		balanceList = [...balanceList, el.balance];
	});
	return { currencyList, balanceList, length };
}

/* 마이페이지 */
const Mypage = () => {
	const [tab, setTab] = useState("Total");
	const [assets, setAssets] = useState([]);
	const [totalAssets, setTotalAssets] = useState([]);
	const [content, setContent] = useState(true);

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
	console.log(upbitData.data)
	useEffect(() => {
		if (
			!upbitData.loading &&
			upbitData.data &&
			!binanceData.loading &&
			binanceData.data
		) {
			let upbitAssets = [...upbitData.data];
			let binanceAssets = [...binanceData.data];
			let totalData = [...upbitAssets, ...binanceAssets];
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
			sorting(data, "currency");
			removeDuplicates(data);
			setAssets(data);
			sorting(totalData, "exchange");
			setTotalAssets(totalData);
		}
	}, [binanceData.loading, upbitData.loading, tab]);

	const handleTabClick = (e) => {
		console.log(e.target.innerText);
		setTab(e.target.innerText);
	};
	const handleDetailClick = () => {
		setContent(!content)
	}

	return (
		<div className="Mypage-Container">
			<Button className="mb-4" onClick={handleDetailClick} variant={content ? "danger" : "primary"} >
				{content ? '자세히' : '차트보기'}
			</Button>
			{content ? (
				<Total
					loading={upbitData.loading || binanceData.loading}
					assets={totalAssets}
				/>
			) : (
				<Details
					handleTabClick={handleTabClick}
					loading={upbitData.loading || binanceData.loading}
					assets={assets}
				/>
			)}
		</div>
	);
};

export default Mypage;
