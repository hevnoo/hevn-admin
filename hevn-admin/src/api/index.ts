import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import { ResultEnum } from "@/utils/httpEnum";
import storage from '@/utils/storage'
import { login } from '@/store'


const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	// baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
};

// // axios.defaults.baseURL = 'http://127.0.0.1:7171/'
// //创建实例,也可以用上面的default.baseURL。
const service = axios.create({
  //   baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://127.0.0.1:7171',
  timeout: 5000
})

// //请求拦截
service.interceptors.request.use(
  (config) => {
    const useLogin: any = login()
    let { token } = useLogin
    if (token && storage.getItem('token')) {
      //是否登录超时diffTokenTime()
      if (diffTokenTime()) {
        useLogin.logout()
        ElMessage.error('登陆超时，请重新登录')
        return Promise.reject(new Error('客户端 token 时间失效了'))
      }
    }
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

// //响应拦截,依据响应结果进行提示。
service.interceptors.response.use(
  (response) => {
    if (response.data.status === 200 || response.data.status === 201) {
      return response
    } else {
      ElMessage.error(response.data.msg)
      return Promise.reject(new Error(response.data.msg))
    }
  },
  (error) => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
  //响应拦截的response就是后端传递的数据！
  //1、如果状态码符合，则将response返回，客户端就能正常拿到数据；
  //2、如果状态码不符合，则不返回，客户端也就不能拿到数据。
  //成功提示暂时不在响应拦截里执行。
)

export default service
