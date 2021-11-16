const express = require("express");
const Users = require("../models/users.js");

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  try {
    console.log("Signin DB server");
    console.log(req.body);
    const user2 = await Users.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    const user1 = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (user1 && !user2) {
      res.json(2);
    } else if (user2) {
      res.json(user2);
    } else res.json(3);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
