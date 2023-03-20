var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// const expressJWT = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");
const { PRIVATE_KEY } = require("./utils/constant");
//jwt验证函数封装
let { verifyToken } = require("./utils/modules/useJWT");
//引入中间件
let { mw_verifyToken } = require("./middleware/index");
let {
  mw_err_verifyToken,
  mw_err_authToken,
} = require("./middleware/modules/error");

//引入路由
var userRouter = require("./routes/user");
var articleRouter = require("./routes/article");
var commentRouter = require("./routes/comment");
var goodsRouter = require("./routes/goods");
var goodsClassRouter = require("./routes/goodsClass");
var ordersRouter = require("./routes/orders");
var homeRouter = require("./routes/home");
//挂载服务器实例
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
  jwt({ secret: PRIVATE_KEY, algorithms: ["HS256"] }).unless({
    path: [
      "/user/getMenu",
      "/user/login",
      "/user/refreshToken",
      "/user/register",
      "/goods/upImg",
      "/user/upload",
    ],
  })
);
//全局中间件！！
// app.use(mw_verifyToken);

app.use(function (req, res, next) {
  // console.log("全局");
  //创建404错误页
  // next(createError(404));
  next();
});

//注册路由
app.use("/user", userRouter);
app.use("/article", articleRouter);
app.use("/comment", commentRouter);
app.use("/goods", goodsRouter);
app.use("/goodsClass", goodsClassRouter);
app.use("/orders", ordersRouter);
app.use("/home", homeRouter);

//错误级中间件要写在路由之后！

app.use(mw_err_authToken);
app.use(mw_err_verifyToken);

// 监听7171端口
app.listen(7171, () => {
  console.log("服务已启动 http://localhost:7171");
});

module.exports = app;
