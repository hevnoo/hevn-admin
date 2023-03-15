//点击页面时，记录鼠标当前的位置

import { ref, onMounted, onUnmounted, Ref } from 'vue'

function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const updateMouse = (e: any) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })

  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

  return { x, y }
}

export default useMousePosition
