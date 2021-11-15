const { default: axios } = require('axios');
const express = require('express');

const router = express.Router();

router.route('/').post( async (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = await axios.get(`http://localhost:7000/signin/${email}/${password}`);
  console.log(result.data);
})

module.exports = router;