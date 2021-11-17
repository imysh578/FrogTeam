const express = require("express");
const router = express.Router();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET_KEY;

// ccxt 라이브러리
const ccxt = require("ccxt");

// Binance connector 라이브러리
// const { Spot } = require('@binance/connector')
// const client = new Spot(apiKey, apiSecret)
// const baseUrl = "https://api.binance.com"

const exchangeId = "binance",
	exchangeClass = ccxt[exchangeId],
	exchange = new exchangeClass({
		apiKey: apiKey,
		secret: apiSecret,
	});

router.route("/account").get(async (req, res, next) => {
	const result = await exchange.fetchBalance();
  const data = result.total;
  let balances = []
  for(key in data) {
    if(data[key] != 0) {
      balances = [...balances, {currency: key, balance: data[key]}]
    }
  }
  console.log(data);
	res.send(balances);
});

module.exports = router;
