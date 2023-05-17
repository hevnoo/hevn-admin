<template>
  <div class="w-page">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="props.total"
      :page-size="props.pageSize"
      :current-page="currentPage"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, article, goodsClass } from "@/store";
const useArticle: any = article();
// let { articleList } = storeToRefs(useArticle);

const props = defineProps({
  total: {
    type: Number,
    default: () => 1,
  },
  pageSize: {
    type: Number,
    default: () => 1,
  },
});
const emits = defineEmits(["pageEmit"]);

// let total = ref(0);
// let pageSize = ref(1);
let currentPage = ref(1);

//当前页改变时触发。
const currentChange = (val: any) => {
  // console.log(`当前页: ${val}`);
  currentPage.value = val;
  emits("pageEmit", currentPage.value);
};
</script>

<style scoped lang="scss"></style>
