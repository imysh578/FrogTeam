const express = require('express');
const Users = require('../models/users.js');

const router = express.Router();

router.route('/').post( async (req,res,next) => {
  try {
    console.log('Signup DB server');
    const hash = await bcrypt.hash(req.body.password, 12);

    await Users.create({
        email : req.body.email,
        password : hash
    });
    res.send('회원가입 완료');

  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;