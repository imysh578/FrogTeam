const express = require("express");
const path = require("path");
const axios = require("axios");

const router = express.Router();

const dbUrl = 'http://localhost:7000'

router.route("/edit").post(async (req, res, next) => {
  try {
    const data = req.body;
    const result = await axios.post(dbUrl+'/assets/edit', data)
    
    res.send('Edit success!')
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.route("/create").post(async (req, res, next) => {
  try {
    const data = req.body;
    const result = await axios.post(dbUrl+'/assets/create', data)
    res.send('Create success!')
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
