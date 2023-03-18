<template>
  <div class="wrapper-footers">2022 © Admin. All Rights Reserved.</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, pageSize, goodsList } = storeToRefs(useGoods);
</script>

<style lang="scss" scoped>
.wrapper-footers {
  font-size: 15px;
  color: rgb(0, 0, 0, 0.3);
}
</style>
