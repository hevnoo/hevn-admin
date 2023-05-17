var express = require("express");
var router = express.Router();
const querySql = require("../db/index");
const { md5, upload } = require("../utils/index");

/* 新增博客接口 */
router.post("/addArticle", async (req, res, next) => {
  let { title, content, articleClass, cover_img } = req.body;
  //articleClass传过来的是数组形式，所以要转换成字符形式存储。
  articleClass = `${articleClass}`;
  // console.log("-------------", articleClass.split(","));
  let { username } = req.auth;
  try {
    let user = await querySql(
      "select id,head_img,nickname from user where username = ?",
      [username]
    );
    let { id: user_id, head_img, nickname } = user[0];
    let sql =
      "insert into article(title, content, user_id, create_time, head_img, nickname, articleClass, cover_img) values(?,?,?,NOW(),?,?,?,?)";
    await querySql(sql, [
      title,
      content,
      user_id,
      head_img,
      nickname,
      articleClass,
      cover_img,
    ]);
    res.send({ status: 200, msg: "新增成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取全部博客列表接口，可分页
router.get("/getAllArticle", async (req, res, next) => {
  let page = Number(req.query.page || 1);
  try {
    let totalSql = await querySql("select id from article");
    let total = totalSql.length;
    let pageSize = 7;
    let pageSet = (page - 1) * pageSize;
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,articleClass,viewed,cover_img from article order by create_time desc limit ? offset ?';

    let result = await querySql(sql, [pageSize, pageSet]);
    res.send({ status: 200, msg: "获取成功", data: result, total, pageSize });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//获取搜索博客接口，可分页
router.get("/searchArticle", async (req, res, next) => {
  let page = Number(req.query.page || 1);
  let keywards = req.query.keywards;
  try {
    let totalSql = await querySql("select id from article");
    let total = totalSql.length;
    let pageSize = 7;
    let pageSet = (page - 1) * pageSize;
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,head_img,nickname,articleClass,viewed,cover_img from article where content like ? limit ? offset ?';
    let result = await querySql(sql, ["%" + keywards + "%", pageSize, pageSet]);
    res.send({ status: 200, msg: "获取成功", data: result, total, pageSize });
  } catch (e) {
    res.send({ status: 400, msg: "搜索失败" });
    console.log(e);
    next(e);
  }
});

// 获取我的博客列表接口
router.get("/getMyList", async (req, res, next) => {
  let page = Number(req.query.page || 1);
  let { username } = req.auth;
  try {
    let totalSql = await querySql("select id from article");
    let total = totalSql.length;
    let pageSize = 7;
    let pageSet = (page - 1) * pageSize;
    let userSql = "select id from user where username = ?";
    let user = await querySql(userSql, [username]);
    let user_id = user[0].id;
    let sql =
      'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,articleClass from article where user_id = ? group by create_time desc limit ? offset ?';
    // 去表里找作者id=用户id的文章信息
    let result = await querySql(sql, [user_id, pageSize, pageSet]);
    res.send({ status: 200, msg: "获取成功", data: result, total, pageSize });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//根据文章id获取文章详情页
router.get("/getArticleDetail", async (req, res, next) => {
  let { id } = req.query;
  let { username } = req.auth;
  try {
    // let userSql = "select id from user where username = ?";
    // let user = await querySql(userSql, [username]);
    // let user_id = user[0].id;
    // let sql =
    //   'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time,articleClass,viewed,star,nickname,head_img,user_id from article where id = ?';
    let sql =
      'select *, DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where id = ?';
    // 去表里找作者id=用户id的文章信息
    let result = await querySql(sql, [id]);
    // console.log(result, id);
    res.send({ status: 200, msg: "获取成功", data: result[0] });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 更新文章接口
router.post("/upArticle", async (req, res, next) => {
  let { article_id, title, content, articleClass, cover_img } = req.body;
  let { username } = req.auth;
  try {
    let userSql = "select id,head_img,nickname from user where username = ?";
    let user = await querySql(userSql, [username]);
    let { id: user_id, head_img, nickname } = user[0];
    let sql =
      "update article set title=?, content=?, head_img=?, nickname=?, articleClass=?, cover_img=? where id = ? ";
    let result = await querySql(sql, [
      title,
      content,
      head_img,
      nickname,
      articleClass,
      cover_img,
      article_id,
    ]);
    res.send({ status: 200, msg: "文章更新成功", data: null });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 删除博客接口
router.post("/deleArticle", async (req, res, next) => {
  let { id } = req.body;
  try {
    if (Object.prototype.toString.call(id) === "[object Array]") {
      id.map(async (m) => {
        let sql = "delete from article where id = ?";
        let result = await querySql(sql, [m]);
      });
      res.send({ status: 200, msg: "批量删除成功", data: null });
    } else {
      let sql = "delete from article where id = ? ";
      let result = await querySql(sql, [id]);
      res.send({ status: 200, msg: "文章已删除", data: null });
    }
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
router.post(
  "/upCoverImg",
  upload.single("coverImg"),
  async (req, res, next) => {
    // console.log('头像接口请求文件',req.file)
    let imgPath = req.file.path.split("public")[1];
    let imgUrl = "http://127.0.0.1:7171" + imgPath;
    res.send({ code: 0, msg: "上传成功", data: imgUrl });
  }
);

module.exports = router;
