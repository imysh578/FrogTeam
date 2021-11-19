const express = require("express");
const path = require("path");
const axios = require("axios");
const uuidv4 = require("uuid/v4");
const router = express.Router();

const sign = require("jsonwebtoken").sign;

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const server_url = "https://api.upbit.com/v1";
const dbUrl = "http://localhost:7000";

const payload = {
	access_key: access_key,
	nonce: uuidv4(),
};

const token = sign(payload, secret_key);

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
  // 내 자산 정보 불러오기
	.get(async (req, res, next) => {
		try {
			console.log("account router");
			const { data } = await axios.get(server_url + "/accounts", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (data) {
				// symbol을 coin 이름으로 바꿈
				for (let i = 0; i < data.length; i++) {
					const result = await axios.get(
						dbUrl + `/coins/query/${data[i].currency}`
					);
					if (result.data[0]) {
						data[i].currency = result.data[0].id;
					}
				}
			}
			res.locals.data = data.slice(1);
			next();
		} catch (error) {
			console.error(error);
			next(error);
		}
	})
  // 가격 정보 추가
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
						email:'asdf@asdf',
						price: Number(priceList[el.currency.toLowerCase()].krw),
						exchange: 'upbit',
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
