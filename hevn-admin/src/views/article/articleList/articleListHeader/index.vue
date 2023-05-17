<template>
  <div class="w-header">
    <section class="search">
      <span>搜索文章</span>
      <el-input v-model="input" placeholder="Please input" clearable />
      <el-button type="primary">查询</el-button>
      <el-button type="danger" @click="clearInput()">清除</el-button>
    </section>
    <section class="add">
      <el-button class="addBtn" type="primary" plain @click="adds()">
        <el-icon><Plus /></el-icon>
        新增文章
      </el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, article, goodsClass } from "@/store";
const route = useRoute();
const router = useRouter();
const useArticle: any = article();

let input = ref("");

const clearInput = () => {
  input.value = "";
};

const adds = () => {
  router.push({ path: "/article/setArticle" });
};
</script>

<style scoped lang="scss">
.w-header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search {
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 14px;
    //文字不换行
    white-space: nowrap;
  }
  .el-input {
    width: 200px;
  }
  & > * {
    margin-right: 10px;
  }
}
.add {
  margin-right: 20px;
}
</style>
