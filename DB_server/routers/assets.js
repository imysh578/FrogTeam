const { default: axios } = require("axios");
const express = require("express");
const Assets = require("../models/assets.js");

const router = express.Router();


router.route('/edit').post(async(req,res,next) => {
  try {
    const data = req.body;
    console.log(data);
    const read = await Assets.findOne({
      where:{
        email: data.email,
        exchange: data.exchange,
        coinId: data.coinId,
      }
    })
    console.log(read);
    if (read === null) {
      const create = await Assets.create({
        email: 'asdf@asdf',
        exchange: data.exchange,
        coinId: data.coinId,
        amount: data.amount,
        buyPrice: data.buyPrice,
      })
    } else {
      const update = await Assets.update({
        amount: data.amount,
        buyPrice: data.buyPrice,
      },{
        where:{
          coinId: data.coinId,
          exchange: data.exchange,
          email: 'asdf@asdf',
        }
      })
    }

    res.send('Edit success!')
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.route('/check').post(async(req,res,next) => {
  try {
    const data = req.body.data;
    console.log(data);
    data.forEach((el)=>{
      const read = await Assets.findOne({
        where:{
          email: 'asdf@asdf',
          exchange: el.exchange,
          coinId: el.currency,
        }
      })
      if(read !== null) {
        el.avg_buy_price = read.buyPrice;
        el.balance = read.amount;
      }
    })
    console.log(data);

    res.send(data)
  } catch (err) {
    console.error(err);
    next(err);
  }
})



// router.route('/update').post(async(req,res,next) => {
//   try {
//     req.body.data.forEach( async (el) => {
//       const result = await Assets.update({
//         amount: el.balance,
//         buyPrice: el.avg_buy_price,
//       },{
//         where:{
//           coinId: el.currency,
//           exchange: el.exchange,
//           email: 'asdf@asdf',
//         }
//       })
//     })
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// })
// router.route('/create').post(async(req,res,next) => {
//   try {
//     console.log(req.body);
    
//     req.body.data.forEach( async (el) => {
//       const result = await Assets.create({
//         email: 'asdf@asdf',
//         exchange: el.exchange,
//         coinId: el.currency,
//         amount: el.balance,
//         buyPrice: el.avg_buy_price,
//       })
//     })
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// })

module.exports = router;
