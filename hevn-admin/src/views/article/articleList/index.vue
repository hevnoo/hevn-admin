<template>
  <div class="wrapper">
    <header class="header">
      <articleListHeader />
    </header>
    <div
      style="border-bottom: 1px solid rgb(0 0 0 / 15%); margin: 0 0 7px 0"
    ></div>
    <main class="main">
      <articleListTable />
    </main>
  </div>
</template>

<script setup lang="ts">
import articleListHeader from "@/views/article/articleList/articleListHeader/index.vue";
import articleListTable from "@/views/article/articleList/articleListTable/index.vue";
import { ref, reactive, onMounted, computed, watch, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, article, goodsClass } from "@/store";
const useArticle: any = article();
// let { articleList } = storeToRefs(useArticle);

// const getList = () => {
//   useArticle.getAllArticle(1);
// };
// getList();
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100%;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 7px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
