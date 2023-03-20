<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <Headers></Headers>
        </el-header>
        <el-main>
          <!-- vue动画，内容展示 -->
          <!-- <router-view v-slot="{ Component }"
            ><Transition name="views" mode="out-in" appear>
              <keep-alive>
                <component :is="Component" />
              </keep-alive> </Transition
          ></router-view> -->
          <router-view class="view"></router-view>
          <!-- <router-view :class="isLeave ? 'view-leave' : 'view'"></router-view> -->
        </el-main>
        <el-footer>
          <Footers></Footers>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Menu from "@/layout/menu/index.vue";
import Headers from "@/layout/headers/index.vue";
import Footers from "@/layout/footers/index.vue";
import { ref, computed, watch } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
const route = useRoute();
const router = useRouter();

let componentsName =
  window.location.hash.split("/")[window.location.hash.split("/").length - 1];
// console.log(router.options.routes)
// console.log(route.matched);

let isLeave: any = ref(false);
//监听路由
// onBeforeRouteUpdate((to, from) => {
//   if (to.path !== from.path && from.path) {
//     // console.log(to.path, from.path);
//     isLeave.value = true;
//     setTimeout(() => {
//       isLeave.value = false;
//     }, 500);
//   }
// });
</script>

<style lang="scss" scoped>
@import "@/layout/transform.scss";
.el-container {
  //相对滚动
  height: 100vh;
}
.el-aside {
  width: auto; //宽随着子盒子撑开
  //相对滚动
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

.el-header {
  padding: 0;
  height: auto; //子盒子撑开
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
.el-main {
  background-color: #f0f2f5;
}
.el-footer {
  // display: none;
  height: $footerHeight;
  background-color: rgb(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
