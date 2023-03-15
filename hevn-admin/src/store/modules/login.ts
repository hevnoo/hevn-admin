import { defineStore } from "pinia"
import storage from '@/utils/storage'
import { loginApi, registerApi, getMenuApi } from "@/api/modules/login" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'

const login = defineStore("/login", {
  state: () => ({
    token: storage.getItem('token') || '',
    role: storage.getItem('role') || '',
    menu: storage.getItem('menu') || [],
    userInfo: storage.getItem("userInfo") || "{}",
  }),
  getters: {},
  actions: {
    //获取菜单
    async setMenu(val :any){
      const { data } = await getMenuApi(val)
      this.menu = data.data
      storage.setItem('menu', data.data)
    },
    //登录
    async setLogin(val :any){
      try {
        const { data } = await loginApi(val)
        ElMessage.success(data.msg)
        this.token = data.token
        storage.setItem('token', data.token)
        this.role = data.role
        storage.setItem('role', data.role)
        setTimeout(()=>{
          router.push('/')
        },700)
        // this.setMenu(data.role)
        setTokenTime()
      } catch (error) {
        console.log(error)
      }
      
    },
    //注册
    async setRegister(val :any){
      const { data } = await registerApi(val)
      ElMessage.success(data.msg)
    },
    // 退出登录
    logout() {
      //清空所有
      localStorage.clear()
      sessionStorage.clear()
      storage.setItem('lang', 'zh')
      router.replace('/login')
    }
  },
})

export default login

