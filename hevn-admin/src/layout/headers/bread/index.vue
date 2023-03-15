<template>
  <!-- <el-breadcrumb id="bread" :separator-icon="ArrowRight">
    <el-breadcrumb-item @click="removeStorage"
      ><a href="/">{{ $t("menu.home") }}</a></el-breadcrumb-item
    >
    <el-breadcrumb-item v-show="oldPath !== 'home'">{{
      $t(`menu.${breadArr[0]}`)
    }}</el-breadcrumb-item>
  </el-breadcrumb> -->
  <!--  -->
  <el-breadcrumb :separator-icon="ArrowRight" class="bread">
    <template v-for="(item, index) in breadArr" :key="index">
      <el-breadcrumb-item :to="{ path: item.path }" class="bread-item">{{
        $t(`menu.${item.name}`)
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, defineEmits } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import storage from "@/utils/storage.js";
import { ArrowRight } from "@element-plus/icons-vue";
const route = useRoute();
const router = useRouter();
//获取当前路径
const currentPath = ref(router.currentRoute.value.path);
//pathName
let path = ref(storage.getItem_s("pathName") || "");
let pathName = ref(path.value.split("/")[path.value.split("/").length - 2]);

//数组对象去重
const dedupe = (arr: any) => {
  let obj: any[] = [];
  arr = arr.reduce((newArr: any, next: any) => {
    obj[next.name] ? "" : (obj[next.name] = true && newArr.push(next));
    return newArr;
  }, []);
  return arr;
};
function dedupess(array: any): any[] {
  return Array.from(new Set(array));
}
//
let init = reactive([
  {
    name: "home",
    path: "/home",
  },
]);
let breadArr: any[] = reactive(storage.getItem_s("breadArr") || init);
//守卫 监听路由
onBeforeRouteUpdate((to, from) => {
  let toPath = to.path.split("/")[to.path.split("/").length - 1];
  let fromPath = from.path.split("/")[from.path.split("/").length - 1];
  // console.log(toPath, fromPath);
  if (breadArr.length == 1) {
    breadArr.push({
      name: toPath,
      path: to.path,
    });
    // breadArr.push(toPath);
  } else if (breadArr.length == 2) {
    breadArr[1] = {
      name: fromPath,
      path: from.path,
    };
    breadArr.push({
      name: toPath,
      path: to.path,
    });
  } else if (breadArr.length == 3) {
    breadArr[1] = {
      name: fromPath,
      path: from.path,
    };
    breadArr[2] = {
      name: toPath,
      path: to.path,
    };
  }
  //点首页时只显示一个面包屑
  // if (pathName.value == "home") {
  //   breadArr = init;
  // }
  breadArr = dedupe(breadArr);
  storage.setItem_s("breadArr", breadArr);
});

// watch(
//   pathName,
//   (newVal, oldVal) => {
//     changeArr(newVal);
//   },
//   { immediate: true, deep: true }
// );
</script>

<style lang="scss" scoped>
.bread-item {
  cursor: pointer;
}
.bread-item :hover {
  cursor: pointer;
  color: #20b0ac;
}
</style>
