const { Spot } = require("@binance/connector");
const express = require("express");

const router = express.Router();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET_KEY;
const client = new Spot(apiKey, apiSecret);

// // Get account information
// client.account().then((response) => client.logger.log(response.data));

// accountStatus
client.managedSubAccountAssets('alice@test.com').then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))

// // accountSnapshot
// client.accountSnapshot('SPOT')
//   .then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))

// assetDevidendRecord
// client
// 	.assetDevidendRecord()
// 	.then((response) => client.logger.log(response.data))
// 	.catch((error) => client.logger.error(error));

// tradingStatus
// client
// 	.tradingStatus()
// 	.then((response) => client.logger.log(response.data))
// 	.catch((error) => client.logger.error(error));

// // coinInfo
// client.coinInfo()
//   .then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))

router.get('/binace', (req,res) => {
  console.log('Binance');
  res.render('Binance')
})

module.exports = router;