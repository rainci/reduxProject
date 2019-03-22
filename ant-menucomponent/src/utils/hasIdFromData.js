/**
 * 
 * @param {Array} data 
 * @param {Number} id 
 * @return {Boolean} 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 * 检测data数组里的值是否有itemChildren数组里的孩子的id
 */
export const hasIdFromDataFn = (data = [], id) => {//判断id是否在data数组中
    if (data.includes(id)) {
        return true;
    }
    return false;
}