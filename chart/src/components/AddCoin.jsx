import {useState, useContext, useEffect} from "react"
import { WatchListContext } from "../context/watchListContext";

const AddCoin = () => {
  const localWatchList = localStorage.getItem('watchList');
  const [isActive, setIsActive] = useState(false);
  const {addCoin} = useContext(WatchListContext);
	const availableCoins = [
		"bitcoin",
		"ethereum",
		"ripple",
		"tether",
		"bitcoin-cash",
		"litecoin",
		"eos",
		"okb",
		"tezos",
		"cardano",
	];


  const notSelectedCoins = availableCoins.filter(item => !localWatchList.includes(item))
  // useEffect(() => {
    
  // }, [notSelectedCoins])

  const handleClick = (coin) => {
    addCoin(coin);
  }

	return (
		<div className="dropdown">
			<button onClick={()=> (setIsActive(!isActive))} className="btn btn-primary dropdown-toggle" type="button">
				Add Coin
			</button>
      <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
        {notSelectedCoins.map(el => (
          <a key={el} href onClick={()=> {
            setIsActive(!isActive)
            handleClick(el)
          }} href="#" className="dropdown-item">{el}</a>
        ))}
      </div>
		</div>
	);
};

export default AddCoin;
