//全局中间件
// const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/modules/useJWT");

//验证token，是否有效，是否过期。
const mw_verifyToken = async (req, res, next) => {
  console.log(req.headers.authorization);
  //获取header中的token，并验证
  if (req.headers.authorization) {
    const flag = await verifyToken(req.headers.authorization);
    //验证失败
    if (!flag && flag != "undefined") {
      await res.send({ status: 4002, msg: "token失效，验证失败" });
    } else {
      //验证成功继续
      // next();
    }
  }
  next();
  return;
};
module.exports.mw_verifyToken = mw_verifyToken;
