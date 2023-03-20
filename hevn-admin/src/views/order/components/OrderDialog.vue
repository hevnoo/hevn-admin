<template>
  <el-dialog
    :model-value="props.isDialog"
    title="编辑"
    width="32%"
    destroy-on-close
    @before-close="beforeClose"
    @close="beforeClose"
    draggable
  >
    <el-form>
      <el-form-item label="商品名称">
        <el-input
          v-model="props.info.goodsName"
          autocomplete="off"
          style="width: 300px"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="销售数量">
        <el-input-number v-model="props.info.saleNumber" :step="1" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number
          v-model="props.info.goodsPrice"
          :precision="2"
          :step="0.5"
        />
      </el-form-item>
      <el-form-item label="顾客姓名">
        <el-input
          v-model="props.info.clientName"
          autocomplete="off"
          placeholder="请输入姓名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="beforeClose">取消</el-button>
        <el-button
          v-if="eventMark === 'orderTable'"
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
import { login, appSwitch, goods, orders } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { goodsList } = storeToRefs(useGoods);
let { total, orderList, stock } = storeToRefs(useOrders);

const emits = defineEmits(["isDialogOrder"]);
const isDialog = ref(false);

let props: any = defineProps({
  isDialog: Boolean,
  info: Object,
  eventMark: String,
});

//弹框的确认按钮
const confirm = () => {
  if (
    props.info.goodsName &&
    props.info.saleNumber &&
    props.info.goodsPrice &&
    props.info.clientName
  ) {
    //根据标识区分父组件
    if (props.eventMark === "orderHeader") {
      useOrders.getStock(props.info.goodsName);
      // 点击添加按钮时，先按order商品名称去goods数据表中找出对应的商品的数量；
      //然后，判断商品数量是否 > 销售数量。条件满足就放行，否则提示库存不足。
      setTimeout(() => {
        if (stock.value !== 0 && stock.value >= props.info.saleNumber) {
          useOrders.addOrder(props.info);
          //更新goods
          let num = stock.value - props.info.saleNumber;
          useOrders.upStock({
            num: num,
            goodsName: props.info.goodsName,
          });
        } else {
          ElMessage.warning(`库存不足！仅剩 ${stock.value} 件商品`);
        }
      }, 500);
      //
    } else if (props.eventMark === "orderTable") {
      useOrders.upOrder(props.info);
    } else {
      console.log("未知的事件标识");
    }
  } else {
    ElMessage.warning("请填写内容");
  }
  emits("isDialogOrder", false);
};
const beforeClose = () => {
  //关闭前的回调
  emits("isDialogOrder", false);
};
// const close=()=>{
//   //关闭的回调
//   emits('isDialogGoods', false)
// }
//props是单向数据流，所以要关闭就要emit发送关闭信号给父组件,再让父组件传过来关闭信号！
</script>

<style lang="scss" scoped></style>
