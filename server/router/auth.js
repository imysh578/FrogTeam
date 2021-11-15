const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../../models/user");
const axios = require("axios");

const router = express.Router();

router.get("/aa", () => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "/pra.html"));
});

router.get("/join", isNotLoggedIn, async (req, res, next) => {
  try {
    // 리액트 클라 부분에서 login, join 컴포넌트 하나 만들고 거기에 아래 axios.post를 적어주자
    // db로 쏴주는 post 클라에 적어줘야 할듯
    // const 유저정보 = { 이메일, 비밀번호 };
    // 유저정보 = await axios.post("http://localhost:7000");

    // db서버에서 우리로 값 받아오기
    // const { ok } = await axios.get("http://localhost:7000");
    const ok = null;

    if (ok) {
      // 아이디 이미 있어용
      return res.redirect("/join?error=exist");
    }

    // 가입 완료 alert 넣어주기
    console.log("회원가입 완료");
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/login", isNotLoggedIn, (req, res, next) => {
  // passport/localStrategy 에서 email, password를 매개변수로 받았기 때문에
  // 아직 컴포넌트가 없어서 get으로 바꾸고 req.query에 적어서 잘 되는지 확인했습니다. 컴포넌트 완성되면 req.query~는 지워야함
  req.query.email = "andy3638@naver.com";
  req.query.password = "asd";

  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
