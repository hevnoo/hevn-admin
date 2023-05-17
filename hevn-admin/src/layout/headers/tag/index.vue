<template>
  <div class="_wrapper">
    <div class="tags">
      <el-tag
        v-for="(item, index) in tagList.slice(0, 9)"
        :key="item"
        class="tag-item"
        closable
        type="info"
        @close="handleClose(item)"
        @click="clickTag(item, index)"
        :class="activeIndex == index ? 'active' : ''"
      >
        {{ mixed(item) }}
      </el-tag>
      <el-tag v-if="tagList.length > 9" class="tag-item" type="info">
        ... ...
      </el-tag>
    </div>
    <!-- <el-button class="clear" @click="clear()">清空</el-button> -->
    <el-icon class="clear" @click="clear()"><Close /></el-icon>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  computed,
  watch,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import storage from "@/utils/storage";
import { Close } from "@element-plus/icons-vue";
import { login, appSwitch } from "@/store";
import { storeToRefs } from "pinia";
const route = useRoute();
const router = useRouter();
const useLogin = login();
const useAppSwitch = appSwitch();
const { menu } = storeToRefs(useLogin);
const { breadKeys, tagKeys } = storeToRefs(useAppSwitch);
//获取当前路径
const currentPath = ref(router.currentRoute.value.path);
//p
let path = ref(storage.getItem_s("pathName") || "");
let pathName = ref(path.value.split("/")[path.value.split("/").length - 2]);
//模板遍历的数据
let tagList: any[] = reactive(storage.getItem_s("tagList") || ["home"]);
//动态属性条件
let activeIndex: any = ref(storage.getItem_s("tagIndex") || 0);

//监听路由
onBeforeRouteUpdate((to, from) => {
  storage.setItem_s("name", to.name);
  storage.setItem_s("pathName", to.path);
  if (to.name !== "home") {
    addTag(to.name);
  }
  //获取activeIndex
  // creatIndexArr(to.name);
  activeIndex.value = tagList.indexOf(to.name);
  storage.setItem_s("tagIndex", activeIndex.value);
});
//添加tagList。
const addTag = (name: any): void => {
  if (!tagList.includes(name)) {
    tagList.push(name);
    storage.setItem_s("tagList", tagList);
  }
};
//点击tag事件
const clickTag = (val: any, i: any) => {
  router.push({ name: val });
  activeIndex.value = i;
  storage.setItem_s("tagIndex", i);
  useAppSwitch.changeBreadKeys(breadKeys.value);
};
//点击单个删除
const handleClose = (name: any) => {
  let init = tagList.indexOf(name);
  if (name !== "home") {
    tagList.splice(tagList.indexOf(name), 1);
    storage.setItem_s("tagList", tagList);
    //单个删除时，高亮的位置
    if (name != storage.getItem_s("name")) {
      activeIndex.value = tagList.indexOf(storage.getItem_s("name"));
      storage.setItem_s("tagIndex", activeIndex.value);
    } else {
      activeIndex.value = init - 1;
      storage.setItem_s("tagIndex", activeIndex.value);
      router.push({ name: tagList[activeIndex.value] });
    }
  }
  // useAppSwitch.changeTagKeys(tagKeys.value);
};
//清空按钮
const clear = () => {
  let newName = storage.getItem_s("name");
  tagList = ["home"];
  addTag(newName);
  if (newName != "home") {
    activeIndex.value = 1;
  } else {
    activeIndex.value = 0;
  }
  storage.setItem_s("tagList", tagList);
  storage.setItem_s("tagIndex", activeIndex.value);
  // storage.removeItem_s("tagList");
  useAppSwitch.changeTagKeys(tagKeys.value);
};

//匹配交集，，以name找出menu里的title文字。
const mixed = (name: string) => {
  let menuObj: string[] = [];
  let menuTitle: string[] = [];
  menu.value.map((item: any) => {
    if (item.children) {
      item.children.map((res: any) => {
        if (res.name == name) {
          menuObj.push(res);
          menuTitle.push(res.meta.title);
        }
      });
    } else {
      if (item.name == name) {
        menuObj.push(item);
        menuTitle.push(item.meta.title);
      }
    }
  });
  //额外添加的路由名
  if (name == "articleDetail") {
    return "文章详情页";
  }

  return menuTitle[0];
};
//数组去重
function de(array: any): any[] {
  return Array.from(new Set(array));
}
//数组对象去重
const dedupe = (arr: any) => {
  let obj: any[] = [];
  arr = arr.reduce((newArr: any, next: any) => {
    obj[next.name] ? "" : (obj[next.name] = true && newArr.push(next));
    return newArr;
  }, []);
  return arr;
};

// watch(
//   tagList,
//   (newVal, oldVal) => {
//     console.log(newVal);
//   },
//   { immediate: true, deep: true }
// );
</script>

<style lang="scss" scoped>
._wrapper {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tags {
  height: 100%;
  max-width: 70%;
  display: flex;
  align-items: center;
}
.tag-item {
  height: 27px;
  width: auto;
  cursor: pointer;
  ::v-deep .el-icon {
    margin-left: 20px;
  }
}

.clear {
  height: 27px;
  width: 90px;
  margin-right: 10px;
  font-size: 19px;
  color: rgb(0, 0, 0, 0.5);
}
.clear :hover {
  color: #20b0ac;
}
//动态属性，高亮
.active {
  color: #20b0ac;
  background-color: rgb(255, 255, 255, 0.5);
  // border-right: 0.5px solid #fff;
  border-bottom: 0.5px solid #fff;
  border-left: 0.5px solid rgb(0, 0, 0, 0.05);
  border-right: 0.5px solid rgb(0, 0, 0, 0.05);
  border-radius: 4px 4px 0 0;
}
// .active ::after {
//   content: "";
//   // position: absolute;
//   left: 0;
//   top: 0;
//   bottom: 5px;
//   right: 0;
//   height: 10px;
//   width: 1px;
//   background-color: red;
// }
</style>
