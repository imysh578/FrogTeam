const express = require("express");
const Users = require("../models/users.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("DB server!");
});

router.get("/userSession", async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.query.ID },
    });
    // const a = 3;
    res.json(user);
  } catch {
    console.log("세션 에러");
  }
});
module.exports = router;
