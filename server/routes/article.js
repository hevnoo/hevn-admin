var express = require("express");
var router = express.Router();
const querySql = require("../db/index");
const { md5, upload } = require("../utils/index");

/* 新增博客接口 */
router.post("/add", async (req, res, next) => {
  let { title, content, label, img } = req.body;
  let { username } = req.user;
  console.log("标签id", label);
  try {
    let user = await querySql(
      "select id,head_img,nickname from user where username = ?",
      [username]
    );
    // let user_id = user[0].id
    let { id: user_id, head_img, nickname } = user[0];
    let sql =
      "insert into article(title,content,user_id,create_time,head_img,nickname,label,img) values(?,?,?,NOW(),?,?,?,?)";
    await querySql(sql, [
      title,
      content,
      user_id,
      head_img,
      nickname,
      label,
      img,
    ]);
    res.send({ code: 0, msg: "新增成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取全部博客列表接口
router.get("/getAllArticle", async (req, res, next) => {
  try {
    // let sql = 'select * from article group by create_time desc'
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,label,viewed,img from article order by create_time desc';

    let result = await querySql(sql);
    res.send({ code: 0, msg: "获取成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
// 归档分页, page:当前页，
router.get("/fileList", async (req, res, next) => {
  let page = Number(req.query.page || 1);
  try {
    let all = "select count(*) from article";
    let total = all.length;
    // console.log('总数***',all)
    let pageSet = (page - 1) * 10;
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,label,viewed,img from article order by create_time desc limit 10 offset ?';
    let result = await querySql(sql, [pageSet]);
    res.send({
      code: 0,
      msg: "获取成功",
      data: result,
      total: total,
      pageSize: 10,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//分页接口,未完成
router.post("/page", async (req, res, next) => {
  let { pageSize, pageCurrent } = req.body;
  let start = (pageCurrent - 1) * pageSize; // 起始位置

  try {
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,label,viewed,img from article group by create_time desc';
    let list = await querySql(sql);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取搜索博客接口
router.get("/search", async (req, res, next) => {
  // let {label} = req.query
  let keywards = req.query.keywards;
  try {
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,head_img,nickname,label,viewed,img from article where content like ?';
    let result = await querySql(sql, ["%" + keywards + "%"]);
    res.send({ code: 0, msg: "获取成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 获取我的博客列表接口
router.get("/myList", async (req, res, next) => {
  let { username } = req.user;
  try {
    let userSql = "select id from user where username = ?";
    let user = await querySql(userSql, [username]);
    let user_id = user[0].id;
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,label from article where user_id = ? group by create_time desc';
    // 去表里找作者id=用户id的文章信息
    let result = await querySql(sql, [user_id]);
    res.send({ code: 0, msg: "获取成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取标签分类博客接口
router.get("/navBlog", async (req, res, next) => {
  // let {label} = req.query
  let label = req.query.label;
  try {
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,head_img,nickname,label,viewed,img from article where label like ?';
    // let sql = 'select * from article where label like %?%'
    let result = await querySql(sql, ["%" + label + "%"]);
    console.log("结果::", result);
    res.send({ code: 0, msg: "获取成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 获取博客详情页接口
router.get("/detail", async (req, res, next) => {
  // console.log('详情文章id',req.query.article_id)
  let article_id = req.query.article_id;
  // 通过前端传过来选中的文章的id
  try {
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,head_img,nickname,label,viewed,img from article where id = ?';
    // 当文章id=选中的文章id时
    let result = await querySql(sql, [article_id]);
    res.send({ code: 0, msg: "获取成功", data: result[0] });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 更新博客接口
router.post("/update", async (req, res, next) => {
  let { article_id, title, content, label, img } = req.body;
  let { username } = req.user;
  try {
    let userSql = "select id,head_img,nickname from user where username = ?";
    let user = await querySql(userSql, [username]);
    // let user_id = user[0].id
    let { id: user_id, head_img, nickname } = user[0];
    let sql =
      "update article set title=?,content=?,head_img=?,nickname=?,label=?,img=? where id = ? and user_id = ?";
    let result = await querySql(sql, [
      title,
      content,
      head_img,
      nickname,
      label,
      img,
      article_id,
      user_id,
    ]);
    res.send({ code: 0, msg: "更新成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 删除博客接口
router.post("/delete", async (req, res, next) => {
  let { article_id } = req.body;
  let { username } = req.user;
  try {
    let userSql = "select id from user where username = ?";
    let user = await querySql(userSql, [username]);
    let user_id = user[0].id;
    let sql = "delete from article where id = ? and user_id = ?";
    let result = await querySql(sql, [article_id, user_id]);
    res.send({ code: 0, msg: "删除成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取按热度排序的文章
router.get("/getViewed", async (req, res, next) => {
  try {
    let sql = "select id,title,viewed,img from article group by viewed desc";
    let result = await querySql(sql);
    res.send({ code: 0, msg: "获取成功", data: result });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//自动更新文章阅读量接口
router.post("/upViewed", async (req, res, next) => {
  let { article_id, viewed } = req.body;
  try {
    // let sql = 'update article set viewed=? where id = ?'
    // let result = await querySql(sql, [viewed,article_id])
    let sql = "update article set viewed=? where id=?";
    let result = await querySql(sql, [viewed, article_id]);
    res.send({ code: 0, msg: "更新成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
//封面图片上传接口
// router.post("/upImg", upload.single("img"), async (req, res, next) => {
//   // console.log('头像接口请求文件',req.file)
//   let imgPath = req.file.path.split("public")[1];
//   let imgUrl = "http://127.0.0.1:3000" + imgPath;
//   res.send({ code: 0, msg: "上传成功", data: imgUrl });
// });

module.exports = router;
