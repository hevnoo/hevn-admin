<template>
  <!-- 产品管理 -->
  <router-view></router-view>
</template>

<script lang="ts" setup>
// import { useStore } from 'vuex'
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, goodsClass } from "@/store";
const useGoodsClass: any = goodsClass();
// let {} = storeToRefs(useGoodsClass);

//在最外层的父组件请求初始数据,获取分类列表数据
const getAllClass = () => {
  useGoodsClass.getClass();
  // store.dispatch('classes/getClass')
};
getAllClass();
</script>

<style lang="scss" scoped></style>
