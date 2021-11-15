const passport = require("passport");
const local = require("./localStrategy");
const axios = require("axios");

const User = require("../../models/user");

module.exports = () => {
  // 이부분 잠시 대기
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const 확인 = await axios.get("/localhost:db서버");
    // if (확인) {
    //   (user) => done(null, user);
    // } else {
    //   (err) => done(err);
    // }
  });
  local();
};
