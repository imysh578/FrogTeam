const express = require("express");
const path = require("path");
const axios = require('axios');

const router = express.Router();


const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign


const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY
const server_url = process.env.UPBIT_OPEN_API_SERVER_URL

console.log(access_key);
console.log(secret_key);
const payload = {
    access_key: access_key,
    nonce: uuidv4(),
}

const token = sign(payload, secret_key)

const options = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: {Authorization: `Bearer ${token}`},
}

router.route("/").get(async (req, res, next) => {
	try {
    const { data } = await axios.get(
      "https://api.upbit.com/v1/accounts", {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(data);
    res.send('asdf')
		res.sendFile(path.join(__dirname, "../../build/index.html"));
	} catch (error) {
    console.error(error);
		next(error);
	}
});

module.exports = router;
