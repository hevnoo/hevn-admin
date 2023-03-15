<template>
  <div class="wrapper">
    <div class="box">
      <section class="card">
        <Card></Card>
      </section>
      <section class="loginForm">
        <signIn v-if="isRegister == false" @ChangeForm="getForm"></signIn>
        <register v-else @ChangeForm="getForm"></register>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "@/views/login/components/Card.vue";
import signIn from "@/views/login/signIn/index.vue";
import register from "@/views/login/register/index.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
let isRegister = ref(false);
const getForm = (e: boolean) => {
  isRegister.value = e;
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //渐变背景
  // background-image: radial-gradient(#21d6c7, #e0d865);
  background: linear-gradient(45deg, rgba(60, 182, 252, 1), rgb(245, 221, 148));
}
.box {
  display: flex;
  width: 55vw;
  height: 50vh;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 20%);
}
.card {
  width: 63%;
  border-radius: 7px 0 0 7px;
}
.loginForm {
  flex: 1;
}
</style>
