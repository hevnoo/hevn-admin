var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// 导入解析表单数据的中间件 body-parser
const parser = require("body-parser");
// const expressJWT = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
//常量：密钥、过期时间等
const { PRIVATE_KEY } = require("./utils/constant");
//引入token验证白名单
const jwtUnlessList = require("./data/loginData/jwtUnless.json");
//引入中间件
let { mw_verifyToken, mw_tokenTime } = require("./middleware/index");
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

app.use(parser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//
app.use(
  jwt({ secret: PRIVATE_KEY, algorithms: ["HS256"] }).unless({
    path: jwtUnlessList,
  })
);

//全局中间件！！

app.use(mw_verifyToken);
// app.use(mw_tokenTime);

app.use(function (req, res, next) {
  //创建404错误页
  // next(createError(404));
  // res.status(401);
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

//错误级中间件要写在路由注册之后！

app.use(mw_err_authToken);
// app.use(mw_err_verifyToken);

// 监听7171端口
app.listen(7171, () => {
  console.log("服务已启动 http://localhost:7171");
});

module.exports = app;
