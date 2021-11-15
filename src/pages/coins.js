// import axios from "axios";
import React, { useEffect, useState } from "react";
import ChartSection from "../components/ChartSection";

const Coin = () => {
	// // 서버에서 보낸 데이터 받아오기 성공!!
	// const [data, setData] = useState();

	// const callAPI = async () => {
	// 	try {
	// 		const url = "http://localhost:5000/";
	// 		const result = await axios.request({
	// 			method: "GET",
	// 			baseURL: url,
  //       url: 'coingecko'
	// 		});
  //     console.log(result.data);
  //     setData(result.data)
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
  
	// useEffect(() => {
	// 	console.log("*********** server data transfer test ***********");
	// 	callAPI();
	// }, []);

	return (
		<>
			<ChartSection />
		</>
	);
};

export default Coin;
