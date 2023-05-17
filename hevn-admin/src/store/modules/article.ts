import { defineStore } from "pinia"
import { addArticleApi, getAllArticleApi, searchArticleApi, getMyListApi, upArticleApi } from "@/api/modules/article" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import storage from '@/utils/storage'
//使用另一个store
import { storeToRefs } from "pinia";
import  { appSwitch } from '@/store'

const article = defineStore("/article", {
  state: () => ({
    articleList: [],
    total: 0,
    pageSize: 1,
    articleId: []
  }),
  getters: {},
  actions: {
    //获取所有文章列表
    async getAllArticle(val: any){
      try {
        const { data } =  await getAllArticleApi(val)
        this.articleList = data.data
        this.total = data.total
        this.pageSize = data.pageSize
      } catch (error) {
        console.log(error)
      }
    },

    //获取搜索搜索文章
    async searchArticle(val: any){
      try {
        const { data } =  await searchArticleApi(val)
        this.articleList = data.data
        this.total = data.total
        this.pageSize = data.pageSize
        ElMessage.success(data.msg)
      } catch (error) {
        console.log(error)
      }
    }
  },
})

export default article

