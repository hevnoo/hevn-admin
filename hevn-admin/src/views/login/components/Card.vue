<template>
  <div class="wrapper-card">
    <div class="text">
      <span>Have a good time</span>
      <span>Bali, Indonesia</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
</script>

<style lang="scss" scoped>
.wrapper-card {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/bg/login-bg.jpg");
  background-repeat: no-repeat;
  border-radius: 7px 0 0 7px;
  background-size: cover;
  z-index: 1;
  /* 动画 */
  // animation: move 70s linear forwards infinite;
  background-position: 0 0%;
  animation-name: move;
  animation-duration: 70s;
  animation-timing-function: linear; //线性,渐变
  animation-iteration-count: infinite; //播放的次数，infinite一直重复，默认是1
  animation-direction: alternate; //动画播放的方向,alternate逆播放
  animation-fill-mode: forwards; //动画结束后保持forwards终点状态，或变为backwards起点状态
  background-size: 100%;
}
.text {
  position: absolute;
  left: 7%;
  bottom: 15%;
  display: flex;
  flex-direction: column;
  color: rgb(255, 255, 255, 0.9);
  & :nth-child(1) {
    font-size: 3vh;
    margin-bottom: 3vh;
  }
}
//
@keyframes move {
  0% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 100%;
  }
}
</style>
