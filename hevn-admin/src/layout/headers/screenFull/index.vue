<template>
  <div @click="handleFullScreen" id="screenFull">
    <el-icon><FullScreen /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import screenfull from "screenfull";
import { FullScreen } from "@element-plus/icons-vue";

const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};
</script>

<style lang="scss" scoped>
.el-icon {
  font-size: $headRightIconSize;
  color: $headRightIconColor;
  // margin-right: $headRightIconMargin;
}
// .el-icon {
//   font-size: 23px;
//   color: rgba(0, 0, 0, 0.7);
//   margin-right: 18px;
// }
</style>
