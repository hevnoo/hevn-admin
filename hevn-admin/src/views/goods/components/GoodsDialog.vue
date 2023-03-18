<template>
  <el-dialog
    :model-value="props.isDialog"
    title="编辑"
    destroy-on-close
    @before-close="beforeClose"
    @close="beforeClose"
    draggable
  >
    <el-form>
      <el-form-item label="商品名称">
        <el-input
          v-model="props.form.goodsName"
          autocomplete="off"
          style="width: 300px"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input-number v-model="props.form.goodsNumber" :step="1" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number
          v-model="props.form.goodsPrice"
          :precision="2"
          :step="0.5"
        />
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select
          v-model="props.form.goodsClass"
          placeholder="请选择分类"
          clearable
        >
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.className"
            :value="item.className"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:7171/goods/upImg"
          :show-file-list="false"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
          name="goods_img"
        >
          <img
            v-if="props.form.goods_img"
            :src="props.form.goods_img"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          v-model="props.form.goodsDescribe"
          autocomplete="off"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="beforeClose">取消</el-button>
        <el-button
          v-if="eventMark === 'goodsTable'"
          type="primary"
          @click="confirm"
        >
          更新
        </el-button>
        <el-button v-else type="primary" @click="confirm"> 添加 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  watch,
  defineProps,
  defineEmits,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, goodsClass } from "@/store";

const emits = defineEmits(["isDialogGoods", "sendImg"]);
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
const useGoodsClass: any = goodsClass();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, pageSize, goodsList } = storeToRefs(useGoods);
let { classList } = storeToRefs(useGoodsClass);

const isDialog = ref(false);
// let form = reactive({
//   goodsName: '',
//   goodsNumber: 0,
//   goodsPrice: 0,
//   goodsClass: '',
//   goods_img: '',
//   goodsDescribe: ''
// })
let props: any = defineProps({
  isDialog: Boolean,
  form: Object,
  eventMark: String,
});

//图片
const onSuccess = (res: any) => {
  // 上传成功的回调，用作把上传的图片赋值到客户端显示出来！
  emits("sendImg", res.data);
};
const beforeUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
    ElMessage.error("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
};
//确认
const confirm = () => {
  if (
    props.form.goodsName &&
    props.form.goodsNumber &&
    props.form.goodsPrice &&
    props.form.goodsClass
  ) {
    //根据标识区分父组件
    if (props.eventMark === "searchGoods") {
      useGoods.addGoods(props.form);
    } else if (props.eventMark === "goodsTable") {
      useGoods.updateGoods(props.form);
    } else {
      console.log("未知的事件标识");
    }
  } else {
    ElMessage.warning("商品名称、价格、数量或类别不能为空");
  }
  // isDialog.value = false
  emits("isDialogGoods", false);
};
const beforeClose = () => {
  //关闭前的回调
  emits("isDialogGoods", false);
};
// const close=()=>{
//   //关闭的回调
//   emits('isDialogGoods', false)
// }
//props是单向数据流，所以要关闭就要emit发送关闭信号给父组件,再让父组件传过来关闭信号！
</script>

<style lang="scss" scoped>
//上传图片
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
/* 上传图片 */
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
