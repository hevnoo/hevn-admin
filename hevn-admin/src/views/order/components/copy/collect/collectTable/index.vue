<template>
  <el-table :data="collectList" show-summary style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="saleDate" label="日期" />
    <el-table-column prop="goodsName" label="商品名称" />
    <el-table-column prop="saleNumber" label="出售数量" />
    <el-table-column prop="goodsPrice" label="销售额" />
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
const useGoods: any = goods();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { goodsList } = storeToRefs(useGoods);
let { collectList, orderList, stock } = storeToRefs(useOrders);
</script>

<style lang="scss" scoped>
//表头
::v-deep th {
  // height: 42px;
  background-color: #f5fafe !important;
}
</style>
