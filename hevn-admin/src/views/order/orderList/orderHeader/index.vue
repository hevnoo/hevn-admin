<template>
  <div class="container">
    <el-input
      class="input"
      v-model="infoSearch.clientName"
      placeholder="请输入姓名查询"
    >
      <template #append>
        <el-button class="btn" @click="search()">搜索</el-button>
      </template>
    </el-input>
    <el-button class="addBtn" type="primary" plain @click="adds()"
      >新增订单</el-button
    >
  </div>
  <!-- 添加的弹框 -->
  <OrderDialog
    :isDialog="isDialog"
    :info="info"
    :eventMark="eventMark"
    @isDialogOrder="isDialogOrder"
  ></OrderDialog>
</template>

<script lang="ts" setup>
import OrderDialog from "@/views/order/components/OrderDialog.vue";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, orders } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { goodsList } = storeToRefs(useGoods);
let { total, orderList, stock } = storeToRefs(useOrders);

let isDialog = ref(false);
const eventMark = ref("orderHeader"); //传事件标识，dialog子组件依据标识判断
let isSearch = ref(false); //搜索状态标识.
const info = reactive({
  goodsName: null,
  saleNumber: 0,
  clientName: null,
  goodsPrice: 0,
});
const infoSearch = reactive({
  clientName: null,
  page: currentPage.value || 1,
});
//搜索
const search = () => {
  if (!infoSearch.clientName) {
    isSearch.value = false;
    useOrders.getOrder(currentPage.value);
    // store.dispatch("order/getOrder", currentPage.value);
  } else {
    isSearch.value = true; //开启搜索状态标识
    infoSearch.page = currentPage.value;
    useOrders.getSearchOrder(infoSearch);
    // store.dispatch("order/getSearchOrder", infoSearch);
    isSearch.value = false;
  }
};
const adds = () => {
  isDialog.value = true;
};
//弹框
const isDialogOrder = (emi: any) => {
  isDialog.value = emi;
};

watch(
  currentPage,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      //如果搜索状态标识为true，那么请求的是搜索列表，否则为默认数据列表。
      if (isSearch.value === true) {
        isSearch.value = false;
        infoSearch.page = currentPage.value;
        useOrders.getSearchOrder(infoSearch);
        // store.dispatch("order/getSearchOrder", infoSearch);
      } else {
        useOrders.getOrder(currentPage.value);
        // store.dispatch("order/getOrder", currentPage.value);
      }
    }
  }
  // { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  margin-left: 7px;
  display: flex;
  justify-content: space-between;
}
.input {
  width: 300px;
  height: 35px;
}
.btn {
  color: rgba(250, 250, 250, 1) !important;
}
//添加分类按钮
::v-deep .el-input-group__append {
  background-color: rgba(32, 176, 172, 0.7);
  border: none;
  cursor: pointer;
}
::v-deep .el-input-group__append:hover {
  background-color: rgba(32, 176, 172, 0.5);
}
::v-deep .el-input-group__append:active {
  background-color: rgba(0, 0, 0, 0.3);
}
//
.addBtn {
  margin-right: 50px;
}
</style>
