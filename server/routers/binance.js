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
const dbUrl = "http://localhost:7000"

const exchangeId = "binance",
	exchangeClass = ccxt[exchangeId],
	exchange = new exchangeClass({
		apiKey: apiKey,
		secret: apiSecret,
	});

router.route("/account")
.get(async (req, res, next) => {
	const result = await exchange.fetchBalance();
  const data = result.total;
  let balances = []
  for(key in data) {
    // 적은 수량 코인은 제외
    if(data[key]) {
      // symbol을 coin 이름으로 바꿈
      const result = await axios.get(dbUrl + `/coins/query/${key}`)
      balances = [...balances, {currency: result.data[0]['id'], balance: Number(data[key]) }]
    }
  }
	res.send(balances);
});


module.exports = router;
