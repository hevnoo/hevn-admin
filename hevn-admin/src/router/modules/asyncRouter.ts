import router from '@/router'
import { createPinia } from 'pinia'
import { notFoundRouter } from '@/router/modules/staticRouter'
import { login } from '@/store' 
import { storeToRefs } from "pinia";

// export const asyncRouter = [
    export const asyncRouter = (): any=>{
        let isRoute = []
        const useLogin: any = login()
        let { menu } = useLogin
        
        if (isRoute.length !== 0) {
            //如果不为空，就是普通的跳转，并没有刷新
            // 防止刷新路由丢失，这个判断在permission.js里无法正确执行，所以在本文件里也写一个
            // console.log('index:跳转路由')
            } else {
            isRoute = ['menuList']
            const menuList = menu
            menuList.map((m: any) => {
                const { path, name, component, meta } = m
                const item = {
                path: path,
                name: name,
                component: () => import(`@/views${component}`),
                meta: meta
                }
                // console.log(item)
                router.addRoute('layout', item)
                //向layout添加子路由！
                if (m.children) {
                m.children.map((s: any) => {
                    const { path, name, component, meta } = s
                    const res = {
                    path,
                    name,
                    component: () => import(`@/views${component}`),
                    meta
                    }
                    router.addRoute(`${m.name}`, res)
                    //向父级添加子路由！
                })
                }
            })
            //下拉菜单路由
            //   const dropRoutes = [
            //     {
            //       path: '/personal',
            //       name: 'personal',
            //       component: () => import('@/views/personal/index.vue')
            //     }
            //   ]
            //   dropRoutes.map((m) => {
            //     router.addRoute('layout', m)
            //   })
            // 404路由,放在最后添加
            router.addRoute(notFoundRouter);
            //后加上
            }
    }
    

// ]

