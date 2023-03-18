var express = require("express");
var router = express.Router();
const querySql = require("../db/index");
const { md5, upload } = require("../utils/index");
var dayjs = require("dayjs");

//添加商品
router.post("/addGoods", async (req, res, next) => {
  let {
    goodsName,
    goodsNumber,
    goodsPrice,
    goodsClass,
    goods_img,
    goodsDescribe,
  } = req.body;
  let { username } = req.auth;
  try {
    let user = await querySql(
      "select id,head_img,nickname from user where username = ?",
      [username]
    );
    let { id: user_id, head_img, nickname } = user[0];
    let sql =
      "insert into goods(createDate,goodsName,goodsNumber,goodsPrice,goodsClass,goods_img,goodsDescribe,users,user_id) values(NOW(),?,?,?,?,?,?,?,?)";
    await querySql(sql, [
      goodsName,
      goodsNumber,
      goodsPrice,
      goodsClass,
      goods_img,
      goodsDescribe,
      username,
      user_id,
    ]);
    res.send({ status: 200, msg: "新增商品成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 获取商品列表，可分页, page:当前页，
router.get("/goodsList", async (req, res, next) => {
  let page = Number(req.query.page || 1);
  try {
    let totalSql = await querySql("select id from goods");
    let total = totalSql.length;
    let pageSize = 7;
    let pageSet = (page - 1) * pageSize;
    let sql = "select * from goods order by createDate desc limit ? offset ?";
    let result = await querySql(sql, [pageSize, pageSet]);
    res.send({
      status: 200,
      msg: "获取商品列表成功",
      data: result,
      total,
      pageSize,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取搜索商品
router.get("/searchGoods", async (req, res, next) => {
  let { page, goodsName, date, goodsClass } = req.query;
  // page = page || 1;
  try {
    //先格式时间。
    let startTime = dayjs(date[0]).format("YYYY-MM-DD HH:mm:ss");
    let endTime = dayjs(date[1]).format("YYYY-MM-DD HH:mm:ss");
    let pageSize = 7;
    let pageSet = (page - 1) * pageSize;
    if (date && !goodsName && !goodsClass) {
      //1.日期单独查询
      let totalSql = "select id from goods where createDate between ? and ?";
      let t = await querySql(totalSql, [startTime, endTime]);
      let total = t.length;
      let sql =
        "select * from goods where createDate between ? and ?  order by createDate desc limit ? offset ?";
      let result = await querySql(sql, [startTime, endTime, pageSize, pageSet]);
      res.send({
        status: 200,
        msg: "搜索商品成功",
        data: result,
        total,
        pageSize,
      });
    } else if (goodsClass && !goodsName && !date) {
      //2.分类单独查询
      let totalSql = "select id from goods where goodsClass = ?";
      let t = await querySql(totalSql, [goodsClass]);
      let total = t.length;
      let sql =
        "select * from goods where goodsClass = ? order by createDate desc limit ? offset ?";
      let result = await querySql(sql, [goodsClass, pageSize, pageSet]);
      res.send({
        status: 200,
        msg: "搜索商品成功",
        data: result,
        total,
        pageSize,
      });
    } else if (goodsName && !date && !goodsClass) {
      //3.名称单独查询
      let totalSql = "select id from goods where goodsName like ?";
      let t = await querySql(totalSql, ["%" + goodsName + "%"]);
      let total = t.length;
      let sql =
        "select * from goods where goodsName like ? order by createDate desc limit ? offset ?";
      let result = await querySql(sql, [
        "%" + goodsName + "%",
        pageSize,
        pageSet,
      ]);
      res.send({
        status: 200,
        msg: "搜索商品成功",
        data: result,
        total,
        pageSize,
      });
    } else if (date && goodsClass && !goodsName) {
      //4.日期和分类双重查询
      let totalSql =
        "select id from goods where createDate between ? and ? and goodsClass = ?";
      let t = await querySql(totalSql, [startTime, endTime, goodsClass]);
      let total = t.length;
      let sql =
        "select * from goods where createDate between ? and ? and goodsClass = ? order by createDate desc limit ? offset ?";
      let result = await querySql(sql, [
        startTime,
        endTime,
        goodsClass,
        pageSize,
        pageSet,
      ]);
      res.send({
        status: 200,
        msg: "搜索商品成功",
        data: result,
        total,
        pageSize,
      });
    } else if (date && !goodsClass && goodsName) {
      //5.日期和名称
      let totalSql =
        "select id from goods where createDate between ? and ? and goodsName like ?";
      let t = await querySql(totalSql, [
        startTime,
        endTime,
        "%" + goodsName + "%",
      ]);
      let total = t.length;
      let sql =
        "select * from goods where createDate between ? and ? and goodsName like ? order by createDate desc limit ? offset ?";
      let result = await querySql(sql, [
        startTime,
        endTime,
        "%" + goodsName + "%",
        pageSize,
        pageSet,
      ]);
      res.send({
        status: 200,
        msg: "搜索商品成功",
        data: result,
        total,
        pageSize,
      });
    } else if (!date && goodsClass && goodsName) {
      //6.分类和名称
      let totalSql =
        "select id from goods where goodsClass = ? and goodsName like ?";
      let t = await querySql(totalSql, [goodsClass, "%" + goodsName + "%"]);
      let total = t.length;
      let sql =
        "select * from goods where goodsClass = ? and goodsName like ? order by createDate desc limit ? offset ?";
      let result = await querySql(sql, [
        goodsClass,
        "%" + goodsName + "%",
        pageSize,
        pageSet,
      ]);
      res.send({
        status: 200,
        msg: "搜索商品成功",
        data: result,
        total,
        pageSize,
      });
    } else {
      //7.三重查询！
      let totalSql =
        "select id from goods where createDate between ? and ? and goodsClass = ? and goodsName like ?";
      let t = await querySql(totalSql, [
        startTime,
        endTime,
        goodsClass,
        "%" + goodsName + "%",
      ]);
      let total = t.length;
      let sql =
        "select * from goods where createDate between ? and ? and goodsClass = ? and goodsName like ?  order by createDate desc limit ? offset ?";
      let result = await querySql(sql, [
        startTime,
        endTime,
        goodsClass,
        "%" + goodsName + "%",
        pageSize,
        pageSet,
      ]);
      res.send({
        status: 200,
        msg: "搜索商品成功",
        data: result,
        total,
        pageSize,
      });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//更新修改商品信息
router.post("/updateGoods", async (req, res, next) => {
  let {
    id,
    goodsName,
    goodsNumber,
    goodsPrice,
    goodsClass,
    goods_img,
    goodsDescribe,
  } = req.body;
  let { username } = req.auth;
  try {
    let user = await querySql(
      "select id,head_img,nickname from user where username = ?",
      [username]
    );
    let { id: user_id, head_img, nickname } = user[0];
    if (username === "admin") {
      let sql =
        "update goods set goodsName=?,goodsNumber=?,goodsPrice=?,goodsClass=?,goods_img=?,goodsDescribe=? where id = ? ";
      let result = await querySql(sql, [
        goodsName,
        goodsNumber,
        goodsPrice,
        goodsClass,
        goods_img,
        goodsDescribe,
        id,
      ]);
      res.send({ status: 200, msg: "尊敬的管理员,商品更新成功", data: null });
    } else {
      //先找出这条商品的 操作/创建 的人
      //   let selectUser = "select users from goods where id = ?";
      let selectUser = await querySql("select user from goods where id = ?", [
        id,
      ]);
      //如果这条商品的创建人不等于当前用户
      if (selectUser !== username) {
        res.send({
          status: 400,
          msg: "更新失败，您没有权限修改他人创建的商品",
          data: null,
        });
      } else {
        let sql =
          "update goods set goodsName=?,goodsNumber=?,goodsPrice=?,goodsClass=?,goods_img=?,goodsDescribe=? where id = ? and user_id = ? ";
        let result = await querySql(sql, [
          goodsName,
          goodsNumber,
          goodsPrice,
          goodsClass,
          goods_img,
          goodsDescribe,
          id,
          user_id,
        ]);
        res.send({ status: 200, msg: "商品更新成功", data: null });
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 删除商品
router.post("/deleteGoods", async (req, res, next) => {
  let { id } = req.body;
  let { username } = req.auth;
  try {
    let user = await querySql(
      "select id,head_img,nickname from user where username = ?",
      [username]
    );
    let { id: user_id, head_img, nickname } = user[0];
    //
    if (Object.prototype.toString.call(id) === "[object Array]") {
      if (username === "admin") {
        id.map(async (m) => {
          let sql = "delete from goods where id = ? ";
          let result = await querySql(sql, [m]);
        });
        res.send({ status: 200, msg: "尊敬的管理员，删除成功", data: null });
      } else {
        let selectUser = await querySql(
          "select users from goods where id = ?",
          [id]
        );
        if (selectUser !== username) {
          res.send({
            status: 400,
            msg: "删除失败，您没有权限删除他人创建的商品",
            data: null,
          });
        } else {
          id.map(async (m) => {
            let sql = "delete from goods where id = ? and user_id = ?";
            let result = await querySql(sql, [m, user_id]);
          });
          // let sql = "delete from goods where id = ? and user_id = ?";
          // let result = await querySql(sql, [id, user_id]);
          res.send({ status: 200, msg: "删除成功", data: null });
        }
      }
    } else {
      //id为其他类型
      if (username === "admin") {
        let sql = "delete from goods where id = ? ";
        let result = await querySql(sql, [id]);
        res.send({ status: 200, msg: "尊敬的管理员，删除成功", data: null });
      } else {
        let selectUser = await querySql(
          "select users from goods where id = ?",
          [id]
        );
        if (selectUser !== username) {
          res.send({
            status: 400,
            msg: "删除失败，您没有权限删除他人创建的商品",
            data: null,
          });
        } else {
          let sql = "delete from goods where id = ? and user_id = ?";
          let result = await querySql(sql, [id, user_id]);
          res.send({ status: 200, msg: "删除成功", data: null });
        }
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//商品图片上传接口
router.post("/upImg", upload.single("goods_img"), async (req, res, next) => {
  //upload.single("goods_img")对应前端的name,不然会出现失败
  let imgPath = req.file.path.split("public")[1];
  let imgUrl = "http://127.0.0.1:7171" + imgPath;
  res.send({ status: 200, msg: "上传成功", data: imgUrl });
});

module.exports = router;
