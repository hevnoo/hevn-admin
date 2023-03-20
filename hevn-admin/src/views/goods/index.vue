<template>
  <!-- 产品管理 -->
  <router-view></router-view>
  <!-- vue动画，内容展示 -->
  <!-- <router-view v-slot="{ Component }"
    ><Transition name="views" mode="out-in" appear>
      <keep-alive>
        <component :is="Component" />
      </keep-alive> </Transition
  ></router-view> -->
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
};
getAllClass();
</script>

<style lang="scss" scoped>
// @import "@/layout/transform.scss";
</style>
