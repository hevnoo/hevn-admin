import { ref,reactive , onMounted, computed, watch } from 'vue'
import storage from '@/utils/storage.js'
import { storeToRefs } from "pinia";
import  { appSwitch, orders } from '@/store'

//先排序数组数据,将相同名称的排在一起，用于合并
export function sortOrders(res: any) {
    for (let j = 0; j < res.length; j++) {
        for (let k = j + 1; k < res.length; k++) {
            if (res[j].clientName == res[k].clientName) {
            res.splice(j, 0, res[k]);
            res.splice(k + 1, 1);
            }
        }
    }
    return res
}

//设置合并数
export const getSpanArr = (data: any) => {
    let spanArr: any = reactive([]); //用于存放每一行记录的合并数
    let pos: any;
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        spanArr.push(1);
        pos = 0;
      } else {
        // 判断当前元素与上一个元素是否相同
        if (data[i].clientName === data[i - 1].clientName) {
          spanArr[pos] += 1;
          spanArr.push(0);
        } else {
          spanArr.push(1);
          pos = i;
        }
      }
    }
    return spanArr
  };