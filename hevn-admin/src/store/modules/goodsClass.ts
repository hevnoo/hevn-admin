import { defineStore } from "pinia"
import { addClassApi, allClassApi, upClassApi, deleClassApi } from "@/api/modules/goodsClass" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import storage from '@/utils/storage'

const goodsClass = defineStore("/goodsClass", {
  state: () => ({
    classList: []
  }),
  getters: {},
  actions: {
    //获取用户列表
    async addClass(val: any){
      const { data } =  await addClassApi(val)
      ElMessage.success(data.msg)
    },
    //获取分类列表
    async getClass(){
      try{
        const { data } =  await allClassApi()
        this.classList = data.data
        ElMessage.success(data.msg)
      } catch (error) {
        console.log(error)
      }
    },
    //更新分类
    async upClass(val: any){
        const { data } =  await upClassApi(val)
        ElMessage.success(data.msg)
    },
    //删除分类
    async deleClass(val: any){
        const { data } =  await deleClassApi(val)
        ElMessage.success(data.msg)
    },
  },
})

export default goodsClass

