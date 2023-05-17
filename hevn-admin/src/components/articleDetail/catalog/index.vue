<!-- 目录 -->
<template>
  <div class="w-catalog">
    <header>目录</header>
    <main
      class="main"
      v-for="(item, index) in (props.catalog as any[])"
      :key="index"
    >
      {{ item.title }}
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();

const props = defineProps({
  catalog: {
    type: Array,
    default: ["1"],
  },
});
console.log(props.catalog);
</script>

<style scoped lang="scss">
.w-catalog {
  // background-color: antiquewhite;
  & > * {
    margin-bottom: 10px;
  }
}
</style>
