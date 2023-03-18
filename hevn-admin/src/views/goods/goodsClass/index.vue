<template>
  <div class="wrapper">
    <header class="cateHeader"><goodsClassHeader></goodsClassHeader></header>
    <div
      class="line"
      style="border-bottom: 1px solid rgb(0 0 0 / 15%); margin: 10px 0"
    ></div>
    <main class="cateTable"><goodsClassTable></goodsClassTable></main>
    <!-- <footer class="pageFooter"><Pages></Pages></footer> -->
  </div>
</template>

<script lang="ts" setup>
import goodsClassHeader from "@/views/goods/goodsClass/goodsClassHeader/index.vue";
import goodsClassTable from "@/views/goods/goodsClass/goodsClassTable/index.vue";
import Pages from "@/components/pages/index.vue";
import { ref, onMounted, computed, watch } from "vue";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, goodsClass } from "@/store";
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
const useGoodsClass: any = goodsClass();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, pageSize, goodsList } = storeToRefs(useGoods);
let { classList } = storeToRefs(useGoodsClass);
//在最外层的父组件请求初始数据
const getAllClass = () => {
  useGoodsClass.getClass();
};
getAllClass();
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 150px);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding-top: 10px;
  padding-bottom: 20px;
}
.cateHeader {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  // width: 100%;
  // height: 40px;
  // background-color: #f5fafe;
}
.cateTable {
  width: 100%;
  min-height: 280px;
  padding: 0 20px;
  margin-top: 20px;
}
</style>
