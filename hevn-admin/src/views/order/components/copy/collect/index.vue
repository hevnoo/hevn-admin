<template>
  <!-- 订单清单 -->
  <div class="wrapper-collect" v-show="collectList">
    <header class="header">
      <span class="logo">汇总清单：</span>
    </header>
    <main class="collectTable">
      <collectTable></collectTable>
    </main>
    <footer class="page">
      <Pages></Pages>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import collectTable from "@/views/order/collect/collectTable/index.vue";
import Pages from "@/components/pages/index.vue";
import { ref, reactive, computed, watch, onMounted } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, orders } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { goodsList } = storeToRefs(useGoods);
let { collectList, orderList, stock } = storeToRefs(useOrders);

//初次加载就在本地加入页码
storage.setItem_s("page", currentPage.value);
const aa = () => {
  useOrders.getCollect(currentPage.value);
  // store.dispatch("order/getCollect", currentPage.value);
};
setTimeout(() => {
  aa();
}, 200);

//离开组件时将初始化分页。
onBeforeRouteLeave((to, from) => {
  storage.removeItem_s("page");
  useAppSwitch.changePage(1);
  // store.commit("appSwitch/changePage", 1);
});
//
const info = reactive({
  page: currentPage.value || 1,
});
watch(currentPage, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    useOrders.getCollect(currentPage.value);
    // store.dispatch("order/getCollect", currentPage.value);
  }
});
</script>

<style lang="scss" scoped>
.wrapper-collect {
  margin-top: 10px;
}
.header {
  margin-bottom: 10px;
  margin-left: 4px;
  .logo {
    font-size: 18px;
    font-weight: 520;
  }
}
.page {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>
