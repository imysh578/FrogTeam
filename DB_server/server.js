const express = require("express");
const morgan = require("morgan");

const app = express();

const indexRouter = require("./routes/index.js");

// 포트 설정
const PORT = 7000;
app.set("port", process.env.DB_PORT || PORT);

// url과 라우터 매칭
app.use(morgan("dev"));
app.use("/", indexRouter);

// 에러 메서지
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
	res.status(err.static || 500);
	res.render("error");
});

// port 연결 상태
app.listen(app.get("port"), () => {
	console.log(`Listening on port ${app.get("port")}`);
});
