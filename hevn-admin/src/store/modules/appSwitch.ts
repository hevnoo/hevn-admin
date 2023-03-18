import { defineStore } from "pinia"
import storage from '@/utils/storage'

const appSwitch = defineStore("/appSwitch", {
  state: () => ({
    isClose: false,
    //分页
    total: 0,
    pageSize: 10,
    currentPage: storage.getItem_s('page') || 1,
    //key值刷新---------------
    breadKeys: 1,
    menuKeys: 1,
    dialogKeys: 1,
    tagKeys: 1 
  }),
  getters: {},
  actions: {
    //
    //改变menu收缩关闭
    change(val: boolean) {
      this.isClose = val
    },
    //分页改变
    changePage(val: number) {
      storage.setItem_s('page', val)
      this.currentPage = val
    },
    //key--------
    changeBreadKeys(val: number) {
      //这里的key值由Headers去控制Bread组件的刷新，从而读取storage。
      this.breadKeys = ++val
    },
    changeMenuKeys(val: number) {
      //menu
      this.menuKeys = ++val
    },
    changeDialogKeys(val: number) {
      //menu
      this.dialogKeys = ++val
    },
    changeTagKeys(val: number) {
      //menu
      this.tagKeys = ++val
    }
  },
})


export default appSwitch

