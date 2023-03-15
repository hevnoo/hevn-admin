import router from './index'
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import storage from '@/utils/storage'
import { login } from '@/store'
import { notFoundRouter } from '@/router/modules/staticRouter'
import { diffTokenTime } from '@/utils/auth'

const whiteList = ['/login']
let isRoute = true
//刷新后会初始化，那么isRoute就又是空的
//如果为空，判断为刷新，就重新添加路由
router.beforeEach((to, from, next) => {
  const useLogin: any = login()
  let { token, menu } = useLogin
  if (token&&storage.getItem('token')) {
    if (to.path === '/login') {
      //去的还是login的话自动跳到'/'，防止一直在login
      next('/')
    } else {
      let menuList = menu || storage.getItem('menu')
      
      if (isRoute) {
        //如果为真，就是刷新; 假就是跳转。
        isRoute = false
          menuList.map((m: any) => {
          const { path, name, component, meta } = m
          const item = {
            path,
            name,
            component: () => import(`../views${component}`),
            meta
          }
          router.addRoute('layout', item)
          //向layout添加子路由！
          if (m.children) {
            m.children.map((s: any) => {
              const { path, name, component, meta } = s
              const res = {
                path,
                name,
                component: () => import(`../views${component}`),
                meta
              }
              router.addRoute(`${m.name}`, res)
              //向父级添加子路由！
            })
          }
        })
        // 404路由,放在最后添加
        router.addRoute(notFoundRouter);
        //
        if (to.path === '/403') {
          next('/home')
        } else {
          next()
        }
      } else {
        //------------------
        //判断是否是首页前的wait页面，/wait用来代替动态的/home
        if (to.path === '/403') {
          next('/home')
        } else {
          next()
        }
        //
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

//全局后置守卫
router.afterEach((to, from) => {
  const useLogin: any = login()
  let { token } = useLogin
  if(diffTokenTime() && to.path != '/login'){
    useLogin.logout()
    ElMessage.error('登陆超时，请重新登录')
  }
  //标签
  document.title = `Admin | ${to.meta.title}`;
  // if(from == ''){
  //   console.log(from);
  // }
})
