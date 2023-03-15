<template>
  <div @click="change">test</div>
  <div>{{ isOpen }}</div>
  <el-button type="primary">Primary</el-button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
//
import { storeToRefs } from "pinia";
import { test } from "@/store";
const useTest: any = test();
let { isOpen, testValue } = storeToRefs(useTest);

const change = () => {
  isOpen.value = !isOpen.value;
  console.log(isOpen.value);
};
//使用action
// useTest.run(10);
// console.log(testValue.value);
// //
// import { storeToRefs } from "pinia";
// import { user } from "@/store";
// const useUser: any = user();
// let { userList } = storeToRefs(useUser);
// const getUsers = () => {
//   useUser.setUserList();
//   console.log(userList.value);
// };
</script>

<style lang="scss" scoped></style>
