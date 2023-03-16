var express = require("express");
var router = express.Router();
const querySql = require("../db/index");
var dayjs = require("dayjs");
const homeList = require("../data/homeData/home.json");

//获取订单总数量
router.get("/AllOrders", async (req, res, next) => {
  try {
    let sql = "select id from orders";
    let t = await querySql(sql);
    let total = t.length;
    res.send({ status: 200, msg: "获取成功", data: total });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//获取商品总数量
router.get("/AllGoods", async (req, res, next) => {
  try {
    let sql = "select id from goods";
    let t = await querySql(sql);
    let total = t.length;
    res.send({ status: 200, msg: "获取成功", data: total });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//交易总金额
router.get("/money", async (req, res, next) => {
  try {
    let sql = "select sum( goodsPrice ) from orders";
    let result = await querySql(sql);
    // console.log(Object.values(result[0]));
    res.send({
      status: 200,
      msg: "获取成功",
      data: Object.values(result[0])[0],
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//获取类别总数量
router.get("/AllClasses", async (req, res, next) => {
  try {
    let sql = "select id from goodsClass";
    let t = await querySql(sql);
    let total = t.length;
    res.send({ status: 200, msg: "获取成功", data: total });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//季销售额
router.get("/dateMoney", async (req, res, next) => {
  let arr = homeList;
  let list = [];
  try {
    arr.map(async (m) => {
      let startTime = dayjs(m[0]).format("YYYY-MM-DD HH:mm:ss");
      let endTime = dayjs(m[1]).format("YYYY-MM-DD HH:mm:ss");
      let sql =
        "select sum( goodsPrice ) from orders where saleDate between ? and ? ";
      let result = await querySql(sql, [startTime, endTime]);
      let rr = Object.values(result[0])[0];
      if (rr === null) {
        rr = 1; //避免为null时折线图不显示
      }
      list.push(rr);
    });
    await setTimeout(() => {
      res.send({
        status: 200,
        msg: "获取成功",
        data: list,
      });
    }, 100);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//每季订单数量
router.get("/orderNumber", async (req, res, next) => {
  let arr = homeList;
  let list = [];
  try {
    arr.map(async (m) => {
      let startTime = dayjs(m[0]).format("YYYY-MM-DD HH:mm:ss");
      let endTime = dayjs(m[1]).format("YYYY-MM-DD HH:mm:ss");
      let sql = "select id from orders where saleDate between ? and ? ";
      let r = await querySql(sql, [startTime, endTime]);
      let result = r.length;
      list.push(result);
    });
    setTimeout(() => {
      res.send({
        status: 200,
        msg: "获取成功",
        data: list,
      });
    }, 100);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
