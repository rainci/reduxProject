/**
 * 
 * @param {Array} data 
 * @param {Number} id 
 * @return {Array} 
 * @author rainci(刘雨熙)
 * @time 2019.3.25
 * 检测data数组里的值是否有id,并删除此id
 */
export const deleteIdFromData = (data = [], id) => {//判断id是否在data数组中
    if (data.includes(id)) {
        data.splice(data.indexOf(id),1)
	    return data;
    }
    return data;
}