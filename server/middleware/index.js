//全局中间件
// const jwt = require("jsonwebtoken");
const { verifyToken, tokenExp } = require("../utils/modules/useJWT");
const jwtUnlessList = require("../data/loginData/jwtUnless.json");
const { PRIVATE_KEY, EXPIRESD } = require("../utils/constant");

//验证token，是否有token或者token是否有效。
const mw_verifyToken = async (req, res, next) => {
  try {
    // console.log(req.path);
    if (!jwtUnlessList.includes(req.path)) {
      let token = req.headers.authorization;
      //获取header中的token，并验证
      if (token) {
        const flag = await verifyToken(token);
        //验证失败
        if (!flag) {
          res.send({ status: 411, msg: "token失效，验证失败" });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

//验证token是否过期
const mw_tokenTime = (req, res, next) => {
  if (!jwtUnlessList.includes(req.path)) {
    // let currentTime = Date.now();
    // let overTime = currentTime - tokenTime;
    // if (overTime - EXPIRESD) {
    //   //过期
    // }
    let tokenTime = tokenExp(req.headers.authorization);
    console.log(tokenTime, "*-*");
  }
  next();
};

module.exports = {
  mw_verifyToken,
  mw_tokenTime,
};
