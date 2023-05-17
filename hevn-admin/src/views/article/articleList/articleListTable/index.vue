<template>
  <div class="w-table" v-if="articleList">
    <el-table
      :data="articleList"
      stripe
      border
      @selection-change="SelectionChange"
      ref="tableRef"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        fixed
        prop="create_time"
        label="日期"
        width="155"
        show-overflow-tooltip
      />
      <el-table-column
        prop="title"
        label="标题"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="content"
        label="内容"
        show-overflow-tooltip
        id="content"
      />
      <el-table-column
        prop="cover_img"
        label="封面"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column prop="viewed" label="阅读量" width="80" />
      <!-- <el-table-column prop="articleClass" label="类别" width="120" /> -->
      <el-table-column
        prop="articleClass"
        label="类别"
        width="150"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span v-for="(item, index) in scope.row.articleClass" :key="index">{{
            item
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDetail(scope.$index, scope.row)"
            >Detail</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-popconfirm
            title="确认要删除吗?"
            confirm-button-text="删除"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button link type="danger" size="small">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 清空与批量删除 -->
  <div style="margin: 10px 0 0 10px">
    <el-button type="primary" size="small" plain @click="toggleSelection()"
      >清空</el-button
    >
    <el-button size="small" plain @click="deleMore">批量删除</el-button>
  </div>
  <!-- 分页 -->
  <div class="pagination">
    <Pagination @pageEmit="pageEmits" :total="total" :pageSize="pageSize" />
  </div>
</template>

<script setup lang="ts">
import Pagination from "@/views/article/components/Pagination.vue";
import { getAllArticleApi, deleArticleApi } from "@/api/modules/article";
import { ref, reactive, onMounted, computed, watch, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import { storeToRefs } from "pinia";
import { login, appSwitch, article, goodsClass } from "@/store";
const route = useRoute();
const router = useRouter();
const useArticle: any = article();

const tableRef: any = ref(null);
let articleList: any = ref([]);
let total: any = ref(0);
let pageSize: any = ref(1);
let page: any = ref(1);

const pageEmits = (e: any) => {
  page.value = e;
};

const getList = async (val: any) => {
  try {
    let { data } = await getAllArticleApi(val);
    articleList.value = data.data;
    total.value = data.total;
    pageSize.value = data.pageSize;
  } catch (error) {
    console.log(error);
  }
};
getList(page.value);

//详情页
const handleDetail = (index: any, row: any) => {
  // console.log(row);
  let articleInfo = row;
  storage.setItem_s("name", "articleDetail");
  router.push({
    path: "/article/articleDetail",
    query: { ...articleInfo },
  });
};

//编辑
const handleEdit = (index: any, row: any) => {
  // console.log("click", index, row);
  let articleInfo = row;
  router.push({
    path: "/article/setArticle",
    query: { ...articleInfo },
  });
};

//删除
const handleDelete = async (index: any, row: any) => {
  const id = { id: row.id };
  let { data } = await deleArticleApi(id);
  getList(page.value);
  ElMessage.success(data.msg);
};

//*批量删除
const deleMore = async () => {
  // console.log(tableRef.value.getSelectionRows())
  let idArr: any[] = [];
  if (tableRef.value.getSelectionRows().length !== 0) {
    tableRef.value.getSelectionRows().map((m: any) => {
      idArr.push(m.id);
    });
    const currentId = { id: idArr };
    let { data } = await deleArticleApi(currentId);
    getList(page.value);
    ElMessage.success(data.msg);
  } else {
    console.log("未选中");
  }
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

//*监听并获取选中行的内容,以数组形式保存
const SelectionChange = (val: any) => {
  // console.log(val);
};
watch(page, (val) => {
  getList(val);
});
</script>

<style scoped lang="scss">
.w-table {
  padding: 10px;
}
.pagination {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
//表头 行
::v-deep th {
  // height: 42px;
  background-color: rgb(0, 0, 0, 0.05) !important;
}
//表格头部 行
::v-deep .el-table__header {
}
//每一行
::v-deep .el-table__row {
  height: 57px;
}
</style>
