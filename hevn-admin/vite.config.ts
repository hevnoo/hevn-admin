import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置根路径与@路径
  base: "./",
  resolve: {
    // ↓路径别名，主要是这部分
    alias: {
      "@": resolve(__dirname, "./src"),
      //解决i18n提示
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  //解决element汉化报错
  optimizeDeps: {
    include: ["element-plus/lib/locale/lang/zh-cn"],
  },
  //全局配置scss文件
  css: {
    preprocessorOptions: {
      scss: {
        //配置variables.scss全局可用
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
})
