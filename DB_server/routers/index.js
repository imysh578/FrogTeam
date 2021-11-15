const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req);
  console.log(res);
  res.send('DB server!')
})

module.exports = router;