const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");


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
          // 이부분은 어떻게 처리를 해야할지 아직 정확히 모르겠음
          // 서버에서 유저 정보를 받아와야함
          // const A = req.body;(email, password)
          // const todb = axios.post('http://localhost:7000/:id',A);
          // const ok = await axios.get("http://localhost:7000/:id/ok");
          // 이런 느낌의 주소인가?
          // 사용자 정보 보내서 ok받는 것을 이렇게 동시에 쓰는 것인가?
          const ok = 1;
          // 서버에서 사용자 정보에 관한 어떠한 처리를 하고 싶다면, 즉 req.user를 사용하고 싶다면 exUser에 사용자 정보 1회 저장해야함
          const exUser = {
            id: 1234,
            email: "andy3638@naver.com",
            password: "asdf",
          };
          console.log(exUser);
          if (ok == 1) {
            done(null, exUser);
          } else if (ok == 2) {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
          // 여기 done이 index.js에서 serial부터 아래로 내려 간다.
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
