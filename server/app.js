var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// const expressJWT = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");
//
var userRouter = require("./routes/user");
var articleRouter = require("./routes/article");
var commentRouter = require("./routes/comment");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//
app.use(
  jwt({ secret: "hevn-secretKey!", algorithms: ["HS256"] }).unless({
    path: [
      "/user/getUserList",
      "/user/getMenu",
      "/user/register",
      "/user/login",
      "/goods/upImg",
      "/user/upload",
    ],
  })
);
//

app.use("/user", userRouter);
app.use("/article", articleRouter);
app.use("/comment", commentRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    //  这个需要根据自己的业务逻辑来处理
    res.status(401).send({ code: -1, msg: "token验证失败" });
  } else {
    // 设置局部变量，仅在开发中提供错误
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // 呈现错误页
    res.status(err.status || 500);
    res.render("error");
  }
});

// 监听7171端口
app.listen(7171, () => {
  console.log("服务已启动 http://localhost:7171");
});

module.exports = app;
