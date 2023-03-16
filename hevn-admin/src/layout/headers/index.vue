<template>
  <div class="wrapper-header">
    <div class="front">
      <section class="switch" @click="changeSwitch">
        <el-icon v-if="!isClose"><Fold /></el-icon>
        <el-icon v-else><Expand /></el-icon>
      </section>
      <span class="navBread">
        <Bread :key="breadKeys"></Bread>
      </span>
    </div>
    <div class="back">
      <Driver></Driver>
      <ScreenFull></ScreenFull>
      <Lang></Lang>
      <Dropdown v-if="userInfo"></Dropdown>
    </div>
  </div>
  <!-- tag -->
  <div class="wrapper-tag">
    <Tag :key="tagKeys"></Tag>
  </div>
</template>

<script lang="ts" setup>
import Tag from "@/layout/headers/tag/index.vue";
import Bread from "@/layout/headers/bread/index.vue";
import Dropdown from "@/layout/headers/dropdown/index.vue";
import Lang from "@/layout/headers/lang/index.vue";
import ScreenFull from "@/layout/headers/screenFull/index.vue";
import Driver from "@/layout/headers/driver/index.vue";
import { ref, computed, watch, defineEmits } from "vue";
import { Expand, Fold, UserFilled } from "@element-plus/icons-vue";
import { login, appSwitch } from "@/store";
import { storeToRefs } from "pinia";
import storage from "@/utils/storage.js";
const useAppSwitch = appSwitch();
const { breadKeys, tagKeys } = storeToRefs(useAppSwitch);
const useLogin: any = login();
let { userInfo } = storeToRefs(useLogin);

let isClose = ref(false);

const changeSwitch = () => {
  isClose.value = !isClose.value;
  useAppSwitch.change(isClose.value);
};

//初始化加载列表数据，获取用户信息
// const init = () => {
//   store.dispatch('login/userInfo')
// }
// init()
// const userInfo = computed(() => store.state.login.userInfo)
</script>

<style lang="scss" scoped>
//Headers
.wrapper-header {
  height: $headHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.7px solid rgb(0, 0, 0, 0.08);
}
.front {
  margin-left: 10px;
  display: flex;
  align-items: center;
  .switch {
    display: flex;
    align-items: center;
    .el-icon {
      font-size: 20px;
      // margin-top: 2px;
    }
  }
  .navBread {
    margin-left: 15px;
    font-size: 14px;
    font-weight: 600;
  }
}
.back {
  margin-right: 20px;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 23px;
  }
}
//tag
.wrapper-tag {
  width: 100%;
  height: 30px;
  // background-color: antiquewhite;
}
</style>
