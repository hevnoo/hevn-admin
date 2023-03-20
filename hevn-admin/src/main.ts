import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
//element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//全局引入element icons
// import * as ELIcons from '@element-plus/icons-vue'
import * as Icons from "@element-plus/icons-vue";
import 'dayjs/locale/zh-cn'
//全局样式
import '@/styles/index.scss'
//路由守卫
import '@/router/guard'
//i18n
import i18n from '@/i18n'
//阿里图标库
import '@/assets/iconfont/iconfont.css'
//自定义指令
import directives from '@/directives/index'
//动画库
import 'animate.css';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
// 循环注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(i18n)
app.use(directives)

app.mount('#app')

