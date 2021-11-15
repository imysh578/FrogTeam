const passport = require("passport");
const local = require("./localStrategy");
const axios = require("axios");

// const User = require("../models/user");

// 세션 저장하는 곳
module.exports = () => {
  // 처음 로그인 시 사용자 user.id 저장해놓는 곳(user 전체를 세션에 받으면 너무 무겁기 때문에 여기서 db의 id만 받아놓고 필요할 때 deserial에서 사용자 정보 찾아서 이용)
  // 여기 user가 localStrategy의 exUser임
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 사용자 정보에 대한 어떠한 처리를 할 때, 즉, req.user 생성하는 곳
  // 쉽게 말해서 inNotLoggedIn이나 isLoggedin을 매개변수로 적으면 여기로 옴
  // 한번 session을 f12로 확인하면서 분석을 해야겠음
  // 굳이 serial과 deserial을 나누는 이유를 모르겠음. 첫 로그인 할 때 정보 저장해놓는게 그렇게 무겁나?
  // 처음에 해놓는 것과 매개변수로 불러올 때랑 뭔 부하차이가 있지?
  // 세션 등을 실제 배포에선 이렇게 변수에 저장하지 않고 (서버 재시작 등으로 초기화 되거나 하면 안되기 때문에)
  // 세션또한 db에 저장한다. 대신 mysql이 아닌 메모리기반 redis에 저장을 많이 한다
  passport.deserializeUser((id, done) => {
    const user = {
      id: 1234,
      email: "andy3638@naver.com",
      password: "asdf",
    };
    // 확인 = 1 유저가 있을 때
    const 확인 = 1;
    if (확인) {
      // 유저의 구체적인 정보를 세션에 저장해야함.
      // 우리는 서버에다 요청을 할듯
      // const user~~ = axios.get('http://localhost:7000/~~');

      console.log("deserial ok");
      // (user) => done(null, user);
      done(null, user);
    } else {
      (err) => done(err);
    }
  });
  local();
};
