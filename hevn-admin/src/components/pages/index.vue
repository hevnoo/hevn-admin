<template>
  <div class="wrapper">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, computed, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods } from "@/store";
const route = useRoute();
const router = useRouter();
// const emits = defineEmits(['currentChange'])
// emits('currentChange', currentPage)
const useAppSwitch: any = appSwitch();
let { token, currentPage } = storeToRefs(useAppSwitch);
const useGoods: any = goods();
let { total: totals, pageSize: pageSizes } = storeToRefs(useGoods);

// console.log(router.currentRoute.value.name)
const total = computed(() => {
  if (router.currentRoute.value.name === "goodsList") {
    return totals;
    // return store.state.goods.total;
  } else if (router.currentRoute.value.name == "orderList" || "collect") {
    // return store.state.order.total;
  } else {
    return 10;
  }
});
const pageSize = computed(() => {
  if (router.currentRoute.value.name === "goodsList") {
    return pageSizes;
  } else if (router.currentRoute.value.name == "orderList" || "collect") {
    // return store.state.order.pageSize;
  } else {
    return 10;
  }
});
//当前页改变时触发。
const currentChange = (val: any) => {
  // console.log(`当前页: ${val}`)
  // store.commit('goods/changePage', val)
  // store.commit("appSwitch/changePage", val);
  useAppSwitch.changePage(val);
};
</script>

<style lang="scss" scoped></style>
