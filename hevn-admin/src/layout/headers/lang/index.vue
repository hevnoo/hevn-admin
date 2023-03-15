<template>
  <el-dropdown @command="getCommand">
    <span class="el-dropdown-link">
      <i class="iconfont icon-translate"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="currentLanguage === 'en'"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import storage from "@/utils/storage";
const i18n = useI18n();

const currentLanguage = computed(() => {
  return i18n.locale.value;
});
//拿到下拉菜单的唯一标识command
const getCommand = (val: any) => {
  // console.log(val)
  i18n.locale.value = val;
  storage.setItem("lang", val);
};
</script>

<style lang="scss" scoped>
.icon-translate {
  font-size: $headRightIconSize;
  color: $headRightIconColor;
  // margin-right: $headRightIconMargin;
  cursor: pointer;
}
</style>
