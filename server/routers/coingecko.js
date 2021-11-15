const express = require("express");
const axios = require("axios");
const router = express.Router();

const coingeckoUrl = "https://api.coingecko.com/api/v3";

router.route("/coinlist/").get(async (req, res, next) => {
	try {
    console.log(req.params.id);
		const result = await axios.request({
      method: "GET",
      baseURL: coingeckoUrl,
      url: `/coins/markets/`,
      params: {
        vs_currency: "usd",
      },
    });
		const data = result.data;
		console.log("Data transfer success!");
		// 데이터 클라이언트에 보냄!!
		res.send(data);
	} catch (error) {
		console.log(error);
		next(error);
	} finally {
		console.log("From Coingecko API Router");
	}
});

router.route("/coinlist/:id").get(async (req, res, next) => {
	try {
    console.log(req.params.id);
		const result = await axios.request({
      method: "GET",
      baseURL: coingeckoUrl,
      url: `/coins/markets/`,
      params: {
        vs_currency: "usd",
        ids: req.params.id,
      },
    });
		const data = result.data;
		console.log("Data transfer success!");
		// 데이터 클라이언트에 보냄!!
		res.send(data);
	} catch (error) {
		console.log(error);
		next(error);
	} finally {
		console.log("From Coingecko API Router");
	}
});

router.route("/chart/:id/:days").get(async (req, res, next) => {
	try {
		const result = await axios.request({
			method: "GET",
			baseURL: coingeckoUrl,
			url: `/coins/${req.params.id}/market_chart`,
			params: {
				vs_currency: "usd",
				days: req.params.days,
			},
		});
		res.send(result.data);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
