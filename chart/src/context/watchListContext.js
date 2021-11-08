import React, { useState, createContext, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
	const localWatchList = localStorage.getItem('watchList');
	const [watchList, setWatchList] = useState(localWatchList ? localWatchList.split(',') : [
		"bitcoin",
		"ethereum",
		"ripple",
		"cardano",
	]);

	useEffect(()=>{
		localStorage.setItem('watchList', watchList)
	}, [watchList])

	const addCoin = (coin) => {
		// 리스트에 있는 코인인지 확인
		if(watchList.indexOf(coin) === -1){
			setWatchList([...watchList, coin])
		}
	}

	const deleteCoin = (coin) => {
		setWatchList(watchList.filter(el => el!==coin))
	}

	return (
		<WatchListContext.Provider value={{ watchList, deleteCoin, addCoin }}>
			{props.children}
		</WatchListContext.Provider>
	);
};
