<template>
  <!-- 出货清单 -->
  <div class="wrapper-collect">
    <header class="header">
      <span class="logo">汇总清单：</span>
    </header>
    <main class="collectTable">
      <collectTable v-if="manageList"></collectTable>
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
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, orderList, manageList } = storeToRefs(useOrders);

//初次加载就在本地加入页码
storage.setItem_s("page", currentPage.value);
const aa = () => {
  useOrders.getManage(currentPage.value);
};
aa();

//离开组件时将初始化分页。
onBeforeRouteLeave((to, from) => {
  storage.removeItem_s("page");
  useAppSwitch.changePage(1);
});
//
const info = reactive({
  page: currentPage.value || 1,
});

watch(currentPage, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    useOrders.getManage(currentPage.value);
  }
});
</script>

<style lang="scss" scoped>
.wrapper-collect {
  min-height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 20px 20px 10px 20px;
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
  margin-top: 25px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
