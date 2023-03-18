<template>
  <el-dialog
    :model-value="props.isView"
    title="详情页"
    destroy-on-close
    @before-close="beforeClose"
    @close="beforeClose"
    draggable
  >
    <section>
      <span>商品名称：</span>
      <div>{{ props.form.goodsName }}</div>
    </section>
    <section>
      <span>商品ID：</span>
      <div>{{ props.form.id }}</div>
    </section>
    <section>
      <span>登记日期：</span>
      <div>
        {{ dayjs(props.form.createDate).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </section>
    <section>
      <span>价格：</span>
      <div>{{ props.form.goodsPrice }} 元</div>
    </section>
    <section>
      <span>数量：</span>
      <div>{{ props.form.goodsNumber }}</div>
    </section>
    <section>
      <span>规格类目：</span>
      <div>{{ props.form.goodsClass }}</div>
    </section>
    <section>
      <span>图片：</span>
      <img
        v-if="props.form.goods_img"
        class="img"
        :src="props.form.goods_img"
        alt=""
      />
      <img v-else class="imgs" src="@/assets/vue.svg" alt="" />
    </section>
    <section>
      <span>商品描述：</span>
      <div>{{ props.form.goodsDescribe }}</div>
    </section>
    <section>
      <span>登记作者：</span>
      <div>{{ props.form.users }}</div>
    </section>
    <section>
      <span>作者ID：</span>
      <div>{{ props.form.user_id }}</div>
    </section>
    <!--  -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="beforeClose">取消</el-button>
        <el-button type="primary" @click="confirm"> 返回 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, defineProps, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import storage from "@/utils/storage.js";
const emits = defineEmits(["isDetail"]);
const route = useRoute();
const router = useRouter();

let props: any = defineProps({
  isView: Boolean,
  form: Object,
});
const confirm = () => {
  emits("isDetail", false);
};
const beforeClose = () => {
  //关闭前的回调
  emits("isDetail", false);
};
</script>

<style lang="scss" scoped>
section {
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  display: flex;
  // align-items: center;
  margin-bottom: 15px;
  span {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
  }
}
.img {
  width: 180px;
  height: 170px;
}
.imgs {
  width: 150px;
  height: 140px;
}
</style>
