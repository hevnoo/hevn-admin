<template>
  <div class="wrapper-register">
    <div class="box">
      <header class="header">注册</header>
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
          />
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            v-model="ruleForm.nickname"
            :prefix-icon="UserFilled"
            type="nickname"
            autocomplete="off"
            placeholder="昵称"
          />
        </el-form-item>
      </el-form>
      <footer class="footer">
        <el-button class="loginBtn" type="primary" @click="register"
          >注册</el-button
        >
        <div class="to-login"><span @click="toSignIn">返回登录</span></div>
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
const route = useRoute();
const router = useRouter();
const useLogin: any = login();

const ruleForm = reactive({
  username: null,
  password: null,
  nickname: null,
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
  nickname: [
    {
      required: true,
      message: "Please input activity nickname",
      trigger: "blur",
    },
  ],
});

const emit = defineEmits(["ChangeForm"]);
const isRegister = ref(false);

let formRef: any = ref(null);
const register = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid: any, fields: any): any => {
    if (valid) {
      useLogin.setRegister(ruleForm);
      setTimeout(() => {
        isRegister.value = false;
        // router.replace("/");
      }, 800);
    } else {
      console.log("error submit!", fields);
      return false;
    }
  });
};

const toSignIn = () => {
  isRegister.value = false;
  emit("ChangeForm", isRegister.value);
};
</script>

<style lang="scss" scoped>
@import "@/views/login/components/common.scss";
.wrapper-register {
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
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  .loginBtn {
    margin-bottom: 2vh;
  }
  .to-login {
    text-align: end;
    span {
      font-size: 14px;
      color: #44a0ff;
      cursor: pointer;
    }
  }
}
</style>
