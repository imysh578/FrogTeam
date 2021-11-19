const express = require("express");
const router = express.Router();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET_KEY;

// ccxt 라이브러리
const ccxt = require("ccxt");
const { default: axios } = require("axios");

// Binance connector 라이브러리
// const { Spot } = require('@binance/connector')
// const client = new Spot(apiKey, apiSecret)
// const baseUrl = "https://api.binance.com"
const coingeckoUrl = "https://api.coingecko.com/api/v3";
const dbUrl = "http://localhost:7000";

const exchangeId = "binance",
	exchangeClass = ccxt[exchangeId],
	exchange = new exchangeClass({
		apiKey: apiKey,
		secret: apiSecret,
	});

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

router
	.route("/account")
	.get(async (req, res, next) => {
		const result = await exchange.fetchBalance();
		const data = result.total;
		let balances = [];

		for (key in data) {
			// 적은 수량 코인은 제외
			if (data[key]>0.01) {
				// symbol을 coin 이름으로 바꿈
				const result = await axios.get(dbUrl + `/coins/query/${key}`);
				balances = [
					...balances,
					{ currency: result.data[0]["id"], balance: Number(data[key]) },
				];
			}
		}
    res.locals.data = balances;
    next()
	})
	.get(async (req, res, next) => {
		try {
			let { currencyList } = getDetails(res.locals.data);
			const coingeckoData = await axios.post(
				"http://localhost:5000/coingecko/price",
				{
					ids: currencyList,
				}
			);
			let priceList = coingeckoData.data;
			let temp = [...res.locals.data];
			temp = temp.map((el) => {
				if (priceList[el.currency.toLowerCase()]) {
					el = {
						...el,
						email: req.user.user.email,
						price: Number(priceList[el.currency.toLowerCase()].krw),
						exchange: 'binance',
            avg_buy_price: 0,
					};
				}
				return el;
			});
			// DB에 있는 assets 체크, 있으면 그 값으로 변경
			const {data} = await axios.post(dbUrl+'/assets/check',{
				data: temp,
			})
			res.send(data);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	;

module.exports = router;
