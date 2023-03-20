<template>
  <el-table
    ref="tableRef"
    :data="orderList"
    style="width: 100%"
    @selection-change="SelectionChange"
    :border="true"
    fit
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="id" label="ID" width="70" />
    <el-table-column prop="saleDate" label="出售日期" show-overflow-tooltip />
    <el-table-column prop="goodsName" label="商品名称" />
    <el-table-column prop="goodsPrice" label="商品价格" />
    <el-table-column prop="saleNumber" label="销售数量" />
    <el-table-column prop="clientName" label="顾客姓名" />
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <!--  -->
        <el-icon
          @click="handleEdit(scope.$index, scope.row)"
          style="margin: auto 18px auto 5px"
          ><EditPen
        /></el-icon>
        <el-popconfirm
          title="确认要删除吗?"
          confirm-button-text="删除"
          cancel-button-text="取消"
          @confirm="handleDelete(scope.$index, scope.row)"
        >
          <template #reference>
            <el-icon><Delete /></el-icon>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 清空与批量删除 -->
  <div style="margin-top: 15px; margin-left: 5px">
    <el-button size="small" type="primary" plain @click="toggleSelection()"
      >清空</el-button
    >
    <el-button size="small" plain @click="deleMore()">批量删除</el-button>
  </div>
  <!-- 编辑弹框 -->
  <OrderDialog
    :isDialog="isDialog"
    :info="info"
    :eventMark="eventMark"
    @isDialogOrder="isDialogOrder"
  ></OrderDialog>
</template>

<script lang="ts" setup>
import OrderDialog from "@/views/order/components/OrderDialog.vue";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { login, appSwitch, goods, orders } from "@/store";
const useAppSwitch: any = appSwitch();
const useGoods: any = goods();
const useOrders: any = orders();
let { token, currentPage } = storeToRefs(useAppSwitch);
let { goodsList } = storeToRefs(useGoods);
let { total, orderList, stock } = storeToRefs(useOrders);

const tableRef: any = ref(null);
let isDialog = ref(false);
const eventMark = ref("orderTable"); //传事件标识

let info = reactive({
  goodsName: null,
  saleNumber: 0,
  clientName: null,
  goodsPrice: 0,
});

//弹框
const isDialogOrder = (emi: any) => {
  isDialog.value = emi;
};

//1.编辑更新
const handleEdit = (index: any, row: any) => {
  info = row;
  // console.log(info)
  isDialog.value = true;
};

//2.删除
const handleDelete = (index: any, row: any) => {
  const id = { id: row.id };
  useOrders.deleOrder(id);
  // store.dispatch("order/deleOrder", id);
};
//*清空
const toggleSelection = (val?: any) => {
  if (val) {
    val.forEach((f: any) => {
      tableRef.value!.toggleRowSelection(f, undefined);
    });
  } else {
    tableRef.value!.clearSelection();
  }
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
    useOrders.deleOrder(currentId);
    // store.dispatch("order/deleOrder", currentId);
  } else {
    console.log("未选中");
  }
};
//*监听并获取选中行的内容,以数组形式保存
const SelectionChange = (val: any) => {};
</script>

<style lang="scss" scoped>
//
.el-table {
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
//表格头部 行
::v-deep .el-table__header {
}
//表头
::v-deep th {
  // height: 42px;
  background-color: #f5fafe !important;
}
//每一行
::v-deep .el-table__row {
  // height: 43px;
}
.logInput {
  width: 70%;
  height: 30px;
  padding: 7px;
}
</style>
