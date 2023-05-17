import { defineStore } from "pinia"
import { getArticleClassApi } from "@/api/modules/articleClass" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import storage from '@/utils/storage'
//使用另一个store
import { storeToRefs } from "pinia";
import  { appSwitch } from '@/store'

const articleClass = defineStore("/articleClass", {
  state: () => ({
    articleList: [],
    total: 0,
    pageSize: 1,
  }),
  getters: {},
  actions: {
    //获取所有文章列表
    async getArticleClass(val: any){
      try {
        const { data } =  await getArticleClassApi(val)
        this.articleList = data.data
        this.total = data.total
        this.pageSize = data.pageSize
      } catch (error) {
        console.log(error)
      }
    },

  },
})

export default articleClass

