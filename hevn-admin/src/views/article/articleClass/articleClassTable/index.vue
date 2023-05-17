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
      <el-table-column fixed prop="id" label="ID" width="200" />
      <el-table-column prop="articleClassName" label="类名" />
      <el-table-column fixed="right" label="操作" width="250">
        <template #default="scope">
          <el-button link type="primary" size="small">Detail</el-button>
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
  <!-- 编辑弹框 -->
  <ArticleDialog
    :isDialog="isDialog"
    :sendInfo="sendInfo"
    :eventMark="eventMark"
    @articleDialogEmit="articleDialogEmits"
  ></ArticleDialog>
</template>

<script setup lang="ts">
import Pagination from "@/views/article/components/Pagination.vue";
import ArticleDialog from "@/views/article/components/ArticleDialog.vue";
import {
  addArticleClassApi,
  getArticleClassApi,
  upArticleClassApi,
  deleArticleClassApi,
} from "@/api/modules/articleClass";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import storage from "@/utils/storage.js";
import emitter from "@/utils/evnetBus";
import { storeToRefs } from "pinia";
import { login, appSwitch, article, articleClass } from "@/store";
const useArticle: any = article();

const tableRef: any = ref(null);
let articleList: any = ref([]);
//分页器
let total: any = ref(0);
let pageSize: any = ref(1);
let page: any = ref(1);
//弹框
let isDialog = ref(false);
const eventMark = ref("articleClassTable"); //传事件标识
let sendInfo: any = ref({
  articleClassName: "",
});
//接收页码
const pageEmits = (e: any) => {
  page.value = e;
};
//弹框
const articleDialogEmits = (e: any) => {
  isDialog.value = e;
};
//事件总线，这里是ArticleDialog传过来的，用于添加之后获取最新数据。
emitter.on("newArticleClassListEmit", (res: any) => {
  articleList.value = res.articleList;
  total.value = res.total;
});

const getList = async (val: any) => {
  try {
    let { data } = await getArticleClassApi(val);
    articleList.value = data.data;
    total.value = data.total;
    pageSize.value = data.pageSize;
  } catch (error) {
    console.log(error);
  }
};
getList(page.value);

//编辑
const handleEdit = (index: any, row: any) => {
  // console.log("click", index, row);
  sendInfo = row;
  isDialog.value = true;
};

//删除
const handleDelete = async (index: any, row: any) => {
  const id = { id: row.id };
  let { data } = await deleArticleClassApi(id);
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
    let { data } = await deleArticleClassApi(currentId);
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
//监听页码
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
</style>
