//用于中间件
const jwt = require("jsonwebtoken");
const {
  PWD_SALT,
  PRIVATE_KEY,
  EXPIRESD,
  refresh_time,
} = require("../constant");
var dayjs = require("dayjs");

//生成token
let setToken = function (username) {
  //expiresIn:过期时间
  let token = jwt.sign({ username }, PRIVATE_KEY, { expiresIn: EXPIRESD });
  let refreshToken = jwt.sign({ username }, PRIVATE_KEY, {
    expiresIn: refresh_time,
  });
  return { token, refreshToken };
  //颁发access-token时同时颁发一个refresh-token，唯一区别是refresh-token有效期比较长，比如2天。
  //当access-token过期后，拿着refresh-token到后台换取新的access-token。
};

//token验证： 使用中间件对请求进行拦截获取请求头的token
let verifyToken = async (token) => {
  // console.log(token.split(" ")[1]);
  return await jwt.verify(
    token.split(" ")[1],
    PRIVATE_KEY,
    function (err, decoded) {
      // let startTime = dayjs(decoded.iat * 1000).format("YYYY-MM-DD HH:mm:ss");
      // let endTime = dayjs(decoded.exp * 1000).format("YYYY-MM-DD HH:mm:ss");
      // console.log("-------", decoded.iat, startTime, decoded.exp, endTime);
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );
  // Tips：verify函数验证的token要去掉前缀Bearer。
  //decoded.iat表示开始（初始）时间，decoded.exp表示到期的时间
  //这里token过期后，会自动响应401错误状态。
};

//验证token是否过期
//计算剩余时间
function tokenExp(token) {
  let verify = verifyToken(token);
  let time = parseInt(new Date().getTime() / 1000);
  return `剩余${verify.exp - time}秒`;
}

module.exports = {
  setToken,
  verifyToken,
  tokenExp,
};
