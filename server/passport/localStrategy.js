const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const axios = require('axios')


module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // 로그인 경우 db에서 ok 받아올때 ok인지 아예 아이디가 없는지 비밀번호가 다른지로 나누자
          const ok = await axios.get("http://localhost:7000");
          // if (ok) {
          //   done(null, exUser);
          // }
          // else if(조건) {
          //   done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          // }
          // else {
          //   done(null, false, { message: "가입되지 않은 회원입니다." });
          // }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
