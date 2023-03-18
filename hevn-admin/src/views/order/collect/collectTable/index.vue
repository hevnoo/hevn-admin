<template>
  <el-table
    :data="manageList"
    style="width: 100%"
    :border="true"
    fit
    :span-method="objectSpanMethod"
    show-summary
  >
    <el-table-column prop="clientName" label="顾客名称" />
    <el-table-column prop="goodsName" label="商品名称" />
    <el-table-column prop="saleNumber" label="出售数量" />
    <el-table-column prop="goodsPrice" label="销售额" />
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="saleDate" label="日期" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watchEffect, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, orders } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, orderList, manageList } = storeToRefs(useOrders);

let spanArr: any = reactive([]); //用于存放每一行记录的合并数
let pos: any;
//设置合并数
const getSpanArr = (data: any) => {
  handleData(data);
  // data就是后台拿到的数据
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      spanArr.push(1);
      pos = 0;
    } else {
      // 判断当前元素与上一个元素是否相同
      if (data[i].clientName === data[i - 1].clientName) {
        spanArr[pos] += 1;
        spanArr.push(0);
      } else {
        spanArr.push(1);
        pos = i;
      }
    }
  }
  // console.log(spanArr)
};
//先排序数组数据,将相同名称的排在一起
const handleData = (res: any) => {
  for (let j = 0; j < res.length; j++) {
    for (let k = j + 1; k < res.length; k++) {
      if (res[j].clientName == res[k].clientName) {
        res.splice(j, 0, res[k]);
        res.splice(k + 1, 1);
      }
    }
  }
};
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  if (columnIndex === 0) {
    const _row = spanArr[rowIndex];
    const _col = _row > 0 ? 1 : 0;
    // console.log(`rowspan:${_row} colspan:${_col}`)
    return {
      // [0,0] 表示这一行不显示， [2,1]表示行的合并数
      rowspan: _row,
      colspan: _col,
    };
  }
};

watch(
  manageList,
  (val) => {
    getSpanArr(manageList.value);
  }
  // { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
//表格 行
::v-deep .el-table__row {
  height: 50px;
}

//表头 行
::v-deep th {
  // height: 42px;
  background-color: #f5fafe !important;
}
</style>
