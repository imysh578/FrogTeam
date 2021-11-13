const express = require("express");
const path = require("path");
const axios = require("axios");
const router = express.Router();

const coingeckoUrl = "https://api.coingecko.com/api/v3";
const params = {
  method: "GET",
  baseURL: coingeckoUrl,
  url: "/coins/markets",
  params: {
    vs_currency: "usd",
    per_page: 250,
  },
};

router.route("/").get(async (req, res, next) => {
  try {
    const result = await axios.request(params);
    const data = result.data;

    // 데이터 클라이언트에 보냄!!
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    console.log("It is Coingecko API Router");
  }
});

module.exports = router;
