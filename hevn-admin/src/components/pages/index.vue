<template>
  <div class="wrapper">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="totals"
      :page-size="pageSizes"
      :current-page="currentPage"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, computed } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, orders } from "@/store";
const route = useRoute();
const router = useRouter();
// const emits = defineEmits(['currentChange'])
// emits('currentChange', currentPage)
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, pageSize } = storeToRefs(useGoods);
let {
  total: orderTotal,
  pageSize: orderPageSize,
  orderList,
} = storeToRefs(useOrders);

//监听路由
onBeforeRouteUpdate((to, from) => {});

const totals = computed(() => {
  if (router.currentRoute.value.name === "goodsList") {
    return total.value;
    // return store.state.goods.total;
  } else if (router.currentRoute.value.name == "orderList" || "collect") {
    return orderTotal.value;
    // return store.state.order.total;
  } else {
    return 10;
  }
});
const pageSizes = computed(() => {
  if (router.currentRoute.value.name === "goodsList") {
    return pageSize.value;
  } else if (router.currentRoute.value.name == "orderList" || "collect") {
    return orderPageSize.value;
    // return store.state.order.pageSize;
  } else {
    return 10;
  }
});
//当前页改变时触发。
const currentChange = (val: any) => {
  // console.log(`当前页: ${val}`)
  // store.commit('goods/changePage', val)
  useAppSwitch.changePage(val);
};
</script>

<style lang="scss" scoped></style>
