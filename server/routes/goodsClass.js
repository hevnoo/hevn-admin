var express = require("express");
var router = express.Router();
const querySql = require("../db/index");

//新增标分类接口
router.post("/addGoodsClass", async (req, res, next) => {
  let { className } = req.body;
  // let { username } = req.user
  try {
    let sql = "insert into goodsClass(className) value(?)";
    await querySql(sql, [className]);
    res.send({ status: 200, msg: "新增类别成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 获取所有分类接口
router.get("/allClass", async (req, res, next) => {
  try {
    let sql = "select * from goodsClass";
    let result = await querySql(sql);
    res.send({ status: 200, msg: "获取所有类别成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 更新类别接口
router.post("/upClass", async (req, res, next) => {
  let { id, className } = req.body;
  try {
    let sql = "update goodsClass set className=? where id = ? ";
    let result = await querySql(sql, [className, id]);
    res.send({ status: 200, msg: "更新类别成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//删除分类接口
router.post("/deleClass", async (req, res, next) => {
  let { class_id } = req.body;
  try {
    let sql = "delete from goodsClass where id = ? ";
    let result = await querySql(sql, [class_id]);
    res.send({ status: 200, msg: "删除成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//初始标签接口
// router.post('/theClass', async(req, res, next) => {
//     try {
//         let sql = 'insert into label(label) value(?)'
//         // let sql = 'select id,label from label'
//         let result = await querySql(sql,['前端'])
//         res.send({ code: 0, msg: '获取成功', data: result })
//     } catch (e) {
//         console.log(e)
//         next(e)
//     }
// });

module.exports = router;
