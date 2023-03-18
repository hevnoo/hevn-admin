<template>
  <el-table
    ref="tableRef"
    :data="goodsList"
    style="width: 100%"
    :border="true"
    stripe
    fit
    @selection-change="SelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="商品ID" width="70"> </el-table-column>
    <el-table-column prop="goodsName" label="商品名称" />
    <el-table-column prop="goodsPrice" label="商品价格" />
    <el-table-column prop="goodsNumber" label="商品数量" />
    <el-table-column prop="goodsClass" label="商品分类" />
    <el-table-column prop="goods_img" label="商品图片" show-overflow-tooltip />
    <el-table-column
      prop="goodsDescribe"
      label="商品描述"
      show-overflow-tooltip
    />
    <el-table-column label="操作" width="210">
      <template #default="scope">
        <el-button size="small" @click="handleView(scope.$index, scope.row)"
          >查看</el-button
        >
        <!--  -->
        <el-button
          size="small"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-popconfirm
          title="确认要删除吗?"
          confirm-button-text="删除"
          cancel-button-text="取消"
          @confirm="handleDelete(scope.$index, scope.row)"
        >
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 清空与批量删除 -->
  <div style="margin-top: 20px; margin-left: 5px">
    <el-button type="primary" size="small" plain @click="toggleSelection()"
      >清空</el-button
    >
    <el-button size="small" plain @click="deleMore">批量删除</el-button>
  </div>
  <!-- 添加或编辑弹框 -->
  <GoodsDialog
    :isDialog="isDialog"
    :form="form"
    :eventMark="eventMark"
    @isDialogGoods="isDialogGoods"
    @sendImg="sendImg"
  ></GoodsDialog>
  <!-- 详情弹框 -->
  <Detail :isView="isView" :form="form" @isDetail="isDetail"></Detail>
</template>

<script lang="ts" setup>
import GoodsDialog from "@/views/goods/components/GoodsDialog.vue";
import Detail from "@/views/goods/goodsList/goodsTable/detail/index.vue";
import { ref, reactive, computed, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTable } from "element-plus";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods } from "@/store";
const route = useRoute();
const router = useRouter();
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { total, pageSize, goodsList } = storeToRefs(useGoods);

const tableRef: any = ref(null);
const isDialog = ref(false);
const isView = ref(false);
//传事件标识，dialog子组件依据标识判断
let eventMark = ref("goodsTable");
interface formType {
  goodsName: string;
  goodsNumber: number;
  goodsPrice: number;
  goodsClass: any;
  goods_img: any;
  goodsDescribe: string;
}
let form: formType = reactive({
  goodsName: "",
  goodsNumber: 0,
  goodsPrice: 0,
  goodsClass: "",
  goods_img: null,
  goodsDescribe: "",
});
// const currentPage = computed(() => store.state.appSwitch.currentPage);
// const goodsList = computed(() => store.state.goods.goodsList);

//1.查看
const handleView = (index: any, row: any) => {
  form = row;
  // form.createDate = dayjs(form.createDate).format('YYYY-MM-DD HH:mm:ss')
  isView.value = true;
};

//2.更新
const handleEdit = (index: any, row: any) => {
  form = row;
  isDialog.value = true;
};
const isDialogGoods = (emi: any) => {
  isDialog.value = emi;
};
const sendImg = (emi: any) => {
  form.goods_img = emi;
};
const isDetail = (emi: any) => {
  isView.value = emi;
};
// const confirms = () => {
//   store.dispatch('goods/updateGoods', form)
//   isDialog.value = false
// }
//3.删除
const handleDelete = (index: any, row: any) => {
  const currentId = { id: row.id };
  useGoods.deleteGoods(currentId);
};

//*批量删除
const deleMore = () => {
  // console.log(tableRef.value.getSelectionRows())
  let idArr: any[] = [];
  if (tableRef.value.getSelectionRows().length !== 0) {
    tableRef.value.getSelectionRows().map((m: any) => {
      idArr.push(m.id);
    });
    const currentId = { id: idArr };
    useGoods.deleteGoods(currentId);
  } else {
    console.log("未选中");
  }
};
//*清空
const toggleSelection = (val?: formType[]) => {
  if (val) {
    val.forEach((f: any) => {
      tableRef.value!.toggleRowSelection(f, undefined);
    });
  } else {
    tableRef.value!.clearSelection();
  }
};

//*监听并获取选中行的内容,以数组形式保存
const SelectionChange = (val: any) => {
  // console.log(val);
};
</script>

<style lang="scss" scoped>
//
.el-table {
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
//表头
::v-deep th {
  // height: 42px;
  background-color: rgb(0, 0, 0, 0.03) !important;
}
//表格头部 行
::v-deep .el-table__header {
}
//每一行
::v-deep .el-table__row {
  height: 57px;
}
</style>
