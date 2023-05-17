<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button type="primary" plain @click="goBack">返回</el-button>
    </div>
    <header class="header">
      <h1 class="edit_title">文章标题：</h1>
      <el-input
        v-model="articleInfo.title"
        placeholder="请输入标题"
        clearable
      ></el-input>
    </header>
    <main class="label">
      <span class="_label">文章分类：</span>
      <el-select
        v-model="articleInfo.articleClass"
        multiple
        placeholder="请选择分类"
        :multiple-limit="4"
        clearable
      >
        <el-option
          v-for="(item, index) in (options as any[])"
          :key="index"
          :value="item.articleClassName"
        ></el-option>
      </el-select>
    </main>
    <footer class="footer">
      <div class="left">封面图片：</div>
      <div class="right">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:7171/article/upCoverImg"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
          name="coverImg"
        >
          <img
            v-if="articleInfo.cover_img"
            :src="articleInfo.cover_img"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <p class="tips">tips:优质的封面有利于推荐</p>
      </div>
    </footer>
    <div class="content">文章内容：</div>
    <div class="markdown">
      <wangEditor
        class="mavon"
        :content="articleInfo.content"
        @sendContentEmit="sendContentEmits"
        @sendHtml="sendHtmls"
      ></wangEditor>
    </div>
    <!-- <div id="editor-content-view" class="editor-content-view"></div> -->
    <div class="save_btn">
      <el-button v-if="!isUpBtn" type="primary" @click="save()">保存</el-button>
      <el-button v-else type="primary" @click="upArticle()">更新</el-button>
      <!-- <el-button v-else type="primary" disabled>保存</el-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import wangEditor from "@/components/wangEditor/index.vue";
import { addArticleApi, upArticleApi } from "@/api/modules/article";
import { getAllArticleClassApi } from "@/api/modules/articleClass";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();

const emits = defineEmits(["isDialogGoods", "sendImg"]);

//文章
let articleInfo: any = ref({
  title: "",
  content: "",
  articleClass: [],
  cover_img: "",
});
//分类列表
let options: any = ref([]);
//接口参数，添加文章
let info: any = reactive({
  title: "",
  content: "",
  articleClass: [],
  cover_img: "",
});
//是否显示更新按钮
let isUpBtn: any = ref(false);

//获取路由参数
const getRouterQuery = () => {
  if (JSON.stringify(route.query) !== "{}") {
    let {
      id,
      title,
      content,
      creat_time,
      articleClass,
      viewed,
      cover_img,
    }: any = route.query;
    if (articleClass) {
      //赋值
      articleInfo.value.title = title;
      articleInfo.value.content = content;
      // console.log(articleInfo.value.content);
      articleInfo.value.articleClass = articleClass.split(",");
      articleInfo.value.cover_img = cover_img;
    }
    isUpBtn.value = true; //显示更新按钮
    articleInfo.value.article_id = id; //更新接口参数
  }
};
getRouterQuery();

// 添加博客
const save = async () => {
  if (
    articleInfo.value.title &&
    articleInfo.value.articleClass &&
    articleInfo.value.content
  ) {
    info.title = articleInfo.value.title;
    info.content = articleInfo.value.content;
    info.articleClass = articleInfo.value.articleClass;
    info.cover_img = articleInfo.value.cover_img;
    try {
      let { data } = await addArticleApi(info);
      ElMessage.success(data.msg);
      setTimeout(() => {
        router.push({ path: "/article/articleList" });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
};

//更新博客
const upArticle = async () => {
  if (
    articleInfo.value.title &&
    articleInfo.value.articleClass &&
    articleInfo.value.content
  ) {
    articleInfo.value.articleClass = `${articleInfo.value.articleClass}`;
    try {
      let { data } = await upArticleApi(articleInfo.value);
      ElMessage.success(data.msg);
      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
};

//获取子组件值
const sendContentEmits = (e: any) => {
  articleInfo.value.content = e;
  // console.log(articleInfo.value.content);
};
const sendHtmls = (e: any) => {
  // let contentView: any = document.getElementById("editor-content-view");
  // contentView.innerHTML = e;
};

//获取类别列表
const getList = async () => {
  try {
    let { data } = await getAllArticleClassApi();
    options.value = data.data;
  } catch (error) {
    console.log(error);
  }
};
getList();
// options as Array<string>;

// 获取博客详情
const getDetail = () => {};

const goBack = () => {
  router.go(-1);
};
//图片
const onSuccess = (res: any) => {
  // 上传成功的回调，用作把上传的图片赋值到客户端显示出来！
  articleInfo.value.cover_img = res.data;
  // emits("sendImg", res.data);
};
const beforeUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
    ElMessage.error("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
};
</script>

<style lang="scss" scoped>
.edit_wrap {
  // margin: 30px auto;
  background: #fff;
  padding: 20px 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 20px;
  }
  .save_btn {
    margin: 40px 0;
  }
}
.header {
  display: flex;
  align-items: center;
}
.edit_title {
  font-size: 17px;
  font-weight: 500;
}
.el-input {
  flex: 1;
}
.label {
  margin-top: 30px;
  margin-bottom: 30px;
  ._label {
    font-size: 17px;
    font-weight: 500;
  }
}
.footer {
  display: flex;
  margin-bottom: 20px;
}
.left {
  font-size: 17px;
  font-weight: 500;
}
.right {
  flex: 1;
}
.tips {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
.content {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}
::v-deep .mavon {
  z-index: 1;
  min-height: 200px;
}
.view-editor {
  margin-top: 30px;
  padding: 20px;
  width: 100%;
  min-height: 200px;
  border: 1px solid rgb(0, 0, 0, 0.2);
}
//图片
.avatar-uploader {
  // width: 178px;
  // height: 178px;
  display: block;
}
.avatar {
  width: 100%;
  height: 100%;
}
</style>
