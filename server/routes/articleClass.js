var express = require("express");
var router = express.Router();
const querySql = require("../db/index");

//新增标分类接口
router.post("/addArticleClass", async (req, res, next) => {
  let { articleClassName } = req.body;
  try {
    let sql = "insert into articleClass(articleClassName) value(?)";
    await querySql(sql, [articleClassName]);
    res.send({ status: 200, msg: "新增类别成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 获取分类列表
router.get("/getArticleClass", async (req, res, next) => {
  let page = Number(req.query.page || 1);
  try {
    let totalSql = await querySql("select id from articleClass");
    let total = totalSql.length;
    let pageSize = 7;
    let pageSet = (page - 1) * pageSize;
    let sql = "select * from articleClass order by id desc limit ? offset ?";
    let result = await querySql(sql, [pageSize, pageSet]);
    res.send({
      status: 200,
      msg: "获取所有类别成功",
      data: result,
      total,
      pageSize,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 获取所有分类列表
router.get("/getAllArticleClass", async (req, res, next) => {
  try {
    let sql = "select * from articleClass order by id desc";
    let result = await querySql(sql);
    res.send({ status: 200, msg: "获取所有类别成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 更新类别接口
router.post("/upArticleClass", async (req, res, next) => {
  let { id, articleClassName } = req.body;
  try {
    let sql = "update articleClass set articleClassName=? where id = ? ";
    let result = await querySql(sql, [articleClassName, id]);
    res.send({ status: 200, msg: "更新类别成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//删除分类接口
router.post("/deleArticleClass", async (req, res, next) => {
  let { id } = req.body;
  try {
    if (Object.prototype.toString.call(id) === "[object Array]") {
      //批量删除
      class_id.map(async (m) => {
        let sql = "delete from articleClass where id = ? ";
        let result = await querySql(sql, [m]);
      });
      res.send({ status: 200, msg: "删除成功", data: null });
    } else {
      //单个删除
      let sql = "delete from articleClass where id = ? ";
      let result = await querySql(sql, [id]);
      res.send({ status: 200, msg: "删除成功", data: null });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
