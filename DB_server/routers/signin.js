const express = require('express');
const Users = require('../models/users.js');

const router = express.Router();

router.route('/:email/:password').get( async (req,res,next) => {
  try {
    console.log('Signin DB server');
    const user = await Users.findOne({
      where: {
        email : req.params.email,
        password: req.params.password,
      }
    })
    console.log(user);
    res.send(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;