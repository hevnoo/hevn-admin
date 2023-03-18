import { defineStore } from "pinia"
import { addGoodsClassApi, getGoodsClassApi, upGoodsClassApi, deleGoodsClassApi } from "@/api/modules/goodsClass" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import storage from '@/utils/storage'

const goodsClass = defineStore("/goodsClass", {
  state: () => ({
    classList: []
  }),
  getters: {},
  actions: {
    //获取分类列表
    async getClass(){
      try{
        const { data } =  await getGoodsClassApi()
        this.classList = data.data
      } catch (error) {
        console.log(error)
      }
    },
    //添加类别
    async addClass(val: any){
      const { data } =  await addGoodsClassApi(val)
      ElMessage.success(data.msg)
      //重新请求完整数据
       await this.getClass()
    },
    //更新分类
    async upClass(val: any){
        const { data } =  await upGoodsClassApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
       await this.getClass()
    },
    //删除分类
    async deleClass(val: any){
        const { data } =  await deleGoodsClassApi(val)
        ElMessage.success(data.msg)
        //重新请求完整数据
       await this.getClass()
    },
  },
})

export default goodsClass

