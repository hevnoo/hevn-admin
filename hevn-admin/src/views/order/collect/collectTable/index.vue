<template>
  <el-table
    :data="manageList"
    style="width: 100%"
    :border="true"
    fit
    :span-method="objectSpanMethod"
    show-summary
  >
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="clientName" label="顾客名称" />
    <el-table-column prop="goodsName" label="商品名称" />
    <el-table-column prop="saleNumber" label="出售数量" />
    <el-table-column prop="goodsPrice" label="销售额" />
    <el-table-column prop="saleDate" label="日期" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watchEffect, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { sortOrders } from "@/hooks/modules/useOrders";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, orders } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, orderList, manageList, spanArr }: any = storeToRefs(useOrders);

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  //合并第二行columnIndex === 1
  if (columnIndex === 1) {
    const _row = spanArr.value[rowIndex];
    const _col = _row > 0 ? 1 : 0;
    // console.log(`rowspan:${_row} colspan:${_col}`)
    return {
      // [0,0] 表示这一行不显示， [2,1]表示行的合并数
      rowspan: _row,
      colspan: _col,
    };
  }
};

// watch(
//   manageList,
//   (val) => {
//   }
//   // { immediate: true, deep: true }
// );
</script>

<style lang="scss" scoped>
//表头 行
::v-deep th {
  // height: 42px;
  background-color: #f5fafe !important;
}
//表格 行
::v-deep .el-table__row {
  // height: 50px;
}
</style>
