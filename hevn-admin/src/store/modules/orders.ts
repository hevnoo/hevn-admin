import { defineStore } from "pinia"
import { addOrdersApi, getOrdersApi, searchOrdersApi, upOrdersApi, deleOrdersApi, stockApi, upStockApi, getCollectApi } from "@/api/modules/orders" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import storage from '@/utils/storage'
//使用另一个store，这里用于获取当前分页页码。
import { storeToRefs } from "pinia";
import  { appSwitch } from '@/store'

const orders = defineStore("/orders", {
  state: () => ({
    orderList: [],
    total: 0,
    pageSize: 1,
    stock: 0,
    collectList: [], //汇总清单
    manageList: []
  }),
  getters: {},
  actions: {
    //获取订单列表，分页
    async getOrder(val: any){
      try{
        const { data } =  await getOrdersApi(val)
        this.orderList = data.data
        this.total = data.total
        this.pageSize = data.pageSize
      } catch (error) {
        console.log(error)
      }
    },
    //获取搜索订单列表,分页
    async getSearchOrder(val: any){
        const { data } =  await searchOrdersApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
        const useAppSwitch: any = appSwitch();
        let { currentPage } = storeToRefs(useAppSwitch);
        await this.getOrder(currentPage.value)
    },
    //添加订单
    async addOrder(val: any){
        const { data } =  await addOrdersApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
        const useAppSwitch: any = appSwitch();
        let { currentPage } = storeToRefs(useAppSwitch);
        await this.getOrder(currentPage.value)
    },
    
    //更新订单
    async upOrder(val: any){
        const { data } =  await upOrdersApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
        const useAppSwitch: any = appSwitch();
        let { currentPage } = storeToRefs(useAppSwitch);
        await this.getOrder(currentPage.value)
    },
    //删除订单
    async deleOrder(val: any){
        const { data } =  await deleOrdersApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
        const useAppSwitch: any = appSwitch();
        let { currentPage } = storeToRefs(useAppSwitch);
        await this.getOrder(currentPage.value)
    },
    //库存stock
    async getStock(val: any){
        const { data } =  await stockApi(val)
        this.stock = data.data
        // ElMessage.success(data.msg)
    },
    //与订单响应的库存更新。
    async upStock(val: any){
        const { data } =  await upStockApi(val)
        ElMessage.success(data.msg)
    },
    //汇总清单
    async getCollect(val: any){
        const { data } =  await getCollectApi(val)
        this.collectList = data.data
        this.total = data.total
        this.pageSize = data.pageSize
        // ElMessage.success(data.msg)
    },
    //出货清单，模块管理的分类管理。
    async getManage(val: any){
        const { data } =  await getCollectApi(val)
        this.manageList = data.data
        this.total = data.total
        this.pageSize = data.pageSize
        // ElMessage.success(data.msg)
    },
  },
})

export default orders

