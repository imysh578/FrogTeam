const { default: axios } = require('axios');
const express = require('express');

const router = express.Router();

router.route('/').post( async (req,res,next) => {
  const data = req.body;
  console.log(data);
  const result = await axios.post(`http://localhost:7000/signin`, data);
  console.log(result.data);
  res.send(result.data)
})

module.exports = router;