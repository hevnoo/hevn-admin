<template>
  <div class="w-home">
    <img src="@/assets/img/bg/welcome.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scoped>
.w-home {
  img {
    width: 100%;
    height: 100%;
    // background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
