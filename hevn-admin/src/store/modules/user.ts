import { defineStore } from "pinia"
import { getUser } from '@/api/modules/user'

const user = defineStore("/user", {
  state: () => ({
    userList: []
  }),
  getters: {},
  actions: {
    //获取用户列表
    async setUserList(){
      const { data } =  await getUser()
      this.userList = data
    }
  },
})

export default user

