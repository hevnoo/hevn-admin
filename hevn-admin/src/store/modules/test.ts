import { defineStore } from "pinia"

const test = defineStore("/test", {
    state: () => ({
      isOpen: false,
      testValue: 12,
      userInfo: JSON.parse(window.localStorage.getItem("userInfo") || "{}"),
    }),
    getters: {},
    actions: {
      run(val: number){
          this.testValue += val
      }
    },
})

export default test

