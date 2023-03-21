var express = require("express");
var router = express.Router();
var querySql = require("../db/index");
// 用于生成jwt字符串
const jwt = require("jsonwebtoken");
const { PWD_SALT, PRIVATE_KEY, EXPIRESD } = require("../utils/constant");
const { md5, upload } = require("../utils/index");
const adminPermission = require("../data/loginData/admin_permission.json");
const vipPermission = require("../data/loginData/vip_permission.json");

// 获取菜单列表
router.get("/getMenu", (req, res, next) => {
  let role = req.query.role;
  try {
    if (role === "admin") {
      res.send({ status: 200, msg: "admin成功", data: adminPermission });
    } else {
      res.send({ status: 200, msg: "vip成功", data: vipPermission });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 登录接口
router.post("/login", async (req, res, next) => {
  let { username, password } = req.body;
  try {
    let user = await querySql("select id from user where username = ?", [
      username,
    ]);
    if (!user || user.length === 0) {
      res.send({ status: 400, msg: "该账号不存在" });
    } else {
      let roles = await querySql("select role from user where username = ?", [
        username,
      ]);
      let role = roles[0].role;
      let result = await querySql(
        "select * from user where username = ? and password = ?",
        [username, password]
      );
      if (!result || result.length === 0) {
        res.send({ status: 400, msg: "账号或者密码不正确" });
      } else {
        // 调用jsonwebtoken包提供的sign()方法，将用户信息加密成字符串，并响应给客户端！
        // var privateKey = fs.readFileSync("private.key");
        let token = jwt.sign({ username }, PRIVATE_KEY, {
          expiresIn: EXPIRESD,
        });
        if (username === "admin" || role === "admin") {
          //分权限，如果是admin，那就发送admin的标识，，否则发普通vip标识。
          // token过期后，需要靠refreshToken来重新获取token。这里赋值username
          res.send({
            status: 200,
            msg: "登录成功",
            token,
            role,
            expiresIn: EXPIRESD,
            refreshToken: username,
          });
        } else {
          res.send({
            status: 200,
            msg: "登录成功",
            token,
            role,
            expiresIn: EXPIRESD,
            refreshToken: username,
          });
        }
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//刷新token的接口，用于无感登录。
router.post("/refreshToken", (req, res, next) => {
  let { refreshToken } = req.body;
  let username = req.auth || refreshToken;
  try {
    if (refreshToken) {
      let token = jwt.sign({ username }, PRIVATE_KEY, {
        expiresIn: EXPIRESD,
      });
      res.send({ status: 200, msg: "刷新token成功", token });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

/* 注册接口 */
router.post("/register", async (req, res, next) => {
  let { username, password, nickname } = req.body;
  try {
    let user = await querySql("select * from user where username = ?", [
      username,
    ]);
    // 问号占位符，后面既是赋值给占位符。
    if (!user || user.length === 0) {
      if (username === "admin") {
        //账号或者角色 是管理员admin即可
        let role = "admin";
        await querySql(
          "insert into user(username,password,nickname,role) value(?,?,?,?)",
          [username, password, nickname, role]
        );
      } else {
        let role = "vip";
        await querySql(
          "insert into user(username,password,nickname,role) value(?,?,?,?)",
          [username, password, nickname, role]
        );
      }

      res.send({ status: 200, msg: "注册成功" });
    } else {
      res.send({ status: 400, msg: "该账号已注册" });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取当前用户信息
router.get("/info", async (req, res, next) => {
  console.log("用户信息：", req.auth);
  let { username } = req.auth;
  try {
    //按用户名查找出对应的用户信息：
    let userinfo = await querySql("select * from user where username = ?", [
      username,
    ]);
    res.send({ status: 200, msg: "成功", data: userinfo[0] });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//更新用户当前信息
router.post("/updateUser", async (req, res, next) => {
  let { username, nickname } = req.body;
  let { password, oldPass } = req.body;
  let { head_img } = req.body;
  let userSelf = req.user.username;
  try {
    let user = await querySql("select * from user where username = ?", [
      username,
    ]);
    //1.头像
    if (head_img && !username && !password) {
      let result = await querySql(
        "update user set head_img = ? where username = ?",
        [head_img, userSelf]
      );
      res.send({ status: 200, msg: "更新头像成功", data: null });
    }
    //2.账户
    else if (username && nickname && !password && !oldPass) {
      if (!user || user.length === 0) {
        let result = await querySql(
          "update user set nickname = ?,username = ? where username = ?",
          [nickname, username, userSelf]
        );
        res.send({ status: 200, msg: "更新账户成功", data: null });
      } else {
        res.send({ status: 400, msg: "该账号已存在" });
      }
      //3.密码
    } else if (!username && !nickname && password && oldPass) {
      //先找原密码是否正确
      let isPass = await querySql(
        "select password from user where username = ? ",
        [userSelf]
      );
      //再找新旧密码是否相同
      // console.log("--------------------", isPass[0].password);
      if (oldPass === isPass[0].password) {
        if (isPass[0].password === password) {
          res.send({ status: 400, msg: "新旧密码不能相同", data: null });
        } else {
          let result = await querySql(
            "update user set password = ? where username = ?",
            [password, userSelf]
          );
          res.send({ status: 200, msg: "更新密码成功", data: null });
        }
      } else {
        res.send({ status: 400, msg: "原密码不正确", data: null });
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//------------------------------
//获取用户列表
router.get("/getUser", async (req, res, next) => {
  try {
    let result = await querySql("select * from user");
    res.send({ status: 200, msg: "获取成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//增加用户列表
router.post("/addUser", async (req, res, next) => {
  let { username, password, nickname, role } = req.body;
  try {
    let user = await querySql("select * from user where username = ?", [
      username,
    ]);
    if (!user || user.length === 0) {
      if (username === "admin" || role === "admin") {
        let role = "admin";
        let sql =
          "insert into user(username,password,nickname,role) values(?,?,?,?)";
        await querySql(sql, [username, password, nickname, role]);
        res.send({ status: 200, msg: "新增成功", data: null });
      }
      //   else if (role === "admin") {
      //     let sql =
      //       "insert into users(username,password,nickname,role) values(?,?,?,?)";
      //     await querySql(sql, [username, password, nickname, role]);
      //     res.send({ status: 200, msg: "新增成功", data: null });
      //   }
      else {
        let role = "vip";
        let sql =
          "insert into user(username,password,nickname,role) values(?,?,?,?)";
        await querySql(sql, [username, password, nickname, role]);
        res.send({ status: 200, msg: "新增成功", data: null });
      }
    } else {
      res.send({ status: 400, msg: "该用户已存在" });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//更新用户列表信息接口
router.post("/upUser", async (req, res, next) => {
  let { username, password, nickname, role } = req.body;
  try {
    let user = await querySql("select * from user where username = ?", [
      username,
    ]);
    if (username === "admin" || role === "admin") {
      let role = "admin";
      let sql = "update user set nickname=?,password=?,role=? where username=?";
      let result = await querySql(sql, [nickname, password, role, username]);
      res.send({ status: 200, msg: "更新成功", data: null });
    }

    // if (!user || user.length === 0) {
    //   let sql = "update users set nickname=?,password=? where username=?";
    //   let result = await querySql(sql, [nickname, password, username]);
    //   res.send({ status: 200, msg: "更新成功", data: null });
    // } else {
    //   res.send({ status: 400, msg: "该用户已存在" });
    // }
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//删除用户
router.post("/deleUser", async (req, res, next) => {
  let { id } = req.body;
  try {
    let sql = "delete from user where id = ? ";
    let result = await querySql(sql, [id]);
    res.send({ status: 200, msg: "删除成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//头像上传接口------------------------
router.post("/upload", upload.single("head_img"), async (req, res, next) => {
  console.log("头像接口请求文件", req.file);
  let imgPath = req.file.path.split("public")[1];
  let imgUrl = "http://127.0.0.1:7171" + imgPath;
  res.send({ status: 200, msg: "上传成功", data: imgUrl });
});

module.exports = router;
