//权限指令，不同权限的视图显隐

var ownPermission = ['admin', 'vip']
function toolPermission(el: any, permission: any) {
  if (permission && !ownPermission.includes(permission)) {
    el.parentNode && el.parentNode.removeChild(el) // 关键代码, 没有权限则删除元素
  }
}

const permission = {
  mounted(el: any, binding: any) {
    toolPermission(el, binding.value)
  },
  updated(el: any, binding: any) {
    toolPermission(el, binding.value)
  }
}

// function checkArray(key) {
//   let arr = ['1', '2', '3', '4']
//   let index = arr.indexOf(key)
//   if (index > -1) {
//     return true // 有权限
//   } else {
//     return false // 无权限
//   }
// }

// const permission = {
//   inserted: function (el, binding) {
//     let permission = binding.value // 获取到 v-permission的值
//     if (permission) {
//       let hasPermission = checkArray(permission)
//       if (hasPermission) {
//         // 移除Dom元素
//         el.parentNode && el.parentNode.removeChild(el)
//       }
//     }
//   }
//   //有权限时移除留言板登录按钮
// }

export default permission
