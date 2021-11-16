const express = require("express");
const Users = require("../models/users.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("DB server!");
});

router.get("/userSession", (req, res) => {
  console.log(req);

  const user = Users.findOne({
    where: { email: req.query.ID },
  });

  res.json(user);
});
module.exports = router;
