/**
 * 
 * @param {Array} data 必选
 * @param {Number} id 必选
 * @return {Object} 
 * @author rainci(刘雨熙)
 * @time 2019.3.22
 * 筛选data(平级tree data)，把data中对应的id的值返回
 */
export const filterOneData = (data, id) => { //筛选符合id的一条数据
    return data && data.get(id)
}