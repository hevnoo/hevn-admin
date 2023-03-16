var express = require("express");
var router = express.Router();
const querySql = require("../db/index");

//新增订单
router.post("/addOrders", async (req, res, next) => {
  let { goodsName, saleNumber, clientName, goodsPrice } = req.body;
  try {
    let sql =
      "insert into orders(goodsName,saleNumber,clientName,goodsPrice,saleDate ) value(?,?,?,?,NOW())";
    await querySql(sql, [goodsName, saleNumber, clientName, goodsPrice]);
    res.send({ status: 200, msg: "新增订单成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 获取订单列表，分页
router.get("/getOrders", async (req, res, next) => {
  let { page } = req.query;
  let pages = page || 1;
  try {
    let totalSql = "select id from orders";
    let t = await querySql(totalSql);
    let total = t.length;
    let pageSize = 10;
    let pageSet = (pages - 1) * pageSize;
    let sql =
      "select *,DATE_FORMAT(saleDate,'%Y-%m-%d %H:%i:%s') AS saleDate from orders order by saleDate desc limit ? offset ?";
    let result = await querySql(sql, [pageSize, pageSet]);
    res.send({
      status: 200,
      msg: "获取订单列表成功",
      data: result,
      total,
      pageSize,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取搜索订单列表
router.get("/searchOrders", async (req, res, next) => {
  let { page, clientName } = req.query;
  try {
    let totalSql = "select id from order where clientName like ?";
    let t = await querySql(totalSql, ["%" + clientName + "%"]);
    let total = t.length;
    let pageSize = 8;
    let pageSet = (page - 1) * pageSize;
    let sql =
      "select *,DATE_FORMAT(saleDate,'%Y-%m-%d %H:%i:%s') AS saleDate from orders where clientName like ? order by saleDate desc limit ? offset ?";
    let result = await querySql(sql, [
      "%" + clientName + "%",
      pageSize,
      pageSet,
    ]);
    res.send({ status: 200, msg: "搜索成功", data: result, total, pageSize });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 更新订单
router.post("/upOrders", async (req, res, next) => {
  let { id, goodsName, saleNumber, clientName, goodsPrice } = req.body;
  try {
    let sql =
      "update orders set goodsName=?, saleNumber=?, clientName=?, goodsPrice=? where id = ? ";
    let result = await querySql(sql, [
      goodsName,
      saleNumber,
      clientName,
      goodsPrice,
      id,
    ]);
    res.send({ status: 200, msg: "订单更新成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//删除订单
router.post("/deleOrders", async (req, res, next) => {
  let { id } = req.body;
  try {
    if (Object.prototype.toString.call(id) === "[object Array]") {
      id.map(async (m) => {
        let sql = "delete from orders where id = ?";
        let result = await querySql(sql, [m]);
      });
      res.send({ status: 200, msg: "批量删除成功", data: null });
    } else {
      let sql = "delete from orders where id = ? ";
      let result = await querySql(sql, [id]);
      res.send({ status: 200, msg: "订单已删除", data: null });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//stock库存接口,按order表的商品名称 去goods数据表中找出对应的商品的数量。
router.get("/stock", async (req, res, next) => {
  let { goodsName } = req.query;
  try {
    let sql = "select goodsNumber from goods where goodsName = ?";
    let result = await querySql(sql, [goodsName]);
    res.send({ status: 200, msg: "操作成功", data: result[0] });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//与订单响应的goods库存更新。
router.post("/upStock", async (req, res, next) => {
  let { num, goodsName } = req.body;
  try {
    let sql = "update goods set goodsNumber=? where goodsName = ? ";
    let result = await querySql(sql, [num, goodsName]);
    res.send({ status: 200, msg: "更新成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//汇总清单
router.get("/collect", async (req, res, next) => {
  let { page } = req.query;
  let pages = page || 1;
  try {
    let totalSql = "select id from orders";
    let t = await querySql(totalSql);
    let total = t.length;
    let pageSize = 10;
    let pageSet = (pages - 1) * pageSize;
    let sql =
      "select *,DATE_FORMAT(saleDate,'%Y-%m-%d %H:%i:%s') AS saleDate from orders order by saleDate desc limit ? offset ?";
    let result = await querySql(sql, [pageSize, pageSet]);
    res.send({
      status: 200,
      msg: "获取订单列表成功",
      data: result,
      total,
      pageSize,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//

module.exports = router;
