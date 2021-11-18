const { default: axios } = require("axios");
const express = require("express");
const Coins = require("../models/coins.js");
const Users = require("../models/users.js");

const router = express.Router();

router.get('/', (req,res) => {
  res.send('DB server!')
})

router.get("/userSession", (req, res) => {

  const user = Users.findOne({
    where: { email: req.query.ID },
  });

  res.json(user);
});
module.exports = router;
