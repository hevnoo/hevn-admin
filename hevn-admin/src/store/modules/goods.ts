import { defineStore } from "pinia"
import { addGoodsApi, goodsListApi, searchApi, updateGoodsApi, deleteGoodsApi, upImgApi } from "@/api/modules/goods" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import storage from '@/utils/storage'
//使用另一个store
import { storeToRefs } from "pinia";
import  { appSwitch } from '@/store'


const goods = defineStore("/goods", {
  state: () => ({
    goodsList: [],
    total: 0,
    pageSize: 1,
    // currentPage: storage.getItem_s('goodsPage') || 1,
    goodsListId: []
  }),
  getters: {},
  actions: {
    //获取商品列表,可分页
    async getGoodsList(val:any ){
        try{
            const { data } =  await goodsListApi(val)
            this.goodsList = data.data
            this.total = data.total
            this.pageSize = data.pageSize
        } catch (error) {
            console.log(error)
        }
    },
    //获取搜索商品列表,可分页
    async getSearchGoods(val:any ){
        const { data } =  await searchApi(val)
        this.goodsList = data.data
        this.total = data.total
        this.pageSize = data.pageSize
        ElMessage.success(data.msg)
    },
    //添加商品
    async addGoods(val:any ){
        const { data } =  await addGoodsApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
        const useAppSwitch: any = appSwitch();
        let { currentPage } = storeToRefs(useAppSwitch);
        this.getGoodsList(currentPage.value)
    },
    //更新商品
    async updateGoods(val:any ){
        const { data } =  await updateGoodsApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
        const useAppSwitch: any = appSwitch();
        let { currentPage } = storeToRefs(useAppSwitch);
        this.getGoodsList(currentPage.value)
    },
    //删除商品
    async deleteGoods(val:any ){
        const { data } =  await deleteGoodsApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
        const useAppSwitch: any = appSwitch();
        let { currentPage } = storeToRefs(useAppSwitch);
        this.getGoodsList(currentPage.value)
    },
  },
})

export default goods

