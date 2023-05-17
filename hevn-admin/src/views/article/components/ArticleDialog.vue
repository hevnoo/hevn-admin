<template>
  <el-dialog
    :model-value="props.isDialog"
    width="32%"
    destroy-on-close
    @before-close="beforeClose"
    @close="beforeClose"
    draggable
  >
    <el-form>
      <el-form-item label="类别名称">
        <el-input
          v-model="props.sendInfo.articleClassName"
          autocomplete="off"
          style="width: 300px"
          placeholder="请输入名称"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="beforeClose">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  upArticleClassApi,
  addArticleClassApi,
  getArticleClassApi,
} from "@/api/modules/articleClass";
import { ref, onMounted, computed, watch, defineProps, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import emitter from "@/utils/evnetBus";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, articleClass } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useArticleClass: any = articleClass();
// let { total, pageSize } = storeToRefs(useArticleClass);

const emits = defineEmits(["articleDialogEmit"]);

let articleList: any = ref([]);
//分页器
let total: any = ref(0);
let pageSize: any = ref(1);

let props: any = defineProps({
  isDialog: {
    type: Boolean,
    default: () => false,
  },
  sendInfo: {
    type: Object,
    default: () => {},
  },
  eventMark: {
    type: String,
    default: () => "",
  },
});

//弹框的确认按钮
const confirm = async () => {
  if (props.sendInfo.articleClassName) {
    //根据标识区分父组件
    if (props.eventMark === "articleClassHeader") {
      let { data } = await addArticleClassApi(props.sendInfo);
      ElMessage.success(data.msg);
      // await getArticleClassApi(1);
      getList(1);
    } else if (props.eventMark === "articleClassTable") {
      let { data } = await upArticleClassApi(props.sendInfo);
      ElMessage.success(data.msg);
    }
  } else {
    ElMessage.warning("请填写内容");
  }
  emits("articleDialogEmit", false);
};

//关闭前的回调
const beforeClose = () => {
  emits("articleDialogEmit", false);
};

//添加之后获取最新数据。
const getList = async (val: any) => {
  try {
    let { data } = await getArticleClassApi(val);
    articleList.value = data.data;
    total.value = data.total;
    pageSize.value = data.pageSize;
    let obj = {
      articleList: data.data,
      total: data.total,
    };
    // 前面是事件，后面是要传入的参数
    emitter.emit("newArticleClassListEmit", obj);
  } catch (error) {
    console.log(error);
  }
};

// const close=()=>{
//   //关闭的回调
//   emits('isDialogGoods', false)
// }
//props是单向数据流，所以要关闭就要emit发送关闭信号给父组件,再让父组件传过来关闭信号！
</script>

<style lang="scss" scoped></style>
