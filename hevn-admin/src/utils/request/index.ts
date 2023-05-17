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

// //创建实例
const service = axios.create({
  //   baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://127.0.0.1:7171',
  timeout: 5000
})

// //请求拦截
service.interceptors.request.use(
  (config) => {
    const useLogin: any = login()
    let { token, refreshToken } = useLogin
    if(storage.getItem('Authorization_token') == `Bearer ${refreshToken}`){
      config.headers['Authorization'] = `Bearer ${refreshToken}`
      return config
    }else{
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    }
    
  },
  (error) => {
    ElMessage.error('错误')
    return Promise.reject(new Error(error))
  }
)

// //响应拦截,依据响应结果进行提示。
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    if (response.data.status === 200 || response.data.status === 201) {
      return response
    } else {
      if(response.data.msg){
        ElMessage.error(response.data.msg + ',' + response.data.status)
        if(response.data.status == 411){
          //411是后端设置的中间件判断token过期状态
          const useLogin: any = login()
          useLogin.logout()
        }
      }else{
        ElMessage.error('未知状态错误')
      }
      return Promise.reject(new Error(response.data.msg))
    }
  },
  //显示错误，例如：401
  (error) => {
    //当状态为token过期或者失效状态时，用refreshToken重新请求一个新token。
    if(error.response.data.status == 401){
      const { config } = error
      const useLogin: any = login()
      let { token, refreshToken, userInfo } = useLogin
      if(refreshToken && storage.getItem('refreshToken')){
        config.headers['Authorization'] = `Bearer ${refreshToken}`
        // console.log('***',config.headers['Authorization'])
        storage.setItem('Authorization_token', `Bearer ${refreshToken}`)
        useLogin.setRefreshToken(userInfo.username)
      }
    }
    // ElMessage.error(error.response.statusText + error.response.data.status)
    console.log(error.response)
    return Promise.reject(new Error(error.response.data))
  }

)

/*
1.后端通过very验证后，过期就会返回401无权限。
2.出现401时，就把refreshToken保存到本地，然后再调用pinia里的刷新token接口，
3.一旦接口调用成功就在pinia接口内移除本地的Authorization_token，这样就不影响其他请求选择token请求头了。
4.只有刷新token这个地方要用refreshToken，其他请求都是token。
*/

export default service
