<template>
  <div class="w-detail">
    <div class="left">
      <header class="header">
        <section class="title">{{ articleInfo.title }}</section>
        <section class="_title">
          <span>发布于：{{ articleInfo.create_time }}</span>
          <span>{{ articleInfo.viewed }} 次浏览</span>
        </section>
      </header>
      <main
        ref="mavonRef"
        id="editor-content-view"
        class="editor-content-view"
      ></main>
    </div>
    <div class="right">
      <div class="directory">
        <Catalog
          v-if="JSON.stringify(catalog) !== '[]'"
          :catalog="catalog"
        ></Catalog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Catalog from "@/components/articleDetail/catalog/index.vue";
import { getArticleDetailApi } from "@/api/modules/article";
import { ref, onMounted, computed, watch, onUpdated, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();
let id: any = ref(0); //文章id
let articleInfo: any = ref({
  title: "",
  content: "",
}); //文章详情

//获取路由参数
const getRouterQuery = () => {
  if (JSON.stringify(route.query) !== "{}") {
    let { id: ids }: any = route.query;
    // console.log(id);
    id.value = Number(ids);
  }
};
getRouterQuery();

//
const getRes = async (val: any) => {
  try {
    let { data } = await getArticleDetailApi(val);
    articleInfo.value = data.data;
    // console.log(articleInfo.value, val, data);
    getHtml(articleInfo.value.content);
  } catch (error) {
    console.log(error);
  }
};
getRes(id.value);

//设置内容
const getHtml = (val: any) => {
  // console.log(val);
  let contentView: any = document.getElementById("editor-content-view");
  contentView.innerHTML = val;
};

//生成目录
let mavonRef: any = ref(null);
// let titleTag: any = ref(["H1", "H2", "H3"]);
// let titles: any = ref([]);
let catalog: any = ref([]);
const getDom = () => {
  nextTick(() => {
    // 根据之前设置的ref来获取文章的小标题
    const article_content = mavonRef.value; //这里的ff改成你具体设置的
    console.log(mavonRef.value);
    // 想获取的标题，将想获取的小标题的标签添加到这
    const titleTag = ["H1", "H2", "H3"];
    //存放小标题的数组
    let titles: any = [];
    article_content.childNodes.forEach((e: any, index: any) => {
      //具体执行步骤，比如：打印看看
      // console.log(e, index);
      if (titleTag.includes(e.nodeName)) {
        //具体封装过程
        // console.log(e.nodeName);
        const id = "header-" + index;
        // 设置元素id
        e.setAttribute("id", id);
        titles.push({
          id: id,
          title: e.innerHTML,
          level: Number(e.nodeName.substring(1, 2)),
          nodeName: e.nodeName,
          //read：后期主要用来判断当前阅读的是哪一个小标题的内容
          read: false,
        });
      }
    });
    //再data中定义catalog
    catalog.value = titles;
    // console.log("------", catalog.value);
  });
};
setTimeout(() => {
  getDom();
}, 500);

onUpdated(() => {
  // getDom();
});
</script>

<style scoped lang="scss">
.w-detail {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left {
  width: 75%;
  min-height: 100%;
  margin-right: 20px;
  padding: 40px 25px 25px 25px;
  // border: 1.5px solid rgb(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.9);
}

.header {
  margin-bottom: 45px;
  .title {
    margin-bottom: 10px;
    font-size: 25px;
    // font-weight: 550;
    color: rgb(0, 0, 0, 0.9);
  }
  ._title {
    font-size: 14px;
    color: rgb(0, 0, 0, 0.7);
    & > * {
      margin-right: 20px;
    }
  }
}

//右边栏
.right {
  flex: 1;
}
.directory {
  width: 100%;
  min-height: 300px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.9);
  padding: 20px;
  //固定
  position: sticky;
  top: 0;
}
</style>
