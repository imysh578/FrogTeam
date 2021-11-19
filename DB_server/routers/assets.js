const { default: axios } = require("axios");
const express = require("express");
const Coins = require("../models/coins.js");

const router = express.Router();


router.route('/query/:symbol').get( async (req,res,next) => {
  try {
    const coins = await Coins.findAll({
      where: { symbol: req.params.symbol },
    });
    res.send(coins)
  } catch (err) {
    console.error(err);
    next(err);
  }
})


module.exports = router;
