const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models/index.js");
const cookieParser = require("cookie-parser");

const app = express();

const indexRouter = require("./routers/index.js");
const usersRouter = require('./routers/users.js');
const signinRouter = require('./routers/signin.js');
const signupRouter = require('./routers/signup.js');

// 포트 설정
const PORT = 7000;
app.set("port", process.env.DB_PORT || PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// url과 라우터 매칭
app.use(morgan("dev"));
app.use("/", indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

// 에러 메서지
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.static || 500);
  res.render("error");
});

// DB와 연결
sequelize
  // sync : MySQL에 테이블이 존재 하지 않을때 생성
  //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

// port 연결 상태
app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
