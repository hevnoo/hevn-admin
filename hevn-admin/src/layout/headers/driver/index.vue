<template>
  <!-- <el-icon><Flag /></el-icon> -->
  <div id="guide" @click.prevent.stop="handleGuide">
    <el-icon><Flag /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { Flag } from "@element-plus/icons-vue";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { steps } from "./steps";

let driver: any;
onMounted(() => {
  driver = new Driver({
    animate: false, // Whether to animate or not
    opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
    padding: 2, // Distance of element from around the edges
    allowClose: true, // Whether the click on overlay should close or not
    overlayClickNext: false, // Whether the click on overlay should move next
    doneBtnText: "Dnoe", // Text on the final button
    closeBtnText: "Close", // Text on the close button for this step
    stageBackground: "#ffffff", // Background color for the staged behind highlighted element
    nextBtnText: "Next", // Next button text for this step
    prevBtnText: "previous", // Previous button text for this step
  });
});
// const initDriver = () => {

// }

const handleGuide = () => {
  driver.defineSteps(steps);
  driver.start();
};
</script>

<style lang="scss" scoped>
.el-icon {
  font-size: $headRightIconSize;
  color: $headRightIconColor;
  // margin-right: $headRightIconMargin;
}
</style>
