const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("../passport");

dotenv.config();

// redis
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

// Router 불러오기
const indexRouter = require("./routers/index.js");
// Open API Router
const authRouter = require("./routers/auth");
const upbitRouter = require("./routers/upbit.js");
const binaceRouter = require("./routers/binance.js");
const coningeckoRouter = require("./routers/coingecko.js");
const usersRouter = require("./routers/users.js");
// 모든 URL에 대한 Router
const otherRouter = require("./routers/other.js");

const app = express();

// PORT setting
const PORT = 5000;
app.set("port", process.env.PORT || PORT);

// build 폴더 지정
app.use("/", express.static(path.join(__dirname, "../build")));

// 데이터 관련 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//url을 통해 전달되는 데이터에 한글, 공백과 같은 문자가 포함될 경우 인식을 못하는 문제를 해결
app.use(cookieParser(process.env.COOKIE_SECRET));
// req.session 객체 생성
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    // redis저장 설정
    store: new RedisStore({ client: redisClient }),
  })
);
// passport setting
passportConfig();
// passport 설정 선언(req에 passport 설정 삽입) 위 use.session이라고 보면 댐
app.use(passport.initialize());
// req.session 에 passport 정보 저장 (req.session.num = 1 이런거라고 보면 댐)
app.use(passport.session());

// URL과 라우터 매칭
app.use(morgan("dev"));
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/upbit", upbitRouter);
app.use("/binance", binaceRouter);
app.use("/coingecko", coningeckoRouter);
app.use("/users", usersRouter);
app.use(otherRouter);

// ERROR 메세지 창
app.use((err, req, res, next) => {
  res.status(err.static || 500);
  res.send(err);
});

// PORT 연결상태 확인
app.listen(app.get("port"), () =>
  console.log(`Listening on port ${app.get("port")}`)
);
