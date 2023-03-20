<template>
  <div class="wrapper-signIn">
    <div class="box">
      <header class="header">欢迎登录</header>
      <el-form
        class="main"
        ref="formRef"
        :model="ruleForm"
        :rules="rules"
        status-icon
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="UserFilled"
            type="username"
            autocomplete="off"
            placeholder="用户名"
            v-on:keyup.13="signIn"
            @keyup.enter="signIn"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            :prefix-icon="Lock"
            type="password"
            autocomplete="off"
            placeholder="密码"
            show-password
            v-on:keyup.13="signIn"
            @keyup.enter="signIn"
          />
        </el-form-item>
      </el-form>
      <footer class="footer">
        <el-button
          class="loginBtn"
          type="primary"
          v-throttle="signIn"
          v-on:keyup.13="signIn"
          @keyup.enter="signIn"
          >登录</el-button
        >
        <div class="register"><span @click="toRegister">去注册</span></div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import storage from "@/utils/storage";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { login } from "@/store";
import { storeToRefs } from "pinia";
import { number } from "@intlify/core-base";
const route = useRoute();
const router = useRouter();
const useLogin: any = login();
let { token, role } = storeToRefs(useLogin);

interface formType {
  username: string | number | null;
  password: number | null;
}
const ruleForm: formType = reactive({
  username: null,
  password: null,
});
const rules = reactive({
  username: [
    {
      required: true,
      message: "Please input activity name",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input activity pass",
      trigger: "blur",
    },
  ],
});

let formRef: any = ref(null);
const signIn = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid: any, fields: any): any => {
    if (valid) {
      useLogin.setLogin(ruleForm);
      // useLogin.setMenu(role.value);
    } else {
      console.log("error submit!", fields);
      return false;
    }
  });
};

const emit = defineEmits(["ChangeForm"]);
const isRegister = ref(false);
const toRegister = () => {
  isRegister.value = true;
  emit("ChangeForm", isRegister.value);
};
</script>

<style lang="scss" scoped>
@import "@/views/login/components/common.scss";
.wrapper-signIn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 80%;
  height: 80%;
}
.header {
  color: #409eff;
  font-size: 3vh;
  text-align: center;
  margin-bottom: 5vh;
}
.footer {
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  .loginBtn {
    margin-bottom: 2vh;
  }
  .register {
    text-align: end;
    span {
      font-size: 14px;
      color: #44a0ff;
      cursor: pointer;
    }
  }
}
//
</style>
