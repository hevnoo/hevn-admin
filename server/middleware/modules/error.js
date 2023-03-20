//错误级中间件
const { verifyToken } = require("../../utils/modules/useJWT");

//无权限时，显示401。
const mw_err_authToken = (err, req, res, next) => {
  //token过期
  if (err.status == 401 || err.name == "UnauthorizedError") {
    res.status(401).send({ status: 401, msg: "无权限——UnauthorizedError" });
    return;
  } else {
    // 设置局部变量，仅在开发中提供错误
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // 呈现错误页
    res.status(err.status || 500);
    res.render("error");
  }
  if (err) {
    res.status(500).send({ status: "fail", msg: "500" });
  }
  return;
};
module.exports.mw_err_authToken = mw_err_authToken;

//验证token！！！是否有效
const mw_err_verifyToken = async (err, req, res, next) => {
  //获取header中的token，并验证
  if (req.headers.authorization) {
    const flag = await verifyToken(req.headers.authorization);
    //验证失败
    if (!flag) {
      await res.send({ status: 4003, msg: "token验证失败" });
    }
  }
  //验证成功继续
  next();
  return;
};
module.exports.mw_err_verifyToken = mw_err_verifyToken;
