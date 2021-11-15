const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('DB server!')
})

router.get('/userSession',(req,res)=>{

  console.log(req);
  // const user = User.findOne({
  //   where: { req.query.ID },})
  res.json(1);
})
module.exports = router;