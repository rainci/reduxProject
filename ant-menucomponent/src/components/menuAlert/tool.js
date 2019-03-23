import { filterOneData } from '../../utils'
/**
 * 
 * @param {Array} sampleTreeData 必选 
 * @param {Number} currentId 必选
 * @param {Array} secletIds 可选
 * @param {Array} relationLeaf 可选
 * @return {Object} {secletIds,relationLeaf}
 * @author rainci(刘雨熙)
 * @attention 筛选data(平级tree data)，把data中对应的id的值返回
 */
export const getParentIdAndName = ({ currentId, sampleTreeData, secletIds = [], relationLeaf = [] }) => {//获取父辈们的id和name
    let parentItem = filterOneData(sampleTreeData, currentId);
    if (parentItem && Object.keys(parentItem).length) {
        let { tagId, name, parentId } = parentItem;
        secletIds.unshift(`${tagId}`)
        relationLeaf.unshift({ tagId, name })
        if (parentId) {
            getParentIdAndName({ currentId: parentId, sampleTreeData, secletIds, relationLeaf })
        }
    }
    return {
        secletIds,
        relationLeaf
    }

}

/**
 * 
 * @param {Array} leaf 
 * @return {Array[[]]}
 * @author rainci(刘雨熙)
 * 将子节点返回有父辈关系的二维数组
 */
export const relationLeafFn = ({leaf,sampleMenuData}) => { //将叶子节点转换成对应关系的父辈和叶子
    return leaf.map(item => {
        return getParentIdAndName({
            currentId: Number(item),
            sampleTreeData: sampleMenuData,
        }).relationLeaf
    })
}

/**
 * 
 * @param {Array} data 
 * @param {Array[{}]} itemChildren 
 * @return {Boolean} 
 * @author rainci(刘雨熙)
 * 检测data数组里的值是否有itemChildren数组里的孩子的id
 */
export const checkHasChildrenFn = (data, itemChildren) => {
    for (const { tagId } of itemChildren) {
        if (data.includes(`${tagId}`)) {
            return true;
        }
    }
    return false;
}
/**
 * 
 * @param {Array} data 必选 
 * @return {Boolean} 
 * @author rainci(刘雨熙)
 * 筛选data(tree data)，把data中的子节点和子节点没有在data中的父节点返回
 */
export const filterLeafFn = ({data,sampleMenuData}) => { //筛选select后的叶子节点
    return data.filter(item => {
        let itemChildren = sampleMenuData && sampleMenuData.size && sampleMenuData.get(parseInt(item)) && sampleMenuData.get(parseInt(item)).children;
        if (itemChildren && itemChildren.length && checkHasChildrenFn(data, itemChildren)) {
            return false;
        } else {
            return true;
        }
    })
}