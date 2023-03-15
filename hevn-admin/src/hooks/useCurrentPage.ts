//分页器的当前页码currentPage有关的部分
//弃用
import { ref, onMounted, computed, watch } from 'vue'
import storage from '@/utils/storage.js'

export default function (val: any) {
  const pages = ref(0)
  pages.value = val
  return pages
}
