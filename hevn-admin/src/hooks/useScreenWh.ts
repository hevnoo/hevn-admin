//获取页面宽高值，详情见下链接。
//https://blog.csdn.net/weixin_42776111/article/details/126095393?ops_request_misc=&request_id=&biz_id=102&utm_term=vue3hook%E7%94%A8%E6%B3%95&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-3-126095393.142^v73^insert_down2,201^v4^add_ask,239^v1^control&spm=1018.2226.3001.4187

import { reactive } from 'vue'

export default function () {
  // 导出一个默认方法

  // 创建一个对象，保存宽度和高度值
  const screen = reactive({
    width: 0,
    height: 0
  })

  // 创建一个方法，获取可视化界面的宽度和高度值
  const getWH = () => {
    screen.width = document.documentElement.clientWidth
    screen.height = document.documentElement.clientHeight
  }

  return { screen, getWH } // 方法返回宽高值
}
