import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { staticRouter, errorRouter, notFoundRouter } from '../router/modules/staticRouter'
import { asyncRouter } from '@/router/modules/asyncRouter'
import { login } from '@/store' 
import { storeToRefs } from "pinia";
import storage from '@/utils/storage'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter]
  
})

//在index添加路由，防止刷新路由丢失！
// refreshRoute()

const getMenu = ()=>{
  let isRoute = true
  if (isRoute) {
    //如果为空，判断为刷新，就重新添加路由，防止刷新路由丢失！
    isRoute = false
    const menuList = storage.getItem('menu') || []
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
    } else {
    
    //后加上
    }
}
getMenu()
  

  export default router