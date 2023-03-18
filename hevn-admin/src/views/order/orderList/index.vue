<template>
  <!-- 订单列表 -->
  <div class="wrapper" v-show="orderList">
    <header class="orderHeader">
      <orderHeader></orderHeader>
    </header>
    <main class="orderTable">
      <orderTable></orderTable>
    </main>
    <footer class="pages">
      <Pages></Pages>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import orderHeader from "@/views/order/orderList/orderHeader/index.vue";
import orderTable from "@/views/order/orderList/orderTable/index.vue";
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
import { login, appSwitch, goods, orders } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, orderList } = storeToRefs(useOrders);

//初次加载就在本地加入页码
storage.setItem_s("page", currentPage.value);
//初始化加载列表数据
const aa = () => {
  useOrders.getOrder(currentPage.value);
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
.wrapper {
  margin-top: 10px;
}
.orderHeader {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background-color: #f5fafe;
}
.orderTable {
}
.pages {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
