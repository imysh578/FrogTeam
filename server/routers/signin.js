const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  const data = req.body;
  console.log("Request user info to DB server");
  const result = await axios.post(`http://localhost:7000/signin`, data);
  console.log("Received user info from DB server");
  res.send(result.data);
});

module.exports = router;
