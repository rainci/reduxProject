/**
 * 
 * @param {Array} data 要处理的data
 * @param {Array} matchParam 要获取的参数,默认第一个是id,第二个是名称
 * @return {Array} changeData
 * @author rainci(刘雨熙)
 * @time 2019.3.29
 */
export const changeArrayToString = ({data = [],matchParam=[]}) => {
    let changeData = [];
    if (!data.length)return changeData;
    for (let item of data) {
      let itemData = {},
        itemKey = [];
      let name = item.map(it => {
        itemKey.push(it[matchParam[0]])
        return it[matchParam[1]]
      })
      itemData[matchParam[0]] = itemKey.join('-');
      itemData[matchParam[1]] = name.join('-');
      changeData.push(itemData)
    }
    return changeData
}