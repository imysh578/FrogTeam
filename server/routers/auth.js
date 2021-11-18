const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const axios = require("axios");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  try {
    const { email, password } = await req.body;
    const result = await axios.post("http://localhost:7000/signup", {
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  try {
    // passport를 이용하면 req.session 객체에 정보를 넣는게 쉬워서 사용하는 것이다.
    // localStrategy로 감
    passport.authenticate("local", (authError, user, info) => {
      // 서버에러 시
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info.message}`);
      }
      //req.login이 serializeUser 실행
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect("/");
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  } catch {
    console.log("얘도 확인");
  }
});

router.post("/key", isLoggedIn, async (req, res, next) => {
  try {
    const accessKey = await req.body.Access;
    const secretKey = await req.body.Secret;
    const whatKey = await req.body.whatKey;
    const user = await req.session;

    const result = await axios.post("http://localhost:7000/apikey", {
      accessKey,
      secretKey,
      whatKey,
      user,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/session", isLoggedIn, (req, res) => {
  res.json(req.session);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;