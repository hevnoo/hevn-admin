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
          <router-view></router-view>
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
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
const route = useRoute();
const router = useRouter();
// console.log(router.options.routes)
</script>

<style lang="scss" scoped>
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
  display: none;
}
</style>
