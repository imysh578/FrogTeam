const express = require("express");
const path = require("path");
const morgan = require("morgan");
require('dotenv').config()

// Router 불러오기
const indexRouter = require("./router/index.js");
const upbitRouter = require('./router/upbit.js');
const otherRouter = require('./router/other.js');

const app = express();

// PORT setting
const PORT = 5000;
app.set("port", process.env.PORT || PORT);

// build 폴더 지정
app.use('/', express.static(path.join(__dirname, "../build")));

// URL과 라우터 매칭
app.use(morgan("dev"));
app.use("/", indexRouter);
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
