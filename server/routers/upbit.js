const express = require("express");
const path = require("path");
const axios = require("axios");
const uuidv4 = require("uuid/v4");
const router = express.Router();

const sign = require("jsonwebtoken").sign;

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const server_url = "https://api.upbit.com/v1";

const payload = {
  access_key: access_key,
  nonce: uuidv4(),
};

const token = sign(payload, secret_key);

router.route("/account").get(async (req, res, next) => {
  try {
    console.log("account router");
    const { data } = await axios.get(server_url + "/accounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(data){
      res.send(data.slice(1,));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.route("/market/all").get(async (req, res, next) => {
  try {
    console.log("market router");
    const result = await axios.get(server_url + "/market/all");
    res.send(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.route("/ticker").post(async (req, res, next) => {
  try {
    console.log("ticker router");
    const result = await axios.get(server_url + "/ticker", {
      params: {
        markets: req.body.markets,
      },
    });
    res.send(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
