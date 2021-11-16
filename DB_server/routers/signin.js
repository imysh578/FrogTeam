const express = require("express");
const Users = require("../models/users.js");

const router = express.Router();

const CryptoJS = require("crypto-js");
const encryptKey = process.env.ENCRYPT_KEY || "1234!@#";

router.route("/").post(async (req, res, next) => {
  try {
    console.log("Searching user info in DB server");
    const encryptedData = req.body.user;
    const decryptedData = JSON.parse(
      CryptoJS.AES.decrypt(encryptedData, encryptKey).toString(
        CryptoJS.enc.Utf8
      )
    );

    const user = await Users.findOne({
      where: {
        email: decryptedData.email,
        // password: decryptedData.password,
      },
    });
    // console.log(user.dataValues);
    if (user) {
      console.log("가입되어 있는 유저");
      if (decryptedData.password === user.dataValues.password) {
        console.log("로그인 성공!");
        res.send({ sign_in: true, sign_up: true });
      } else {
        console.log("비밀번호 틀림");
        res.send({ sign_in: false, sign_up: true });
      }
    } else {
      console.log("가입되어 있지 않은 이메일");
      res.send({ sign_in: false, sign_up: false });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
