const { default: axios } = require("axios");
const express = require("express");
const Coins = require("../models/coins.js");
const Assets = require("../models/assets.js");

const router = express.Router();


router.route('/update').post(async(req,res,next) => {
  try {
    req.body.data.forEach( async (el) => {
      const result = await Assets.update({
        amount: el.balance,
        buyPrice: el.avg_buy_price,
      },{
        where:{
          coinId: el.currency,
          exchange: el.exchange,
          email: 'asdf@asdf',
        }
      })
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
})
router.route('/create').post(async(req,res,next) => {
  try {
    console.log(req.body);
    
    req.body.data.forEach( async (el) => {
      const result = await Assets.create({
        email: 'asdf@asdf',
        exchange: el.exchange,
        coinId: el.currency,
        amount: el.balance,
        buyPrice: el.avg_buy_price,
      })
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
