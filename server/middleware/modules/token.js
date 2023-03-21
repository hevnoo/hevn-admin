//局部
const { verifyToken, tokenExp } = require("../../utils/modules/useJWT");
const jwtUnlessList = require("../../data/loginData/jwtUnless.json");
const { PRIVATE_KEY, EXPIRESD } = require("../../utils/constant");

//用来验证刷新token的路由是否过期
const part_verify = async (req, res, next) => {
  try {
    if (!jwtUnlessList.includes(req.path)) {
      let token = req.headers.authorization;
      //获取header中的token，并验证
      if (token) {
        const flag = await verifyToken(token);
        //验证失败
        if (!flag) {
          res.send({ status: 411, msg: "token过期" });
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

module.exports = {
  part_verify,
};
