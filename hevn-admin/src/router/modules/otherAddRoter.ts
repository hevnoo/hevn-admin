import articleDetail from '@/components/articleDetail/index.vue'

export const otherAddRouter = [
    //
	// {
    //     path: '/personal',
    //     name: 'personal',
    //     component: () => import('@/views/personal/index.vue')
    // },

]

//下拉菜单路由
// const dropRoutes = [
//     {
//       path: '/personal',
//       name: 'personal',
//       component: () => import('@/views/personal/index.vue')
//     }
//   ]

//文章详情路由
export const articleDetailRouter: any = {
    path: '/article/articleDetail',
    name: 'articleDetail',
    // components: () => import('@/components/articleDetail/index.vue'),
    component: articleDetail,
    mata: {
        title: '文章详情页'
    }
}

