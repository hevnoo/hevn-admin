//用于中间件
const { PWD_SALT, PRIVATE_KEY, EXPIRESD } = require("../constant");
const jwt = require("jsonwebtoken");
// const scret = "hevn_admin"; //自定义秘钥  自定义

//中间件验证jwt,停用
let setToken = function (str1, str2) {
  //   let user = str1; //登录账号和密码作为了规则
  //   let paswd = str2;
  //   const rule = {
  //     username: user,
  //     pwd: paswd,
  //   };
  //   //expiresIn:过期时间
  //   let ztoken = jwt.sign(rule, PRIVATE_KEY, { expiresIn: EXPIRESD });
  //   return ztoken;
};
module.exports.setToken = setToken;

//token验证： 使用中间件对请求进行拦截获取请求头的token
let verifyToken = async (token) => {
  await jwt.verify(token, PRIVATE_KEY, function (err, decoded) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

module.exports.verifyToken = verifyToken;
