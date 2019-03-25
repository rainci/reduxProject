/**
 * 
 * @return {Object}
 * @author rainci(刘雨熙)
 * @time 2019.3.18
 * @about 关于方法集
 */
import { generateList } from './generate'
import { filterOneData } from './filterOneMapData'
import { hasIdFromDataFn } from './hasIdFromData'
import { deleteIdFromData } from './deleteIdFromData'
export {   
    generateList, //将多层级的数据处理成单层级的Map数据方法
    filterOneData, //筛选data(平级tree data)，把data中对应的id的值返回
    hasIdFromDataFn, //检测data数组里的值是否有id
    deleteIdFromData //检测data数组里的值是否有id,并删除此id
  }