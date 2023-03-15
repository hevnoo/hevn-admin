<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <img
        :src="userInfo.head_img ? userInfo.head_img : imgUrl"
        alt=""
        class="logo"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="goPersonal">{{
          $t("menu.personal")
        }}</el-dropdown-item>
        <el-dropdown-item @click="goHome">{{
          $t("menu.home")
        }}</el-dropdown-item>
        <el-dropdown-item @click="logout">{{
          $t("menu.logout")
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import imgUrl from "@/assets/img/logo/aHeader.png";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import storage from "@/utils/storage";
import { login, appSwitch } from "@/store";
import { storeToRefs } from "pinia";
const route = useRoute();
const router = useRouter();
const useLogin = login();
const useAppSwitch = appSwitch();
const { userInfo } = storeToRefs(useLogin);
const { breadKeys } = storeToRefs(useAppSwitch);

const goPersonal = () => {
  storage.setItem_s("name", "personal");
  useAppSwitch.changeBreadKeys(breadKeys.value);
  router.push("/personal");
};
const goHome = () => {
  storage.setItem_s("name", "home");
  useAppSwitch.changeBreadKeys(breadKeys.value);
  // store.commit("keys/changeBreadKeys", breadKeys.value);
  router.push("/home");
};
const logout = () => {
  useLogin.logout();
};
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.logo {
  width: 33px;
  height: 33px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
