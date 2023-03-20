<template>
  <div>Home</div>
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

<style lang="scss" scoped></style>
