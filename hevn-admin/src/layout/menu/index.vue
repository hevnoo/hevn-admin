<template>
  <el-menu
    :default-active="currentPath"
    active-text-color="#20b0ac"
    background-color="#202a40"
    text-color="#bfcbd9"
    class="el-menu-vertical-demo"
    :collapse="isClose"
    :router="true"
  >
    <header class="logo">
      <img src="@/assets/img/logo/aHeader.png" alt="" />
      <div class="logo-name" v-if="!isClose">{{ $t("menu.logo") }}</div>
    </header>
    <template v-for="(item, index) in menu" :key="item.id">
      <el-menu-item
        v-if="!item.children"
        :index="item.path"
        @click="getName(item.name, item.component, index)"
      >
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
      <!--  -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="(res, i) in item.children"
          :key="res.id"
          :index="res.path"
          @click="getName(res.name, res.component, i)"
          >{{ res.meta.title }}</el-menu-item
        >
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { login, appSwitch } from "@/store";
import { storeToRefs } from "pinia";
import storage from "@/utils/storage.js";
const route = useRoute();
const router = useRouter();
const useLogin: any = login();
let { token, role, menu } = storeToRefs(useLogin);
const useAppSwitch: any = appSwitch();
let { isClose, breadKeys } = storeToRefs(useAppSwitch);
//获取当前路径
const currentPath = ref(router.currentRoute.value.path);
//isClose收缩menu
//breadKeys面包屑，key值刷新

const getName = (name: any, path: any, index: any) => {
  storage.setItem_s("name", name);
  storage.setItem_s("pathName", path);
  // storage.setItem_s("tagIndex", index);
  useAppSwitch.changeBreadKeys(breadKeys.value);
};
</script>

<style lang="scss" scoped>
//   @import './index.scss';
//Menu
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $menuWidth;
  min-height: 100vh;
  // min-height: calc(100vh - 50px);
}
.el-menu--collapse {
  min-height: 100vh;
}
.logo {
  width: 99.5%;
  height: $headHeight;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $menuBg;
  // background-color: #202a40;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
  img {
    width: 35px;
    height: 35px;
    border-radius: 100%;
  }
  .logo-name {
    color: #fff;
    margin-left: 10px;
    white-space: nowrap; //禁止自动换行
  }
}
</style>
