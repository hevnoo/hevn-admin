<template>
  <div class="wrapper-goods" v-show="goodsList">
    <header class="header">
      <SearchGoods></SearchGoods>
    </header>
    <div
      class="line"
      style="border-bottom: 1px solid rgb(0 0 0 / 15%); margin: 10px 0"
    ></div>
    <main class="main">
      <div class="table">
        <GoodsTable></GoodsTable>
      </div>
      <div class="page">
        <Pages></Pages>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import SearchGoods from "@/views/goods/goodsList/searchGoods/index.vue";
import GoodsTable from "@/views/goods/goodsList/goodsTable/index.vue";
import Pages from "@/components/pages/index.vue";
import { ref, onMounted, computed, watch } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, pageSize, goodsList } = storeToRefs(useGoods);

//初次加载就在本地加入页码
storage.setItem_s("page", currentPage.value);
//初始化加载列表数据
const aa = () => {
  useGoods.getGoodsList(currentPage.value);
};
setTimeout(() => {
  aa();
}, 300);

//离开组件时将初始化分页。
onBeforeRouteLeave((to, from) => {
  storage.removeItem_s("page");
  useAppSwitch.changePage(1);
});
</script>

<style lang="scss" scoped>
.wrapper-goods {
  min-height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding-top: 20px;
  padding-bottom: 20px;
}
.header {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  // margin-top: 20px;
  // background-color: rgba(0, 0, 0, 0.1);
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  // border-bottom: 1px solid rgb(0 0 0 / 10%);
}
.main {
  padding: 0 20px;
}
.table {
  width: 100%;
  min-height: 280px;
  margin-top: 20px;
  // background-color: rgba(255, 255, 255, 0.9);
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.page {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>
