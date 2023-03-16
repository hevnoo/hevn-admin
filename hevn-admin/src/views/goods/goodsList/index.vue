<template>
  <div class="wrapper-goods" v-show="goodsList">
    <header class="search">
      <SearchGoods></SearchGoods>
    </header>
    <main class="table">
      <GoodsTable></GoodsTable>
    </main>
    <footer class="page">
      <Pages></Pages>
    </footer>
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
let { token, currentPage } = storeToRefs(useAppSwitch);
const useGoods: any = goods();
let { total, pageSize, goodsList } = storeToRefs(useGoods);

// const total = computed(() => store.state.goods.total)
//初次加载就在本地加入页码
// const currentPage = computed(() => store.state.appSwitch.currentPage)
storage.setItem_s("page", currentPage.value);
//初始化加载列表数据
const aa = () => {
  useGoods.getGoodsList(currentPage.value);
  // store.dispatch('goods/getGoodsList', currentPage.value)
};
setTimeout(() => {
  aa();
}, 300);

// const goodsList = computed(() => store.state.goods.goodsList)
//离开组件时将初始化分页。
onBeforeRouteLeave((to, from) => {
  storage.removeItem_s("page");
  useAppSwitch.changePage(1);
  // store.commit('appSwitch/changePage', 1)
});
// const currentPath = ref(router.currentRoute.value.path)
// watch(
//   currentPath,
//   (newVal, oldVal) => {
//     if (newVal == '/goods/goodsList') {
//       // console.log('***', newVal)
//       storage.setItem_s('goodsPage', currentPage.value)
//     } else {
//       storage.removeItem_s('goodsPage')
//     }
//   },
//   { immediate: true, deep: true }
// )
</script>

<style lang="scss" scoped>
.wrapper-goods {
  margin-top: 10px;
}
.search {
  width: 100%;
  height: 65px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  display: flex;
  align-items: center;
  padding: 20px;
}
.table {
  width: 100%;
  min-height: 280px;
  // background-color: rgba(255, 255, 255, 1);
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  margin-top: 20px;
  // padding: 10px;
}
.page {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>
