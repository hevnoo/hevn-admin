<template>
  <div class="wrapper-search">
    <section class="item date">
      <span class="name">日期：</span>
      <el-date-picker
        v-model="searchForm.date"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        clearable
      />
    </section>
    <section class="item classes">
      <span class="name">商品类别：</span>
      <el-select
        v-model="searchForm.goodsClass"
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
    </section>
    <section class="item goodsName">
      <span class="name">商品名称：</span>
      <el-input
        v-model="searchForm.goodsName"
        placeholder="请输入内容"
        clearable
      />
    </section>
    <!--  -->
    <el-button class="btn1" type="primary" @click="search">搜索</el-button>
    <el-button class="btn2" type="danger" plain @click="clearInput"
      >清空</el-button
    >
    <el-button
      class="btn3"
      type="success"
      plain
      :icon="Plus"
      @click="addGoodsLog"
      >添加产品</el-button
    >
  </div>

  <!-- 弹框 -->
  <GoodsDialog
    :isDialog="isDialog"
    :form="form"
    :eventMark="eventMark"
    @isDialogGoods="isDialogGoods"
    @sendImg="sendImg"
  ></GoodsDialog>
</template>

<script lang="ts" setup>
import GoodsDialog from "@/views/goods/components/GoodsDialog.vue";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Search, Edit, Plus } from "@element-plus/icons-vue";
import storage from "@/utils/storage.js";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, goodsClass } from "@/store";
const useAppSwitch: any = appSwitch();
let { token, currentPage } = storeToRefs(useAppSwitch);
const useGoods: any = goods();
let { total, pageSize, goodsList } = storeToRefs(useGoods);
const useGoodsClass: any = goodsClass();
let { classList } = storeToRefs(useGoodsClass);

interface formType {
  goodsName: string;
  goodsNumber: number;
  goodsPrice: number;
  goodsClass: any;
  goods_img: any;
  goodsDescribe: string;
}
interface searchFormType {
  date: string;
  goodsClass: any;
  goodsName: string;
  page: any;
}
const searchForm: searchFormType = reactive({
  date: "",
  goodsClass: "",
  goodsName: "",
  page: 1,
});
const form: formType = reactive({
  goodsName: "",
  goodsNumber: 0,
  goodsPrice: 0,
  goodsClass: "",
  goods_img: null,
  goodsDescribe: "",
});
let isDialog = ref(false);
const eventMark = ref("searchGoods"); //传事件标识，dialog子组件依据标识判断
let isSearch = ref(false); //标识是否是搜索状态，搜索状态就传页码到搜索请求。
//搜索
const search = () => {
  // store.commit('goods/changePage', 1)
  if (!searchForm.date && !searchForm.goodsName && !searchForm.goodsClass) {
    isSearch.value = false;
    useGoods.getGoodsList(currentPage.value);
  } else {
    isSearch.value = true; //开启搜索状态标识
    searchForm.page = currentPage.value; //添加page属性到searchForm
    useGoods.getSearchGoods(searchForm);
    // store.dispatch('goods/getSearchGoods', searchForm)
    isSearch.value = false;
  }
};
//添加
const addGoodsLog = () => {
  isDialog.value = true;
};
const isDialogGoods = (emi: any) => {
  isDialog.value = emi;
};
const sendImg = (emi: any) => {
  form.goods_img = emi;
};

const clearInput = () => {
  searchForm.date = "";
  searchForm.goodsClass = "";
  searchForm.goodsName = "";
};

watch(
  currentPage,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      //如果搜索状态标识为true，那么请求的是搜索列表，否则为默认数据列表。
      if (isSearch.value === true) {
        isSearch.value = false;
        searchForm.page = currentPage.value;
        useGoods.getSearchGoods(searchForm);
      } else {
        useGoods.getGoodsList(currentPage.value);
      }
    }
  }
  // { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.wrapper-search {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // background-color: rgba(0, 0, 0, 0.1);
}
.item {
  width: 20%;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.name {
  width: auto;
  //文字不换行
  white-space: nowrap;
}
::v-deep .el-input {
  flex: 1;
}
.btn1 {
  margin-left: 5px;
}
.btn3 {
  margin-left: 30px;
}
//1.日期
// .date {
//   width: 20%;
//   ::v-deep .el-input__wrapper {
//     flex: 1;
//     height: 35px;
//   }
// }
//2.选项分类
// .classes {
//   width: 22%;
//   ::v-deep .el-input {
//     flex: 1;
//     height: 35px;
//   }
// }
// //3.商品名称
// .goodsName {
//   width: 22%;
//   ::v-deep .el-input {
//     flex: 1;
//     height: 35px;
//   }
// }
</style>
