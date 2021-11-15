const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

// Router 불러오기
const indexRouter = require("./routers/index.js");
// Open API Router
const upbitRouter = require("./routers/upbit.js");
const binaceRouter = require("./routers/binance.js");
const coningeckoRouter = require("./routers/coingecko.js");
const usersRouter = require("./routers/users.js");
const signinRouter = require('./routers/signin.js');
// 모든 URL에 대한 Router
const otherRouter = require("./routers/other.js");

const app = express();

// PORT setting
const PORT = 5000;
app.set("port", process.env.PORT || PORT);

// html, css, image 있는 폴더 지정
// app.use("/", express.static(path.join(__dirname, "../public"))); // build 전
app.use("/", express.static(path.join(__dirname, "../build"))); // build 후

// URL과 라우터 매칭
app.use(morgan("dev"));
app.use("/", indexRouter);
app.use("/upbit", upbitRouter);
app.use("/binance", binaceRouter);
app.use("/coingecko", coningeckoRouter);
app.use("/users", usersRouter);
app.use('/signin/', signinRouter);
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
