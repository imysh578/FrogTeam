const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const { sequelize } = require("./models");

// Router 불러오기
const indexRouter = require("./router/index.js");
const upbitRouter = require("./router/upbit.js");
const authRouter = require("./router/auth");
const otherRouter = require("./router/other.js");

const app = express();

// passport setting
passportConfig();

// sequelize setting
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// PORT setting
const PORT = 5000;
app.set("port", process.env.PORT || PORT);

// build 폴더 지정
app.use("/", express.static(path.join(__dirname, "../build")));

// 데이터 관련 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// URL과 라우터 매칭
app.use(morgan("dev"));
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/upbit", upbitRouter);
app.use(otherRouter);

// ERROR 메세지 창
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.static || 500);
  res.render("error");
});

// PORT 연결상태 확인
app.listen(app.get("port"), () =>
  console.log(`Listening on port ${app.get("port")}`)
);
