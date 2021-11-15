const { default: axios } = require('axios');
const express = require('express');

const router = express.Router();

router.route('/:email/:password').post( async (req,res,next) => {
  const result = await axios.get(`http://localhost:7000/signin/${req.params.email}/${req.params.password}`);
  console.log(result.data);
})

module.exports = router;