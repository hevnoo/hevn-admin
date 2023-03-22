import { defineStore } from "pinia"
import storage from '@/utils/storage'
import { loginApi, registerApi, getMenuApi, refreshTokenApi } from "@/api/modules/login" 
import { ElMessage } from 'element-plus'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'

const login = defineStore("/login", {
  state: () => ({
    token: storage.getItem('token') || '',
    role: storage.getItem('role') || '',
    menu: storage.getItem('menu') || [],
    userInfo: storage.getItem("userInfo") || "{}",
    expiresIn: storage.getItem('expiresIn') || 2 * 60 * 60 * 1000,
    refreshToken: storage.getItem('refreshToken') || ''
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
        this.expiresIn = data.expiresIn
        storage.setItem('userInfo', data.userInfo)
        this.userInfo = data.userInfo
        storage.setItem('expiresIn', data.expiresIn)
        this.refreshToken = data.refreshToken
        storage.setItem('refreshToken', data.refreshToken)
        setTimeout(()=>{
          router.push('/')
        },500)
        this.setMenu(data.role)
        // setTokenTime()
      } catch (error) {
        console.log(error)
      }
    },
    //刷新token
    async setRefreshToken(val :any){
      const { data } = await refreshTokenApi(val)
      this.token = data.token
      storage.setItem('token', data.token)
      ElMessage.success()
      storage.removeItem('Authorization_token')
      //在这里重新发起未完成的请求
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

