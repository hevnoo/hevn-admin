import { App, nextTick } from 'vue'
//自动聚焦
const getInput = (el: any) =>
  el instanceof HTMLInputElement ? el : el.querySelector('input')
const focus = {
  mounted: async (el: any, { arg }: any) => {
    // 为了防止数据未即使更新。
    await nextTick()
    // 对于非文本框聚焦（使用了 contenteditable ）的直接聚焦即可
    if (arg) el.focus?.()
    else getInput(el)?.focus()
  }

  // mounted(el) {
  //   if (el.tagName.toLocaleLowerCase() == 'input') {
  //     el.focus()
  //   } else {
  //     if (el.getElementsByTagName('input')) {
  //       el.getElementsByTagName('input')[0].focus()
  //     }
  //   }
  // }
}

export default focus
